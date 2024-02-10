import { toSlug, parseTimeAgo } from "../utils.js";

import { MongoClient, ServerApiVersion } from "mongodb";
import PQueue from "p-queue";
import Humanoid from "humanoid-js";
import { load } from "cheerio";
import { config } from "dotenv";
config({});
const url = process.env.MONGODB_URI;
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const updatedComicSet = new Set();
const queue = new PQueue({ concurrency: 10 });
const dbName = "comicDb";
let db;
let chapterCollection;
const humanoid = new Humanoid();
async function checkIfChapterExist(chapterName, comicId) {
  const result = await chapterCollection.findOne({
    name: chapterName,
    comic: comicId,
  });
  return result !== null;
}
function getChapterNumber(chapterName) {
  const regex = /[-+]?\d+(\.\d+)?/;
  const match = chapterName.match(regex);
  if (match) {
    return match[1];
  }
  return chapterName;
}
async function worker({ _id, officeUrl, chapterCount }) {
  const res = await humanoid.get(officeUrl);
  const $ = load(res.body);
  const chapters = [];
  const chapterListSelector = ".col-xs-5.chapter";
  const chapterListElements = $(chapterListSelector);
  if (chapterListElements.length >= Number(chapterCount)) {
    console.log("Chapter count is the same");
  }
  chapterListElements.each((i, chapterListElement) => {
    const chapterList = $(chapterListElement);
    const chapter = {};
    const chapterNameSelector = "a";
    const chapterNameElement = chapterList.find(chapterNameSelector);
    chapter.chapterName = chapterNameElement.text().trim();
    chapter.chapterLink = chapterNameElement.attr("href");

    const chapterTimeElement = chapterList.next();
    chapter.chapterTime = chapterTimeElement.text().trim();
    const chapterViewElement = chapterList.next().next();
    chapter.chapterView = chapterViewElement.text().trim().replace(".", "");
    chapters.push(chapter);
  });

  for (let i = chapters.length; i >= 1; i--) {
    const chapter = chapters[i - 1];
    const exist = await checkIfChapterExist(chapter.chapterName, _id);
    if (!exist) {
      console.log("Chapter not exist", chapter.chapterName);
      const chapterNumber = getChapterNumber(chapter.chapterName);
      const time = parseTimeAgo(chapter.chapterTime);
      const chapterData = {
        name: chapter.chapterName,
        officeUrl: chapter.chapterLink,
        comic: _id,
        chapterNumber,
        totalViewCount: parseInt(chapter.chapterView),
        createdAt: time,
        updatedAt: time,
        order: i,
        pages: [],
      };
      const newChap = await chapterCollection.insertOne(chapterData);
      console.log("Inserted chapter ", newChap.insertedId);
      updatedComicSet.add(_id + "");
      continue;
    }
  }
}

async function main() {
  await client.connect();
  db = client.db(dbName);
  chapterCollection = db.collection("chapters");
  const aggregateCursor = chapterCollection.aggregate([
    {
      $lookup: {
        from: "comics",
        localField: "comic",
        foreignField: "_id",
        as: "comicInfo",
      },
    },
    {
      $unwind: "$comicInfo",
    },
    {
      $group: {
        _id: "$comic",
        officeUrl: { $first: "$comicInfo.officeUrl" },
        chapterCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 1,
        officeUrl: 1,
        chapterCount: 1,
      },
    },
  ]);
  while (await aggregateCursor.hasNext()) {
    const comic = await aggregateCursor.next();
    queue.add(() => worker(comic));
  }
  await queue.onIdle();
  await reOrder();
  await queue.onIdle();
  await updateUpdatedAt();
}

main().then(() => {
  console.log("Done");
  client.close;
  process.exit(0);
});

async function reOrder() {
  const listUpdatedComic = [...updatedComicSet];
  chapterCollection;
  const aggregationPipeline = [
    {
      $match: {
        comic: { $in: listUpdatedComic },
      },
    },
    {
      $group: {
        _id: "$comic",
        chapters: {
          $push: {
            _id: "$_id",
            chapterNumber: "$chapterNumber",
          },
        },
      },
    },
  ];
  const cursor = chapterCollection.aggregate(aggregationPipeline);
  while (await cursor.hasNext()) {
    const comic = await cursor.next();
    const sortedChapters = comic.chapters.sort(
      (a, b) => a.chapterNumber - b.chapterNumber
    );
    for (let i = 0; i < sortedChapters.length; i++) {
      const chapter = sortedChapters[i];
      queue.add(async () => {
        console.log("Updating chapter ", chapter.chapterNumber, "to", i);
        await chapterCollection.updateOne(
          { _id: chapter._id },
          { $set: { order: i + 1 } }
        );
      });
    }
  }
}

async function updateUpdatedAt() {
  const comicCollection = db.collection("comics");
  const listUpdatedComic = [...updatedComicSet];
  const cursor = comicCollection.find({
    _id: { $in: listUpdatedComic },
  });
  while (await cursor.hasNext()) {
    const comic = await cursor.next();
    const _id = comic._id;
    queue.add(async () => {
      const chapter = await chapterCollection.findOne(
        {
          comic: _id,
        },
        {
          sort: {
            order: -1,
          },
        }
      );
      if (chapter) {
        let time = chapter.createdAt || new Date(2016, 0, 1);

        console.log("Updating updatedAt of comic", _id, "to", time);
        if (!chapter.createdAt) {
          chapterCollection.updateOne(
            { _id: chapter._id },
            { $set: { createdAt: time, updatedAt: time } }
          );
        }
        await comicCollection.updateOne(
          { _id: _id },
          { $set: { updatedAt: time } }
        );
      }
    });
  }
}

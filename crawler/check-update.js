import { Db, MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import PQueue from "p-queue";
import Humanoid from "humanoid-js";
import { load } from "cheerio";
import dayjs from "dayjs";
import UserAgent from "user-agents";
const url =
  "mongodb+srv://huuhoag1412:rzTVm7oCCMjGeOnp@cluster0.qiumshy.mongodb.net/comicDb";
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const queue = new PQueue({ concurrency: 10 });
const dbName = "comicDb";
let db;
let chapterCollection;

const browserPath =
  "C:/Users/laffy/AppData/Local/Thorium/Application/thorium.exe";
const humanoid = new Humanoid();
const userAgent = new UserAgent();
import { appendFileSync } from "fs";
async function checkIfChapterExist(chapterName, comicId) {
  const result = await chapterCollection.findOne({
    name: chapterName,
    comic: comicId,
  });
  return result !== null;
}
function getChapterNumber(chapterName) {
  const regex = /Chapter\s*(\d+(\.\d+)?)/;
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
      appendFileSync("log.txt", newChap.insertedId + "\n");
      continue;
    }
    console.log("Chapter exist", chapter.chapterName);
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
  // print each result
  while (await aggregateCursor.hasNext()) {
    const comic = await aggregateCursor.next();
    queue.add(() => worker(comic));
  }
  await queue.onIdle();
}

function parseTimeAgo(timeAgo) {
  //27/04/22
  // check if it is a date
  const date = timeAgo.split("/");
  if (date.length === 3) {
    const day = parseInt(date[0]);
    const month = parseInt(date[1]) - 1;
    const year = parseInt("20" + date[2]);
    return new Date(year, month, day);
  }
  const time = timeAgo.split(" ");
  const number = parseInt(time[0]);
  const unit = time[1];
  const now = dayjs();
  if (unit === "giây") {
    return now.subtract(number, "second").toDate();
  }
  if (unit === "phút") {
    return now.subtract(number, "minute").toDate();
  }
  if (unit === "giờ") {
    return now.subtract(number, "hour").toDate();
  }
  if (unit === "ngày") {
    return now.subtract(number, "day").toDate();
  }
  if (unit === "tuần") {
    return now.subtract(number, "week").toDate();
  }
  if (unit === "tháng") {
    return now.subtract(number, "month").toDate();
  }
  if (unit === "năm") {
    return now.subtract(number, "year").toDate();
  }
  return 0;
}

main().then(() => {
  console.log("Done");
});

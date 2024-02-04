import { Db, MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import PQueue from "p-queue";
import Humanoid from "humanoid-js";
import { load } from "cheerio";
import dayjs from "dayjs";
import { config } from "dotenv";
config({});
import UserAgent from "user-agents";
const url = process.env.MONGODB_URI;
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const queue = new PQueue({ concurrency: 20 });
const dbName = "comicDb";
let db;
let chapterCollection;

async function updateUpdatedAtOfComics() {
  // updatedAt = first chapter found order by updatedAt
  const comicCollection = db.collection("comics");
  const comicCursor = comicCollection.find({});
  while (await comicCursor.hasNext()) {
    const comic = await comicCursor.next();
    const _id = comic._id;
    queue.add(async () => {
      const chapter = await chapterCollection.findOne(
        {
          comic: _id,
        },
        {
          sort: {
            createdAt: 1,
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

async function main() {
  await client.connect();
  db = client.db(dbName);
  chapterCollection = db.collection("chapters");
  await updateUpdatedAtOfComics();
  await queue.onIdle();
  await client.close();
}

main().then(() => {
  console.log("done");
});

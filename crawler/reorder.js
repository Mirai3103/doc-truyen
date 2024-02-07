import { Db, MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import PQueue from "p-queue";
import dayjs from "dayjs";
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
const queue = new PQueue({ concurrency: 50 });
const dbName = "comicDb";
const regex = /[-+]?\d+(\.\d+)?/;
function getFirstNumberOfString(str) {
  const match = str.match(regex);
  if (match) {
    return parseFloat(match[0]);
  }
  return 0;
}

(async () => {
  const db = client.db(dbName);
  const chapterCollection = db.collection("chapters");
  await client.connect();
  const cursor = chapterCollection.find({
    chapterNumber: null,
  });
  while (await cursor.hasNext()) {
    const chapter = await cursor.next();
    const _id = chapter._id;
    const name = chapter.name;
    const number = getFirstNumberOfString(name);
    queue.add(async () => {
      console.log("Updating chapter", name, "to", number);
      await chapterCollection.updateOne(
        { _id: _id },
        { $set: { chapterNumber: number } }
      );
    });
  }
  await queue.onIdle();
  await reOrder(chapterCollection);
  await queue.onIdle();
  await client.close();
})();
/**
 *
 * @param {import("mongodb").Collection} chapterCollection
 */
async function reOrder(chapterCollection) {
  //find group by comic and set chapter.order by order of chapterNumber
  const aggregationPipeline = [
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

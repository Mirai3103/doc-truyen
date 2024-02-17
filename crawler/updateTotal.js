import { Db, MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import PQueue from "p-queue";
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

let authorCollection;
let tagCollection;
let comicCollection;

async function updateTotalComicsForAuthor(authorId) {
  const totalComics = await comicCollection.countDocuments({
    author: authorId,
  });
  console.log("Total comics for author", authorId, totalComics);
  await authorCollection.updateOne(
    { _id: authorId },
    { $set: { totalComics: totalComics } }
  );
}

async function updateTotalComicsForTag(tagId) {
  const totalComics = await comicCollection.countDocuments({
    $or: [{ category: tagId }, { genres: tagId }],
  });
  console.log("Total comics for tag", tagId, totalComics);
  await tagCollection.updateOne(
    { _id: tagId },
    { $set: { totalComics: totalComics } }
  );
}

(async () => {
  await client.connect();
  const db = client.db(dbName);
  comicCollection = db.collection("comics");
  authorCollection = db.collection("authors");
  tagCollection = db.collection("tags");
  let cursor = tagCollection.find({});
  while (await cursor.hasNext()) {
    const tag = await cursor.next();
    queue.add(() => updateTotalComicsForTag(tag._id));
  }
  cursor = authorCollection.find({});
  while (await cursor.hasNext()) {
    const author = await cursor.next();
    queue.add(() => updateTotalComicsForAuthor(author._id));
  }

  await queue.onIdle();
})().then(() => {
  console.log("Done");
  client.close();
});

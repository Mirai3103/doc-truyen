import fs from "fs";
import { Db, MongoClient, ObjectId } from "mongodb";
import slugify from "slugify";
import dayjs from "dayjs";
import { toSlug } from "./utils";

export enum Status {
  Paused = "Tạm dừng",
  Completed = "Hoàn thành",
  Ongoing = "Đang tiến hành",
  Drop = "Drop",
  NonPublished = "Chưa xuất bản",
}
export enum TagType {
  Category = "category",
  Genre = "genre",
}

const comics = JSON.parse(fs.readFileSync("./comics.json", "utf-8")) as any[];

function parseTimeAgo(timeAgo: string) {
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
const url = "mongodb://localhost:27017";
const client = new MongoClient(url, {
  auth: {
    password: "admin",
    username: "admin",
  },
});
const dbName = "comicDb";
let db: Db;
async function createTagIfNotFound(
  name: string,
  type: TagType = TagType.Genre
) {
  const collection = db.collection("tags");
  const exist = await collection.findOne({
    name: new RegExp(`^${name}$`, "i"),
  });
  if (!exist) {
    const tag: any = {};
    tag.name = name;
    tag.type = type;
    tag.slug = toSlug(name);
    const newTag = await collection.insertOne(tag);
    return newTag.insertedId;
  }
  return exist._id;
}
async function createAuthorIfNotFound(name: string) {
  const collection = db.collection("authors");
  const exist = await collection.findOne({
    name: new RegExp(`^${name}$`, "i"),
  });
  if (!exist) {
    const author: any = {};
    author.name = name;
    author.slug = toSlug(name);
    const newAuthor = await collection.insertOne(author);
    return newAuthor.insertedId;
  }
  return exist._id;
}
const categories = ["Manga", "Manhua", "Manhwa"];
function findCategoryAndTag(genre: string[]) {
  const genreJoin = genre.join(" ").toLowerCase();
  let category =
    categories.find((c) => genreJoin.includes(c.toLowerCase())) ??
    "Đang cập nhật";
  const tag = genre.filter((g) => g.toLowerCase() !== category.toLowerCase());
  return {
    category,
    tag,
  };
}

async function main() {
  await client.connect();
  db = client.db(dbName);
  // list all collections
  const collections = await db.listCollections().toArray();
  console.log("collections", collections, db.databaseName);
  console.log("Connected successfully to server");
  for await (const comic of comics) {
    const newCm: any = {};
    newCm["name"] = comic.title;
    newCm["otherNames"] = [];
    newCm["slug"] = slugify(comic.title, { lower: true });
    newCm["description"] = comic.description;
    newCm["imageCoverUrl"] = comic.image;
    newCm["officeUrl"] = comic.detailLink;
    newCm["status"] =
      comic.status == "Đang tiến hành" ? Status.Ongoing : Status.Completed;
    const { category, tag } = findCategoryAndTag(comic.genres);
    newCm["category"] = new ObjectId(
      await createTagIfNotFound(category, TagType.Category)
    );

    newCm["createdBy"] = new ObjectId("65b7d1fbc3893d0db1996c7e");
    newCm["author"] = new ObjectId(await createAuthorIfNotFound(comic.author));
    newCm["genres"] = [];
    for await (const t of tag) {
      newCm["genres"].push(new ObjectId(await createTagIfNotFound(t)));
    }
    newCm["followCount"] = parseInt(comic.followCount);
    newCm["chapterCount"] = comic.chapters.length;
    newCm["totalViewCount"] = parseInt(comic.viewCount);
    // last update = recent chapter
    const lastChapter = comic.chapters[0];
    const lastChapterTime = parseTimeAgo(lastChapter.chapterTime);
    newCm["updatedAt"] = lastChapterTime;
    const firstChapter = comic.chapters[comic.chapters.length - 1];
    const firstChapterTime = parseTimeAgo(firstChapter.chapterTime);
    newCm["createdAt"] = firstChapterTime;
    // save comic
    const collection = db.collection("comics");
    const newComic = await collection.insertOne(newCm);
    console.log("inserted comic", newComic.insertedId);

    // chapter part
    const chapters: any[] = [];
    for (let i = 0; i < comic.chapters.length; i++) {
      const c = comic.chapters[i];
      const newChapter: any = {};
      newChapter["order"] = comic.chapters.length - i;
      newChapter["name"] = c.chapterName;
      newChapter["chapterNumber"] = getChapterNumber(c.chapterName);
      newChapter["comic"] = new ObjectId(newComic.insertedId);
      newChapter["pages"] = [];
      newChapter["pageCount"] = 0;
      newChapter["createdAt"] = parseTimeAgo(c.chapterTime);
      newChapter["updatedAt"] = parseTimeAgo(c.chapterTime);
      newChapter["officeUrl"] = c.chapterLink;
      newChapter["totalViewCount"] = parseInt(c.chapterView);
      chapters.push(newChapter);
    }
    const chapterCollection = db.collection("chapters");
    const newChapters = await chapterCollection.insertMany(chapters);
  }
}
function getChapterNumber(chapterName: string) {
  // get only number
  const regex = /Chapter (\d+)/;
  const match = chapterName.match(regex);
  if (match) {
    return match[1];
  }
  return chapterName;
}
main().then(() => {
  console.log("done");
  client.close();
});

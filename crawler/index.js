import Humanoid from "humanoid-js";
import { load } from "cheerio";
import { writeFileSync } from "fs";
import UserAgent from "user-agents";
const userAgent = new UserAgent();
import { Db, MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import slugify from "slugify";
import dayjs from "dayjs";
import async from "async";
export var Status;
(function (Status) {
  Status["Paused"] = "T\u1EA1m d\u1EEBng";
  Status["Completed"] = "Hoàn thành";
  Status["Ongoing"] = "Đang tiến hành";
  Status["Drop"] = "Drop";
  Status["NonPublished"] = "Ch\u01B0a xu\u1EA5t b\u1EA3n";
})(Status || (Status = {}));
export var TagType;
(function (TagType) {
  TagType["Category"] = "category";
  TagType["Genre"] = "genre";
})(TagType || (TagType = {}));

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
const url =
  "mongodb+srv://huuhoag1412:rzTVm7oCCMjGeOnp@cluster0.qiumshy.mongodb.net/comicDb";
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const dbName = "truyendb";
let db;

async function createTagIfNotFound(name, type = TagType.Genre) {
  const collection = db.collection("tags");
  const exist = await collection.findOne({
    slug: slugify(name, { lower: true }),
  });
  if (!exist) {
    const tag = {};
    tag.name = name;
    tag.type = type;
    tag.slug = slugify(name, { lower: true });
    const newTag = await collection.insertOne(tag);
    return newTag.insertedId;
  }
  return exist._id;
}
async function createAuthorIfNotFound(name) {
  const collection = db.collection("authors");
  const exist = await collection.findOne({
    slug: slugify(name, { lower: true }),
  });
  if (!exist) {
    const author = {};
    author.name = name;
    author.slug = slugify(name, { lower: true });
    const newAuthor = await collection.insertOne(author);
    return newAuthor.insertedId;
  }
  return exist._id;
}
const categories = ["Manga", "Manhua", "Manhwa"];
function findCategoryAndTag(genre) {
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

async function worker(page = 1) {
  const collection = db.collection("comics");
  const humanoid = new Humanoid();
  const res = await humanoid.get(
    "https://nhattruyento.com/the-loai/manga-241?page=" + page
  );
  console.log(res.statusCode);
  if (res.statusCode !== 200) {
    return;
  }
  const $ = load(res.body);
  const comicCardSelector = "figure.clearfix";
  const comicCardElements = $(comicCardSelector);
  const comics = [];
  for await (const comicCardElement of comicCardElements) {
    const comicCard = $(comicCardElement);
    const comic = {};
    const comicImageSelector = "img.lazy.center";
    const comicImageElement = comicCard.find(comicImageSelector);
    comic.image = comicImageElement.attr("data-original");
    const titleSelector = "figcaption h3";
    const titleElement = comicCard.find(titleSelector);
    comic.title = titleElement.text().trim().replace(/\n/g, " ");

    const existed = await collection.findOne({
      slug: slugify(comic.title, { lower: true }),
    });
    if (existed) {
      continue;
    }

    console.log("got " + comic.title + " at page " + page);
    const detailLinkSelector = "figure.clearfix .image a";
    const detailLinkElement = comicCard.find(detailLinkSelector);
    comic.detailLink = detailLinkElement.attr("href");
    comics.push(comic);
  }
  for (let y = 0; y < comics.length; y++) {
    const comic = comics[y];
    const res = await humanoid.get(comic.detailLink);
    const $ = load(res.body);
    const authorSelector = ".author .col-xs-8";
    const authorElement = $(authorSelector);
    comic.author = authorElement.text().trim();
    const statusSelector = ".status .col-xs-8";
    const statusElement = $(statusSelector);
    comic.status = statusElement.text().trim();
    const genresSelector = ".kind .col-xs-8";
    const genresElement = $(genresSelector);
    comic.genres = genresElement
      .text()
      .trim()
      .split("-")
      .map((genre) => genre.trim());
    const descriptionSelector = ".detail-content p";
    const descriptionElement = $(descriptionSelector);
    comic.description = descriptionElement.text().trim();
    const followCountSelector = ".follow > span";
    const followCountElement = $(followCountSelector);
    comic.followCount = followCountElement
      .text()
      .trim()
      .replace(" Lượt theo dõi", "")
      .replace(".", "");
    const luotXem = $(".name.col-xs-4:contains('Xem')").next();
    comic.viewCount = luotXem.text().trim().replace(".", "");
    const chapters = [];
    const chapterListSelector = ".col-xs-5.chapter";
    const chapterListElements = $(chapterListSelector);
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
    comic.chapters = chapters;
  }
  console.log("start insert page " + page);
  await insert(comics);
  return true;
}
function getChapterNumber(chapterName) {
  const regex = /Chapter\s*(\d+(\.\d+)?)/;
  const match = chapterName.match(regex);
  if (match) {
    return match[1];
  }
  return chapterName;
}
async function insert(comics) {
  const collection = db.collection("comics");
  for await (const comic of comics) {
    const newCm = {};
    newCm["name"] = comic.title;
    // check if comic exist
    const existed = await collection.findOne({
      slug: slugify(comic.title, { lower: true }),
    });
    if (existed) {
      console.log("comic existed ", comic.title);
      continue;
    }

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

    const newComic = await collection.insertOne(newCm);
    console.log("inserted comic ", comic.title);
    // chapter part
    const chapters = [];
    for (let i = 0; i < comic.chapters.length; i++) {
      const c = comic.chapters[i];
      const newChapter = {};
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
async function main() {
  await client.connect();
  db = client.db(dbName);
  console.log("Connected successfully to server");
  // 1 -> 10
  const pages = new Array(20).fill(0).map((_, i) => i + 1);
  const limit = 4;
  await async.eachLimit(pages, limit, async (page) => {
    console.warn("start page " + page);
    return await worker(page);
  });
}

main().then(() => {
  console.log("done");
  client.close();
});

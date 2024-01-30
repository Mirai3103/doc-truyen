import { Db, MongoClient, ObjectId } from "mongodb";
import axios from "axios";
import fetch from "node-fetch";
import Humanoid from "humanoid-js";
import { load } from "cheerio";
import { writeFileSync } from "fs";
import async from "async";
import puppeteer from "puppeteer";
import UserAgent from "user-agents";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url, {
    auth: {
        password: "admin",
        username: "admin",
    },
});
const dbName = "comicDb";
let db;
const humanoid = new Humanoid();
async function main() {
    db = client.db(dbName);
    const chaptersCollection = db.collection("chapters");
    //get streamed  documents one by one
    const cursor = chaptersCollection.find({});
    while (await cursor.hasNext()) {
        const chapter = await cursor.next();
        await crawlChapterDetailAndUpdate(chapter);
    }
}

const userAgent = new UserAgent();
const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
page.setUserAgent(userAgent.toString());
async function makeRequest(url) {
    await page.goto(url);
    await page.setViewport({ width: 1080, height: 1024 });
    const searchResultSelector = ".reading-detail.box_doc >.page-chapter > img";
    await page.waitForSelector(searchResultSelector);
    const listUrl = await page.evaluate(() => {
        const elements = document.querySelectorAll(".reading-detail.box_doc >.page-chapter > img");
        const list = [];
        for (let i = 0; i < elements.length; i++) {
            let src = elements[i].getAttribute("data-original");
            src = src.startsWith("//") ? "https:" + src : src;
            list.push(src);
        }
        return list;
    });
    return listUrl;
}

async function crawlChapterDetailAndUpdate(chapter) {
    try {
        if (chapter.pages.length > 0) {
            console.log("Skip chapter", chapter._id);
            return;
        }
        const listUrl = await makeRequest(chapter.officeUrl);
        let chapterImages = [];
        listUrl.map((url, index) => {
            const page = {};
            page.url = url;
            page.order = index + 1;
            page._id = new ObjectId();
            chapterImages.push(page);
        });
        chapter.pages = chapterImages;
        const chaptersCollection = db.collection("chapters");
        await chaptersCollection.updateOne({ _id: chapter._id }, { $set: { pages: chapterImages } });
        console.log("Updated chapter", chapter._id, chapterImages);
    } catch (error) {
        console.log(error);
    }
}

main().then(() => {
    console.log("Done");
    client.close();
    browser.close();
});

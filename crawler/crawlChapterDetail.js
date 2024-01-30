import { Db, MongoClient, ObjectId } from "mongodb";
import axios from "axios";
import fetch from "node-fetch";
import Humanoid from "humanoid-js";
import { load } from "cheerio";
import { writeFileSync } from "fs";
import UserAgent from "user-agents";

const userAgent = new UserAgent();
import async from "async";
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
async function makeRequest(url) {
    const res = await humanoid.get(url, undefined, {
        headers: {
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/jxl,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "max-age=0",
            "sec-ch-ua": '"Chromium";v="119", "Not?A_Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            Referer: "https://nhattruyento.com/truyen-tranh/flying-witch-4416",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            "User-Agent": userAgent.toString(),
        },
    });
    const html = res.body;
    console.log(html);
    process.exit(0);
    return html;
}

async function crawlChapterDetailAndUpdate(chapter) {
    try {
        if (chapter.pages.length > 0) {
            return;
        }
        const html = await makeRequest(chapter.officeUrl);
        const $ = load(html);
        const chapterImageSelector = ".reading-detail.box_doc >.page-chapter > img";
        const chapterImageElements = $(chapterImageSelector);

        const chapterImages = [];
        chapterImageElements.each((i, chapterImageElement) => {
            const page = {};
            let url = $(chapterImageElement).attr("data-original");
            url = url.startsWith("//") ? "https:" + url : url;
            page.url = url;
            page.order = i;
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
});

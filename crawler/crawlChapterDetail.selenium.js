import { Db, MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import PQueue from "p-queue";
import Humanoid from "humanoid-js";

import puppeteer from "puppeteer";
import UserAgent from "user-agents";
const url = "mongodb+srv://huuhoag1412:rzTVm7oCCMjGeOnp@cluster0.qiumshy.mongodb.net/comicDb";
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
const browserPath = "C:/Users/laffy/AppData/Local/Thorium/Application/thorium.exe";
const humanoid = new Humanoid();
const userAgent = new UserAgent();
let browser = await puppeteer.launch({ headless: "new", executablePath: browserPath });
let count = 0;
async function main() {
    await client.connect();
    db = client.db(dbName);
    const chaptersCollection = db.collection("chapters");
    //get streamed  documents one by one
    const cursor = chaptersCollection.find({
        pages: [],
    });
    console.log("Found ", await chaptersCollection.countDocuments({ pages: [] }), " chapters");

    let listPromise = [];
    while (await cursor.hasNext()) {
        // if (listPromise.length == 20) {
        //     await Promise.all(listPromise);
        //     browser.close();
        //     browser = await puppeteer.launch({ headless: "new", executablePath: browserPath });
        //     count = 0;
        //     listPromise = [];
        // }
        const chapter = await cursor.next();
        queue.add(() => crawlChapterDetailAndUpdate(chapter));
    }
    await queue.onIdle();
}

async function makeRequest(url) {
    count++;
    const page = await browser.newPage();
    try {
        page.setUserAgent(userAgent.toString());
        await page.setRequestInterception(true);
        page.on("request", (request) => {
            if (["image", "stylesheet", "font", "script"].indexOf(request.resourceType()) !== -1) {
                request.abort();
            } else {
                request.continue();
            }
        });
        await page.goto(url, { waitUntil: "networkidle2" });
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
        await page.close();

        return listUrl;
    } catch (error) {
        console.error(error);
        // await page.screenshot({ path: `error/${randomUUID()}.png` });
        await page.close();
        return [];
    }
}

async function crawlChapterDetailAndUpdate(chapter) {
    try {
        if (chapter.pages.length > 0) {
            console.log("Skip chapter", chapter._id);
            return;
        }
        const listUrl = await makeRequest(chapter.officeUrl);
        if (listUrl.length == 0) {
            throw new Error("Cannot crawl chapter");
        }
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
        console.log("Updated chapter", chapter._id, "with", chapterImages.length, "pages");
    } catch (error) {}
}

main().then(() => {
    console.log("Done");
    client.close();
    browser.close();
});

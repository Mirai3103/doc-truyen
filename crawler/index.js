const axios = require("axios");
const fetch = require("node-fetch");
const Humanoid = require("humanoid-js");
const { load } = require("cheerio");
const { writeFileSync } = require("fs");
async function main() {
    const humanoid = new Humanoid();
    const res = await humanoid.get("https://nhattruyento.com/the-loai/manga-241?page=1");
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
        comic.followCount = followCountElement.text().trim().replace(" Lượt theo dõi", "").replace(".", "");
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
    writeFileSync("comics.json", JSON.stringify(comics, null, 2));
}

main();

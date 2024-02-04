import puppeteer from "puppeteer";
import UserAgent from "user-agents";
import { config } from "dotenv";
config({});
const userAgent = new UserAgent();
(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  page.setUserAgent(userAgent.toString());
  // Navigate the page to a URL
  await page.goto(
    "https://nhattruyento.com/truyen-tranh/tro-choi-nay-cung-qua-chan-that-roi/chap-70/1100173"
  );

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });
  await page.screenshot({ path: "image.png" });

  // Wait and click on first result
  const searchResultSelector = ".reading-detail.box_doc >.page-chapter > img";
  await page.waitForSelector(searchResultSelector);
  const listUrl = await page.evaluate(() => {
    const elements = document.querySelectorAll(
      ".reading-detail.box_doc >.page-chapter > img"
    );
    const list = [];
    for (let i = 0; i < elements.length; i++) {
      let src = elements[i].getAttribute("data-original");
      src = src.startsWith("//") ? "https:" + src : src;
      list.push(src);
    }
    return list;
  });
  console.log(listUrl);

  // Print the html content

  await browser.close();
})();

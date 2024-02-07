import fs from "fs";
import fetch from "node-fetch";
fetch(
  "https://p2.ntcdntempv26.com/content/image.jpg?data=/QpwGEwSMI3E0iaRIgDkLm1LcUJJ1kUuhoACJr231lQLJurm8KigS6o2hELDlvoPxkwL9Jd4ujVwRgkH6ssiY1PGY13nfk8PT8yoN7TPo1QzbPoysS/RkoxIOjLlmysl",
  {
    headers: {
      accept:
        "image/jxl,image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "image",
      "sec-fetch-mode": "no-cors",
      "sec-fetch-site": "cross-site",
    },
    referrer: "https://nhattruyento.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "omit",
  }
).then(async (res) => {
  const dest = fs.createWriteStream("image.jpg");
  res.body.pipe(dest);
  console.log(await res.text());
});

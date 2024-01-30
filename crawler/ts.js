import Humanoid from "humanoid-js";
import UserAgent from "user-agents";
const humanoid = new Humanoid();
const userAgent = new UserAgent();
humanoid
    .get("https://nettruyenco.vn/truyen-tranh/sieu-cap-than-co-nhan/chapter-220/757361", undefined, {
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
    })
    .then((res) => {
        console.log(res.body);
    });

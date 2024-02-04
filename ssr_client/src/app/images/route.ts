import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
// this is nextjs 13 route api
export async function GET(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const query = url.searchParams;
  let imageUrl = query.get("url");
  if (!imageUrl) {
    imageUrl = "https://placewaifu.com/image/1000/3000";
  }
  const res = await axios(imageUrl, {
    headers: {
      "sec-ch-ua": '"Chromium";v="119", "Not?A_Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      Referer: "https://nhattruyento.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    responseType: "stream",
    method: "GET",
  });
  const contentType = res.headers["content-type"];
  const contentLength = res.headers["content-length"];
  const headers = {
    "Content-Type": contentType,
    "Content-Length": contentLength,
  };
  return new Response(res.data, { headers });
}

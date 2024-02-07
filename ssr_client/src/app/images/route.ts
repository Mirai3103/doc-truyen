import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import fetch from "node-fetch";
import { Readable } from "node:stream";
// this is nextjs 13 route api

export async function GET(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const query = url.searchParams;
  let imageUrl = query.get("url");
  if (!imageUrl) {
    imageUrl = "https://placewaifu.com/image/1000/3000";
  }
  const res = await fetch(imageUrl, {
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
    Referrer: "https://nhattruyento.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "no-cors",
    credentials: "omit",
  } as any);
  if (res.headers.get("content-type")?.includes("text")) {
    return new Response("Image not found", {
      status: 404,
    });
  }
  return new Response(res.body as any, {
    headers: {
      ...res.headers,
    },
  });
}

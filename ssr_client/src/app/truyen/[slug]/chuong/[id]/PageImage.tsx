"use client";
import { Image } from "@nextui-org/react";
import React from "react";

export default function PageImage({ url }: { url: string }) {
  const [localUrl, setLocalUrl] = React.useState("/images?url=" + url);
  const onError = () => {
    if (!localUrl.startsWith("https://placewaifu.com/")) {
      setLocalUrl("https://placewaifu.com/image/1000/2000");
    }
  };

  return (
    <Image
      classNames={{
        wrapper: "border-none ",
      }}
      loading="lazy"
      src={localUrl}
      onError={onError}
      alt=""
    />
  );
}

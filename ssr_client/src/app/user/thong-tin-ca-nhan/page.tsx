"use client";
import { Button, Card, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import Bread from "./BreadCrumbs";
export default function Page() {
    const [file, setFile] = React.useState<Blob | null>(null);
    return (
        <div>
            <Bread />
            <h1 className="text-xl lg:text-2xl font-semibold  my-4 ml-0 lg:pl-2">Thông tin cá nhân</h1>
            <div className="flex lg:mx-8">
                <Card isFooterBlurred radius="lg" className="border-none">
                    <input hidden type="file" id="avatar" />
                    <Image
                        alt="Woman listing to music"
                        className="object-cover"
                        height={200}
                        src="https://cdn.discordapp.com/attachments/745580405088059442/1201073491215130654/facebookanon.png?ex=65c87ddb&is=65b608db&hm=c7610c7ab6b52d92f1dc0efc6f7fd1136d00dfab46777b1d0d5917b9555287eb&"
                        width={200}
                    />
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                        <p className="text-tiny text-white/80">Ảnh đại diện</p>
                        <Button color="primary" radius="lg" size="sm">
                            Lưu ảnh
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

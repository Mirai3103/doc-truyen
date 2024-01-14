import { Comic } from "@/gql/generated/graphql";
import { Card, CardBody, CardFooter, CardHeader, Chip, Image } from "@nextui-org/react";
import Link from "next/link";
import { Tooltip } from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/navigation";
interface ComicCardProps {
    comic: Comic;
    classNames?: {
        img?: string;
    };
    width?: number;
}
export default function ComicCard({ comic, classNames, width }: ComicCardProps) {
    const router = useRouter();
    return (
        <Card
            isHoverable
            className="max-w-full my-4"
            radius="none"
            shadow="sm"
            isPressable
            as={Link}
            href={`/truyen/${comic.slug}`}
            onPress={() => console.log("item pressed")}
        >
            <CardHeader className="absolute z-20 -left-1 -top-1 flex-col items-start">
                <Chip
                    size="sm"
                    color="primary"
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/truyen/${comic.slug}/chuong/${comic.recentChapter?._id}`);
                    }}
                >
                    {comic.recentChapter ? "Chương " + comic.recentChapter.chapterNumber : "Mới"}
                </Chip>
            </CardHeader>
            <Image
                shadow="none"
                radius="sm"
                alt={comic.name}
                className="object-contain  h-auto"
                src={comic.imageCoverUrl}
            />
            <CardFooter className=" max-w-full justify-between">
                <Tooltip content={comic.name} placement="top">
                    <div className="line-clamp-2  leading-5 font-semibold">
                        {comic.name}
                        <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                    </div>
                </Tooltip>
            </CardFooter>
        </Card>
    );
}

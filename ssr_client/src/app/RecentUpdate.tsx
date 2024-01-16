"use client";
import { Comic } from "@/gql/generated/graphql";
import React from "react";
import ComicCard from "@/components/ComicCard";
import { Button, Link } from "@nextui-org/react";
interface HeroProps {
    items: Comic[];
}

export default function RecentUpdate({ items }: HeroProps) {
    return (
        <>
            <div className="flex gap-x-4 mb-4">
                <div className="w-unit-sm  bg-primary-400"></div>
                <div className="flex-1 text-2xl font-semibold text-primary-400">Truyện mới cập nhật</div>
            </div>

            <div className="grid grid-cols-2 sm:gap-x-2 xl:gap-x-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-2">
                {items.map((item) => (
                    <ComicCard comic={item} key={item._id} />
                ))}
            </div>
            <div className=" mt-4 flex justify-center items-center">
                <Button as={Link} href="/truyen-moi-cap-nhat" color="primary">
                    Xem thêm
                </Button>
            </div>
        </>
    );
}

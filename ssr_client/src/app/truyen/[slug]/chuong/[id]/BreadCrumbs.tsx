"use client";
import { Chapter, Comic } from "@/gql/generated/graphql";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import React from "react";
import { useIsClient } from "usehooks-ts";
interface Props {
    comic: Comic;
    chapter: Chapter;
}

export default function Bread({ comic, chapter }: Props) {
    const isClient = useIsClient();
    React.useEffect(() => {
        if (isClient) {
            const readHistory = localStorage.getItem("readHistory");
            const history: string[] = readHistory ? JSON.parse(readHistory) : [];
            const historySet = new Set(history);
            historySet.add(chapter._id);
            localStorage.setItem("readHistory", JSON.stringify(Array.from(historySet)));
        }
    }, [chapter._id, isClient]);
    return (
        <Breadcrumbs size="lg">
            <BreadcrumbItem href="/">Trang chủ</BreadcrumbItem>
            <BreadcrumbItem>{comic.category?.name}</BreadcrumbItem>
            <BreadcrumbItem href={`/truyen/${comic.slug}`}>{comic.name}</BreadcrumbItem>
            <BreadcrumbItem>{`Chương ${chapter.chapterNumber} - ${chapter.name}`}</BreadcrumbItem>
        </Breadcrumbs>
    );
}

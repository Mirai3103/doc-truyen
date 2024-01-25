"use client";
import { Chapter, Comic } from "@/gql/generated/graphql";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import React from "react";
interface Props {
    comic: Comic;
    chapter: Chapter;
}
export default function Bread({ comic, chapter }: Props) {
    return (
        <Breadcrumbs size="lg">
            <BreadcrumbItem href="/">Trang chủ</BreadcrumbItem>
            <BreadcrumbItem>{comic.category?.name}</BreadcrumbItem>
            <BreadcrumbItem href={`/truyen/${comic.slug}`}>{comic.name}</BreadcrumbItem>
            <BreadcrumbItem>{`Chương ${chapter.chapterNumber} - ${chapter.name}`}</BreadcrumbItem>
        </Breadcrumbs>
    );
}

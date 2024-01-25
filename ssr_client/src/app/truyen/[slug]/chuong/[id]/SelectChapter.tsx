"use client";

import { graphql } from "@/gql/generated";
import { Chapter } from "@/gql/generated/graphql";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
    comicSlug: string;
    currentChapterId: string;
    allChapters: Chapter[];
}

export default function SelectChapter({ comicSlug, currentChapterId, allChapters }: Props) {
    const hasNextChapter = allChapters.findIndex((chapter) => chapter._id === currentChapterId) > 0;
    const hasPreviousChapter =
        allChapters.findIndex((chapter) => chapter._id === currentChapterId) < allChapters.length - 1;
    const router = useRouter();
    function handleNextChapter() {
        const index = allChapters.findIndex((chapter) => chapter._id === currentChapterId);
        router.push(`/truyen/${comicSlug}/chuong/${allChapters[index - 1]._id}`);
    }
    function handlePreviousChapter() {
        const index = allChapters.findIndex((chapter) => chapter._id === currentChapterId);
        router.push(`/truyen/${comicSlug}/chuong/${allChapters[index + 1]._id}`);
    }
    return (
        <div className="flex pt-unit-sm items-center gap-x-unit-sm justify-center">
            <Button
                size="lg"
                className="min-w-unit-0"
                color="primary"
                isDisabled={!hasPreviousChapter}
                onClick={handlePreviousChapter}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </Button>
            <Autocomplete
                defaultSelectedKey={currentChapterId}
                labelPlacement="inside"
                size="sm"
                label="Danh sách chương"
                className="max-w-xs"
            >
                {allChapters.map((chapter) => (
                    <AutocompleteItem
                        key={chapter._id}
                        value={chapter._id}
                        onChange={(e) => {
                            console.log("onChange", e);
                        }}
                        href={`/truyen/${comicSlug}/chuong/${chapter._id}`}
                    >
                        {`Chương ${chapter.chapterNumber} - ${chapter.name}`}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
            <Button
                size="lg"
                className="min-w-unit-0"
                color="primary"
                isDisabled={!hasNextChapter}
                onClick={handleNextChapter}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </Button>
        </div>
    );
}

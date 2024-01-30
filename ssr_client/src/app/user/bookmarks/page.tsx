import React from "react";
import Bread from "./BreadCrumbs";
import BookmarkView from "./BookmarkView";

export default function Page() {
    return (
        <div className="flex flex-col gap-4">
            <Bread />
            <h1 className="text-2xl lg:text-3xl font-bold  lg:pl-8">Truyện đang theo dõi</h1>
            <BookmarkView />
        </div>
    );
}

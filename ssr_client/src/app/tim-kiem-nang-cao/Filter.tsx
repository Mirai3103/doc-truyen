"use client";

import React from "react";
import { Accordion, AccordionItem, Button, ButtonGroup, Chip, Input, Select, SelectItem } from "@nextui-org/react";

const categories = [
    {
        _id: "1",
        name: "Manga",
    },
    {
        _id: "2",
        name: "Manhua",
    },
    {
        _id: "3",
        name: "Manhwa",
    },
    {
        _id: "4",
        name: "Comic",
    },
];
const tags = [
    {
        _id: "1",
        name: "Action",
    },
    {
        _id: "2",
        name: "Adventure",
    },
    {
        _id: "3",
        name: "Comedy",
    },
    {
        _id: "4",
        name: "Drama",
    },
    {
        _id: "5",
        name: "Fantasy",
    },
    {
        _id: "6",
        name: "Horror",
    },
    {
        _id: "7",
        name: "Mystery",
    },
    {
        _id: "8",
        name: "Psychological",
    },
    {
        _id: "9",
        name: "Romance",
    },
    {
        _id: "10",
        name: "Sci-fi",
    },
    {
        _id: "11",
        name: "Slice of life",
    },
    {
        _id: "12",
        name: "Supernatural",
    },
    {
        _id: "13",
        name: "Tragedy",
    },
];

const authors = [
    {
        _id: "1",
        name: "Author 1",
    },
    {
        _id: "2",
        name: "Author 2",
    },
    {
        _id: "3",
        name: "Author 3",
    },
    {
        _id: "4",
        name: "Author 4",
    },
    {
        _id: "5",
        name: "Author 5",
    },
    {
        _id: "6",
        name: "Author 6",
    },
    {
        _id: "7",
        name: "Author 7",
    },
    {
        _id: "8",
        name: "Author 8",
    },
    {
        _id: "9",
        name: "Author 9",
    },
    {
        _id: "10",
        name: "Author 10",
    },
    {
        _id: "11",
        name: "Author 11",
    },
    {
        _id: "12",
        name: "Author 12",
    },
    {
        _id: "13",
        name: "Author 13",
    },
];
const statuses = ["Đang tiến hành", "Đã hoàn thành", "Đã dừng", "Tạm ngưng", "Chưa biết"].map((item) => ({
    _id: item,
    name: item,
}));

const sortOptions = [
    "Mới nhất",
    "Cũ nhất",
    "Tên A-Z",
    "Tên Z-A",
    "Ngày đăng mới nhất",
    "Ngày đăng cũ nhất",
    "Ngày cập nhật mới nhất",
];
export default function Filter() {
    return (
        <Accordion variant="shadow" defaultExpandedKeys={["1"]}>
            <AccordionItem
                key={"1"}
                className=""
                title={
                    <div className="flex items-center ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                            />
                        </svg>
                        <div className="ml-2">Bộ lọc</div>
                    </div>
                }
            >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 py-unit-lg">
                    <div>
                        <Input
                            label="Từ khóa"
                            labelPlacement="outside"
                            placeholder="Nhập từ khóa"
                            size="lg"
                            startContent={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className={"w-6 h-6"}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                    />
                                </svg>
                            }
                            type="search"
                        />
                    </div>
                    <div>
                        <Select
                            items={categories}
                            label="Thể loại"
                            variant="bordered"
                            isMultiline={true}
                            selectionMode="multiple"
                            placeholder="Có bất kì thể loại nào trong danh sách"
                            labelPlacement="outside"
                            classNames={{
                                trigger: "min-h-unit-12 py-2",
                            }}
                            renderValue={(items) => {
                                return (
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((item) => (
                                            <Chip key={item.key}>{item.textValue}</Chip>
                                        ))}
                                    </div>
                                );
                            }}
                        >
                            {(category) => (
                                <SelectItem key={category._id} textValue={category.name}>
                                    <span className="text-small">{category.name}</span>
                                </SelectItem>
                            )}
                        </Select>
                    </div>
                    <div>
                        <Select
                            items={tags}
                            label="Tag"
                            variant="bordered"
                            isMultiline={true}
                            selectionMode="multiple"
                            placeholder="Có tất cả các tag trong danh sách"
                            labelPlacement="outside"
                            classNames={{
                                trigger: "min-h-unit-12 py-2",
                            }}
                            renderValue={(items) => {
                                return (
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((item) => (
                                            <Chip key={item.key}>{item.textValue}</Chip>
                                        ))}
                                    </div>
                                );
                            }}
                        >
                            {(tag) => (
                                <SelectItem key={tag._id} textValue={tag.name}>
                                    <span className="text-small">{tag.name}</span>
                                </SelectItem>
                            )}
                        </Select>
                    </div>
                    <div>
                        <Select
                            items={authors}
                            label="Tác giả"
                            variant="bordered"
                            isMultiline={true}
                            selectionMode="multiple"
                            placeholder="Có bất kì tác giả trong danh sách"
                            labelPlacement="outside"
                            classNames={{
                                trigger: "min-h-unit-12 py-2",
                            }}
                            renderValue={(items) => {
                                return (
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((item) => (
                                            <Chip key={item.key}>{item.textValue}</Chip>
                                        ))}
                                    </div>
                                );
                            }}
                        >
                            {(author) => (
                                <SelectItem key={author._id} textValue={author.name}>
                                    <span className="text-small">{author.name}</span>
                                </SelectItem>
                            )}
                        </Select>
                    </div>
                    <div>
                        <Select
                            items={statuses}
                            label="Tình trạng"
                            variant="bordered"
                            isMultiline={true}
                            selectionMode="multiple"
                            placeholder="Có bất kì tình trạng nào trong danh sách"
                            labelPlacement="outside"
                            classNames={{
                                trigger: "min-h-unit-12 py-2",
                            }}
                            renderValue={(items) => {
                                return (
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((item) => (
                                            <Chip key={item.key}>{item.textValue}</Chip>
                                        ))}
                                    </div>
                                );
                            }}
                        >
                            {(status) => (
                                <SelectItem key={status._id} textValue={status.name}>
                                    <span className="text-small">{status.name}</span>
                                </SelectItem>
                            )}
                        </Select>
                    </div>
                    <div>
                        <Select
                            label="Sắp xếp"
                            variant="bordered"
                            placeholder="Sắp xếp theo"
                            labelPlacement="outside"
                            classNames={{
                                trigger: "min-h-unit-12 py-2",
                            }}
                        >
                            {sortOptions.map((o) => (
                                <SelectItem key={o} value={o}>
                                    {o}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="md:col-span-2 lg:col-span-3 flex justify-end">
                        <ButtonGroup size="lg">
                            <Button>Xoá lọc</Button>
                            <Button color="primary">Áp dụng</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </AccordionItem>
        </Accordion>
    );
}

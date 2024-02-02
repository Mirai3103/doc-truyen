"use client";
import React, { useState } from "react";
import { graphql } from "@/gql/generated";
import { Chapter, Comic } from "@/gql/generated/graphql";
import { useQuery } from "@apollo/client";
import { clsx } from "clsx";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Input,
  Link,
  SortDescriptor,
} from "@nextui-org/react";
import { toReadbleTime } from "@/core/utils";
import { useRouter } from "next/navigation";
import { useIsClient } from "usehooks-ts";

interface Props {
  comic: Comic;
  chapters: Chapter[];
}

export default function ChapterView({ comic, chapters }: Props) {
  const [readHistory, setReadHistory] = React.useState<string[]>([]);
  const isClient = useIsClient();
  React.useEffect(() => {
    if (isClient) {
      const history = localStorage.getItem("readHistory");
      if (history) {
        setReadHistory(JSON.parse(history));
      }
    }
  }, [isClient]);
  const listChapter = React.useMemo(() => {
    return chapters?.map((chapter) => ({
      ...chapter,
      isReaded: readHistory.includes(chapter?._id),
    }));
  }, [chapters, readHistory]);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });
  const sortedListChapter = React.useMemo(() => {
    return listChapter?.sort((a: any, b: any) => {
      if (sortDescriptor.direction === "ascending") {
        return a[sortDescriptor.column!] > b[sortDescriptor.column!] ? 1 : -1;
      }
      return a[sortDescriptor.column!] < b[sortDescriptor.column!] ? 1 : -1;
    });
  }, [listChapter, sortDescriptor]);
  function handleSortChange(sortDescriptor: SortDescriptor) {
    setSortDescriptor(sortDescriptor);
  }
  return (
    <Table
      topContent={<TopContent />}
      className="mt-unit-xl"
      sortDescriptor={sortDescriptor}
      onSortChange={handleSortChange}
      classNames={{
        wrapper: "max-h-[80vh]",
      }}
      color="default"
      selectionMode="single"
      aria-label="Example table with client async pagination"
    >
      <TableHeader>
        <TableColumn key="order" allowsSorting>
          STT
        </TableColumn>
        <TableColumn key="name">Tên Chương</TableColumn>
        <TableColumn key="createdAt" allowsSorting>
          {" "}
          Ngày đăng
        </TableColumn>
      </TableHeader>
      <TableBody items={sortedListChapter}>
        {(item) => (
          <TableRow
            className="cursor-pointer hover:text-primary-700"
            key={item?.name}
          >
            <TableCell>
              <Link
                color={item.isReaded ? "foreground" : "primary"}
                className={"flex items-center gap-x-2"}
                href={`/truyen/${comic.slug}/chuong/${item?._id}?chuong=${item?.chapterNumber}`}
              >
                <span>{`${item?.order}`} </span>
                {item.isReaded && (
                  <span className="text-primary-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </span>
                )}
              </Link>
            </TableCell>
            <TableCell>
              <Link
                color={item.isReaded ? "foreground" : "primary"}
                href={`/truyen/${comic.slug}/chuong/${item?._id}?chuong=${item?.chapterNumber}`}
              >
                {item?.name}
              </Link>
            </TableCell>
            <TableCell>
              <Link
                color={item.isReaded ? "foreground" : "primary"}
                href={`/truyen/${comic.slug}/chuong/${item?._id}?chuong=${item?.chapterNumber}`}
              >
                {toReadbleTime(item?.createdAt)}
              </Link>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function TopContent() {
  return (
    <div className="w-full flex justify-center">
      <Input
        size="sm"
        startContent={
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
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        }
        isClearable
        className="w-full sm:max-w-[44%]"
        placeholder="Tìm kiếm chương"
      />
    </div>
  );
}

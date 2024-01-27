"use server";
import React from "react";
import Bread from "./BreadCrumbs";
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

export default function page() {
    return (
        <div className="flex flex-col gap-4">
            <Bread />
            <h1 className="text-3xl font-bold  pl-8">Truyện đang theo dõi</h1>
            <Table
                aria-label="Example table with client side pagination"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination isCompact showControls showShadow color="secondary" page={1} total={1} />
                    </div>
                }
                classNames={{
                    wrapper: "min-h-[222px]",
                }}
            >
                <TableHeader>
                    <TableColumn key="name">NAME</TableColumn>
                    <TableColumn key="role">ROLE</TableColumn>
                    <TableColumn key="status">STATUS</TableColumn>
                </TableHeader>
                <TableBody items={[]}>
                    {(item) => <TableRow key={item}>{(columnKey) => <TableCell>{"hello"}</TableCell>}</TableRow>}
                </TableBody>
            </Table>
        </div>
    );
}

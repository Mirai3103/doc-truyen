"use client";
import { Comic } from "@/gql/generated/graphql";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import React from "react";
interface Props {
    comic: Comic;
}
export default function Bread({ comic }: Props) {
    return (
        <Breadcrumbs size="lg">
            <BreadcrumbItem href="/">Trang chủ</BreadcrumbItem>
            <BreadcrumbItem>{comic.category?.name}</BreadcrumbItem>
            <BreadcrumbItem>{comic.name}</BreadcrumbItem>
        </Breadcrumbs>
    );
}

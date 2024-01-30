import { Comic } from "@/gql/generated/graphql";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import React from "react";

export default function Bread() {
    return (
        <Breadcrumbs size="lg">
            <BreadcrumbItem href="/">Trang chủ</BreadcrumbItem>
            <BreadcrumbItem>Cá nhân</BreadcrumbItem>
            <BreadcrumbItem>Thông tin cá nhân</BreadcrumbItem>
        </Breadcrumbs>
    );
}

"use client";
import { getClient } from "@/core/apollo/apolloRsc";
import { advanceSearchHref } from "@/core/utils";
import { graphql } from "@/gql/generated";
import { useQuery } from "@apollo/client";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarItem, Spinner } from "@nextui-org/react";
import Link from "next/link";

export const GetCategoriesQuery = graphql(/* GraphQL */ `
    query GetCategoriesQuery {
        categories: getCategories {
            _id
            name
        }
    }
`);

export default function CategoryNavItem() {
    const { data, loading } = useQuery(GetCategoriesQuery);
    return (
        <Dropdown>
            <NavbarItem>
                <DropdownTrigger>
                    <Button
                        disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                        endContent={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        }
                        radius="sm"
                        variant="light"
                    >
                        Thể loại
                    </Button>
                </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
                itemClasses={{
                    base: "gap-4",
                }}
            >
                {data ? (
                    data.categories.map((category) => (
                        <DropdownItem
                            key={category._id}
                            as={Link}
                            href={advanceSearchHref({
                                categoryIds: [category._id],
                            })}
                        >
                            {category.name}
                        </DropdownItem>
                    ))
                ) : (
                    <DropdownItem>
                        <Spinner />
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}

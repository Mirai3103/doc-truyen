"use client";

import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Input,
    Listbox,
    ListboxItem,
    Image,
    CircularProgress,
} from "@nextui-org/react";
import { graphql } from "@/gql/generated";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import React from "react";
import useDebounceState from "@/hooks/useDebounceState";
import { Comic } from "@/gql/generated/graphql";

const SearchByKeywordQuery = graphql(/* GraphQL */ `
    query SearchByKeyword($keyword: String!, $limit: Float) {
        data: advanceSearchComics(input: { keyword: $keyword, limit: $limit }) {
            _id
            imageThumbUrl
            imageCoverUrl
            name
            slug
            author {
                name
                _id
            }
        }
    }
`);

function SearchIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={className || "w-6 h-6"}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
        </svg>
    );
}

export default function SearchButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // not search util user input

    const { state, setState, debouncedState } = useDebounceState("", 500);
    const { data, loading } = useQuery(SearchByKeywordQuery, { variables: { keyword: debouncedState, limit: 5 } });

    return (
        <>
            <Button variant="flat" onClick={onOpen}>
                <SearchIcon />
            </Button>
            <Modal
                scrollBehavior="inside"
                backdrop="blur"
                size="3xl"
                hideCloseButton
                isOpen={isOpen}
                placement={"center"}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="p-unit-sm">
                                <Input
                                    classNames={{
                                        base: "max-w-full h-10",
                                        mainWrapper: "h-full",
                                        input: "text-small",
                                        inputWrapper:
                                            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                    }}
                                    placeholder="Type to search..."
                                    size="md"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    startContent={<SearchIcon />}
                                    type="search"
                                />
                            </ModalHeader>
                            <ModalBody className="p-unit-sm min-h-unit-6xl">
                                {loading && (
                                    <div className="w-full flex justify-center items-center min-h-unit-5xl">
                                        <CircularProgress size="lg" color="primary" aria-label="Loading..." />
                                    </div>
                                )}
                                {!loading && (
                                    <Listbox
                                        emptyContent="Không có kết quả"
                                        variant="flat"
                                        items={(data?.data || []) as Comic[]}
                                        aria-label="Dynamic Actions"
                                    >
                                        {(item: Comic) => (
                                            <ListboxItem
                                                classNames={{
                                                    title: "text-wrap",
                                                }}
                                                startContent={
                                                    <Image
                                                        className="aspect-[3/4]  w-unit-18 min-w-unit-18 rounded-small"
                                                        alt={"title"}
                                                        src={
                                                            item.imageCoverUrl || "https://placewaifu.com/image/300/400"
                                                        }
                                                    />
                                                }
                                                key={item._id}
                                                description={item.author?.name || ""}
                                            >
                                                {item.name}
                                            </ListboxItem>
                                        )}
                                    </Listbox>
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

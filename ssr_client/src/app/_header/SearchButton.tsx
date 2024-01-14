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
    Spacer,
    Image,
} from "@nextui-org/react";
import { Comic, useSearchByKeywordLazyQuery } from "@/gql/generated/graphql";
import React from "react";
import useDebounceState from "@/hooks/useDebounceState";
const tem: object[] = Array.from({ length: 5 }).map((_, index) => ({ key: index, value: `item ${index})` }));
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
    const [search, { data, loading, error }] = useSearchByKeywordLazyQuery();
    console.log(data);
    React.useEffect(() => {
        if (debouncedState) {
            search({ variables: { keyword: debouncedState, limit: 5 } });
        }
    }, [debouncedState, search]);

    return (
        <>
            <Button variant="flat" onClick={onOpen}>
                <SearchIcon />
            </Button>
            <Modal
                scrollBehavior="inside"
                backdrop="blur"
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
                            <ModalBody className="p-unit-sm">
                                <Listbox variant="flat" items={data?.data || []} aria-label="Dynamic Actions">
                                    {(item: Comic) => (
                                        <ListboxItem
                                            startContent={
                                                <Image
                                                    className="aspect-[3/4] w-unit-18 min-w-unit-18 rounded-small"
                                                    alt={"title"}
                                                    src={item.imageCoverUrl || "https://placewaifu.com/image/300/400"}
                                                />
                                            }
                                            key={item._id}
                                            description={item.author?.name || ""}
                                        >
                                            {item.name}
                                        </ListboxItem>
                                    )}
                                </Listbox>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

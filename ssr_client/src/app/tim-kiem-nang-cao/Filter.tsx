"use client";

import React from "react";
import {
    Accordion,
    AccordionItem,
    Autocomplete,
    AutocompleteItem,
    Button,
    ButtonGroup,
    Chip,
    Input,
    Select,
    SelectItem,
} from "@nextui-org/react";
import {
    AdvanceSearchInput,
    Author,
    ComicStatus,
    GetFilterOptionsQueryQuery,
    SortOption,
    Tag,
} from "@/gql/generated/graphql";
import { SearchAuthorQuery } from "./query";
import useDebounceState from "@/hooks/useDebounceState";
import { useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import filterState from "./filter.state";
import { Controller, useForm } from "react-hook-form";
import useSearchQueryParams from "@/hooks/useSearchQueryParams";

interface FilterProps {
    queryOptions: GetFilterOptionsQueryQuery;
    initialFilter: AdvanceSearchInput;
}
let renderCount = 0;
export default function Filter({ queryOptions, initialFilter }: FilterProps) {
    console.log("render filter", renderCount++);
    const [filter, setFilter] = useRecoilState(filterState);
    const { setSearchQueryParams } = useSearchQueryParams();
    const { state, setState, debouncedState } = useDebounceState("", 1000);
    const { data, loading } = useQuery(SearchAuthorQuery, {
        variables: {
            keyword: debouncedState,
        },
    });
    const [currentSortOption, setCurrentSortOption] = React.useState<string>(queryOptions.sortOptions[0].name);
    const { register, handleSubmit, control, setValue } = useForm<AdvanceSearchInput>({
        defaultValues: {
            ...initialFilter,
        },
    });
    const onSubmit = (data: AdvanceSearchInput) => {
        const newParams = {
            authorIds: data.authorIds || undefined,
            categoryIds: [...(data.categoryIds || [])],
            genreIds: [...(data.genreIds || [])],
            keyword: data.keyword || undefined,
            sortField: data.sortField || undefined,
            sortType: data.sortType || undefined,
            limit: 28,
            page: 1,
        };
        setSearchQueryParams(newParams);
        setFilter({
            isFirstSet: false,
            params: newParams,
        });
    };
    React.useEffect(() => {
        setFilter({
            isFirstSet: true,
            params: initialFilter,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialFilter]);
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
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 py-unit-lg"
                >
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
                            {...register("keyword")}
                        />
                    </div>
                    <div>
                        <Controller
                            control={control}
                            name="categoryIds"
                            render={({ field: { value, onChange } }) => {
                                return (
                                    <Select
                                        items={queryOptions.categories}
                                        label="Thể loại"
                                        selectedKeys={value || []}
                                        variant="bordered"
                                        isMultiline={true}
                                        selectionMode="multiple"
                                        placeholder="Có bất kì thể loại nào trong danh sách"
                                        labelPlacement="outside"
                                        classNames={{
                                            trigger: "min-h-unit-12 py-2",
                                        }}
                                        onSelectionChange={onChange}
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
                                );
                            }}
                        ></Controller>
                    </div>
                    <div>
                        <Controller
                            control={control}
                            name="genreIds"
                            render={({ field: { value, onChange } }) => {
                                return (
                                    <Select
                                        items={queryOptions.tags}
                                        label="Tag"
                                        variant="bordered"
                                        isMultiline={true}
                                        selectionMode="multiple"
                                        placeholder="Có tất cả các tag trong danh sách"
                                        labelPlacement="outside"
                                        classNames={{
                                            trigger: "min-h-unit-12 py-2",
                                        }}
                                        value={value || []}
                                        onSelectionChange={onChange}
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
                                );
                            }}
                        ></Controller>
                    </div>
                    <div>
                        <Autocomplete
                            inputValue={state}
                            isLoading={loading}
                            size="lg"
                            items={data?.searchAuthor.authors || []}
                            label="Tác giả"
                            labelPlacement="outside"
                            placeholder="Bất kì tác giả nào trong danh sách"
                            variant="bordered"
                            onInputChange={setState}
                            {...register("authorIds")}
                        >
                            {(item) => (
                                <AutocompleteItem textValue={item.name} key={item.name}>
                                    {item.name}
                                </AutocompleteItem>
                            )}
                        </Autocomplete>
                    </div>
                    <div>
                        <Select
                            items={queryOptions.statuses}
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
                                <SelectItem key={status.id} textValue={status.name}>
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
                            value={[currentSortOption]}
                            onSelectionChange={(e: any) => {
                                const sortOption = queryOptions.sortOptions.find(
                                    (o) => o.name == ([...e][0] as string)
                                );
                                if (sortOption) {
                                    setValue("sortField", sortOption.value.field);
                                    setValue("sortType", sortOption.value.direction);
                                } else {
                                    setValue("sortField", "createdAt");
                                    setValue("sortType", "desc");
                                }
                                setCurrentSortOption([...e][0] as string);
                            }}
                        >
                            {queryOptions.sortOptions.map((o, i) => (
                                <SelectItem key={o.name} value={i} textValue={o.name}>
                                    {o.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="md:col-span-2 lg:col-span-3 flex justify-end">
                        <ButtonGroup size="lg">
                            <Button>Xoá lọc</Button>
                            <Button type="submit" color="primary">
                                Áp dụng
                            </Button>
                        </ButtonGroup>
                    </div>
                </form>
            </AccordionItem>
        </Accordion>
    );
}

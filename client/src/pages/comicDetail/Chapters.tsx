import { Box, BoxProps, Flex, FlexProps, Input, Skeleton, Title } from "@mantine/core";
import React from "react";

import { Chapter, useGetAllChaptersQuery } from "@/gql/generated/graphql";
import { getDiffStr } from "@/utils/dateUtils";
import { createStyles, rem, ScrollArea, Table } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconFilterOff } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ChaptersProps extends FlexProps {
    comicId: string;
}

export default function Chapters({ comicId, ...props }: ChaptersProps) {
    const { data } = useGetAllChaptersQuery({
        variables: {
            comicId: comicId,
        },
    });

    return (
        <Flex rowGap={"lg"} direction={"column"} className="px-2 md:px-0" {...props}>
            <Title className="more-md:text-3xl" order={2}>
                Danh sách chương
            </Title>
            <TableChapters data={data?.getAllChapters as any} />
        </Flex>
    );
}

const useStyles = createStyles((theme) => ({
    header: {
        position: "sticky",
        top: 0,
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2],
        transition: "box-shadow 150ms ease",
        textTransform: "uppercase",

        "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `${rem(1)} solid ${
                theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[2]
            }`,
        },
    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },
    row: {
        cursor: "pointer",
    },
}));

interface TableChaptersProps {
    data: Chapter[] | undefined;
    skeletonRows?: number;
}

export function TableChapters({ data, skeletonRows = 5 }: TableChaptersProps) {
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);

    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebouncedValue(search, 500);
    const filteredData = React.useMemo(() => {
        if (!data) {
            return null;
        }
        if (!debouncedSearch || debouncedSearch.trim() === "") {
            return data;
        }
        return data.filter((chapter) => {
            return (
                chapter.name!.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                chapter.chapterNumber.toString().includes(debouncedSearch)
            );
        });
    }, [data, debouncedSearch]);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <>
            <Flex columnGap={"lg"} justify={"center"} align="center">
                <Input
                    className="basis-96 shrink"
                    size={"md"}
                    type={"text"}
                    placeholder={"Lọc theo tên chương, số chương"}
                    onChange={onSearchChange}
                    value={search}
                />

                <IconFilterOff className="text-red-300 cursor-pointer" size={"35"} onClick={() => setSearch("")} />
            </Flex>
            <ScrollArea h={800} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                <Table withBorder withColumnBorders striped highlightOnHover verticalSpacing={"sm"} miw={700}>
                    <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                        <tr>
                            <th className="w-1 whitespace-nowrap md:w-auto">
                                <span className="font-bold text-sm more-md:text-lg">Chương</span>
                            </th>
                            <th className="w-1 whitespace-nowrap md:w-auto">
                                <span className="font-bold text-sm more-md:text-lg">Tên chương</span>
                            </th>
                            <th>
                                <span className="font-bold text-sm more-md:text-lg">Ngày đăng</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData
                            ? filteredData.map((chapter) => (
                                  <tr key={chapter._id} className={classes.row}>
                                      <Td className=" text-sm more-md:text-lg">{chapter.chapterNumber}</Td>
                                      <Td className=" text-sm more-md:text-lg">
                                          <Link to={`/chapter/${chapter._id}`}>
                                              {chapter.name || `Chương ${chapter.chapterNumber}`}
                                          </Link>
                                      </Td>
                                      <Td className=" text-sm  more-md:text-lg">{getDiffStr(chapter.createdAt)}</Td>
                                  </tr>
                              ))
                            : Array.from({ length: skeletonRows }, (_, index) => (
                                  <tr key={index}>
                                      <td>
                                          <Skeleton width={50} height={20} />
                                      </td>
                                      <td>
                                          <Skeleton width={50} height={20} />
                                      </td>
                                      <td>
                                          <Skeleton width={100} height={20} />
                                      </td>
                                      <td>
                                          <Skeleton width={100} height={20} />
                                      </td>
                                  </tr>
                              ))}
                    </tbody>
                </Table>
            </ScrollArea>
        </>
    );
}
interface TdProps extends BoxProps {}

function Td({ children, ...props }: TdProps) {
    return (
        <td className="whitespace-nowrap">
            <Box {...props}>{children}</Box>
        </td>
    );
}

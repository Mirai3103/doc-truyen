import { Page, useGetChapterByIdQuery } from "@/gql/generated/graphql";
import { getImageUrl } from "@/utils/imageUtils";
import { Button, Container, Flex, Group, Image, Skeleton } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChapterInfo from "./ChapterInfo";

export default function ChapterPage() {
    const { chapterId } = useParams<{ chapterId: string }>();
    const navigate = useNavigate();
    const { data, loading, error } = useGetChapterByIdQuery({
        variables: {
            chapterId: chapterId + "",
        },
    });
    const sortedPages = React.useMemo(() => {
        return data?.getChapterById?.pages
            ?.map((page: Page) => {
                return {
                    ...page,
                    order: parseInt(page.order + ""),
                };
            })
            .sort((a: Page, b: Page) => a.order - b.order);
    }, [data]);
    React.useEffect(() => {
        if (!chapterId || error) {
            console.error("error", error?.message);
            navigate("/");
        }
    }, [chapterId, error, navigate]);

    return (
        <Container size={"xl"} py="xl">
            <Flex direction={"column"} rowGap="xl">
                {data ? <ChapterInfo chapter={data.getChapterById as any} /> : <ChapterInfo.Skeleton />}

                <Container>
                    <Flex direction={"column"} gap="xl">
                        {sortedPages
                            ? sortedPages.map((page: Page) => (
                                  <Image
                                      radius={"sm"}
                                      key={page.order}
                                      src={getImageUrl(page.url)}
                                      alt={page.order + ""}
                                  />
                              ))
                            : Array.from({ length: 10 }).map((_, index) => (
                                  <Skeleton height={500} width={"100%"} key={index} />
                              ))}
                    </Flex>
                </Container>
            </Flex>
            <Group className="flex mt-20 items-center flex-nowrap justify-center ">
                <Button leftIcon={<IconChevronLeft />} disabled={!data?.getChapterById.previousChapter}>
                    {"Chương trước"}
                </Button>

                <Button rightIcon={<IconChevronRight />} disabled={!data?.getChapterById.nextChapter}>
                    {"Chương sau"}
                </Button>
            </Group>
        </Container>
    );
}

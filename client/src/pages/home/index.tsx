import ComicCard from "@/components/ComicCardWithChapter";
import { useGetRecentComicsQuery } from "@/gql/generated/graphql";
import { Button, Flex, Group, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";
import TopComic from "./TopComic";

const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Home() {
    const [searchParams, setSearchParam] = useSearchParams();
    const page = Number(searchParams.get("page") || 1);
    const { data, loading } = useGetRecentComicsQuery({
        variables: {
            limit: 35,
            page: page,
        },
    });
    const matchesSm = useMediaQuery("(min-width: 640px)");
    const matchesMoreMd = useMediaQuery("(min-width: 768px)");
    const matchesMoreXl = useMediaQuery("(min-width: 1280px)");
    const cardWidth = matchesMoreXl ? 200 : matchesMoreMd ? 180 : matchesSm ? 150 : 180;

    return (
        <Flex w={"100%"} h="100%" direction={"column"} rowGap="sm">
            <TopComic />
            <Flex w={"100%"} direction="column">
                <Title order={1} mt="lg" mb="lg">
                    Truyện mới cập nhật
                </Title>
                <Flex wrap={"wrap"} rowGap="lg" justify={"space-around"}>
                    {loading
                        ? skeleton.map((item) => <ComicCard.Skeleton w={cardWidth} key={item} />)
                        : data?.getRecentComics.map((comic: any) => (
                              <ComicCard w={cardWidth} key={comic._id} comic={comic} />
                          ))}
                </Flex>
                <Group mx={"auto"} mt="lg">
                    <Button
                        leftIcon={<IconChevronLeft />}
                        disabled={page === 1}
                        onClick={() => {
                            setSearchParam(
                                {
                                    page: page - 1 + "",
                                },
                                {
                                    replace: true,
                                }
                            );
                        }}
                    >
                        {"Chương trước"}
                    </Button>

                    <Button rightIcon={<IconChevronRight />} onClick={() => setSearchParam({ page: page + 1 + "" })}>
                        {"Chương sau"}
                    </Button>
                </Group>
            </Flex>
        </Flex>
    );
}

import { Comic, useGetTopComicsQuery } from "@/gql/generated/graphql";
import { BackgroundImage, BackgroundImageProps, Badge, Button, Flex, Title } from "@mantine/core";

import { Carousel } from "@mantine/carousel";
import { Skeleton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
export default function TopComic() {
    const { data, loading, error } = useGetTopComicsQuery();
    const height = 300;
    const matches = useMediaQuery("(min-width: 768px)");
    if (loading) return <Skeleton w={"100%"} mx="auto" h={height} mt={"md"} />;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <Carousel w={"100%"} mx="auto" h={height} mt={"md"} loop withControls={matches} withIndicators={!matches}>
            {data?.getTopComics.map((comic: any) => (
                <Carousel.Slide key={comic._id}>
                    <Item key={comic._id} comic={comic} h={height} />
                </Carousel.Slide>
            ))}
        </Carousel>
    );
}

interface ItemProps extends Omit<BackgroundImageProps, "src"> {
    comic: Comic;
}

function Item({ comic, ...props }: ItemProps) {
    const navigate = useNavigate();
    return (
        <BackgroundImage w={"100%"} pos="relative" h={300} radius="sm" {...props} src={comic.imageThumbUrl}>
            <Button
                variant="white"
                gradient={{ from: "indigo", to: "cyan" }}
                size="md"
                radius="md"
                pos={"absolute"}
                px="lg"
                className="left-3 md:left-10 bottom-6 md:bottom-5"
                onClick={() => navigate(`/chapter/${comic.recentChapter!._id}`)}
            >
                {`Chương ` + comic.recentChapter!.chapterNumber}
            </Button>
            <Badge className="z-10" variant="filled" size="lg" radius="sm" pos={"absolute"} top="10px" right={10}>
                {comic.category?.name || "Manga"}
            </Badge>
            <Flex
                direction={"column"}
                rowGap="lg"
                left={"0"}
                top={"0"}
                pos="absolute"
                w={"100%"}
                className="pt-12 pl-7 md:pt-7 md:pl-28"
                bg={"linear-gradient(180deg, rgba(0,0,0,0.6) 37%, rgba(255,255,255,0.0) 100%)"}
            >
                <Title
                    onClick={() => navigate(`/comic/${comic.slug}`)}
                    m={0}
                    size="lg"
                    maw="80%"
                    className="text-2xl md:text-5xl break-words cursor-pointer hover:underline"
                    order={2}
                    color={"gray.0"}
                >
                    {comic.name}
                </Title>
                <Button
                    mt={"md"}
                    size={"md"}
                    color={"blue.9"}
                    onClick={() => navigate(`/chapter/${comic.recentChapter!._id}`)}
                    uppercase
                    className="font-bold w-36 md:w-52 ml-6 md:ml-0"
                >
                    Đọc ngay
                </Button>
            </Flex>
        </BackgroundImage>
    );
}

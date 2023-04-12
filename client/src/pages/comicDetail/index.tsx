import { useGetComicBySlugQuery } from "@/gql/generated/graphql";
import { getDiffStr } from "@/utils/dateUtils";
import { getImageUrl } from "@/utils/imageUtils";
import {
    BackgroundImage,
    Box,
    Button,
    Flex,
    Group,
    Skeleton,
    Spoiler,
    Title,
    TypographyStylesProvider,
    useMantineTheme,
} from "@mantine/core";
import { IconBookmark } from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Chapters from "./Chapters";
import Tag from "./Tag";

export default function ComicDetail() {
    const params = useParams();
    const { slug } = params;
    const { data, error, loading } = useGetComicBySlugQuery({
        variables: {
            slug: slug as string,
        },
    });
    const { colorScheme } = useMantineTheme();
    const navigate = useNavigate();
    if (error) {
        navigate("comic-not-found");
    }

    return (
        <Flex rowGap={"xl"} direction={"column"} className="rounded-md" mt={"sm"}>
            <Box w={"100%"} bg={colorScheme === "dark" ? "gray.8" : "gray.2"} className="rounded-md pb-6">
                {loading && <Skeleton height={400} width={"100%"} />}
                {!loading && (
                    <BackgroundImage
                        radius={"md"}
                        w={"100%"}
                        h="400px"
                        src={getImageUrl(data!.getComicBySlug.imageThumbUrl)}
                        pos="relative"
                    >
                        <Flex
                            w={"100%"}
                            h="150px"
                            bottom={"0"}
                            left={"0"}
                            pos="absolute"
                            direction={"column-reverse"}
                            bg={"linear-gradient(0deg, rgba(0,0,0,0.7) 47%, rgba(0,0,0,0) 100%)"}
                        >
                            <Box
                                className="hidden more-md:block"
                                w={"calc(100%-112.5px-225px-17px"}
                                ml={112.5 + 225 + 16}
                                p={"xs"}
                            >
                                <Title maw={"80%"} color="gray.1" className="truncate-two-lines" order={1}>
                                    {data!.getComicBySlug.name}
                                </Title>
                                <Title color="gray.1" order={5}>
                                    Tác giả: {data!.getComicBySlug.author.name}
                                </Title>
                            </Box>
                        </Flex>
                    </BackgroundImage>
                )}
                <Flex columnGap={"md"} pos="relative" className="z-20 flex-col more-md:flex-row">
                    {!loading ? (
                        <img
                            className="shadow-lg border rounded-md mt-[-168.5px] more-md:mr-0 mx-auto more-md:ml-[112.5px] w-[225px] h-[337px] object-cover"
                            src={getImageUrl(data!.getComicBySlug.imageCoverUrl) || "no-image.png"}
                            alt={data!.getComicBySlug.name}
                        />
                    ) : (
                        <Skeleton
                            className="shadow-lg border rounded-md mt-[-168.5px] mx-auto more-md:ml-[112.5px] w-[225px] h-[337px] object-cover"
                            height={337}
                            width={225}
                        />
                    )}
                    <div className="more-md:hidden flex flex-col items-center mt-2">
                        <Title maw={"80%"} className="truncate-two-lines text-2xl my-1" order={4}>
                            {!loading ? data!.getComicBySlug.name : <Skeleton height={20} width={"100%"} />}
                        </Title>
                    </div>
                    <Flex direction={"column"} px="xs" py={"sm"} gap="xs" className="ml-2">
                        <Title order={5} className="more-md:hidden block">
                            {!loading ? (
                                <>
                                    Tác giả:{` `}
                                    <Link to={`/author/${data!.getComicBySlug.author.slug}`}>
                                        {data!.getComicBySlug.author.name}
                                    </Link>
                                </>
                            ) : (
                                <Skeleton height={20} width={"100%"} />
                            )}
                        </Title>
                        <Title order={5}>
                            {!loading ? (
                                <>
                                    Loại truyện:{" "}
                                    <Link to={`/category/${data!.getComicBySlug.category?.slug || "manga"}`}>
                                        {data!.getComicBySlug.category?.name || "Manga"}{" "}
                                    </Link>
                                </>
                            ) : (
                                <Skeleton height={20} width={"100%"} />
                            )}
                        </Title>

                        <Title order={5}>
                            {!loading ? (
                                <>Tình trạng: {data!.getComicBySlug.status}</>
                            ) : (
                                <Skeleton height={20} width={"100%"} />
                            )}
                        </Title>
                        <Title order={5}>
                            {!loading ? (
                                <>
                                    {" "}
                                    Người dịch:{" "}
                                    <Link to={`/team/${data!.getComicBySlug.createdBy._id}`}>
                                        {data!.getComicBySlug.createdBy.displayName}
                                    </Link>
                                </>
                            ) : (
                                <Skeleton height={20} width={"100%"} />
                            )}
                        </Title>
                        <Title order={5}>
                            {!loading ? (
                                <>Lần cuối cập nhật: {getDiffStr(data?.getComicBySlug.updatedAt)}</>
                            ) : (
                                <Skeleton height={20} width={"100%"} />
                            )}
                        </Title>
                        <Flex wrap={"wrap"} gap="xs">
                            {!loading ? (
                                <>
                                    {" "}
                                    <Title order={5}>Thể loại: </Title>
                                    {data!.getComicBySlug.genres.map((tag: any) => (
                                        <Tag key={tag.slug} tag={tag} />
                                    ))}
                                </>
                            ) : (
                                <Skeleton height={20} width={"100%"} />
                            )}
                        </Flex>
                    </Flex>
                </Flex>
                <Box pr="lg" className="more-md:ml-[112.5px] ml-4">
                    <Title order={5}>Giới thiệu: </Title>
                    {!loading ? (
                        <Spoiler
                            ml={20}
                            maxHeight={120}
                            showLabel="Hiển thị thêm"
                            hideLabel="Ẩn bớt"
                            transitionDuration={500}
                        >
                            <TypographyStylesProvider mt={"0.5rem"}>
                                <div dangerouslySetInnerHTML={{ __html: data?.getComicBySlug.description || "." }} />
                            </TypographyStylesProvider>
                        </Spoiler>
                    ) : (
                        <Skeleton height={40} width={"100%"} />
                    )}
                </Box>
                <Group position="center" my={"lg"}>
                    <Button miw={170} size={"md"} color={"indigo"}>
                        Đọc chương mới
                    </Button>
                    <Button miw={170} color="violet" size={"md"}>
                        Đọc từ đầu
                    </Button>

                    <Button miw={170} variant={"outline"} size={"md"}>
                        <IconBookmark />
                        Theo dõi
                    </Button>
                </Group>
            </Box>
            {!loading && <Chapters comicId={data?.getComicBySlug._id!} />}
        </Flex>
    );
}

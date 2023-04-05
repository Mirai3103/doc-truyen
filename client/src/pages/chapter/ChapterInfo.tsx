import { Chapter, useGetAllChaptersQuery } from "@/gql/generated/graphql";
import { Button, Flex, FlexProps, Group, Select, Skeleton, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface ChapterInfoProps extends FlexProps {
    chapter: Chapter;
}

function ChapterInfo({ chapter, ...props }: ChapterInfoProps) {
    const { data } = useGetAllChaptersQuery({
        variables: {
            comicId: chapter.comic?._id + "",
        },
    });
    const selectRef = React.useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const matchMd = useMediaQuery("(min-width: 768px)");
    return (
        <Flex direction={"column"} rowGap="sm" align="center" {...props}>
            <Title order={1}>
                <Link to={`/comic/${chapter.comic?.slug}`}>{chapter.comic?.name}</Link>
            </Title>
            <Title order={3}>
                Chương {chapter.chapterNumber} - {chapter.name}
            </Title>
            <Group className="flex items-center flex-nowrap justify-center ">
                <Button size={matchMd ? "md" : "sm"} leftIcon={<IconChevronLeft />} disabled={!chapter.previousChapter}>
                    {matchMd && "Chương trước"}
                </Button>
                {data && (
                    <Select
                        ref={selectRef}
                        placeholder={`Chương ${chapter.chapterNumber} - ${chapter.name}`}
                        searchable
                        nothingFound="Không tìm thấy chương"
                        onChange={(value) => {
                            navigate(`/chapter/${value}`);
                        }}
                        defaultValue={chapter._id + ""}
                        size={matchMd ? "md" : "sm"}
                        className="shrink grow md:w-96"
                        data={
                            data.getAllChapters.map((chapter) => ({
                                label: `Chương ${chapter.chapterNumber} ${chapter.name ? " - " + chapter.name : ""}`,
                                value: chapter._id + "",
                            })) || []
                        }
                    />
                )}
                <Button
                    size={matchMd ? "md" : "sm"}
                    px="2"
                    rightIcon={<IconChevronRight />}
                    disabled={!chapter.nextChapter}
                >
                    {matchMd && "Chương sau"}
                </Button>
            </Group>
        </Flex>
    );
}

const ChapterSkeleton = () => {
    return (
        <Flex direction={"column"} rowGap="sm" align="center">
            <Title order={1}>
                <Skeleton width={200} height={30} />
            </Title>
            <Title order={3}>
                <Skeleton width={200} height={30} />
            </Title>
            <Group className="flex items-center flex-nowrap justify-center ">
                <Skeleton width={300} height={30} />
            </Group>
        </Flex>
    );
};
ChapterInfo.Skeleton = ChapterSkeleton;
export default ChapterInfo;

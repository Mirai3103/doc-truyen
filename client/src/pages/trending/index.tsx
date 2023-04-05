import ComicCard from "@/components/ComicCard";
import { Comic, useGetTrendingComicsQuery } from "@/gql/generated/graphql";
import { Box, Flex, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function TrendingPage() {
    const { data, loading } = useGetTrendingComicsQuery({
        variables: {
            limit: 10,
        },
    });
    return (
        <Box>
            <Section comics={loading ? null : (data?.Newest as any)} label="Truyện mới" to="newest" />
            <Section comics={loading ? null : (data?.TopFollow as any)} label="Top theo dõi" to="followCount" />
            <Section comics={loading ? null : (data?.TopWeek as any)} label="Top tuần" to="topWeek" />
            <Section comics={loading ? null : (data?.TopMonth as any)} label="Top tháng" to="topMonth" />
            <Section comics={loading ? null : (data?.TopYear as any)} label="Top năm" to="topYear" />
        </Box>
    );
}

function Section({ comics, label, to }: { comics: Comic[] | null; label: string; to: string }) {
    const matchesSm = useMediaQuery("(min-width: 640px)");
    const matchesMoreMd = useMediaQuery("(min-width: 768px)");
    const matchesMoreXl = useMediaQuery("(min-width: 1280px)");
    const cardWidth = matchesMoreXl ? 200 : matchesMoreMd ? 150 : matchesSm ? 140 : 120;
    return (
        <Box>
            <Flex justify={"space-between"} mr="md" align="center">
                <Title order={2} mt="lg" mb="lg">
                    {label}
                </Title>
                <Link className="text-lg flex items-center" to={to}>
                    Xem thêm <IconChevronRight />
                </Link>
            </Flex>
            <Flex
                gap={"xs"}
                mx="auto"
                mt={"md"}
                justify={"space-evenly"}
                wrap={"nowrap"}
                className="overflow-x-auto overflow-y-hidden has-scrollbar "
            >
                {comics
                    ? comics.map((comic) => <ComicCard key={comic._id} comic={comic} w={cardWidth} />)
                    : Array.from({ length: 10 }).map((_, index) => <ComicCard.Skeleton w={cardWidth} key={index} />)}
            </Flex>
        </Box>
    );
}

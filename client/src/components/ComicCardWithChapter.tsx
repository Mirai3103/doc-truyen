import { Comic } from "@/gql/generated/graphql";
import { getDiffStr } from "@/utils/dateUtils";
import { getImageUrl } from "@/utils/imageUtils";
import {
    AspectRatio,
    BackgroundImage,
    Badge,
    Box,
    createStyles,
    Flex,
    FlexProps,
    getStylesRef,
    Skeleton,
    Title,
    Tooltip,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    card: {
        [`&:hover .${getStylesRef("image")}`]: {
            transform: "scale(1.03)",
        },
        [`&:hover .${getStylesRef("description")}`]: {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.gray[8] : theme.colors.gray[1],
            transform: "scale(1.03)",
        },
    },

    image: {
        ...theme.fn.cover(),
        ref: getStylesRef("image"),
        backgroundSize: "cover",
        transition: "transform 500ms ease",
        cursor: "pointer",
    },
    description: {
        ref: getStylesRef("description"),
        transition: "transform 500ms ease",
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
    },
}));
interface ComicCardProps extends FlexProps {
    bgh?: string | number;
    comic: Comic;
}
function ComicCardWithChapter({ comic, w = 200, ...props }: ComicCardProps) {
    const { classes, theme } = useStyles();
    const navigate = useNavigate();
    return (
        <Flex
            w={w}
            direction="column"
            className={classes.card}
            onClick={() => navigate(`/chapter/${comic.recentChapter._id}`)}
            {...props}
        >
            <AspectRatio ratio={2 / 3} maw={w} w={w}>
                <BackgroundImage
                    w={"100%"}
                    className={classes.image}
                    pos="relative"
                    h={"100%"}
                    radius="sm"
                    src={getImageUrl(comic.imageCoverUrl) || ""}
                >
                    <Badge variant={"filled"} pos={"absolute"} top="7px" right="7px" color="green" radius="sm">
                        {comic.category?.name || "manga"}
                    </Badge>
                </BackgroundImage>
            </AspectRatio>
            <Box w={"100%"} p={"xs"} className={classes.description}>
                <div className="text-sm font-extralight mb-1">{`Chương ` + comic.recentChapter.chapterNumber}</div>
                <div className="text-sm font-extralight mb-1">{getDiffStr(comic.recentChapter.updatedAt)}</div>

                <Tooltip label={comic.name} withArrow>
                    <Title
                        mt={"xs"}
                        className="truncate-two-lines text-base cursor-pointer hover:underline"
                        weight={"800"}
                        color="indigo"
                        align="center"
                        order={6}
                        size="0.9rem"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/comic/${comic.slug}`);
                        }}
                    >
                        {comic.name}
                    </Title>
                </Tooltip>
                <Title mt={"2px"} weight={"400"} align="center" size={"12px"} order={6}>
                    {comic.author.name}
                </Title>
            </Box>
        </Flex>
    );
}
const ComicCardSkeleton = ({ w = 200, ...props }: FlexProps) => {
    return (
        <Flex w={w} direction="column" pos={"relative"} {...props}>
            <AspectRatio ratio={2 / 3} maw={w} w={w}>
                <Skeleton height="100%" radius="sm" />
            </AspectRatio>
            <Box w={"100%"} p={"xs"} pos={"absolute"} bottom={0} left={0} right={0}>
                <Skeleton height={10} radius="sm" />
                <Skeleton height={10} radius="sm" />
                <Skeleton height={10} radius="sm" />
                <Skeleton height={10} radius="sm" />
            </Box>
        </Flex>
    );
};
ComicCardWithChapter.Skeleton = ComicCardSkeleton;
export default ComicCardWithChapter;

import { Comic } from "@/gql/generated/graphql";
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
        position: "relative",
    },

    image: {
        ...theme.fn.cover(),
        ref: getStylesRef("image"),
        backgroundSize: "cover",
        transition: "transform 500ms ease",
        cursor: "pointer",
    },
}));
interface ComicCardProps extends FlexProps {
    comic: Comic;
}
function ComicCard({ comic, w = 200, ...props }: ComicCardProps) {
    const { classes } = useStyles();
    const navigate = useNavigate();
    return (
        <Flex
            w={w}
            direction="column"
            className={classes.card}
            {...props}
            onClick={() => navigate(`/comic/${comic.slug}`)}
        >
            <AspectRatio ratio={2 / 3} maw={w} w={w}>
                <BackgroundImage
                    w={"100%"}
                    className={classes.image}
                    pos="relative"
                    h={300}
                    radius="sm"
                    src={comic.imageCoverUrl}
                >
                    <Badge variant={"filled"} pos={"absolute"} top="7px" right="7px" color="green" radius="sm">
                        {comic.category?.name || "manga"}
                    </Badge>
                    <Box
                        pos={"absolute"}
                        bottom="0"
                        w={"100%"}
                        py={"xs"}
                        h="80px"
                        bg={"linear-gradient(0deg, rgba(0,0,0,0.7) 47%, rgba(0,0,0,0) 100%)"}
                    ></Box>
                </BackgroundImage>
            </AspectRatio>
            <Box pos={"absolute"} bottom="0" w={"100%"} py={"xs"}>
                <Tooltip label={comic.name} withArrow>
                    <Title
                        className="truncate-two-lines hover:underline"
                        weight={"800"}
                        align="center"
                        order={6}
                        size="0.9rem"
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
                <Skeleton height={300} radius="sm" />
            </AspectRatio>
        </Flex>
    );
};
ComicCard.Skeleton = ComicCardSkeleton;
export default ComicCard;

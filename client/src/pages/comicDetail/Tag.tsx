import { Tag as TagType } from "@/gql/generated/graphql";
import { Badge, BadgeProps, useMantineTheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface Props extends BadgeProps {
    tag: TagType;
}

export default function Tag({ tag, ...props }: Props) {
    const { primaryColor } = useMantineTheme();
    const navigate = useNavigate();
    return (
        <Badge
            {...props}
            variant="filled"
            size={"lg"}
            radius={"md"}
            className="cursor-pointer hover:underline"
            onClick={() => navigate(`/tag/${tag._id}`)}
        >
            {tag.name}
        </Badge>
    );
}

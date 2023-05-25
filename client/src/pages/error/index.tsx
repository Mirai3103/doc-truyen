import { Button, Container, Group, Text, Title, createStyles, rem } from "@mantine/core";
import { useRouteError } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: rem(80),
        paddingBottom: rem(120),
        backgroundColor: theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background,
        height: "100vh",
        width: "100vw",
    },

    label: {
        textAlign: "center",
        fontWeight: 900,
        fontSize: rem(220),
        lineHeight: 1,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
        color: theme.colors[theme.primaryColor][3],

        [theme.fn.smallerThan("sm")]: {
            fontSize: rem(120),
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: "center",
        fontWeight: 900,
        fontSize: rem(38),
        color: theme.white,

        [theme.fn.smallerThan("sm")]: {
            fontSize: rem(32),
        },
    },

    description: {
        maxWidth: rem(540),
        margin: "auto",
        marginTop: theme.spacing.xl,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
        color: theme.colors[theme.primaryColor][1],
    },
}));

export default function ErrorPage(): JSX.Element {
    const { classes } = useStyles();
    const error = useRouteError();
    console.log(error);
    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.label}>503</div>
                <Title className={classes.title}>Server sập</Title>
                <Text size="lg" align="center" className={classes.description}>
                    Có thể là đến giới hạn vì đéo có tiền để host 24/24
                </Text>
                <Group position="center">
                    <Button variant="white" size="md" onClick={() => window.location.reload()}>
                        Refresh the page
                    </Button>
                </Group>
            </Container>
        </div>
    );
}

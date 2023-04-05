import { Button, ButtonProps, Group } from "@mantine/core";

import { DiscordIcon, GithubIcon, TwitterIcon } from "@mantine/ds";

export function FacebookIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="facebook"
            className="svg-inline--fa fa-facebook"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="0.9rem"
            height="0.9rem"
            {...props}
        >
            <path
                fill="currentColor"
                d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.8 90.69 226.4 209.3 245V327.7h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.3 482.4 504 379.8 504 256z"
            />
        </svg>
    );
}
export function GoogleIcon(props: React.ComponentPropsWithoutRef<"svg">) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 256 262"
            width="0.9rem"
            height="0.9rem"
            {...props}
        >
            <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            />
            <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            />
            <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            />
            <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            />
        </svg>
    );
}

export function GoogleButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
    return <Button leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />;
}
export function FacebookButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
    return (
        <Button
            leftIcon={<FacebookIcon />}
            sx={(theme) => ({
                backgroundColor: "#4267B2",
                color: "#fff",
                "&:not([data-disabled]):hover": {
                    backgroundColor: theme.fn.darken("#4267B2", 0.1),
                },
            })}
            {...props}
        />
    );
}

export function DiscordButton(props: ButtonProps) {
    return (
        <Button
            leftIcon={<DiscordIcon size="1rem" />}
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === "dark" ? "#5865F2" : "#5865F2",
                "&:not([data-disabled]):hover": {
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.fn.lighten("#5865F2", 0.05)
                            : theme.fn.darken("#5865F2", 0.05),
                },
            })}
            {...props}
        />
    );
}

// Twitter button as anchor
export function TwitterButton(props: ButtonProps & React.ComponentPropsWithoutRef<"a">) {
    return <Button component="a" leftIcon={<TwitterIcon size="1rem" color="#00ACEE" />} variant="default" {...props} />;
}

export function GithubButton(props: ButtonProps) {
    return (
        <Button
            {...props}
            leftIcon={<GithubIcon size="1rem" />}
            sx={(theme) => ({
                backgroundColor: theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
                color: "#fff",
                "&:hover": {
                    backgroundColor: theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
                },
            })}
        />
    );
}

export function SocialButtons() {
    return (
        <Group position="center" sx={{ padding: 15 }}>
            <GoogleButton>Continue with Google</GoogleButton>
            <TwitterButton href="https://twitter.com/mantinedev" target="_blank">
                Follow on Twitter
            </TwitterButton>
            <FacebookButton>Sign in with Facebook</FacebookButton>
            <GithubButton>Login with GitHub</GithubButton>
            <DiscordButton>Join Discord community</DiscordButton>
        </Group>
    );
}

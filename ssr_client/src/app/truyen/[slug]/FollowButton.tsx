"use client";
import { graphql } from "@/gql/generated";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@nextui-org/react";
import React from "react";
const ToggleFollowComicMutation = graphql(/* GraphQL */ `
    mutation toggleFollowComic($comicId: String!) {
        toggleFollowComic(comicId: $comicId)
    }
`);
const CheckIsFollowComicQuery = graphql(/* GraphQL */ `
    query checkIsFollowComic($comicId: String!) {
        isInFollowedComics(comicId: $comicId)
    }
`);

interface Props {
    comicId: string;
}

export default function FollowButton({ comicId }: Props) {
    const { data, refetch, loading } = useQuery(CheckIsFollowComicQuery, {
        variables: {
            comicId,
        },
    });
    const [mutation] = useMutation(ToggleFollowComicMutation, {
        variables: {
            comicId,
        },
    });
    function handleClicked() {
        mutation().then(() => {
            refetch();
        });
    }
    return (
        <Button
            variant="ghost"
            className="px-0 min-w-0 aspect-square"
            size="lg"
            onClick={handleClicked}
            isLoading={loading}
        >
            {data?.isInFollowedComics ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 text-primary-500 h-6"
                >
                    <path
                        fillRule="evenodd"
                        d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                        clipRule="evenodd"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                </svg>
            )}
        </Button>
    );
}

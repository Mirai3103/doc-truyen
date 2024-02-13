import { graphql } from "@/gql";
import { gqlClient } from "@/utils/request";
import { createFileRoute } from "@tanstack/react-router";

import React from "react";

const GET_AUTHOR_BY_ID_QUERY = graphql(/* GraphQL */ `
  query AuthorById($id: ID!) {
    author(id: $id) {
      _id
      name
      description
      totalComic
    }
  }
`);

export const Route = createFileRoute("/dashboard/authors/$authorId/edit")({
  component: EditAuthor,
  loader: async (props) => {
    const { authorId } = props.params;
    const { author } = await gqlClient.request(GET_AUTHOR_BY_ID_QUERY, {
      id: authorId,
    });
    return {
      author,
    };
  },
  errorComponent: () => <div>not found</div>,
});
function EditAuthor() {
  const post = Route.useLoaderData();
  console.log(post);
  return <div>$authorId.edit.lazy</div>;
}

import "swiper/css";
import "swiper/css/pagination";
import Hero from "./_hero/Hero";
import { graphql } from "@/gql/generated";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { getClient } from "@/core/apollo/apolloRsc";
import { Comic } from "@/gql/generated/graphql";
import RecentUpdate from "./RecentUpdate";
import { Spacer } from "@nextui-org/react";

const GetTopComicsQuery = graphql(/* GraphQL */ `
  query GetTopComics($limit: Float, $page: Float) {
    getTopComics(limit: $limit, page: $page) {
      data {
        _id
        imageCoverUrl
        name
        slug
        recentChapter {
          chapterNumber
          name
          order
          _id
          createdAt
          updatedAt
        }
        category {
          _id
          name
        }
        author {
          name
        }
      }
    }
  }
`);

const GetRecentComicsQuery = graphql(/* GraphQL */ `
  query GetRecentComics($limit: Float, $page: Float) {
    getRecentComics(limit: $limit, page: $page) {
      data {
        _id
        imageCoverUrl
        name
        slug
        recentChapter {
          chapterNumber
          name
          order
          _id
          createdAt
          updatedAt
        }
        category {
          _id
          name
        }
        author {
          name
          _id
        }
      }
    }
  }
`);

interface Props {
  searchParams: {
    [key: string]: string | undefined;
  };
}
export default async function Home({ searchParams }: Props) {
  console.log(searchParams);
  async function fetchData() {
    const query1 = getClient().query({
      query: GetTopComicsQuery,
      variables: { limit: 20, page: 1 },
    });
    const query2 = getClient().query({
      query: GetRecentComicsQuery,
      variables: { limit: 35, page: 1 },
    });
    const [topComic, recentComic] = await Promise.all([query1, query2]);
    return {
      topComic,
      recentComic,
    };
  }
  const { topComic, recentComic } = await fetchData();
  return (
    <div className="py-8">
      <Hero items={(topComic.data.getTopComics.data || []) as Comic[]} />
      <Spacer y={10} />
      <RecentUpdate
        items={(recentComic.data.getRecentComics.data || []) as Comic[]}
      />
    </div>
  );
}

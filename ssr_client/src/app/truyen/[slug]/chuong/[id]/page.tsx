import { getClient } from "@/core/apollo/apolloRsc";
import { graphql } from "@/gql/generated";
import { Image } from "@nextui-org/react";
import Bread from "./BreadCrumbs";
import { Chapter, Comic } from "@/gql/generated/graphql";
import { toReadbleTime } from "@/core/utils";
import SelectChapter from "./SelectChapter";
import { getAccessToken } from "@/core/utils/server.util";
const GetProps = graphql(/* GraphQL */ `
  query GetChapterProps($chapterId: String!, $comicSlug: String!) {
    getChapterById(chapterId: $chapterId) {
      _id
      chapterNumber
      nextChapter {
        chapterNumber
        _id
      }
      previousChapter {
        chapterNumber
        _id
      }
      order
      pages {
        order
        url
      }
      name
      createdAt
    }
    getChaptersByComicSlug(slug: $comicSlug) {
      _id
      chapterNumber
      order
      name
    }
    getComicBySlug(slug: $comicSlug) {
      _id
      slug
      name
      category {
        name
        _id
      }
    }
  }
`);

export default async function DocTruyen({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const { data } = await getClient().query({
    query: GetProps,
    variables: {
      chapterId: params.id,
      comicSlug: params.slug,
    },
  });
  const chapter = data.getChapterById;
  const comic = data.getComicBySlug;

  return (
    <div className="flex flex-col gap-4">
      <Bread comic={comic as Comic} chapter={chapter as Chapter} />
      <h1 className="text-3xl font-bold  pl-8">
        {comic.name} - Chương {chapter.chapterNumber}
        <span className="text-xl  italic font-light">
          {" "}
          [cập nhật {toReadbleTime(chapter.createdAt)}]
        </span>
      </h1>
      <SelectChapter
        allChapters={data.getChaptersByComicSlug as Chapter[]}
        comicSlug={comic.slug}
        currentChapterId={params.id}
      />
      <div className="mx-auto mt-4 flex flex-col gap-6 items-center">
        {chapter.pages?.map((item: any) => (
          <Image
            classNames={{
              wrapper: "border-none",
            }}
            loading="lazy"
            key={item?.url}
            src={"/images?url=" + item?.url}
            alt=""
          />
        ))}
      </div>
    </div>
  );
}

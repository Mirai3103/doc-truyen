import type * as Types from "./schema.types";

export type GetComicsCreatedByUserQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars["Float"]["input"]>;
  page?: Types.InputMaybe<Types.Scalars["Float"]["input"]>;
}>;

export type GetComicsCreatedByUserQuery = {
  getContributedComics: Array<
    Pick<
      Types.Comic,
      | "_id"
      | "slug"
      | "name"
      | "chapterCount"
      | "updatedAt"
      | "followCount"
      | "totalViewCount"
      | "imageCoverUrl"
      | "status"
    > & {
      author: Pick<Types.Author, "name">;
      category?: Types.Maybe<Pick<Types.Tag, "name">>;
      recentChapter?: Types.Maybe<
        Pick<Types.Chapter, "chapterNumber" | "name">
      >;
    }
  >;
};

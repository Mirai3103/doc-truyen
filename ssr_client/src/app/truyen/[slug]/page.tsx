import { getClient } from "@/core/apollo/apolloRsc";
import { graphql } from "@/gql/generated";
import { Button, ButtonGroup, Image, Spacer } from "@nextui-org/react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Bread from "./BreadCrumbs";
import { Comic, Chapter } from "@/gql/generated/graphql";
import ChapterView from "./ChapterView";
import { cookies } from "next/headers";
import { getAccessToken } from "@/core/utils/server.util";
import FollowButton from "./FollowButton";
import { useRouter } from "next/router";
import Link from "next/link";
const GetComicBySlugQuery = graphql(/* GraphQL */ `
    query getComicBySlug($slug: String!) {
        getComicBySlug(slug: $slug) {
            _id
            slug
            artist {
                name
                _id
            }
            author {
                name
                _id
            }
            category {
                name
                _id
            }
            genres {
                name
                _id
            }
            createdAt
            updatedAt
            description
            followCount
            totalViewCount
            imageCoverUrl
            name
            createdBy {
                _id
                description
                avatarUrl
                displayName
            }
            otherNames
            status
            totalViewCount
        }
    }
`);

const GetChaptersByIdQuery = graphql(/* GraphQL */ `
    query getAllChapters($comicId: String!) {
        getAllChapters(comicId: $comicId) {
            _id
            chapterNumber
            createdAt
            order
            name
        }
    }
`);

export default async function ComicPage({ params }: { params: { slug: string } }) {
    console.log(await getAccessToken());
    const { data, loading, error } = await getClient().query({
        query: GetComicBySlugQuery,
        variables: {
            slug: params.slug,
        },
    });

    const { data: chaptersData } = await getClient().query({
        query: GetChaptersByIdQuery,
        variables: {
            comicId: data.getComicBySlug._id,
        },
    });

    return (
        <div className="min-h-[100vh] py-unit-lg px-unit-lg md:px-unit-xl  lg:px-unit-4xl gap-y-unit-lg  flex flex-col bg-default-50 ">
            <Bread comic={data.getComicBySlug as Comic} />
            <div className="flex lg:flex-row flex-col  gap-x-unit-2xl  mt-unit-md">
                <div className="lg:basis-[230px] shrink-0 ">
                    <Image
                        isBlurred
                        classNames={{
                            wrapper: "!max-w-none",
                        }}
                        src={data.getComicBySlug.imageCoverUrl}
                        className="w-full aspect[3/4] mx-auto max-w-[230px] object-cover"
                        alt={data.getComicBySlug.name}
                    />
                </div>
                <div className="flex gap-y-5 flex-col items-start">
                    <h1 className=" drop-shadow-xl text-4xl  text-wrap line-clamp-2 mt-unit-md md:text-5xl font-bold">
                        {data.getComicBySlug.name || data.getComicBySlug.otherNames[0]}
                    </h1>
                    <div
                        className="grid gap-y-2"
                        style={{
                            gridTemplateColumns: "1fr 4fr",
                        }}
                    >
                        <span className="">Tên khác: </span>
                        <span className="ml-unit-md ">
                            {data.getComicBySlug.otherNames.filter((e) => e !== data.getComicBySlug.name).join(", ")}
                        </span>
                        <span className="">Tác giả: </span>
                        <span className="ml-unit-md ">{data.getComicBySlug.author.name}</span>
                        <span className="">Tình trạng: </span>
                        <span className="ml-unit-md">{data.getComicBySlug.status}</span>
                        <span className="">Lượt xem: </span>
                        <span className="ml-unit-md">
                            {new Intl.NumberFormat("vi-VN").format(data.getComicBySlug.totalViewCount)}
                        </span>
                        <span className="">Theo dõi: </span>
                        <span className="ml-unit-md">
                            {new Intl.NumberFormat("vi-VN").format(data.getComicBySlug.followCount!)}
                        </span>
                    </div>
                    <div className="flex gap-x-unit-lg">
                        <ButtonGroup size="lg">
                            <Button
                                color="primary"
                                as={Link}
                                href={`/truyen/${data.getComicBySlug.slug}/chuong/${chaptersData.getAllChapters[0]._id}?chuong=${chaptersData.getAllChapters[0].chapterNumber}`}
                            >
                                Đọc mới nhất
                            </Button>
                            <Button
                                as={Link}
                                href={`/truyen/${data.getComicBySlug.slug}/chuong/${
                                    chaptersData.getAllChapters[chaptersData.getAllChapters.length - 1]._id
                                }?chuong=${
                                    chaptersData.getAllChapters[chaptersData.getAllChapters.length - 1].chapterNumber
                                }`}
                            >
                                Đọc từ đầu
                            </Button>
                        </ButtonGroup>
                        <FollowButton comicId={data.getComicBySlug._id} />
                    </div>
                </div>
            </div>
            <div className="mt-unit-lg ">
                <h2 className="text-3xl font-bold mb-unit-md">Giới thiệu</h2>
                <div
                    className="text-wrap  pl-unit-xl line-clamp-3"
                    dangerouslySetInnerHTML={{
                        __html: data.getComicBySlug.description,
                    }}
                ></div>
            </div>
            <div>
                <h2 className="text-3xl font-bold mb-unit-md">Danh sách chương</h2>
                <ChapterView comic={data.getComicBySlug as Comic} chapters={chaptersData.getAllChapters as Chapter[]} />
            </div>
        </div>
    );
}

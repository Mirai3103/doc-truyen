import { getClient } from "@/core/apollo/apolloRsc";
import { graphql } from "@/gql/generated";
import { Button, ButtonGroup, Image, Spacer } from "@nextui-org/react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Bread from "./BreadCrumbs";
import { Comic } from "@/gql/generated/graphql";
import Chapter from "./Chapter";
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
            imageThumbUrl
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

export default async function ComicPage({ params }: { params: { slug: string } }) {
    const { data, loading, error } = await getClient().query({
        query: GetComicBySlugQuery,
        variables: {
            slug: params.slug,
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
                            <Button color="primary">Đọc mới nhất</Button>
                            <Button>Đọc từ đầu</Button>
                        </ButtonGroup>
                        <Button variant="ghost" className="px-0 min-w-0 aspect-square" size="lg">
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
                        </Button>
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
                <Chapter comic={data.getComicBySlug as Comic} />
            </div>
        </div>
    );
}

import { useGetComicsCreatedByUserQuery } from "@/gql/generated/graphql";
import { useAppSelector } from "@/redux/hook";
import { selectUserProfile } from "@/redux/userSplice";
import { getDiffStr } from "@/utils/dateUtils";
import { getImageUrl } from "@/utils/imageUtils";
import { Button, Flex, Image, Stack, Table, Text, TextInput, Title } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

export default function ComicManage() {
    const user = useAppSelector(selectUserProfile);
    const { data, error, loading } = useGetComicsCreatedByUserQuery({
        variables: {
            userId: user?._id!,
        },
    });
    const navigate = useNavigate();
    return (
        <Stack className="p-2">
            <Flex>
                <Title order={2}>Quản lý truyện của bạn</Title>
                <Link to="/admin/comic-manage/create" className="ml-auto">
                    <Button size="md" color="teal">
                        Tạo truyện mới
                    </Button>
                </Link>
            </Flex>
            <Stack spacing={"lg"}>
                <Flex justify={"center"}>
                    <TextInput className="grow shrink" maw={500} label="Tìm kiếm truyện" placeholder="Theo tên" />
                </Flex>
                <Title order={4} ml={"sm"}>
                    Danh sách truyện đã đăng
                </Title>
                <Table fontSize={"md"} striped highlightOnHover withBorder withColumnBorders>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên </th>
                            <th>Loại</th>
                            <th>
                                <div>Số</div>
                                <div>chương</div>
                            </th>
                            <th>
                                <div>Chương </div>
                                <div>gần nhất</div>
                            </th>
                            <th>Tình trạng</th>
                            <th>
                                <div>Số lượng </div>
                                <div> theo dõi</div>
                            </th>
                            <th>Số views</th>
                            <th>
                                <div>cập nhật</div>
                                <div>gần nhất</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.comics.map((comic, index) => (
                            <tr
                                className="cursor-pointer"
                                key={comic._id}
                                onClick={() => navigate(`/admin/comic-manage/edit/${comic._id}`)}
                            >
                                <td>{index + 1}</td>
                                <td>
                                    <Flex align={"center"} gap={"md"}>
                                        <Image width={100} src={getImageUrl(comic.imageCoverUrl)} />
                                        <Text
                                            className="hover:underline"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/comic/${comic.slug}`);
                                            }}
                                        >
                                            {comic.name}
                                        </Text>
                                    </Flex>
                                </td>
                                <td>{comic.category?.name}</td>
                                <td>{comic.chapterCount}</td>
                                <td>{comic.recentChapter?.chapterNumber}</td>
                                <td>{comic.status}</td>
                                <td>{comic.followCount}</td>
                                <td>{comic.followCount}</td>
                                <td>{getDiffStr(comic.updatedAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Stack>
        </Stack>
    );
}

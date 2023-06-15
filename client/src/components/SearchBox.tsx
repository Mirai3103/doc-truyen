import { Comic, useAdvanceSearchComicsLazyQuery, useAdvanceSearchComicsQuery } from "@/gql/generated/graphql";
import { Autocomplete, Avatar, Group, Loader, MantineColor, SelectItemProps, Text } from "@mantine/core";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import React, { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
    const [keyword, setKeyword] = useState("");
    const [keywordDebounced] = useDebouncedValue(keyword, 500);
    const [search, { data, loading, error }] = useAdvanceSearchComicsLazyQuery();
    React.useEffect(() => {
        if (keywordDebounced.trim().length > 1) {
            search({
                variables: {
                    input: {
                        limit: 5,
                        page: 1,
                        keyword: keywordDebounced,
                    },
                },
            });
        }
    }, [keywordDebounced, search]);
    React.useEffect(() => {
        console.log(data);
    }, [data]);
    const items = React.useMemo(() => {
        if (data?.data) {
            return data.data.map((comic) => ({
                comic,
                value: comic.slug,
                label: comic.name,
            }));
        }
        return [];
    }, [data?.data]);
    const navigate = useNavigate();
    return (
        <Autocomplete
            w={"100%"}
            placeholder="Tìm kiếm"
            icon={loading ? <Loader size="sm" /> : <IconSearch size="1rem" stroke={1.5} />}
            data={items}
            onChange={(value) => setKeyword(value)}
            onItemSubmit={(item) => {
                navigate(`/comic/${item.value}`);
                setKeyword("");
            }}
            enterKeyHint="search"
            value={keyword}
            itemComponent={AutoCompleteComicItem}
        />
    );
}

interface ItemProps extends SelectItemProps {
    comic: Comic;
}

const AutoCompleteComicItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ comic, value, color, ...others }: ItemProps, ref) => {
        return (
            <div ref={ref} {...others}>
                <Group noWrap>
                    <Avatar size={"lg"} src={comic.imageCoverUrl} />

                    <div>
                        <Text>{comic.name}</Text>
                        <Text size="xs" color="dimmed">
                            {comic.author.name}
                        </Text>
                    </div>
                </Group>
            </div>
        );
    }
);

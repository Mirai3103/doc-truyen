import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import queryString from "query-string";
type SearchParamsValue = string | number | boolean | null | undefined | string[] | number[] | boolean[];
export default function useSearchQueryParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const setSearchQueryParams = React.useCallback(
        (params: { [key: string]: SearchParamsValue }) => {
            const currentQueryObject = queryString.parse(searchParams.toString());
            const newQueryObject = { ...currentQueryObject, ...params };
            const newQueryString = queryString.stringify(newQueryObject);
            router.push(`${pathname}?${newQueryString}`);
        },
        [pathname, router, searchParams]
    );
    return { searchParams, setSearchQueryParams };
}

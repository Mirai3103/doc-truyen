import { AdvanceSearchInput } from "@/gql/generated/graphql";
import moment from "moment";
import "moment/locale/vi";
import queryString from "query-string";
export function toReadbleTime(time: Date) {
    moment.locale("vi");

    return moment(time).fromNow();
}

export function advanceSearchHref(advanceSearchInput: AdvanceSearchInput) {
    const query = queryString.stringify(advanceSearchInput);

    return `/tim-kiem-nang-cao?${query}`;
}

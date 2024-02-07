import { AdvanceSearchInput } from "@/gql/generated/graphql";
import moment from "moment";
import "moment/locale/vi";
import queryString from "query-string";
const currentYear = new Date().getFullYear();
export function toReadbleTime(time: Date) {
  // if year of time before year of now, return full time
  if (moment(time).year() < currentYear) {
    return moment(time).format("DD/MM/YYYY");
  }
  moment.locale("vi");

  return moment(time).fromNow();
}

export function advanceSearchHref(advanceSearchInput: AdvanceSearchInput) {
  const query = queryString.stringify(advanceSearchInput);

  return `/tim-kiem-nang-cao?${query}`;
}

import { AdvanceSearchInput } from "@/gql/generated/graphql";
import { atom } from "recoil";

interface FilterState {
    isFirstSet: boolean;
    params: AdvanceSearchInput;
}

const filterState = atom<FilterState>({
    key: "filterState",
    default: {
        isFirstSet: true,
    } as FilterState,
});

export default filterState;

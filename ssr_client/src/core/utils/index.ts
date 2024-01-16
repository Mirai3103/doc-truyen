import moment from "moment";
import "moment/locale/vi";
export function toReadbleTime(time: Date) {
    moment.locale("vi");

    return moment(time).fromNow();
}

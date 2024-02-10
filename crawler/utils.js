import dayjs from "dayjs";
import slugify from "slugify";
const regex = /[-+]?\d+(\.\d+)?/;
function getFirstNumberOfString(str) {
  const match = str.match(regex);
  if (match) {
    return parseFloat(match[0]);
  }
  return 0;
}
export function parseTimeAgo(timeAgo) {
  //27/04/22
  // check if it is a date
  const date = timeAgo.split("/");
  if (date.length === 3) {
    const day = parseInt(date[0]);
    const month = parseInt(date[1]) - 1;
    const year = parseInt("20" + date[2]);
    return new Date(year, month, day);
  }
  const time = timeAgo.split(" ");
  const number = parseInt(time[0]);
  const unit = time[1];
  const now = dayjs();
  if (unit === "giây") {
    return now.subtract(number, "second").toDate();
  }
  if (unit === "phút") {
    return now.subtract(number, "minute").toDate();
  }
  if (unit === "giờ") {
    return now.subtract(number, "hour").toDate();
  }
  if (unit === "ngày") {
    return now.subtract(number, "day").toDate();
  }
  if (unit === "tuần") {
    return now.subtract(number, "week").toDate();
  }
  if (unit === "tháng") {
    return now.subtract(number, "month").toDate();
  }
  if (unit === "năm") {
    return now.subtract(number, "year").toDate();
  }
  return new Date(2016, 0, 1);
}

export function toSlug(str) {
  return slugify(str, { lower: true, strict: true });
}

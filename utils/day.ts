import dayjs from "dayjs";

function getDDay(startDateISO: string) {
  const today = dayjs();
  const start = dayjs(startDateISO);
  const diff = start.diff(today, "day");
  return diff > 0 ? `D-${diff}` : "D-Day";
}

export { getDDay };

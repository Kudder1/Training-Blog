import { weekEdges } from "types/ContentTypes";

export const getWeekEdges = (): weekEdges => {
    const start = 1;

    const firstDayDate = new Date();
    const firstDay = firstDayDate.getDay();

    const lastDayDate = new Date();
    const lastDay = lastDayDate.getDay();

    const firstDayDiff = firstDayDate.getDate() - firstDay + (start > firstDay ? start - 7 : start);
    firstDayDate.setDate(firstDayDiff);

    const lastDayDiff = lastDayDate.getDate() - lastDay + (start > lastDay ? start - 1 : 6 + start);
    lastDayDate.setDate(lastDayDiff);

    return { weekStart: firstDayDate.getTime(), weekEnd: lastDayDate.getTime() }
}
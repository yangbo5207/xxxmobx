import * as d from 'utils/calendar';

const HOST = 'https://hq.tigerbrokers.com';

const getWeekFirstDay = curDate => d.getPrefixDateString(d.getWeekInfo(curDate, false)[0]);
const getWeekLastDay = curDate => d.getPrefixDateString(d.getWeekInfo(curDate, true)[6]);
const getMonthFirstDay = curMonth => d.getPrefixDateString(d.getCalendarMonthInfo(d.getPreMonth(curMonth))[0]);
const getMonthLastDay = curMonth => d.getPrefixDateString(d.getCalendarMonthInfo(d.getNextMonth(curMonth))[41]);

export const getMessageType = (cur, type) => {
    const first = type == 0 ? getWeekFirstDay(cur) : getMonthFirstDay(cur);
    const last = type == 0 ? getWeekLastDay(cur) : getMonthLastDay(cur);

    return `${HOST}/fundamental/finance_calendar/getType/${first}/${last}`;
}

export const getDay = curDate => {
    const dayString = d.getPrefixDateString(curDate);
    return `${HOST}/fundamental/finance_calendar/get_day/${dayString}`
}

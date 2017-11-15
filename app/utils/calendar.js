/**
 * @Desc 通过年月计算当月有多少天
 * @Param  date    { year: 2016, month: 1 }
 * @Return number  31
 */
export const getMonthDayCount = (date) => {
  let monthDayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (date.year % 4 === 0 && date.year % 100 !== 0 || date.year % 400 === 0) {
    monthDayCount[1] = 29
  }

  return monthDayCount[date.month - 1]
}

/**
 * 通过天信息获取该天的星期数
 * @Param  { object } [date] [某一天的信息] { year: 2016, month: 1, date: 9 }
 * @Return { number } [星期数]
 */
export const getWeekDay = (date) => {
  const nowdate = new Date()
  nowdate.setFullYear(date.year, date.month - 1, date.date)
  return nowdate.getDay()
}

/**
 * 通过月份获取上一月的年月
 * @Param  { object } [date] [某一天的信息] { year: 2016, month: 1 }
 * @Result { object } { year: 2015, month: 12 }
 */
export const getPreMonth = (date) => {
  let preMonth = date.month - 1
  let preMonthYear = date.year

  if (preMonth === 0) {
    preMonth = 12
    preMonthYear = date.year - 1
  }

  return {
    month: preMonth,
    year: preMonthYear
  }
}

/**
 * @Desc 通过月份获取下一月的年月
 * @Param  { object } [date] { year: 2016, month: 1 }
 * @Result { object } { year: 2016, month: 2 }
 */
export const getNextMonth = (date) => {
  let nextMonth = date.month + 1
  let nextMonthYear = date.year

  if (nextMonth == 13) {
    nextMonth = 1
    nextMonthYear = date.year + 1
  }

  return {
    month: nextMonth,
    year: nextMonthYear
  }
}

/**
 * @Desc 获取某个月的日历信息
 * @Param  { object } [date] { year: 2016, month: 1 }
 * @Result { object } { year: 2016, month: 2 }
 */
export const getCalendarMonthInfo = (date) => {
  const monthDayCount = getMonthDayCount(date)
  const preMonth = getPreMonth(date)
  const nextMonth = getNextMonth(date)
  const preMonthDayCount = getMonthDayCount(preMonth)

  const firstDate = {
    year: date.year,
    month: date.month,
    date: 1
  }

  let firstWeekNumber = getWeekDay(firstDate);
  let info = []
  let index = 0

  for(let i = firstWeekNumber === 0 ? 6 : (firstWeekNumber - 1); i >= 0; i--) {
    info[index] = {
      date: preMonthDayCount - i,
      isPreMonth: true,
      month: preMonth.month,
      year: preMonth.year
    }
    index++
  }

  for(let i = 0; i < monthDayCount; i++) {
    info[index] = {
      date: i + 1,
      month: date.month,
      year: date.year
    }
    index++
  }

  for(var i = 1; index < 42; index++) {
    info[index] = {
      date: i,
      isNextMonth: true,
      month: nextMonth.month,
      year: nextMonth.year
    }
    i++
  }
  return info
}

/**
 * @Desc 获取天信息
 * @Param  { object } [date] { year: 2016, month: 1, date: 13 }
 * @Param  { boolean } [tag] [undefined:当天 false: previous day  true: next day]
 * @result { object } { year: 2016, month:1 date: 14  }
 */
export const getDayInfo = (date, tag) => {
  if (typeof tag === 'undefined') {
    return date
  }
  const tempDate = new Date(date.year, date.month - 1, tag ? date.date + 1 : date.date - 1)

  return {
    year: tempDate.getFullYear(),
    month: tempDate.getMonth() + 1,
    date: tempDate.getDate()
  }
}

/**
 * 获取周信息
 * @Param  { object } [date] { year: 2016, month: 1, date: 13 }
 * @Param  { boolean } [tag] [undefined:当前周 false: previous week  true: next week]
 * @result { object } [object, object, ..., object]
 */
export const getWeekInfo = (date, tag) => {
  let count = 0
  if (typeof tag !== 'undefined') {
    count = !!tag ? 7 : -7;
  }
  const newDate = new Date(date.year, date.month - 1, date.date - getWeekDay(date) + count)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  let day = newDate.getDate()
  const monthInfo = {
    year: year,
    month: month
  }
  const dayCount = getMonthDayCount(monthInfo)

  let result = []
  let nextMonth

  for(let i = 0; i < 7; i++) {
    if (day <= dayCount) {
      result.push({
        year: year,
        month: month,
        date: day
      })
    }
    day += 1
  }
  day -= 1

  if (day > dayCount) {
    nextMonth = getNextMonth(monthInfo)
    for(let i = 0; i < day - dayCount; i++) {
      result.push({
        year: nextMonth.year,
        month: nextMonth.month,
        date: i + 1
      })
    }
  }
  return result
}

/**
 * @Desc 获取 7天后true | 7天前false 的日期
*/
export const getCurDate = (date, tag) => {
  let count = 0

  if (typeof tag !== 'undefined') {
    count = tag ? 7 : -7
  }

  const newDate = new Date(date.year, date.month - 1, date.date + count)
  return {
    year: newDate.getFullYear(),
    month: newDate.getMonth() + 1,
    date: newDate.getDate()
  }
}

/**
 * @Desc 获取月信息
*/
export const getMonthInfo = (date, tag) => {
  let monthInfo
  let tempDate
  let result = []

  if (typeof tag !== 'undefined') {
    monthInfo = !tag ? getPreMonth(date) : getNextMonth(date)
    date = {
      year: monthInfo.year,
      month: monthInfo.month
    }
  }

  tempDate = getCalendarMonthInfo(date)

  tempDate.forEach(item => {
    if (!item.isPreMonth && !item.isNextMonth) {
      result.push(item)
    }
  })

  return result
}

/**
 * @desc 前导补0
*/
export const prefixZero = (number) => {
  if (typeof number != 'number') {
    console.error('prefixZero: 传入的参数类型不是number');
  }
  return number < 10 ? `0${number}` : number
}

/**
 * @Desc 返回当天的日期字符串 2017-1-12
*/
export const getDateString = (date) => {
  return `${date.year}-${date.month}-${date.date}`
}

/**
 * @Desc fanhui
*/
export const getPrefixDateString = (date) => {
  return `${date.year}-${prefixZero(parseInt(date.month))}-${prefixZero(parseInt(date.date))}`
}


// 获取三周的周信息
export const get3WeekInfo = (date) => {
  const pre = getWeekInfo(date, false)
  const cur = getWeekInfo(date)
  const nex = getWeekInfo(date, true)

  return {
    pre: pre,
    cur: cur,
    nex: nex
  }
}

// 获取三个月的信息
export const get3MonthInfo = (month) => {
  const pre_month = getPreMonth(month)
  const nex_month = getNextMonth(month)
  const pre_month_info = getCalendarMonthInfo(pre_month)
  const cur_month_info = getCalendarMonthInfo(month)
  const nex_month_info = getCalendarMonthInfo(nex_month)

  return {
    pre: pre_month_info,
    cur: cur_month_info,
    nex: nex_month_info
  }
}

/**
 * @Desc 根据当前天获取前后3周的日期字符串数组，格式为 2016-06-15
 */
export const getThreeWeekString = (date) => {
  const pre = getWeekInfo(date, false)
  const cur = getWeekInfo(date)
  const nex = getWeekInfo(date, true)
  let arr = []

  pre.forEach(item => { arr.push(item) })
  cur.forEach(item => { arr.push(item) })
  nex.forEach(item => { arr.push(item) })

  return arr.map(item => getPrefixDateString(item))
}

/**
 * @Desc 根据当天获取前后三个月的日期字符串数组 格式为 2016-06-15
 */
export const getThreeMonthString = (month) => {
  const pre = getCalendarMonthInfo(getPreMonth(month))
  const cur = getCalendarMonthInfo(month)
  const nex = getCalendarMonthInfo(getNextMonth(month))
  let arr = []

  pre.forEach(item => { arr.push(item) })
  cur.forEach(item => { arr.push(item) })
  nex.forEach(item => { arr.push(item) })

  return arr.map(item => getPrefixDateString(item))
}

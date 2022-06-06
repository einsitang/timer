import { daysAgo, formatPeriod, formatPeriodCommon, formatTime, getMonthTime, getStartOfDay, getWeeksAgo, getWeekTime, isSameDay } from "@util/time"

test('time', () => {
    const dateStr = '2020/05/01 00:00:01'
    const date = Date.parse(dateStr)
    const format = '{y}{m}{d} {h}{i}{s}{a}'
    const result = '20200501 000001五'

    // default format
    expect(formatTime(dateStr)).toEqual('2020-05-01 00:00:01')

    expect(formatTime(dateStr, format)).toEqual(result)

    expect(formatTime(date, format)).toEqual(result)
    // use seconds
    expect(formatTime(Math.floor(date / 1000), format)).toEqual(result)

    // use string
    expect(formatTime(date.toString(), format)).toEqual(result)
    expect(formatTime(Math.floor(date / 1000).toString(), format)).toEqual(result)

    expect(formatTime(new Date(date), format)).toEqual(result)
})

test('format', () => {
    const msg = {
        hourMsg: '{hour}时{minute}分{second}秒',
        minuteMsg: '{minute}分{second}秒',
        secondMsg: '{second}秒'
    }
    expect(formatPeriod(3666 * 1000, msg)).toEqual('1时1分6秒')
    expect(formatPeriodCommon(3666 * 1000)).toEqual('1 h 1 m 6 s')
    expect(formatPeriodCommon(1)).toEqual('0 s')
})

test('days ago', () => {
    const start = Math.floor(Math.random() * 100)
    const range = daysAgo(start + 2, start)
    expect(range[1].getTime() - range[0].getTime()).toEqual(1000/*ms/s*/ * 60/*s/min*/ * 60/*min/h*/ * 24/*h/day*/ * 2/*day*/)
})

test("weeks ago", () => {
    // 2022/06/01, Thu
    let now = new Date(2022, 5, 1)
    // 2022/05/23 Mon.
    const weekAgoChinese = getWeeksAgo(now, true, 1)
    expect(weekAgoChinese.getMonth()).toEqual(4)
    expect(weekAgoChinese.getDate()).toEqual(23)
    expect(weekAgoChinese.getDay()).toEqual(1)
    expect(weekAgoChinese.getHours()).toEqual(0)
    expect(weekAgoChinese.getMinutes()).toEqual(0)
    expect(weekAgoChinese.getSeconds()).toEqual(0)
    expect(weekAgoChinese.getMilliseconds()).toEqual(0)
    // 2022/05/22 Sun.
    const weekAgoNoChinese = getWeeksAgo(now, false, 1)
    expect(weekAgoNoChinese.getMonth()).toEqual(4)
    expect(weekAgoNoChinese.getDate()).toEqual(22)
    expect(weekAgoNoChinese.getDay()).toEqual(0)
    expect(weekAgoNoChinese.getHours()).toEqual(0)
    expect(weekAgoNoChinese.getMinutes()).toEqual(0)
    expect(weekAgoNoChinese.getSeconds()).toEqual(0)
    expect(weekAgoNoChinese.getMilliseconds()).toEqual(0)
    // If now is 2022/05/22 Sun.
    now = new Date(2022, 4, 22)
    expect(getWeeksAgo(now, true, 1).getDate()).toEqual(9)
    expect(getWeeksAgo(now, false, 1).getDate()).toEqual(15)
    // If now is 2022/05/23 Mon.
    now = new Date(2022, 4, 23)
    expect(getWeeksAgo(now, true, 1).getDate()).toEqual(16)
    expect(getWeeksAgo(now, false, 1).getDate()).toEqual(15)
})

test("is same day", () => {
    const date1 = new Date(2022, 4, 11)
    date1.setHours(23)
    const date2 = new Date(2022, 4, 11)
    date2.setHours(10)
    expect(isSameDay(date1, date2)).toBeTruthy()
    date1.setHours(25)
    expect(isSameDay(date1, date2)).toBeFalsy()
})

test("get week time", () => {
    // now 2022/05/22, Sun.
    const now = new Date(2022, 4, 22)
    // [2022/05/16, 2022/05/22]
    let [s1, e1] = getWeekTime(now, true)
    expect(s1.getDate()).toEqual(16)
    expect(s1.getHours()).toEqual(0)
    expect(s1.getMinutes()).toEqual(0)
    expect(s1.getSeconds()).toEqual(0)
    expect(s1.getMilliseconds()).toEqual(0)
    expect(e1).toEqual(now)
    // [2022/05/22, 2022/05/28]
    let [s2] = getWeekTime(now, false)
    expect(s2.getDate()).toEqual(22)
})

test("get month time", () => {
    // 2022/05/02
    const now = new Date(2022, 4, 2)
    const [start, end] = getMonthTime(now)
    expect(start.toLocaleString()).toEqual('2022/5/1 00:00:00')
    expect(end.toLocaleString()).toEqual('2022/5/31 23:59:59')
})

test("get start of day", () => {
    // 2022/05/22 11:30:29
    const now = new Date(2022, 4, 2)
    now.setHours(11, 30, 29, 999)
    const start = getStartOfDay(now)
    expect(start.toLocaleString()).toEqual('2022/5/2 00:00:00')
})
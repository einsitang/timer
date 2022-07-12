/**
 * Copyright (c) 2021 Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Messages } from "@util/i18n"

export type HabitMessage = {
    sizes: {
        fifteen: string
        halfHour: string
        hour: string
        twoHour: string
    },
    average: {
        label: string
    },
    dateRange: {
        lastDay: string
        last3Days: string
        lastWeek: string
        last15Days: string
        last30Days: string
        last60Days: string
    },
    chart: {
        title: string
        saveAsImageTitle: string
        yAxisName: string
    }
}

const _default: Messages<HabitMessage> = {
    zh_CN: {
        sizes: {
            fifteen: '每十五分钟统计一次',
            halfHour: '每半小时统计一次',
            hour: '每一小时统计一次',
            twoHour: '每两小时统计一次'
        },
        average: {
            label: '平均每天'
        },
        dateRange: {
            lastDay: '最近 24 小时',
            last3Days: '最近 3 天',
            lastWeek: '最近 7 天',
            last15Days: '最近 15 天',
            last30Days: '最近 30 天',
            last60Days: '最近 60 天'
        },
        chart: {
            title: '上网习惯统计',
            saveAsImageTitle: '保存',
            yAxisName: '浏览时长 / 秒'
        }
    },
    zh_TW: {
        sizes: {
            fifteen: '按十五分鐘統計',
            halfHour: '按半小時統計',
            hour: '按一小時統計',
            twoHour: '按兩小時統計'
        },
        average: {
            label: '平均每天'
        },
        dateRange: {
            lastDay: '最近 24 小時',
            last3Days: '最近 3 天',
            lastWeek: '最近 7 天',
            last15Days: '最近 15 天',
            last30Days: '最近 30 天',
            last60Days: '最近 60 天'
        },
        chart: {
            title: '上網習慣統計',
            saveAsImageTitle: '保存',
            yAxisName: '瀏覽時長 / 秒'
        }
    },
    en: {
        sizes: {
            fifteen: 'Per 15 minutes',
            halfHour: 'Per half hour',
            hour: 'Per one hour',
            twoHour: 'Per two hours'
        },
        average: {
            label: 'Daily average'
        },
        dateRange: {
            lastDay: 'Last day',
            last3Days: 'Last 3 days',
            lastWeek: 'Last week',
            last15Days: 'Last 15 days',
            last30Days: 'Last 30 days',
            last60Days: 'Last 60 days'
        },
        chart: {
            title: 'Time-phased Statistics of Browsing Time',
            saveAsImageTitle: 'Snapshot',
            yAxisName: 'Browsing Time / second'
        }
    },
    ja: {
        sizes: {
            fifteen: '15分で統計',
            halfHour: '30分で統計',
            hour: '1時間ごとの統計',
            twoHour: '2時間ごとの統計'
        },
        average: {
            label: '1日平均'
        },
        dateRange: {
            lastDay: '過去24時間',
            last3Days: '過去3日間',
            lastWeek: '先週',
            last15Days: '過去15日間',
            last30Days: '過去30日間',
            last60Days: '過去60日間'
        },
        chart: {
            title: '時系列の統計を閲覧する',
            saveAsImageTitle: 'ダウンロード',
            yAxisName: '閲覧時間/秒'
        }
    }
}

export default _default
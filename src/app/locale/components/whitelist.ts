/**
 * Copyright (c) 2021 Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Messages } from "@util/i18n"
export type WhitelistMessage = {
    addConfirmMsg: string
    removeConfirmMsg: string
    duplicateMsg: string
    infoAlertTitle: string
    infoAlert0: string
    infoAlert1: string
    placeholder: string
    errorInput: string
}

const _default: Messages<WhitelistMessage> = {
    zh_CN: {
        addConfirmMsg: '{url} 加入白名单后，将不再统计该网站的数据',
        removeConfirmMsg: '{url} 将从白名单中移除',
        duplicateMsg: '已存在白名单中',
        infoAlertTitle: '你可以在这里配置网站白名单',
        infoAlert0: '白名单内网站的上网时长和打开次数不会被统计',
        infoAlert1: '白名单内网站的上网时间也不会被限制',
        placeholder: '域名',
        errorInput: "域名格式错误"
    },
    zh_TW: {
        addConfirmMsg: '{url} 加入白名單後，將不再統計該網站的數據',
        removeConfirmMsg: '{url} 將從白名單中移除',
        duplicateMsg: '已存在白名單中',
        infoAlertTitle: '你可以在這裡配置網站白名單',
        infoAlert0: '白名單內網站的上網時長和打開次數不會被統計',
        infoAlert1: '白名單內網站的上網時間也不會被限製',
        placeholder: '網域',
        errorInput: "網域格式錯誤"
    },
    en: {
        addConfirmMsg: '{url} won\'t be counted after added into the whitelist any more.',
        removeConfirmMsg: '{url} will be removed from the whitelist.',
        duplicateMsg: 'Duplicated',
        infoAlertTitle: 'You can set a whitelist of sites in this page',
        infoAlert0: 'Whitelisted sites will not be counted',
        infoAlert1: 'Whitelisted sites will not be restricted',
        placeholder: 'Site URL',
        errorInput: "Invalid site URL"
    },
    ja: {
        addConfirmMsg: '{url} がホワイトリストに追加されると、このWebサイトの統計はカウントされなくなります。',
        removeConfirmMsg: '{url} はホワイトリストから削除されます',
        duplicateMsg: '繰り返される',
        infoAlertTitle: 'このページでサイトのホワイトリストを設定できます',
        infoAlert0: 'ホワイトリストのサイトはカウントされません。',
        infoAlert1: 'ホワイトリストのサイトは制限されません。',
        placeholder: 'URL',
        errorInput: "無効なURL"
    }
}

export default _default
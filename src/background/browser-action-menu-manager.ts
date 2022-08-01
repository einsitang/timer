/**
 * Copyright (c) 2021 Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { OPTION_ROUTE } from "../app/router/constants"
import { getAppPageUrl, SOURCE_CODE_PAGE, TU_CAO_PAGE } from "@util/constant/url"
import { t2Chrome } from "@util/i18n/chrome/t"

const APP_PAGE_URL = getAppPageUrl(true)

const baseProps: Partial<chrome.contextMenus.CreateProperties> = {
    // Cast unknown to fix the error with manifestV2
    // Because 'browser_action' will be replaced with 'action' in union type chrome.contextMenus.ContextType since V3
    // But 'action' does not work in V2
    contexts: ['browser_action'] as unknown as chrome.contextMenus.ContextType[],
    visible: true
}

const allFunctionProps: chrome.contextMenus.CreateProperties = {
    id: chrome.runtime.id + '_timer_menu_item_app_link',
    title: '🏷️ ' + t2Chrome(msg => msg.contextMenus.allFunctions),
    onclick: () => chrome.tabs.create({ url: APP_PAGE_URL }),
    ...baseProps
}

const optionPageProps: chrome.contextMenus.CreateProperties = {
    id: chrome.runtime.id + '_timer_menu_item_option_link',
    title: '🥰 ' + t2Chrome(msg => msg.contextMenus.optionPage),
    onclick: () => chrome.tabs.create({ url: APP_PAGE_URL + '#' + OPTION_ROUTE }),
    ...baseProps
}

const repoPageProps: chrome.contextMenus.CreateProperties = {
    id: chrome.runtime.id + '_timer_menu_item_repo_link',
    title: '🍻 ' + t2Chrome(msg => msg.contextMenus.repoPage),
    onclick: () => chrome.tabs.create({ url: SOURCE_CODE_PAGE }),
    ...baseProps
}

const feedbackPageProps: chrome.contextMenus.CreateProperties = {
    id: chrome.runtime.id + '_timer_menu_item_feedback_link',
    title: '😿 ' + t2Chrome(msg => msg.contextMenus.feedbackPage),
    onclick: () => chrome.tabs.create({ url: TU_CAO_PAGE }),
    ...baseProps
}

function init() {
    create(allFunctionProps)
    create(optionPageProps)
    create(repoPageProps)
    create(feedbackPageProps)
}

function create(props: chrome.contextMenus.CreateProperties) {
    chrome.contextMenus.create(props, () => {
        const error: chrome.runtime.LastError = chrome.runtime.lastError
        const duplicated = error?.message?.startsWith('Cannot create item with duplicate id')
        duplicated && console.log("Duplicated item: " + props.id)
    })
}

export default init

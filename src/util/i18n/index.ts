/**
 * Copyright (c) 2021 Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import optionService from "@service/option-service"

/**
 * Not to import this one if not necessary
 */
export type FakedLocale = timer.Locale
/**
 * @since 0.2.2
 */
const FEEDBACK_LOCALE: timer.Locale = "en"

export const defaultLocale: timer.Locale = "zh_CN"

export type Messages<T> = {
    [key in timer.Locale]: T
}

// Standardize the locale code according to the Chrome locale code
const chrome2I18n: { [key: string]: timer.Locale } = {
    'zh-CN': "zh_CN",
    'zh-TW': "zh_TW",
    'en-US': "en",
    'en-GB': "en",
    'ja': "ja"
}

/**
 * Codes returned by getUILanguage() are defined by Chrome browser
 * @see https://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc 
 * But supported locale codes in Chrome extension
 * @see https://developer.chrome.com/docs/webstore/i18n/#localeTable
 * 
 * They are different, so translate
 */
export function chromeLocale2ExtensionLocale(chromeLocale: string): timer.Locale {
    if (!chromeLocale) {
        return defaultLocale
    }
    return chrome2I18n[chromeLocale] || FEEDBACK_LOCALE
}

/**
 * @since 0.9.0
 */
export let localeSameAsBrowser: timer.Locale = chromeLocale2ExtensionLocale(chrome.i18n.getUILanguage())

/**
 * Real locale with locale option
 */
export let locale: timer.Locale = localeSameAsBrowser

function handleLocaleOption(option: timer.option.AllOption) {
    const localOption: timer.option.LocaleOption = option.locale
    if (!localOption || localOption === "default") {
        locale = chromeLocale2ExtensionLocale(chrome.i18n.getUILanguage())
    } else {
        locale = localOption as timer.Locale
    }
}

/**
 * Please invoke this function before doing anything
 * @since 0.8.0
 */
export async function initLocale() {
    const option = await optionService.getAllOption()
    handleLocaleOption(option)
}

optionService.addOptionChangeListener(handleLocaleOption)

export function getI18nVal<MessageType>(messages: MessageType, keyPath: I18nKey<MessageType>): string {
    const result = keyPath(messages)
    return typeof result === 'string' ? result : JSON.stringify(result)
}

export type TranslateProps<MessageType> = {
    key: I18nKey<MessageType>,
    param?: { [key: string]: string | number }
}

function fillWithParam(result: string, param: { [key: string]: string | number }) {
    if (!result) {
        return ''
    }
    Object.entries(param)
        .filter(([_key, value]) => value !== null && value !== undefined)
        .forEach(([key, value]) => result = result.replace(`{${key}}`, value.toString()))
    return result
}

export function t<MessageType>(messages: MessageType, props: TranslateProps<MessageType>): string {
    const { key, param } = props
    let result: string = getI18nVal(messages, key)
    return param ? fillWithParam(result, param) : result
}

export type I18nKey<MessageType> = (messages: MessageType) => any

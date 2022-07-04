/**
 * Copyright (c) 2021 Hengyang Zhang
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { MEAT_URL } from "@util/constant/url"
import { locale } from "@util/i18n"

function initMeat() {
    const nowHour = new Date().getHours()

    if ((nowHour === 17 || nowHour === 18 || nowHour === 12) && locale === "zh_CN") {
        const link = document.getElementById('meat-container')
        link.style.display = 'block'
        link.onclick = () => chrome.tabs.create({ url: MEAT_URL })
    }
}

export default initMeat
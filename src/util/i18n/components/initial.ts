/**
 * Copyright (c) 2022 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import type { Messages } from ".."

/**
 * Locales for initial data
 * 
 * @since 0.9.1
 */
export type InitialMessage = {
    localFile: {
        json: string
        pic: string
        pdf: string
        txt: string
    }
}

const _default: Messages<InitialMessage> = {
    zh_CN: {
        localFile: {
            json: 'JSON 文件',
            pdf: 'PDF 文件',
            pic: '图片文件',
            txt: '文本文件',
        }
    },
    zh_TW: {
        localFile: {
            json: 'JSON 文件',
            pdf: 'PDF 文件',
            pic: '圖片文件',
            txt: '文本文件',
        }
    },
    en: {
        localFile: {
            json: 'JSON Files',
            pdf: 'PDF Files',
            pic: 'Images',
            txt: 'Text Files',
        }
    },
    ja: {
        localFile: {
            json: 'JSON',
            pdf: 'PDF',
            pic: '写真',
            txt: 'TXT',
        }
    }
}

export default _default
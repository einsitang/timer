import { ElTag, ElButton, ElMessage } from "element-plus"
import { h, isVNode, VNode } from "vue"
import { tN, t, I18nKey } from "../../locale"
import { OptionMessage } from "../../locale/components/option"

/**
 * Render the option item
 * 
 * @param input input of this option, or param map
 * @param label label
 * @param defaultValue default value
 */
export function renderOptionItem(input: VNode | { [key: string]: VNode }, label: (msg: OptionMessage) => string, defaultValue: string | number) {
    const param = isVNode(input) ? { input } : input
    const labelArcher = h('a', { class: 'option-label' }, tN(msg => label(msg.option), param))
    const defaultTag = h(ElTag, { size: 'mini' }, () => defaultValue)
    const defaultArcher = h('a', { class: 'option-default' }, tN(msg => msg.option.defaultValue, { default: defaultTag }))
    return h('div', { class: 'option-line' }, [labelArcher, defaultArcher])
}


const resetButtonProps = {
    type: 'text',
    class: 'reset-button',
    icon: 'el-icon-refresh'
}
const resetButtonMsg = () => t(msg => msg.option.resetButton)
const renderResetButton = (handleClick: () => PromiseLike<any>) => h(ElButton, {
    ...resetButtonProps, async onClick() {
        await handleClick()
        ElMessage.success(t(msg => msg.option.resetSuccess))
    }
}, resetButtonMsg)

/**
 * Render the header 
 * 
 * @param title title text 
 * @param handleReset reset click handler
 * @returns VNode
 */
export function renderHeader(title: (msg: OptionMessage) => string, handleReset: () => PromiseLike<any>): VNode {
    const titleSpan = h('span', { class: 'card-title' }, t(msg => title(msg.option)))
    const resetButton = renderResetButton(handleReset)
    return h('div', { class: 'card-header' }, [titleSpan, resetButton])
}

/**
 * Render text wrapped with tag
 * 
 * @param text text
 */
export function tagText(text: I18nKey): VNode {
    return h('a', { style: { color: '#F56C6C' } }, t(text))
}
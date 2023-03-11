import { utilButton } from 'mars-ui-frame'
export default {
    props: {
        /**
         * @description 管理列
         */
        rowHandle: {
            type: Object,
            default: null
        }
    },
    computed: {
        rowHandleActions() {
            return this.rowHandle ? this.rowHandle.actions : null
        }
    },
    methods: {
        /**
         * @description 控制操作列 hidden 的方法
         */
        handleRowHandleButtonHidden(hidden = false, row, action) {
            if (typeof hidden === 'boolean') {
                return !hidden
            } else if (typeof hidden === 'function') {
                return !hidden.call(this, row, action)
            }
            return !hidden
        },
        /**
         * @description 检查是否显示操作下拉列表, 全部不显示则隐藏
         */
        handleRowHandleIconHidden(row, actions) {
            let result = true
            for (let i = 0; i < actions.length; i++) {
                const element = actions[i];
                const hidden = element.hidden
                if (typeof hidden === 'boolean') {
                    result = hidden
                } else if (typeof hidden === 'function') {
                    result = hidden.call(this, row, element)
                } else {
                    result = false
                }
                if(result === false) {
                    // 有按钮不隐藏, 就退出循环
                    break
                }
            }
            return result === false
        },
        /**
         * @description 控制操作列 disabled 的方法
         */
        handleRowHandleButtonDisabled(disabled = false, row, action) {
            if (typeof disabled === 'boolean') {
                return disabled
            } else if (typeof disabled === 'function') {
                return disabled(row, action, this)
            }
            return Boolean(disabled)
        },
        handleRowHandleButtonAttribute(action, key) {
            if (action[key]) return action[key]
            return this.getDefaultButtonValue(action.key, key)
        },
        getDefaultButtonValue(buttonKey, key) {
            if (buttonKey === undefined || buttonKey === '') {
                return ''
            }
            if (key === 'label') {
                return this.$te('common.buttons.' + buttonKey) ? this.$t('common.buttons.' + buttonKey) : buttonKey
            } else if (key === 'icon') {
                return utilButton.getButtonIcon(buttonKey)
            } else if (key === 'type') {
                return utilButton.getButtonType(buttonKey)
            }
        },
        handleRowHandleButtonAction(action, row, index) {
            if (action.emit) {
                this.$emit(action.emit, {
                    key: action.key,
                    index: index,
                    row: row,
                    action: action
                })
            }
            this.handleActionEvent(action.key, 'manage', 'record', row, index)
        }
    }
}
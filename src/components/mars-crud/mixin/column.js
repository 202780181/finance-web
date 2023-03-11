// 列处理
export default {
    props: {
        dynamicCols: {
            type: Boolean,
            default: false,
        },
        sourceColumns: {
            type: Array,
            default: () => []
        },
        defaultCheck: {
            type: Array,
            default: () => []
        },
        originColumns: {   // 2022.3.7+
            type: Array,
            default: () => []
        },
        originDefaultCheckColumns: {  // 2022.3.7+
            type: Array,
            default: () => []
        },
        profileKey: String,  // 2022.2.16+ 动态列设置后的保存，需要提供表格唯一标识；
        savePromise: {   // 2022.2.16+ 保存动态的结果，每个表格要调用的接口不一样，所以由外界传入
            type: Function,
            default: null
        },
        preSaveValidateMethod: {
            type: Function,
            default: ()=>{
                return true
            }
        }
    },
    data(){
        return {
            showDynamicColDialog: false,
        }
    },
    methods: {
        /**
         * 获取标签的值
         * @param {*} options
         * @param {*} val
         */
        getOption(options, val, column = {}) {
            return options.find(x => x[column['valueKey'] || 'value'] === val)
        },
        /**
         * 处理列表
         * @param {*} key
         * @param {*} options
         * @param {*} val
         */
        handleColumnOptions(key, options, val, column = {}) {
            const opt = this.getOption(options, val, column)
            if (!opt) { return val }
            if (key === 'type') {
                return opt[column['typeKey'] || 'type'] || 'primary'
            } else if (key === 'label') {
                return opt[column['labelKey'] || 'label'] || val
            }
            return val
        },
        handleColumnDataConvert(data) {
            return data.split(',')
        },
        /**
         * 处理字段链接
         */
        handleColumnLink(row, column) {
            if (!column.linkType) {
                return this.$emit('column-link-click', row, column)
            }
            // default、默认是回调
            // open :打开新的页面
            // dialog、打开指定窗口
            // tab 、打开tab
            switch (column.linkType) {
                case 'tab':
                    this.$router.push({
                        path: column.link
                    })
                    break
                case 'open':
                    this.$util.open(column.link)
                    break
                case 'dialog':
                    this.$emit('column-link-click', row, column)
                    break
                default:
                    this.$emit('column-link-click', row, column)
                    break
            }
        },
        handleDynamicColumnToolbar(){
            this.showDynamicColDialog = true
        },
        handleConfirmSelectColumn(cols){
            console.log('最后选择的列是', cols)
            this.$emit('dynamic-column-confirm', cols)
        },
    }
}

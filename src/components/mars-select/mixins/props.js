import { utilI18n as i18n } from 'mars-ui-frame'

export default {
    props: {
        itemWidth: { // 指选择框本身的宽度，自添加的属性（非el-form-item的宽度）
            type: Number,
            // default: 200
        },
        allowClearingDisabled: {
            type: Boolean,
            default: false
        },
        allowSelectingDisabledDescendants: {
            type: Boolean,
            default: false
        },
        alwaysOpen: { // 是否一直呈打开状
            type: Boolean,
            default: false
        },
        appendToBody: {
            type: Boolean,
            default: false
        },
        async: {
            type: Boolean,
            default: false
        },
        autoFocus: {
            type: Boolean,
            default: false
        },
        autoLoadRootOptions: {
            type: Boolean,
            default: true
        },
        autoDeselectAncestors: {
            type: Boolean,
            default: false
        },
        autoDeselectDescendants: {
            type: Boolean,
            default: false
        },
        autoSelectAncestors: {
            type: Boolean,
            default: false
        },
        autoSelectDescendants: {
            type: Boolean,
            default: false
        },
        backspaceRemoves: {
            type: Boolean,
            default: true
        },
        beforeClearAll: {
            type: Function,
            default: () => true
        },
        branchNodesFirst: {
            type: Boolean,
            default: false
        },
        cacheOptions: {
            type: Boolean,
            default: true
        },
        clearable: {
            type: Boolean,
            default: true
        },
        clearAllText: {
            type: String,
            default: i18n.t('treeselect.clearAllText'),
        },
        clearOnSelect: { // 多选时是false, 否则默认是 true
            type: Boolean,
            default: false
        },
        clearValueText: {
            type: String,
            default: i18n.t('treeselect.clearValueText'),
        },
        closeOnSelect: {
            type: Boolean,
            default: true
        },
        defaultExpandLevel: {
            type: Number,
            default: 0
        },
        defaultOptions: {
            type: [Boolean, Array],
            default: false
        },
        deleteRemoves: {
            type: Boolean,
            default: true
        },
        delimiter: {
            type: String,
            default: ","
        },
        disableBranchNodes: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        disableFuzzyMatching: {
            type: Boolean,
            default: false
        },
        flat: {
            type: Boolean,
            default: false
        },
        instanceId: {
            type: [String, Number],
            default: ''
        },
        joinValues: {
            type: Boolean,
            default: false
        },
        limit: {
            type: Number,
            default: Infinity
        },
        limitText: {
            type: Function,
            default: (count) => `and ${count} more`
        },
        loading: {
            type: Boolean,
            default: false
        },
        matchKeys: {
            type: Array,
            default: () => ["label"]
        },
        maxHeight: {
            type: Number,
            default: 300
        },
        multiple: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            default: ''
        },
        normalizer: {
            type: Function,
            default: node => {
                return {
                    id: node.id,
                    label: node.name,
                    // isDefaultExpanded: true
                }
            }
        },
        openDirection: {
            type: String,
            default: "auto"
        },
        openOnClick: {
            type: Boolean,
            default: true
        },
        openOnFocus: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            default: () => []
        },
        placeholder: {
            type: String,
            default: i18n.t('treeselect.placeholder'),
        },
        required: {
            type: Boolean,
            default: false
        },
        retryText: {
            type: String,
            default: "Retry?"
        },
        retryTitle: {
            type: String,
            default: i18n.t('treeselect.retryTitle'),
        },
        searchable: {
            type: Boolean,
            default: true
        },
        searchPromptText: {
            type: String,
            default: i18n.t('treeselect.searchPromptText'),
        },
        showCount: {
            type: Boolean,
            default: false
        },
        showCountOf: {
            type: String,
            default: "ALL_CHILDREN"
        },
        showCountOnSearch: {
            type: Boolean,
            default: false
        },
        sortValueBy: {
            type: String,
            default: "ORDER_SELECTED"
        },
        tabIndex: {
            type: Number,
            default: 0
        },
        zIndex: {
            type: [Number, String],
            default: 999
        },

        noChildrenText: {
            type: String,
            default: i18n.t('treeselect.noChild'),
        },
        noOptionsText: {
            type: String,
            default: i18n.t('treeselect.noOptions')
        },
        noResultsText: {
            type: String,
            default: i18n.t('treeselect.noResults')
        },
        loadingText: {
            type: String,
            default: i18n.t('treeselect.loadingText')
        },
        valueFormat: {
            type: String,
            default: "object",
            validator: function(value) {
                return ['id', 'object'].indexOf(value) !== -1
            }
        },
        searchNested: {
            type: Boolean,
            default: true
        },
        valueConsistsOf: { // 默认是只选中末级节点
            type: String,
            default: "LEAF_PRIORITY",
            validator: function(value) {
                return ['ALL', 'BRANCH_PRIORITY', 'LEAF_PRIORITY', 'ALL_WITH_INDETERMINATE'].indexOf(value) !== -1
            }
        },
        loadOptions: {
            type: Function,
            default: null
        },
        disticClass: { // 2019.3.13 允许传一个布尔值进来，控制要不要区分 父级和 叶子级的 文字粗细，默认false
            type: Boolean,
            default: false
        },
        joint: { // 2019.3.13 新增，用以告知 渲染函数，是否是拼接树，默认false 不是
            type: Boolean,
            default: false
        },
        defaultValue: { // 2019.3.13 新增，默认值，从外面传进来
            type: [Object, Array, String, Number], // 2019.6.13 改成可接受 对象、数组的方式
            default: () => {}
        },
        showAllSelect: { // 2020.3.5 新增，是否显示全部选项
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            validator(val) {
                return ['medium', 'small', 'mini'].indexOf(val) > -1
            },
            default: 'small'
        }
    },
}

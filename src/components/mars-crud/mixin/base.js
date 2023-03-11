export default {
    props: {
        isTree: {
            type: Boolean,
            default: false
        },
        showTable: {
            type: Boolean,
            default: true
        },
        /**
         *  尺寸
         */
        size: {
            type: String
        },
        /**
         * @description 工具栏
         */
        toolbars: {
            type: Array
        },
        /**
         * @description 查询表单
         */
        searchForm: {
            type: Object
        },
        /**
         *  @description 表格标题
         */
        title: {
            type: String,
            default: ''
        },
        /**
         * @description 主键
         */
        pkKey: {
            type: String
        },
        /**
         * @description 表头数据
         */
        columns: {
            type: Array,
            required: true
        },
        /**
         * @description 表格加载
         */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * @description 表格加载配置
         */
        loadingOptions: {
            type: Object,
            default: null
        },
        /**
         * @description 表格配置
         */
        options: {
            type: Object,
            default: () => {
                return {
                    border: true,
                    stripe: true
                }
            }
        },
        /**
         * @description 索引
         */
        indexRow: {
            type: [Object, Boolean],
            default: true
        },
        /**
         * @description 多选
         */
        selectionRow: {
            type: [Object, Boolean],
            default: true
        },
        /**
         * @description 类型
         * [可选值] radio/checkbox
         */
        selectionType: {
            type: String,
            default: 'checkbox'
        },
        showSummary: { // 2.15 新增，是否显示合计行
            type: Boolean,
            default: false
        },
        summaryMethod: { // 2.15 新增，合计方法
            type: Function,
        },
        rowClassName: {
            type: Function,
        },
        clickIndex: {//20191009 点击index事件 是否存在
            type: Boolean,
            default: false,
        },
        selectable: { // 2.15 新增，多选情况下，可控制行的checkbox
            type: Function,
        },
        broadWidth: { // 2.26 新增，控制表格中的所有列，是否使"宽度撑开"生效，默认是不生效
            type: Boolean,
            default: false
        },
        spanMethod: {
            type: Function,
        },
        headerCellClassName: {
            type: [String, Function],
        },
        treeProps: Object,
        //新增的class 放在class container-component 后面
        basicClassName: {
            type: String,
            default: ''
        },
    },
    methods: {
        handleClickIndexFun(scope, row) {
            this.$emit('click-index', scope, row)
        },
        clearSelection() {
            if (this.selectionType === 'radio') {
                this.selectionRadio = ''
            } else {
                this.$refs.elTable.clearSelection()
            }
        },
        toggleRowSelection(row, selected) {
            if (this.selectionType === 'radio') {
                this.selectionRadio = row ? row[this.pkKey] : ''
            } else {
                this.$refs.elTable.toggleRowSelection(row, selected)
            }
        },
        toggleAllSelection() {
            this.$refs.elTable.toggleAllSelection()
        },
        /**
         * @description 处理工具栏收缩/展开
         */
        handleCollapseExpandToolbar() {
            this.showToolbar = !this.showToolbar
            this.handleTableHeight(true)
            this.$emit('collapse-expand-toolbar', this.showToolbar)
        },
        /**
         * @description 行选中状态
         */
        handleCurrentChange(currentRow, oldCurrentRow) {
            this.$emit('current-change', currentRow, oldCurrentRow)
        },
        /**
         * @description 勾选数据时触发的事件
         */
        handleSelect(selection, row) {
            // 2021-08-27, checkbox的点击效果没生效
            // 解决：先在这里加上触发selection-change事件
            // 而select之后还会触发selection-change，会导致触发2次selection-change
            // 暂无更好的办法
            this.$emit('selection-change', selection)
            this.$emit('select', selection, row)
        },
        /**
         * @description 勾选全选时触发的事件
         */
        handleSelectAll(selection) {
            this.$emit('select-all', selection)
        },
        /**
         * @description 复选框选择项发生变化时触发的事件
         */
        handleSelectionChange(selection) {
            this.$selections = selection
            this.$emit('selection-change', selection)
        },
        /**
         * @description 单元格 hover 进入时触发的事件
         */
        handleCellMouseEnter(row, column, cell, event) {
            this.$emit('cell-mouse-enter', row, column, cell, event)
        },
        /**
         * @description 单元格 hover 退出时触发的事件
         */
        handleCellMouseLeave(row, column, cell, event) {
            this.$emit('cell-mouse-leave', row, column, cell, event)
        },
        /**
         * @description 单元格点击时触发的事件
         */
        handleCellClick(row, column, cell, event) {
            this.$emit('cell-click', row, column, cell, event)
        },
        /**
         * @description 单元格双击时触发的事件
         */
        handleCellDblclick(row, column, cell, event) {
            this.$emit('cell-dblclick', row, column, cell, event)
        },
        /**
         * @description 行点击时触发的事件
         */
        handleRowClick(row, event, column) {
            // console.log('row =============> ', row);
            // 点击行，触发选中
            if (this.selectionType === 'radio') {
                this.selectionRadio = row[this.pkKey]
                this.$emit('selection-change', row)
            } else {
                if (!row.fwDisabled) { // 2.15 Checkbox不可选的情况下，不能切换当前行的选中状态
                    this.$refs.elTable.toggleRowSelection(row)
                }
            }
            this.$emit('row-click', row, event, column)
        },
        /**
         * @description 行右键点击时触发的事件
         */
        handleRowContextmenu(row, event) {
            this.$emit('row-contextmenu', row, event)
        },
        /**
         * @description 行双击时触发的事件
         */
        handleRowDblclick(row, event) {
            this.$emit('row-dblclick', row, event)
        },
        /**
         * @description 表头点击时触发的事件
         */
        handleHeaderClick(column, event) {
            this.$emit('header-click', column, event)
        },
        /**
         * @description 表头右键点击时触发的事件
         */
        handleHeaderContextmenu(column, event) {
            this.$emit('header-contextmenu', column, event)
        },
        /**
         * @description 处理按钮的事件 【包含增删改查】
         * @param {*} buttonKey
         * @param {*} position
         * @param {*} data
         */
        handleActionEvent(buttonKey, position, selectionType = 'record', data, index) {
            let selection = null // 选中数据
            if (position === 'toolbar') { // 工具栏
                if (selectionType === 'node') {
                    // console.log('handleActionEvent方法中的data：', data);
                    // console.log('handleActionEvent方法中的$selectNode：', this.$selectNode);
                    // 2019.1.21 新增，当触发回车查询时，把$selectNode传了过来
                    selection = data
                    // } else if (selectionType === 'record') {
                } else {
                    // selectionType === undefined 也是走这里
                    selection = this.getSelectedIds()
                }
            } else { // 管理列
                selection = data[this.pkKey || 'id']
            }
            // console.log('buttonKey', buttonKey);
            // console.log('position', position);
            // console.log('selection', selection);
            // console.log('data', data);
            if (this.innerFun.includes(buttonKey)) {
                eval('this.' + buttonKey + "()");
            } else if (buttonKey === 'search') {
                this.searchForm.fns[0]()
            } else {
                this.$emit('action-event', buttonKey, position, selection, data, index)
            }
        },
        /**
         * @description 获取选中的值
         */
        getSelectedIds() {
            if (this.$selections === null || this.$selections === undefined) {
                return
            }
            const pkKey = this.pkKey || 'id'
            const ids = []
            this.$selections.map((item) => {
                if (item) {
                    ids.push(item[pkKey])
                }
            })
            return ids
        },

        // getSelectedNode() {
        //     if (this.$selectNode === null || this.$selectNode === undefined) {
        //         return
        //     }
        //     console.log('调用$selectNode：', this.$selectNode);
        //     return this.$selectNode
        // },


        // 1.18 为自定义的 modal型输入框在 enter 时的响应事件，传回消息给调用者
        handleModalInputEnter() {
            // 逐层传回消息
            this.$emit('modal-input-enter')
        },

        // 1.18 为自定义的 modal型输入框在 enter 时的响应事件，传回消息给调用者
        handleModalInputClear() {
            // 逐层传回消息
            this.$emit('modal-input-clear')
        },
        // 获取table dom
        getTable() {
            return this.$refs.elTable
        }
    },
    data() {
        return {
            innerFun: ['toFirst', 'toPrevious', 'toNext', 'toLast']
        }
    }
}

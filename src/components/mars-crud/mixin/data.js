import _clonedeep from 'lodash.clonedeep'
import _debounce from 'lodash.debounce'
import _snakecase from 'lodash.snakecase'

import _get from 'lodash.get'
import _set from 'lodash.set'

export default {
    props: {
        /**
         * @description 表格数据
         */
        data: {
            type: Array,
            required: true,
        },
        updateDataKeepSelect: {
            type: Boolean,
            default: false,
        },
        height: {
            type: Number | String
        },
        leftNode: { // 2019.1.21 新增，左树的情况，且可能要再用一个变量来控制是否启用
            type: Object,
        },
        seachNeedLeftNode: {
            // 2019.1.21 做了个兼容；
            // 只适用与 表单的 search 动作；
            // 有些页面需要连同左树一起查询，有些不要；当需要时，传 true 进来；
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            /**
             * @description 表格内部数据
             */
            ibpsData: [],
            /**
             *  @description 搜索框是否显示
             */
            showToolbar: true,
            /**
             * @description 表格的高度
             */
            tableHeight: null,
            /**
             * @description 工具栏的高度
             */
            toolbarBoxHeight: 0,
            /**
             * @description 选中的列
             */
            $selections: null,
            selectionRadio: '',
            // $selectNode: null, // 2019.1.21 新增，但暂时无用
        }
    },
    computed: {
        ibpsDataLength() {
            return this.ibpsData.length
        },
        thatSocpe() {
            return this
        },
        $selectNode() { // 2019.1.21 新增
            return this.leftNode
        },
    },
    watch: {
        data() {
            console.log('触发 mars-crud data.js watch 了', this.data)
            this.handleDataChange()
        },
        ibpsData: {
            handler(val) {
                this.$emit('ibps-data-change', val)
            },
            deep: true,
        },
        height() {
            this.handleTableHeight()
        },
        leftNode() {
            // this.$selectNode = this.leftNode
        },
        columns: {  // 2022.3.8+ 增加一个应对动态列 列数据变化 的监听，放置只有少数列时，列的宽度不够横向撑开整个表格
            handler(n, o){
                this.$nextTick(()=>{
                    if( this.columns.length > 0 ){
                        this.columns[0].width = ''
                    }
                })
            },
            immediate: true,
        }
    },
    mounted() {
		this.toolbarBoxHeight = this.$refs.toolbarBox ? this.$refs.toolbarBox.offsetHeight : 0
		// console.log('this.toolbarBoxHeight',this.toolbarBoxHeight)
        this.handleDataChange()
        this.$nextTick(() => {
			this.toolbarBoxHeight = this.$refs.toolbarBox ? this.$refs.toolbarBox.offsetHeight : 0
			// console.log('this.toolbarBoxHeight',this.toolbarBoxHeight)
            this.handleTableHeight()
        })
        window.addEventListener('resize', this.handleResize)
    },

    beforeDestroy () {
        // console.log('mars-crud 触发了 注销事件了');
        window.removeEventListener('resize', this.handleResize);
    },

    methods: {

        /**
         * @description 2.14 新增翻页记忆功能
         * @param {*} rows
         * 特别说明： 此方法仅适用于多选的情况下
         * 最新更新： 5.8 此方法已可适应 单选多选 两种情况，同时可根据情况，以 keys 或 rows 都可以
         */
        toggleSelection(rows, type = 'row') {
            if (rows && rows.length) {
                rows.forEach(row => {
                    this.$nextTick(() => {
                        if (type === 'row') {
                            var checked = this.ibpsData.filter(tableRow => tableRow[this.pkKey] === row[this.pkKey])
                        } else if (type === 'key') {
                            var checked = this.ibpsData.filter(tableRow => tableRow[this.pkKey] === row)
                        }
                        if (checked.length) {
                            // 5.8 优化，可以直接调用本地的方法
                            this.toggleRowSelection(checked[0])
                        }
                    })
                })
            } else {
                // 5.8 优化，可以直接调用本地的方法
                this.clearSelection()
            }
        },

        /**
         * @description lodash.get
         */
        _get,
        /**
         * @description lodash.set
         */
        _set,
        /**
         * @description 同步外部表格数据到ibpsData内部
         */
        handleDataChange() {
            if (this.ibpsData !== this.data) {
                this.ibpsData = _clonedeep(this.data)
            }
        },
        /**
         * @description 排序状态
         */
        handleSortChange({ column, prop, order }) {
            let name = column ? column.sortBy : null
            if (!name) {
                name = _snakecase(prop).toUpperCase() + '_'
            }
            this.$emit('sort-change', { column, name, order })
        },
        /**
         * @description 更新行数据
         * @param {Number} index 表格数据索引
         * @param {Object} row 更新的表格行数据
         */
        updateRow(index, row) {
            this.$set(this.ibpsData, index, row)
        },
        /**
         * @description 新增行数据
         * @param {Object} row 新增的表格行数据
         */
        addRow(row) {
            this.$set(this.ibpsData, this.ibpsData.length, row)
        },
        insertRow(row, index) {
            // this.$set(this.ibpsData, index, row)
            this.ibpsData.splice(index, 0, row)
        },
        /**
         * @description 删除行
         * @param {Object} index 被删除行索引
         */
        removeRow(index) {
            // this.$delete(this.ibpsData, index)
            this.ibpsData.splice(index, 1)
        },
        multiRemoveRow(ids) {
          if (!Array.isArray(ids)) {
              return
          }
          ids.forEach(id => {
              let i = this.ibpsData.findIndex(x => x[this.pkKey] === id)
              if (i > -1) {
                  this.removeRow(i)
              }
          })
        },
        // 2022.3.8+ 修复当列小于视图中表格宽度时，修复最后一列宽为空
        handleRecalcWidths(){
            let dom = this.$refs.elTable
            let tableModelWidth = Number(dom.bodyWidth.replace('px', ''))  // '2310px' -> 2310
            if( tableModelWidth < dom.$el.clientWidth ){   // 如果所有列的内容，不够，则去除最后一列的 width 属性
                if( this.columns.length > 0 ){
                    this.columns[0].width = ''
                }
            }
        },
        handleResize() {
            this.handleTableHeight()
        },
        /**
         * @description 获取el-table的数据
         */
        handleTableData() {
            return this.ibpsData
        },
        handleTableHeight(showToolbar) { // showToolbar参数表明是点击了展开和折叠按钮
            if (this.height) {
                this.tableHeight = this.height
            } else if (this.$refs.ibpsCrud) {
                let clientHeight = this.$refs.ibpsCrud.clientHeight
                if(!clientHeight) return
                this.tableHeight = clientHeight
            }
            if (this.$refs.ibpsCrudHeader) {
                this.tableHeight -= this.$refs.ibpsCrudHeader.clientHeight
            }
            if (this.$refs.ibpsCrudFooter) {
                this.tableHeight -= this.$refs.ibpsCrudFooter.clientHeight
            }

            this.tableHeight -= 10 // 1.4 由于样式设置的问题，此处再减去 10px

            // console.log('this.$refs.ibpsCrud.clientHeight', this.$refs.ibpsCrud.clientHeight);
            // console.log('this.$refs.ibpsCrudHeader.clientHeight', this.$refs.ibpsCrudHeader.clientHeight);
            // console.log('this.$refs.ibpsCrudFooter.clientHeight', this.$refs.ibpsCrudFooter.clientHeight);
            // console.log('this.toolbarBoxHeight', this.toolbarBoxHeight);

            if (!this.tableHeight || this.tableHeight <= 0) { // 页面加载完成后设置高度
                console.log('test it')
                // _debounce(this.handleTableHeight, 100)()
            } else {
                if (showToolbar) { // this.showToolbar 为true 展开，为false折叠，默认是展开
                    // 当导航缩起来时会导致toolbarBox高度发生变化
                    let toolbarBox = this.$refs.toolbarBox ? this.$refs.toolbarBox.offsetHeight : 0;
                    this.toolbarBoxHeight = toolbarBox || this.toolbarBoxHeight;
                    if (this.showToolbar) {
						// console.log('111111111111111',this.tableHeight)
                        this.tableHeight += 10 // 1.5 此处要 + 10px
						this.tableHeight -= this.toolbarBoxHeight
						// console.log('222222222222222',this.tableHeight)
                    } else {
						// console.log('333333333333333',this.tableHeight)
                        this.tableHeight -= 10 // 1.5 此处要 - 10px
						this.tableHeight += this.toolbarBoxHeight
						// console.log('444444444444444',this.tableHeight)
                    }
                }

            }
        },
    },
}



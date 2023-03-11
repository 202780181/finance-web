export default {
    props: {
        showPagination: {
            type: Boolean,
            default: true
        },
        paginationOptions: {
            type: Object,
            default: () => {
                return {
                    pagerCount: 5,
                    pageSizes: [10, 20, 50, 100],
                    layout: 'prev, pager, next, jumper,sizes, ->,slot'
                        // total, prev, pager, next, jumper, sizes
                }
            }
        },
        openPagination: { // 是否启用分页组件功能，诸如上一页，下一页，跳转，切换条目数
            type: Boolean,
            default: false
        },
        totalKey: { // 总记录
            type: String,
            default: 'totalCount'
        },
        pageKey: { // 当前页数
            type: String,
            default: 'page'
        },
        pageSizeKey: { // 分页大小
            type: String,
            default: 'limit'
        },
        pageCountKey: { // 总页数
            type: String,
            default: 'total'
        },
        /**
         * @description 表格分页配置
         */
        pagination: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    computed: {
        currentPage() {
            return this.pagination[this.pageKey] || 1
        },
        pageSize() {
            // console.log('this.pagination[this.pageSizeKey]', this.pagination[this.pageSizeKey]);
            return this.pagination[this.pageSizeKey] || 20
        },
        isShowPagination() {
            if (this.isTree) return false
            return this.showPagination || this.$slots.footer
        },
        pageInfo() {
            const total = this.pagination[this.totalKey]

            if (total && total > 0) {
                const start = ((this.currentPage - 1) * this.pageSize) + 1
                let end = this.currentPage * this.pageSize
                if (total <= end) { end = total }
                return this.$t('components.crud.pagination.pageInfo', {
                    start: start,
                    end: end,
                    total: total
                })
            }

            if (!total) return this.$t('components.crud.pagination.noData')
        }
    },
    methods: {
        /**
         * @description 每页条数改变
         */
        handlePaginationSizeChange(pageSize) {
            this.pagination[this.pageKey] = 1 // 当切换条目数是，查询结果自动回到第一页
            this.handlePaginationChange({ pageSize: pageSize })
        },
        /**
         * @description 当前页码改变
         */
        handlePaginationCurrentChange(currentPage) {
            this.handlePaginationChange({ currentPage: currentPage })
        },
        /**
         * @description 上一页
         */
        handlePaginationPrevClick(currentPage) {
            this.handlePaginationChange({ currentPage: currentPage })
        },
        /**
         * @description 下一页
         */
        handlePaginationNextClick(currentPage) {
            // 当刚进来页面时，未有数据，不允许触发查询
            this.handlePaginationChange({ currentPage: currentPage })
        },
        handlePaginationChange({ pageSize, currentPage }) {

            // console.log('pageSize：', pageSize);
            // console.log('currentPage：', currentPage);
            this.$emit('pagination-change', {
                pageSize: pageSize || this.pageSize,
                currentPage: currentPage || this.currentPage
            })
        }
    }
}
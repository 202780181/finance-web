export default {
    computed: {
        searchFormSlot() {
            return this.getSearchFormSlot()
        },
        showHeader() {
            let { toolbars, searchForm } = this
            if (toolbars && Array.isArray(toolbars) && toolbars.length > 0) {
                return true
            } else if (searchForm) {
                let fns = searchForm.fns
                if (Array.isArray(fns) && fns.length > 0) {
                    return true
                }
            }
            return false
        },
    },
    methods: {
        getSearchFormSlot() {
            let slot = []
            if (this.searchForm && this.searchForm.forms) {
                slot = this.searchForm.forms.filter(form => {
                    if (form.fieldType === 'slot') {
                        return form
                    }
                })
            }
            return slot
        },

        getSearchFormData(resetPage) {
            const params = {}
            let isError = false // 2.20 新增一个返回值标识，用于验证表单验证出错的情况
            // 是否重置分页
            if (resetPage) {
                this.pagination[this.pageKey] = 1
            }

            let searchForm = this.$refs['searchForm']
            if (searchForm) {
                // 1.7 此处多增加一个变量，用于走友财的传参逻辑
                this.$refs['searchForm'].getParams((error, formParams) => {
                    if (!error) {
                        return Object.assign(params, formParams)
                    } else {
                        isError = true
                    }
                }, 'mars')
            } else {
                return params
            }

            console.log('params', params)
            console.log('isError', isError)
            // 2.20 新增发生验证错误时的返回值
            if (isError) {
                return false
            } else {
                return params
            }
        },

        resetSearch() {
            this.$refs['searchForm'].resetSearchForm()
        },

        setParam(prop, value) {
            let s = this.$refs['searchForm']
            s.setParam(prop, value)
        },
        setParamModelInput(prop, text, value,isArray) {
            let s = this.$refs['searchForm']
            s.setParamModelInput(prop, text, value,isArray)
        },
		setDefaultDate(prop,value){
			let s = this.$refs['searchForm']
			s.setDefaultDate(prop,value)
		},
        setOptions(prop, options) {
            let s = this.$refs['searchForm']
            s.setOptions(prop, options)
        },
    },
}

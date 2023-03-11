<template>
                <!-- v-model="value"  -->
    <div class="mars-select-container">
        <tree-select
                ref="select"
                class="mars-treeselect"
                :class="[{
                  'overflow-treeselect': tagsOverflow,
                  'distic-class': disticClass
                }, 'mars-treeselect__' + size]"
                :style="itemStyle + (itemWidth ? `width: ${itemWidth}px;` : '')"
                v-model="value"
                :allowClearingDisabled="allowClearingDisabled"
                :allowSelectingDisabledDescendants="allowSelectingDisabledDescendants"
                :alwaysOpen="alwaysOpen"
                :appendToBody="appendToBody"
                :async="async"
                :autoFocus="autoFocus"
                :autoLoadRootOptions="autoLoadRootOptions"
                :autoDeselectAncestors="autoDeselectAncestors"
                :autoDeselectDescendants="autoDeselectDescendants"
                :autoSelectAncestors="autoSelectAncestors"
                :autoSelectDescendants="autoSelectDescendants"
                :backspaceRemoves="backspaceRemoves"
                :beforeClearAll="beforeClearAll"
                :branchNodesFirst="branchNodesFirst"
                :cacheOptions="cacheOptions"
                :clearable="clearable"
                :clearAllText="clearAllText"
                :clearOnSelect="clearOnSelect"
                :clearValueText="clearValueText"
                :closeOnSelect="closeOnSelect"
                :defaultExpandLevel="defaultExpandLevel"
                :defaultOptions="defaultOptions"
                :deleteRemoves="deleteRemoves"
                :delimiter="delimiter"
                :disableBranchNodes="disableBranchNodes"
                :disabled="disabled"
                :disableFuzzyMatching="disableFuzzyMatching"
                :flat="flat"
                :instanceId="instanceId"
                :joinValues="joinValues"
                :limit="limit"
                :limitText="limitText"
                :loading="loading"
                :loadingText="loadingText"
                :loadOptions="loadOptions || loadOptionsFM"
                :matchKeys="matchKeys"
                :maxHeight="maxHeight"
                :multiple="multiple"
                :name="name"
                :noChildrenText="noChildrenText"
                :noOptionsText="noOptionsText"
                :noResultsText="noResultsText"
                :normalizer="normalizer"
                :openDirection="openDirection"
                :openOnClick="openOnClick"
                :openOnFocus="openOnFocus"
                :options="options"
                :placeholder="placeholder"
                :required="required"
                :retryText="retryText"
                :retryTitle="retryTitle"
                :searchable="searchable"
                :searchNested="searchNested"
                :searchPromptText="searchPromptText"
                :showCount="showCount"
                :showCountOf="showCountOf"
                :showCountOnSearch="showCountOnSearch"
                :sortValueBy="sortValueBy"
                :tabIndex="tabIndex"
                :valueConsistsOf="valueConsistsOf"
                :valueFormat="valueFormat"
                :zIndex="zIndex"
                @open="handleOpened"
                @close="handleClosed"
                @input="handleInputValueChanged"
                @select="handleSelected"
                @deselect="handleDeselected"
                @search-change="handleSearchChanged"
            >
            <!-- 良心功能：可关键字查询 -->
            <pre class="result">{{ value }}</pre>
            <!-- 自定义节点样式；node.raw.XXXX 可以引用到节点的具体属性（可见于官网api）-->
            <!-- slot 不管 v-if 的...!!!，所以干脆 -->
            <label v-if="disticClass" :slot="disticClass?'option-label':''" slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }" :class="labelClassName">
                <span v-if="!node.raw.leaf" class="tree_parent_node">{{ node.label }}</span>
                <span v-if="node.raw.leaf" class="tree_leaf_node">{{ node.label }}</span>
            </label>
            <div slot="value-label" slot-scope="{ node }">{{ label(node) }}</div>
        </tree-select>

    </div>
</template>

<script>
    import Props from './mixins/props'
    // 一个延迟函数，模拟加载中的效果
    const simulateAsyncOperation = fn => {
        setTimeout(fn, 500)
    }
    export default {
        name: 'mars-select',
        mixins:[
            Props
        ],
        computed: {
            // 根据外界定义的输入框宽度，算tags的允许最大宽度
            // 1.28 弃用此方法，改用 总值-允许值（40）的方式反算
            // maxTagsWidth() {
            //     // return this.itemWidth ? (this.itemWidth - 50) : (200 - 50)
            //     return // // console.log('11', this.$refs.select);
            // },
            itemStyle() {
                const { itemWidth } = this
                if (itemWidth) {
                    return `width: ${itemWidth}px;`
                }
                return ''
            },
            label() {
                return (node)=> {
                    if(node.label.indexOf('unknown')!==-1&&this.options.length){
                        this.$emit("nomatch",node)
                    }
                    return node.label
                }
            }
        },

        watch: {
            // 7.4 重新解决该组件默认值的问题
            // defaultValue:{
            //     // 默认值只要有变化，通常真正作用是在重置时，只要 defaultValue 置为空了，则即可触发此变化，使得value响应变化
            //     handler(n, o){
            //         console.log('this.defaultValue：：', this.defaultValue);
            //         this.value = this.defaultValue
            //     },
            //     immediate: true,
            // },
            defaultValue: {
                // 默认值只要有变化，通常真正作用是在重置时，只要 defaultValue 置为空了，则即可触发此变化，使得value响应变化
                handler(newVal) {
                    // 2022.5.10+ 修复bug 17274
                    if (this.multiple) {
                        if( newVal === void(0) ){
                            this.value = null
                        } else {
                            if (typeof newVal === 'object') {
                                this.value = [ ...newVal ]
                            } else {
                                this.value = [ newVal ]
                            }
                        }
                    } else {
                        this.value = newVal? newVal: null
                    }
                },
                deep: true,
                immediate: true
            }
        },

        data() {
            return {
                value: null,
                tagsOverflow: false,
                tagsWidth: {
                    width: 0
                },
                maxTagsWidth: 0,
                ID: 0,
            }
        },
        methods: {

            handleOpened(id) {
                this.$emit('open', id)
            },
            handleClosed(value, id) {
                this.$emit('close', value, id)
            },

            handleSelected(node, id) {
                this.$emit('select', node, id)
            },
            handleDeselected(node, id) {
                this.$emit('deselect', node, id)
            },
            handleSearchChanged(searchQuery, id) {
                this.$emit('search-change', searchQuery, id)
            },

            // 此函数最重要，由此函数承载下层 children 的渲染工作，是 undefined 还是 [XXX,...]，还是 []
            // 外界可以传不同的 loadOptions 方法进来，
            loadOptionsFM({ action, parentNode, callback }){
                // // console.log(12212121);
                // // console.log('parentNode', parentNode);


                // 平行数组的情况，会自然满足 parentNode === undefined 条件，并执行callback()
                if (action === 'LOAD_ROOT_OPTIONS') {
                    if (parentNode === undefined) {
                        callback()
                    }
                }

                // 加载children的情况
                if (action === 'LOAD_CHILDREN_OPTIONS') {
                    // console.log(22222222221);
                    if(!this.joint){
                        // 2019.3.13 正常非拼接树的情况
                        if (parentNode.children === undefined) {
                                // = undefined 会将节点渲染成末级节点（showCount不显示0，节点前不会有折叠按钮）
                                parentNode.children = undefined
                                callback()
                        } else if (parentNode.children === null){
                            if( parentNode.leaf === undefined || parentNode.leaf === true){
                                parentNode.children = undefined
                                callback()
                            }
                        } else {
                            // 有children的情况
                            // = [] 会将节点渲染成父级节点，这是很重要的区分
                            parentNode.children = []
                            callback()
                        }
                    }else{
                        // 2019.3.13 拼接树的情况
                        if (parentNode.children === undefined) {
                            // 如果直接 = undefined 了，直接渲染成 叶子
                            parentNode.children = undefined
                            callback()
                        }else if(parentNode.children === null){
                            // 如果 = null，要判断当前节点的 leaf 值
                            if( parentNode.leaf === true){
                                // 如果 leaf = true，则说明是 叶子了，渲染成叶子
                                parentNode.children = undefined
                                callback()
                            }else{
                                // 否则，说明是 没有子的父，为避免出现 no-sub Note 的提示，则手动模拟加进去一个不影响使用的 数据；
                                // 以此便于渲染
                                parentNode.children = [{uniqueCode: 'custom_'+ this.ID++}]
                                callback()
                            }
                        }else{
                            parentNode.children = []
                            callback()
                        }
                    }

                }
            },

            /**
             * vue-treeselect 的 @input 处理回调；
             * @param {*} val 返回的选中值, [] 或者 ''
             * @param {*} id 返回值的 id, 此处并未有实际用处
             */
            handleInputValueChanged(val, id) {
                this.$emit('input', val, id)  // 2019.7.4 !!! 注意，之前对此回调的处理，需要多处理一次设置默认值的动作
                this.$nextTick(() => {
                    if (val && val.length) {
                        // 算已经选择的选项对应的 tags 的宽度
                        this.calculateSelectTagsWidth(this.$refs.select.$children[0].$children[0].$children[0])
                    } else {
                        // 如果当前value为[]，则自动让 tagsWidth 置为 0
                        this.tagsWidth.width = 0
                    }
                    let tmp = this.$refs.select.$children[0].$children[0].$el.offsetWidth;
                    // // // console.log('aaa', this.$refs.select.$children[0].$children[0].$el.offsetWidth);
                    // 如果算完之后，tags 的宽度 + 28 还大于 maxTagsWidth，则出现 ... 块
                    // 28px 是 ... 块的宽度
                    // // // console.log('this.tagsWidth：', this.tagsWidth);
                    // // // console.log('this.maxTagsWidth', this.maxTagsWidth);
                    // if (this.tagsWidth.width + 28 > this.maxTagsWidth) {  // 不用再加28
                    if (this.tagsWidth.width > tmp - 40) {
                        this.tagsOverflow = true;
                    } else {
                        // 否则 ... 块消失
                        this.tagsOverflow = false;
                    }
                })
            },
            // 计算已选择的选项，加起来的width
            calculateSelectTagsWidth($el) {
                // // // console.log('$el', $el);
                let width = 0
                let { $children } = $el
                if ($children && $children.length > 0) {
                    $children.map(now => {
                        // 只找 multi-value-item 的元素，累加 offsetWidth
                        if (now.$el.className.indexOf('multi-value-item')) {
                            width += now.$el.offsetWidth
                        }
                    })
                }
                // // // console.log('this.tagsWidth：', this.tagsWidth);
                this.tagsWidth.width = width // 得用对象记录最终结果，否则无效..
            },
        },
        created() {
           this.ID = 0
        },

    }
</script>

<style scoped>
</style>

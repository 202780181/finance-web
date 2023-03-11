<template>
    <el-form
        v-if="forms"
        ref="form"
        :model="params"
        :inline="inline"
        :label-width="labelWidth ? (labelWidth + 'px') : ''"
        class="mars-crud-search-form"
        @keyup.enter.native="handleEnter"
    >
        <el-form-item
            v-for="(form, index) in forms"
            :key="index"
            :prop="['daterange','monthrange','mutiInput'].indexOf(form.fieldType)==-1? form.prop : form.prop[0]"
            :label="form.label"
            :rules="form.rules || []"
            :label-width="form.labelWidth ? (form.labelWidth + 'px') : ''"
            :class="{
        'searched': true,
        'long-form-label': $setting.isLongLabel( form.label, labelWidth + 'px')
       }"
        >
            <!-- 按钮
      <el-button-group  v-if="form.fieldType === 'btns'" >
          <el-button
            v-for="(item,index) in form.btns"
            :key="index"
            :type="item.type || 'prinmary'"
            :icon="item.icon || ''"
            @click="item.click">
          {{ item.text }}
         </el-button>
            </el-button-group>-->

            <!-- 自定义左输入框右按钮的情况，1.17 -->
            <!-- :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : '')" -->
            <span v-if="form.fieldType === 'modalInput'">
                <!-- 1.18 当form传了click，则readOnly 必须为true -->
                <el-input
                    ref="modalInput"
                    v-if="form.click"
                    v-model="form.splitMark?form.textValue.join(form.splitMark):form.textValue.join()"
                    :size="form.size ? form.size : size"
                    :readonly="true"
                    :disabled="form.disabled"
                    :placeholder="'点击后弹窗中选择'"
                    :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : '')"
                    @click.native="form.click"
                    clearable
                >
                    <el-button
                        v-if="form.append"
                        slot="append"
                        :icon="form.append.icon"
                        @click="form.append.click"
                    >{{ form.append.text }}</el-button>
                </el-input>
                <!-- 1.18 当form 不传click，则readOnly 必须是false  -->
                <!-- !!!!!!!  暂时此项还没有实现，但请勿删除此段代码  !!!!!! -->
                <!-- <el-input
            v-else
            v-model="form.searchValue"
            :size="form.size ? form.size : size"
            :readonly="false"
            :disabled="form.disabled"
            :placeholder="form.placeholder || '请输入'"
            :style="{width: '188px'}"
            clearable
            @keyup.enter.native="handleEntertoOpenModal"
            >
            <el-button v-if="form.append" slot="append"
                :icon="form.append.icon"
                @click="form.append.click"
            >
                {{ form.append.text }}
            </el-button>
                </el-input>-->
                <!-- !!!!!!!  暂时此项还没有实现，但请勿删除此段代码  !!!!!! -->

                <el-button
                    v-if="form.btns"
                    v-for="(item,index) in form.btns"
                    :disabled="form.disabled"
                    :key="index"
                    :type="item.type"
                    :icon="item.icon || ''"
                    @click="item.click"
                >{{ item.text }}</el-button>
                <input type="hidden" :value="params[form.modelValue]"/>
            </span>

            <!-- 自定义选择框的情况 === 拿字典的情况，1.16 -->
            <!-- 2019.7.4 调整重置的处理逻辑（包含单选多选） -->
            <mars-selector
                ref="mselector"
                v-if="form.fieldType === 'mselector'"
                v-model="params[form.modelValue]"
                :defaultValue="form.defaultVal"
                :itemWidth="form.itemWidth"
                :code="form.code"
                :normalizer="form.normalizer"
                :multiple="form.multiple"
                :valueFormat="form.valueFormat"
                :placeholder="form.placeholder"
                @input="(val,id)=>handleSelectByMselector(val,id,form)"
                @keyup.enter.native="handleEnter"
            ></mars-selector>

            <!-- 自定义选择框的情况 === 自定义选项的情况（非拿字典的情况），1.16 -->
            <mars-select
                ref="mselect"
                v-model="params[form.modelValue]"
                :defaultValue="form.defaultVal"
                v-if="form.fieldType === 'mselect'"
                :itemWidth="form.itemWidth"
                :options.sync="(!form.options || form.loadOptions)?null:form.options"
                :normalizer="form.normalizer"
                :multiple="form.multiple"
                :valueFormat="form.valueFormat"
                :loadOptions="form.loadOptions"
                :placeholder="form.placeholder"
                @input="(val,id)=>handleSelectByMselector(val,id,form)"
                @keyup.enter.native="handleEnter"
            ></mars-select>

            <!-- input框 -->
            <el-input
                v-if="(form.fieldType === 'input' || form.fieldType === undefined)"
                v-model.trim="params[form.modelValue]"
                :size="form.size ? form.size : size"
                :readonly="form.readonly"
                :disabled="form.disabled"
                :placeholder="form.placeholder || '请输入'"
                class="prefix_input_tmp"
                :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : '')"
                clearable
                @keyup.enter.native="handleEnter"
            >
                <el-select v-model="params[form.preProp]" slot="prepend"
                           :style="{width:form.preWidth?'preWidth'+px:'80px'}"
                           class="input-prefix-clz"
                           v-if="form.preProp && form.preList && form.preList.length>0">
                    <el-option v-for="(item,index) in form.preList" :label="item.label" :key="index"
                               :value="item.value">
                    </el-option>
                </el-select>
            </el-input>
            <!-- mutiInput -->
            <div v-if="form.fieldType === 'mutiInput'"
                 class="mutiInput"
                 ref="mutiInput"
                 :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : '')">
                <el-input
                    v-model.trim="params[form.prop[0]]"
                    :size="form.size ? form.size : size"
                    :readonly="form.readonly"
                    :disabled="form.disabled"
                    :placeholder="form.placeholder?form.placeholder[0]:'请输入'"
                    class="prefix_input_tmp"
                    clearable
                    @keyup.enter.native="handleEnter">
                </el-input>
                <span style="margin:0 5px">-</span>
                <el-input
                    v-model.trim="params[form.prop[1]]"
                    :size="form.size ? form.size : size"
                    :readonly="form.readonly"
                    :disabled="form.disabled"
                    :placeholder="form.placeholder?form.placeholder[1]:'请输入'"
                    class="prefix_input_tmp"
                    clearable
                    @keyup.enter.native="handleEnter">
                </el-input>
            </div>
            <!-- 下拉框-->
            <el-select
                v-else-if="form.fieldType === 'select'"
                v-model="params[form.modelValue] || form.default"
                :size="form.size ? form.size : size"
                :disabled="form.disabled"
                :placeholder="form.placeholder || '请选择'"
                :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : '')"
                clearable
                @keyup.enter.native="handleEnter"
            >
                <el-option
                    v-for="(option, optionIndex) in form.options"
                    :key="optionIndex + '_local'"
                    :value="(typeof option === 'object') ? option[form.valueKey || 'value'] : option"
                    :label="(typeof option === 'object') ? option[form.labelKey || 'label'] : option"
                />
                <el-option
                    v-for="(op, opIndex) in selectOptions[selectOptionPrefix + index]"
                    :key="opIndex + '_remote'"
                    :value="(typeof op === 'object') ? op[form.valueKey || 'value'] : op"
                    :label="(typeof op === 'object') ? op[form.labelKey || 'label'] : op"
                />
            </el-select>
            <!-- 日期-->
            <el-date-picker
                v-else-if="form.fieldType === 'date'"
                v-model="params[form.modelValue]"
                :placeholder="form.placeholder"
                :size="form.size ? form.size : size"
                :disabled="form.disabled"
                :readonly="form.readonly"
                :editable="form.editable"
                :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : '')"
                :picker-options="form.pickerOptions || pickerOptions"
                :format="form.format ? form.format:''"
                :value-format="form.valueFormat?form.valueFormat:''"
                type="date"
                @keyup.enter.native="handleEnter"
            />
            <!-- 月份-->
            <el-date-picker
                v-else-if="form.fieldType === 'month'"
                v-model="params[form.modelValue]"
                :placeholder="form.placeholder"
                :size="form.size ? form.size : size"
                :disabled="form.disabled"
                :readonly="form.readonly"
                :editable="form.editable"
                :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : '')"
                :picker-options="form.pickerOptions || {}"
                :format="form.format ? form.format:''"
                :value-format="form.valueFormat?form.valueFormat:''"
                type="month"
                @keyup.enter.native="handleEnter"
            />
            <!-- 多选框 checkbox -->
            <el-checkbox-group
                v-else-if="form.fieldType === 'checkbox'"
                v-model="params[form.modelValue]"
                :size="form.size ? form.size : size"
                :disabled="form.disabled"
                :style="{marginLeft:form.marginLeft?form.marginLeft:'',marginRight:form.marginRight?form.marginRight:''}"
                @change="form.onChangeValue?form.onChangeValue(params[form.modelValue]):false"
                :class="form.class">
                <el-checkbox
                    v-for="(item, index) in form.options"
                    :key="index"
                    :name="item['name']"
                    :label="item['label']">
                    {{item['name']}}
                </el-checkbox>
            </el-checkbox-group>
            <!-- 日期范围-->
            <!--  :value-format="form.valueFormat || 'yyyy-MM-dd'" -->
            <el-date-picker
                v-else-if="form.fieldType === 'daterange'"
                v-model="params[form.modelValue]"
                :size="form.size ? form.size : size"
                :disabled="form.disabled"
                :readonly="form.readonly"
                :editable="form.editable"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : 'width: 260px')"
                :picker-options="form.pickerOptions || pickerOptions2"
                type="daterange"
                @input="date => changeDate(date, form.prop[0], form.prop[1])"
                @keyup.enter.native="handleEnter"
            />
            <!-- todo 月份范围-->
            <!--  :value-format="form.valueFormat || 'yyyy-MM'" -->
            <!-- <custom-date-picker
                v-else-if="form.fieldType === 'monthrange'"
                v-model="params[form.modelValue]"
                :size="form.size ? form.size : size"
                :disabled="form.disabled"
                :readonly="form.readonly"
                :editable="form.editable"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                :style="itemStyle + (form.itemWidth ? `width: ${form.itemWidth}px;` : 'width: 260px')"
                type="monthrange"
                @input="date => changeMonth(date, form.prop[0], form.prop[1])"
                @keyup.enter.native="handleEnter"
            /> -->
            <!-- 自定义slot-->
            <template v-else-if="form.fieldType === 'slot'">
                <slot :name="form.slotName"/>
            </template>
            <!--TODO 持续开发中-->
        </el-form-item>
        <!--
        html 特性
            当 form 标签下, 只有一个 input 标签的时候, 点击 enter 会自动提交
            添加一个隐藏 input 解决 enter 问题
        -->
        <el-form-item v-show="false">
            <input type="text" style="display:none"/>
        </el-form-item>
        <div class="mars-crud-search">
            <div v-if="fns && fns[0]" class="mars-crud-search-standard-btns">
                <el-button type="primary" icon="ibps-icon-search" @click="fns[0]">查询</el-button>
            </div>
            <div v-if="fns && fns[1]" class="mars-crud-search-standard-btns">
                <el-button type="primary" icon="ibps-icon-refresh" @click="fns[1]">重置</el-button>
            </div>
            <div v-if="fns && fns[2]" class="mars-crud-search-standard-btns">
                <el-button type="primary" icon="ibps-icon-detail" @click="fns[2]" v-if="false">更多条件</el-button>
            </div>
        </div>
    </el-form>
</template>

<script>
    import {formProps} from "./props.js"
    import request from "@/utils/request"
    import MarsSelector from "@/business/mars-selector"
    import MarsSelect from "@/components/mars-select"
    import _clonedeep from "lodash.clonedeep"
    import myUtil from '@/utils/myUtil'
    // import CustomDatePicker from "@/components/custom-date-picker"

    export default {
        name: "ibps-search-form",
        props: formProps,
        components: {
            MarsSelector,
            MarsSelect,
            // CustomDatePicker,
        },
        data() {
            const {forms, fuzzy} = this.$props
            const datePrefix = "daterange-prefix"
            const selectOptionPrefix = "select-option-prefix"
            const dataObj = {
                selectOptions: {},
            }
            const params = {}
            const format = {}
            const fuzzyOps = {}
            // console.log("mars-forms is", forms)
            forms.forEach((v, i) => {
                const propType = typeof v.prop
                if (propType === "string") {
                    v.modelValue = v.prop
                    params[v.prop] = ""
                    fuzzyOps[v.prop] = v.fuzzy ? v.fuzzy : fuzzy
                    if (v.format) {
                        format[v.prop] = v.format
                    }
                } else if (
                    propType === "object" &&
                    Object.prototype.toString.call(v.prop) === "[object Array]"
                ) {
                    v.prop.forEach(vv => {
                        params[vv] = ""
                        if (v.format) {
                            format[vv] = v.format
                        }
                        fuzzyOps[vv] = v.fuzzy ? v.fuzzy : fuzzy
                    })
                }
                if (v.fieldType === "daterange") {
                    // 1.19 注释此段，mars范围内不需要此字段
                    // 2.15 不能浪费此处处理的机会，数组也直接当单个值绑
                    v.modelValue = "daterange" + i
                    if (v.default && v.default.length > 0) {
                        params[v.prop[0]] = v.default[0]
                            ? `${v.default[0].getFullYear()}-${(
                                "0" +
                                (v.default[0].getMonth() + 1)
                            ).substr(-2)}-${("0" + v.default[0].getDate()).substr(
                                -2
                            )} 00:00:00`
                            : ""
                        params[v.prop[1]] = v.default[1]
                            ? `${v.default[1].getFullYear()}-${(
                                "0" +
                                (v.default[1].getMonth() + 1)
                            ).substr(-2)}-${("0" + v.default[1].getDate()).substr(
                                -2
                            )} 23:59:59`
                            : ""
                    } else {
                        v.default = []
                    }
                } else if (v.fieldType === "monthrange") {
                    // 1.19 注释此段，mars范围内不需要此字段
                    // 2.15 不能浪费此处处理的机会，数组也直接当单个值绑
                    v.modelValue = "monthrange" + i
                } else if (
                    v.fieldType === "mselect" ||
                    v.fieldType === "mselector" ||
                    v.fieldType === "modalInput"
                ) {
                    if (v.isArray) {
                        params[v.prop] = []
                    }
                    // console.log('v1', v);
                    // console.log('params1', params);
                } else if (
                    v.fieldType === "select" &&
                    (v.selectFetch || v.selectUrl)
                ) {
                    const dataKey = selectOptionPrefix + i
                    dataObj.selectOptions[dataKey] = []
                    if (!v.selectMethod) {
                        v.selectMethod = "get"
                    }
                    this.getRemoteData({
                        fetch: v.selectFetch
                            ? v.selectFetch
                            : () => {
                                const p =
                                    v.selectMethod.toLowerCase() === "get"
                                        ? {params: v.selectParams}
                                        : v.selectParams
                                return request({
                                    url: v.selectUrl,
                                    method: v.selectMethod,
                                    p,
                                })
                            },
                        dataKey,
                        resultField: v.resultField || "data",
                        resultHandler: v.resultHandler,
                    })
                } else if (v.fieldType === "checkbox") {
                    if (v.defaultValue) {
                        params[v.prop] = v.defaultValue instanceof Array ? v.defaultValue : [v.defaultValue]
                    } else {
                        params[v.prop] = []
                    }
                } else if (v.fieldType === 'input' || v.fieldType === undefined) {
                    if (v.preProp) {
                        params[v.preProp] = ''
                    }
                }
            })
            // console.log("translate search from params is ", params)
            return {
                params,
                datePrefix,
                selectOptionPrefix,
                ...dataObj,
                format,
                fuzzyOps,
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                picker.$emit('pick', new Date());
                            }
                        },
                        {
                            text: '昨天',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                picker.$emit('pick', date);
                            }
                        },
                        {
                            text: '一周前',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', date);
                            }
                        }
                    ]
                },
                pickerOptions2: {
                    // 2019.1.19 新增常用的3种快捷方式
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                const end = new Date()
                                const start = new Date()
                                picker.$emit("pick", [start, end])
                            }
                        },
                        {
                            text: "最近一周",
                            onClick(picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 7
                                )
                                picker.$emit("pick", [start, end])
                            },
                        },
                        {
                            text: "最近一个月",
                            onClick(picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 30
                                )
                                picker.$emit("pick", [start, end])
                            },
                        },
                        {
                            text: "最近三个月",
                            onClick(picker) {
                                const end = new Date()
                                const start = new Date()
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 90
                                )
                                picker.$emit("pick", [start, end])
                            },
                        },
                        {
                            text: "下周",
                            onClick(picker) {
                                const end = new Date()
                                const start = new Date()
                                end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
                                picker.$emit("pick", [start, end])
                            },
                        },
                        {
                            text: "下个月",
                            onClick(picker) {
                                const end = new Date()
                                const start = new Date()
                                end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
                                picker.$emit("pick", [start, end])
                            },
                        },
                        {
                            text: "下三个月",
                            onClick(picker) {
                                const end = new Date()
                                const start = new Date()
                                end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
                                picker.$emit("pick", [start, end])
                            },
                        }, {
                            text: '只选开始日期',
                            onClick(picker) {
                                let start = ""
                                if (myUtil.isDateTime(picker.minDate)) {
                                    start = new Date(picker.minDate)
                                } else if (myUtil.isDateTime(picker.maxDate)) {
                                    start = new Date(picker.maxDate)
                                }
                                picker.$emit("pick", [start, ''])
                                // let start = ""
                                // if (
                                // 	(picker.minDate && picker.maxDate === null) ||
                                // 	(picker.maxDate && picker.minDate === null)
                                // ) {
                                // 	if (picker.maxDate) {
                                // 		start = new Date(picker.maxDate)
                                // 	} else if (picker.minDate) {
                                // 		start = new Date(picker.minDate)
                                // 	}
                                // }
                                // picker.$emit("pick", [start, ''])
                            },
                        }, {
                            text: '只选结束日期',
                            onClick(picker) {
                                let end = ""
                                if (myUtil.isDateTime(picker.maxDate)) {
                                    end = new Date(picker.maxDate)
                                } else if (myUtil.isDateTime(picker.minDate)) {
                                    end = new Date(picker.minDate)
                                }
                                picker.$emit("pick", ['', end])
                                // let end = ''
                                // if ((picker.minDate && picker.maxDate === null) || (picker.maxDate && picker.minDate === null)) {
                                // 	if (picker.maxDate) {
                                // 		end = new Date(picker.maxDate)
                                // 	} else if (picker.minDate) {
                                // 		end = new Date(picker.minDate)
                                // 	}
                                // }
                                // picker.$emit('pick', ['', end]);
                            }
                        }],
                    onPick(obj) {
                        // console.log('点击日期时的obj', obj);
                    },
                },
            }
        },
        computed: {
            itemStyle() {
                const {itemWidth} = this
                if (itemWidth) {
                    return `width: ${itemWidth}px;`
                }
                return ""
            },
        },
        methods: {
            // 2019.7.4 默认处理自封装多选控件的处置默认值的逻辑
            handleSelectByMselector(val, id, form) {
                form.defaultVal = val
            },

            defaultClick() {
                console.log(11111)
            },
            /**
             * 处理回车
             */
            handleEnter() {
                this.$emit("search")
            },

            // 1.18 modal型的选择input框时，自定义打开模态框，将此消息传回给调用者
            handleEntertoOpenModal() {
                this.$emit("modal-input-enter")
            },

            isArray(value) {
                return (
                    typeof value === "object" &&
                    Object.prototype.toString.call(value) === "[object Array]"
                )
            },
            getParamFuzzy() {
                return this.fuzzyOps
            },

            // 自定义转化 mars-select 及 mars-selector 的参数
            replaceSelectValue(obj, prop, arr, key) {
                let tmp = []
                arr.map(val => {
                    tmp.push(val[key])
                })
                obj[prop] = tmp.join(",")
            },

            /**
             * 获取参数
             */
            getParams(callback, en) {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        this.$refs["form"].clearValidate()
                        const {params, datePrefix, format, forms} = this
                        const formattedForm = {}
                        // console.log('params2', params);
                        // console.log('forms', forms);
                        let fieldTypeMap = {}
                        // 1.17 专门处理 mars-select 及 mars-selector 组件的 回传值重构
                        forms.forEach(v => {
                            fieldTypeMap[v.prop] = v
                            if (
                                v.fieldType === "mselect" ||
                                v.fieldType === "mselector"
                            ) {
                                let tmp = []
                                if (v.multiple) {
                                    // 多选情况下
                                    if (v.ids) {
                                        // 当要求传 ids 时
                                        if (
                                            !v.valueFormat ||
                                            v.valueFormat === "object"
                                        ) {
                                            // 不传时，按默认的返回对象数组
                                            if (v.identity) {
                                                // 当要生成ids时，且此时标识字段不为空
                                                // 同时也要先判断当前这一项目有没有选值，如果没有，则通过 join 也是 ''
                                                // 2019.1.22 因为第一次赋值后，第二次如果不修改原值，原值已经变为 , 字符串，因此为避免此情况，需做判断
                                                // if(params[v.prop]){
                                                if (
                                                    Object.prototype.toString.call(
                                                        params[v.prop]
                                                    ) === "[object Array]"
                                                ) {
                                                    if (params[v.prop]) {
                                                        params[v.prop].map(now => {
                                                            tmp.push(typeof (now) !== "object" ? now : now[v.identity])
                                                        })
                                                    }
                                                    if (!v.isArray) {
                                                        params[v.prop] = tmp.join(",")
                                                    } else {
                                                        params[v.prop] = tmp
                                                    }
                                                } else {
                                                    // do nothing
                                                }
                                            } else {
                                                // 说明 identity 没传，抛出错误
                                                throw new Error(
                                                    "can't read property of 'identity'"
                                                )
                                            }
                                        } else if (v.valueFormat === "id") {
                                            // 则默认返回的就是数组
                                            // 2019.1.22 同理上面的bug
                                            if (
                                                Object.prototype.toString.call(
                                                    params[v.prop]
                                                ) === "[object Array]"
                                            ) {
                                                params[v.prop] = params[v.prop]
                                                    ? params[v.prop].join(",")
                                                    : tmp.join(",")
                                            } else {
                                                // do nothing
                                            }
                                        } else {
                                            // 说明传了个既不是 id 也不是 object 的值，抛出错误
                                            throw new Error(
                                                "can't set 'identity' by an illegal word except 'id', or 'object'"
                                            )
                                        }
                                    }
                                } else {
                                    // 单选情况下
                                    if (
                                        !v.valueFormat ||
                                        v.valueFormat === "object"
                                    ) {
                                        // 如果是返回 object 格式
                                        if (v.identity) {
                                            //   console.log('params', params);
                                            //   console.log('v.prop', v.prop);
                                            //   console.log('params[v.prop]', params[v.prop]);
                                            // 有标识字段才可以选值，否则不可选
                                            // 要先判断当前这一项目有没有选值，如果没有，则主动置为空
                                            if (
                                                Object.prototype.toString.call(
                                                    params[v.prop]
                                                ) === "[object Object]"
                                            ) {
                                                params[v.prop] = params[v.prop]
                                                    ? params[v.prop][v.identity]
                                                    : ""
                                            } else {
                                                // do nothing
                                            }
                                        } else {
                                            // 对象格式时，必须传 identity
                                            throw new Error(
                                                "can't read property of 'identity'"
                                            )
                                        }
                                    } else if (v.valueFormat === "id") {
                                        // 如果是返回 id 格式
                                        params[v.prop] = !(params[v.prop] === undefined || params[v.prop] === null)
                                            ? params[v.prop]
                                            : ""
                                    }
                                }
                            }
                            if (v.params !== undefined) {
                                params[v.prop] = v.params.join(',')
                            }
                        })
                        Object.keys(params).forEach(v => {
                            if (fieldTypeMap[v] && fieldTypeMap[v].fieldType === "checkbox" && fieldTypeMap[v].ids && params[v]) {
                                formattedForm[v] = params[v].join(',')
                            }
                            // 区分开 ibps 与 mars 的处理逻辑
                            else if (en === "mars") {
                                // console.log('params[v]', params[v]);
                                formattedForm[v] = params[v]
                            } else {
                                // console.log(2222);
                                if (v.indexOf(datePrefix) === -1) {
                                    const val = format[v]
                                        ? format[v](params[v], v)
                                        : params[v]
                                    if (this.$utils.util.isNotEmpty(val)) {
                                        formattedForm[v] = val
                                    }
                                }
                            }
                        })
                        if (callback) callback(null, formattedForm)
                    } else {
                        if (callback) callback(new Error())
                    }
                })
            },
            /**
             *重置表单
             */
            resetSearchForm() {
                this.$refs["form"].resetFields()

                // console.log('this.forms', this.forms);
                // 2019.6.13 重新处理 mselect 组件的重置的问题；
                let mselectForms = this.forms.filter(
                    now => now.fieldType === "mselect"
                )
                if (mselectForms.length) {
                    // 说明有 mselect 类型的组件
                    mselectForms.map(now => {
                        console.log('xxxx now xxxx ', now)
                        now.defaultVal = now.multiple ? [] : null
                        this.params[now.prop] = null  // 2022.5.10+ Bug 17274
                    })
                }
                let mselectorForms = this.forms.filter(
                    now => now.fieldType === "mselector"
                )
                if (mselectorForms.length) {
                    // 说明有 mselect 类型的组件
                    mselectForms.map(now => {
                        now.defaultVal = now.multiple ? [] : null
                    })
                }

                if (this.$refs["modalInput"]) {
                    this.forms.map(now => {
                        if (now.fieldType === "modalInput") {
                            now.textValue = []
                            now.initialValue = []
                            if (now.params) now.params = []
                        }
                    })
                }
                if (this.$refs["mutiInput"]) {
                    this.forms.map(now => {
                        if (now.fieldType === "mutiInput") {
                            this.params[now.prop[0]] = ""
                            this.params[now.prop[1]] = ""
                        }
                    })
                }
                // 2.15 对日期范围选择框做重置
                this.forms.map((now, i) => {
                    let key = "daterange" + i
                    if (now.fieldType === "daterange") {
                        this.params[now.prop[0]] = ""
                        this.params[now.prop[1]] = ""
                        if (this.params[key]) {
                            this.params[key] = "" // daterange 完全是自定义的字段，非此不可
                        }
                    }

                    key = "monthrange" + i
                    if (now.fieldType === "monthrange") {
                        this.params[now.prop[0]] = ""
                        this.params[now.prop[1]] = ""
                        if (this.params[key]) {
                            this.params[key] = "" // monthrange 完全是自定义的字段，非此不可
                        }
                    }
                })

                // console.log('this.params', this.params);
                // console.log('this.forms', this.forms);
            },

            changeDate(date, startDate, endDate) {
                // console.log('date', date);
                // console.log('startDate', startDate);
                // console.log('endDate', endDate);
                let dates
                if (date === null) {
                    this.params[startDate] = ""
                    this.params[endDate] = ""
                    return
                }
                if (typeof date === "string") {
                    dates = date.split(" - ")
                } else if (date && date.hasOwnProperty("length")) {
                    const firstDate = date[0]
                    const secondDate = date[1]
                    dates = [
                        firstDate
                            ? `${firstDate.getFullYear()}-${(
                                "0" +
                                (firstDate.getMonth() + 1)
                            ).substr(-2)}-${("0" + firstDate.getDate()).substr(
                            -2
                            )} 00:00:00`
                            : "",
                        secondDate
                            ? `${secondDate.getFullYear()}-${(
                                "0" +
                                (secondDate.getMonth() + 1)
                            ).substr(-2)}-${("0" + secondDate.getDate()).substr(
                            -2
                            )} 23:59:59`
                            : "",
                    ]
                    // console.log('dates：', dates);
                }
                this.params[startDate] = dates[0]
                this.params[endDate] = dates[1]
            },
            changeMonth(date, startDate, endDate) {
                // console.log('date', date);
                // console.log('startDate', startDate);
                // console.log('endDate', endDate);
                let dates
                if (date === null) {
                    this.params[startDate] = ""
                    this.params[endDate] = ""
                    return
                }
                if (typeof date === "string") {
                    dates = date.split(" - ")
                } else if (date && date.hasOwnProperty("length")) {
                    const firstDate = date[0]
                    const secondDate = date[1]
                    dates = [
                        firstDate
                            ? `${firstDate.getFullYear()}-${(
                                "0" +
                                (firstDate.getMonth() + 1)
                            ).substr(-2)}`
                            : "",
                        secondDate
                            ? `${secondDate.getFullYear()}-${(
                                "0" +
                                (secondDate.getMonth() + 1)
                            ).substr(-2)}`
                            : "",
                    ]
                    // console.log('dates：', dates);
                }
                this.params[startDate] = dates[0]
                this.params[endDate] = dates[1]
            },
            setDefaultDate(prop, value) {
                let form = this.forms.filter(item => item.modelValue === prop)
                if (form && value) {
                    let start = form[0].prop[0]
                    let end = form[0].prop[1]
                    this.$set(this.params, prop, value);
                    let firstDate = value[0]
                    this.params[start] = myUtil.formatDate(firstDate)
                    if (value.length === 2) {
                        let secondDate = value[1]
                        this.params[end] = myUtil.formatDate(secondDate)
                    }
                }
            },
            setParam(prop, value) {
                Object.keys(this.params).forEach(v => {
                    if (v === prop) {
                        this.params[v] = value
                    }
                })
            },
            setDefaultValue(prop, value) {
                let item = this.forms.find(x => x.prop === prop)
                if (item) {
                    item.defaultVal = value
                }
            },
            setParamModelInput(prop, text, value, isArray) {
                let item = this.forms.find(x => x.prop === prop)
                if (item) {
                    item.textValue = text
                    item.initialValue = value
                    this.params[prop] = isArray ? value : value.join()
                }
            },

            setOptions(prop, options) {
                let item = this.forms.find(x => x.prop === prop)
                if (item) {
                    item.options = options
                }
            },
            // 2.22 获取单个参数当前的值
            getSingleParamValue(prop) {
                let tmp = null
                Object.keys(this.params).forEach(v => {
                    if (v === prop) {
                        tmp = this.params[prop]
                    }
                })
                return tmp
            },
            /**
             * 获取的远程数据【下拉框】
             */
            getRemoteData({fetch, dataKey, resultField, resultHandler}) {
                fetch().then(response => {
                    let result = response
                    if (typeof response === "object" && !this.isArray(response)) {
                        if (resultField.indexOf(".") !== -1) {
                            resultField.split(".").forEach(vv => {
                                result = result[vv]
                            })
                        } else {
                            result = response[resultField]
                        }
                    }
                    if (!result || !(result instanceof Array)) {
                        throw new Error(
                            `The result of key:${resultField} is not Array.`
                        ) // 接口返回的字段:${resultField} 不是一个数组
                    }
                    if (this.resultHandler) {
                        this.selectOptions[dataKey] = result.map(this.resultHandler)
                    } else {
                        this.selectOptions[dataKey] = result
                    }
                })
            },
        },
        watch: {
            forms: function (newVal, oldVal) {
                const {forms, fuzzy} = this.$props
                let params = this.params
                let fuzzyOps = this.fuzzyOps
                let format = this.format
                forms.forEach((v, i) => {
                    const propType = typeof v.prop
                    if (propType === "string") {
                        v.modelValue = v.prop
                        params[v.prop] = ""
                        fuzzyOps[v.prop] = v.fuzzy ? v.fuzzy : fuzzy
                        if (v.format) {
                            format[v.prop] = v.format
                        }
                    } else if (
                        propType === "object" &&
                        Object.prototype.toString.call(v.prop) === "[object Array]"
                    ) {
                        v.prop.forEach(vv => {
                            params[vv] = ""
                            if (v.format) {
                                format[vv] = v.format
                            }
                            fuzzyOps[vv] = v.fuzzy ? v.fuzzy : fuzzy
                        })
                    }
                    if (v.fieldType === "daterange") {
                        // 1.19 注释此段，mars范围内不需要此字段
                        // params[datePrefix + i] = ''
                        // v.modelValue = datePrefix + i
                    } else if (
                        v.fieldType === "mselect" ||
                        v.fieldType === "mselector"
                    ) {
                        // console.log('v1', v);
                        // console.log('params1', params);
                    } else if (
                        v.fieldType === "select" &&
                        (v.selectFetch || v.selectUrl)
                    ) {
                        const dataKey = selectOptionPrefix + i
                        dataObj.selectOptions[dataKey] = []
                        if (!v.selectMethod) {
                            v.selectMethod = "get"
                        }
                        this.getRemoteData({
                            fetch: v.selectFetch
                                ? v.selectFetch
                                : () => {
                                    const p =
                                        v.selectMethod.toLowerCase() === "get"
                                            ? {params: v.selectParams}
                                            : v.selectParams
                                    return request({
                                        url: v.selectUrl,
                                        method: v.selectMethod,
                                        p,
                                    })
                                },
                            dataKey,
                            resultField: v.resultField || "data",
                            resultHandler: v.resultHandler,
                        })
                    }
                })
            },
        },
        mounted() {
            if (this.autoSearch) {
                this.fns[0]()
            }
            // this.$emit()

        }
    }
</script>
<style lang="scss">
    .mutiInput {
        display: flex;

        .el-input {
            flex: 1;
        }
    }

    .prefix_input_tmp input {
        background-color: white !important;
        border: 1px solid #dcdfe6 !important;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        color: black !important;
    }

    .mars-crud-search-standard-btns {
        margin-left: 5px;
    }

    .input-prefix-clz {
        .el-input--suffix {
            width: 100% !important;
        }
    }
</style>

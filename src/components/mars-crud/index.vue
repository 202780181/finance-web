<template>
  <div :class="'container-component '+basicClassName">
    <div ref="ibpsCrud" class="ibps-container-crud mars-local-crud">
      <!-- 工具栏 -->
      <div v-if="showHeader || $slots.header"
           ref="ibpsCrudHeader"
           class="ibps-container-crud__header">
        <div v-if="toolbars"
             :class="['toolbar--' +$ELEMENT.size]"
             class="toolbar">
          <div v-show="searchForm && showToolbar"
               ref="toolbarBox"
               class="toolbar-box clear">
            <template v-if="$slots.searchForm" ref="searchForm">
              <slot :loading="loading" name="searchForm"/>
            </template>
            <template v-else>
              <search-form
                v-if="searchForm"
                ref="searchForm"
                :forms="searchForm.forms||[]"
                :fns="searchForm.fns"
                :size="searchForm.size"
                :fuzzy="searchForm.fuzzy"
                :inline="searchForm.inline"
                :label-width="searchForm.labelWidth"
                :item-width="searchForm.itemWidth"
                :auto-search="searchForm.autoSearch"
                @search="handleActionEvent('search', 'toolbar')"
                @modal-input-enter="handleModalInputEnter"
                @modal-input-clear="handleModalInputClear"
                @hook:mounted="handleTableHeight"
              >
                <template v-for="form in searchFormSlot" :slot="form.slotName">
                  <slot :name="form.slotName"></slot>
                </template>
              </search-form>
            </template>
          </div>
          <div class="toolbar-header"
               v-if="toolbars.length || dynamicCols"
               :class="{
                             'showSearchForm': !showToolbar,
                             'noSearchForm': !searchForm
                         }">
            <div class="buttons">
              <mars-toolbar-local :actions="toolbars" :socpe="thatSocpe" :leftNode="leftNode"
                                  @action-event="handleActionEvent"/>
            </div>
            <div v-if="searchForm && searchForm.hasOwnProperty('forms')" class="tools">
              <el-tooltip
                :content="showToolbar?$t('components.crud.collapse'):$t('components.crud.expand')">
                <a class="expand" @click="handleCollapseExpandToolbar">
                  <!-- <i :class="showToolbar?'el-icon-caret-top':'el-icon-caret-bottom'" /> -->
                  <i style="font-weight:800;color:#000"
                     :class="showToolbar?'el-icon-arrow-up':'el-icon-arrow-down'"/>
                </a>
              </el-tooltip>
            </div>
            <div v-if="dynamicCols" class="tools">
              <el-tooltip content="动态列">
                <a class="expand" @click="handleDynamicColumnToolbar">
                  <i style="font-weight:800;color:#000; vertical-align: middle;"
                     class="ibps-icon ibps-icon-th"></i>
                </a>
              </el-tooltip>
            </div>
          </div>

          <slot name="header"/>
        </div>
      </div>
      <div class="ibps-container-crud__body">
        <!--列表-->
        <!-- :class="canDrag?'fw-drag-table':''" -->
        <el-table
          v-loading="loading"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
          :row-key="pkKey"
          v-if="!isTree && showTable"
          ref="elTable"
          v-bind="options"
          :data="ibpsData"
          :height="tableHeight"
          :show-summary="showSummary"
          :summary-method="summaryMethod"
          :row-class-name="rowClassName"
          :span-method="spanMethod"
          :treeProps="treeProps"
          :header-cell-class-name="headerCellClassName"
          @current-change="handleCurrentChange"
          @select="handleSelect"
          @select-all="handleSelectAll"
          @selection-change="handleSelectionChange"
          @sort-change="handleSortChange"
          @cell-mouse-enter="handleCellMouseEnter"
          @cell-mouse-leave="handleCellMouseLeave"
          @cell-click="handleCellClick"
          @cell-dblclick="handleCellDblclick"
          @row-click="handleRowClick"
          @row-contextmenu="handleRowContextmenu"
          @row-dblclick="handleRowDblclick"
          @header-click="handleHeaderClick"
          @header-contextmenu="handleHeaderContextmenu"
        >
          <!--选择列 多选-->
          <el-table-column
            v-if="(selectionRow || selectionRow === '') && selectionType === 'checkbox'"
            v-bind="typeof selectionRow === 'Object'?selectionRow:null"
            :label="handleAttribute(selectionRow.label, '')"
            :selectable="selectable"
            :reserve-selection="updateDataKeepSelect"
            type="selection"
            align="center"
          />
          <!--选择列 单选-->
          <el-table-column
            v-if="(selectionRow || selectionRow === '') && selectionType === 'radio'"
            :label="selectionRow.label||''"
            align="center"
            :width="selectionRow.width||55">
            <template slot-scope="scope">
              <!-- <el-radio v-model="selectionRadio" :label="scope.row[pkKey]"></el-radio> -->
              <el-radio v-model="selectionRadio" :label="scope.row[pkKey]">&nbps;</el-radio>
            </template>
          </el-table-column>

          <el-table-column align="center" width="60" label="拖动" class="drag-icon-column" v-if="canDrag">
            <template slot-scope="scope">
              <i class="fa fa-bars" aria-hidden="true"></i>
            </template>
          </el-table-column>
          <!-- :fixed="handleAttribute(rowHandle.fixed, 'right')" -->

          <!--操作列begin-->
          <el-table-column
            v-if="rowHandle && !rowHandle.buttonLink"
            v-bind="rowHandle"
            :label="handleAttribute(rowHandle.columnHeader, $t('components.crud.manage'))"
            :width="handleAttribute(rowHandle.width, 50)"
            align="center"
          >
            <template v-if="rowHandle.actions" slot-scope="scope">
              <el-dropdown placement="bottom-start">
                <!-- <ibps-icon name="chevron-circle-down" size="16" /> -->
                <i :class="{
                                    'el-icon-caret-bottom': true,
                                    'operate-btn': true,
                                    }"
                   v-show="handleRowHandleIconHidden(scope.row, rowHandle.actions)"
                />

                <el-dropdown-menu slot="dropdown" class="table-dropdown-menu">
                  <template
                    v-for="(action) in rowHandle.actions"
                  >
                    <el-button
                      v-if="handleRowHandleButtonHidden(action.hidden, scope.row,action)"
                      :key="handleRowHandleButtonAttribute(action,'key')"
                      :style="rowHandle.marginRight?{marginRight: rowHandle.marginRight+'px'}:{}"
                      :disabled="handleRowHandleButtonDisabled(action.disabled, scope.row,action)"
                      :type="handleRowHandleButtonAttribute(action,'type')"
                      :icon="handleRowHandleButtonAttribute(action,'icon')"
                      @click="handleRowHandleButtonAction(action, scope.row,scope.$index)"
                    >{{ handleRowHandleButtonAttribute(action, 'label') }}
                    </el-button>
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>

          <el-table-column
            v-if="rowHandle && rowHandle.buttonLink"
            v-bind="rowHandle"
            :label="handleAttribute(rowHandle.columnHeader, $t('components.crud.manage'))"
            :width="rowHandle.width"
            align="center"
          >
            <el-button-group slot-scope="scope">
              <el-button
                class="button-link"
                type="text"
                v-for="(action) in rowHandle.actions"
                :style="rowHandle.marginRight?{marginRight: rowHandle.marginRight+'px'}:{}"
                v-if="handleRowHandleButtonHidden(action.hidden, scope.row,action)"
                :key="handleRowHandleButtonAttribute(action,'key')"
                :disabled="handleRowHandleButtonDisabled(action.disabled, scope.row,action)"
                @click="handleRowHandleButtonAction(action, scope.row,scope.$index)"
              >{{ handleRowHandleButtonAttribute(action, 'label') }}
              </el-button>
            </el-button-group>
          </el-table-column>

          <!--操作列end-->

          <!--索引号列-->
          <el-table-column
            v-if="indexRow || indexRow === ''"
            v-bind="typeof indexRow === 'Object'?indexRow:null"
            :label="handleAttribute(indexRow.label, $t('components.crud.index'))"
            :width="handleAttribute(indexRow.label, '50px')"
            type="index"
            align="center"
          >
            <template slot-scope="scope">
                              <span v-if="!clickIndex">
                                  {{ (scope.$index + 1) + (currentPage - 1) * pageSize }}
                              </span>
              <el-button
                style="padding: 2px 3px !important;"
                class="handle_btn"
                type="text"
                v-else
                @click="handleClickIndexFun(scope, scope.row)"
                ibps-link>
                {{ (scope.$index + 1) + (currentPage - 1) * pageSize }}
              </el-button>
              <!-- 2.13 全局新增了 rowId 字段 -->
              <!-- <span>{{ scope.row.rowId }}</span> -->
            </template>
          </el-table-column>

          <slot name="prepend-column"/>

          <el-table-column
            v-for="(column, index) in columns"
            :render-header="column.renderHeader"
            :show-overflow-tooltip="true"
            :key="'column1' + index + Math.random()"
            :prop="handleAttribute(column.prop, null)"
            :label="handleAttribute(column.label, '')"
            v-bind="column"
            :align="column.align || 'left'"
            :width="broadWidth? (column.width || (handleAttribute(column.label, '').length * 15 + 80)):column.width"
            :min-width="column.minWidth"
            :label-class-name="column.labelClass"
          >
            <template slot-scope="scope">
              <!-- 2022.3.8+ 单独处理一种有 timeType 标识的字段，这种字段，强制不显示时分秒 -->
              <span v-if="column.timeType" class="ibps-table-column">
                                {{ scope.row[column.prop] | dateWidthoutHMN }}
                            </span>
              <!--时间格式-->
              <span v-else-if="column.dateFormat" class="ibps-table-column">
                                {{ scope.row[column.prop] | dateFormat(column.dateFormat,column.origDateFormat) }}
                            </span>
              <!--通用过滤器-->
              <span v-else-if="column.filter" class="ibps-table-column">
                                {{ Vue.filter(column['filter'])(scope.row[column.prop]) }}
                <!-- {{ (column['filter'])(scope.row[column.prop]) }} -->
                <!-- {{ scope.row[column.prop] | `${column.filter}` }} -->
                              </span>
              <!-- 下拉组件-->
              <span v-else-if="column.options" class="ibps-table-column">
                                <span>{{ handleColumnOptions('label', column.options, scope.row[column.prop]) }}</span>
                            </span>
              <!-- tags组件-->
              <span v-else-if="column.showSucessTag" class="ibps-table-column">
                                 <el-tag v-if="scope.row[column.prop]"
                                         :type="'success'">
                                        <span class="el-icon-check"/>
								</el-tag>
                                <span v-else></span>
                            </span>
              <span v-else-if="column.tags" class="ibps-table-column">

                            <template v-if="column.dataType==='stringArray'">
                                  <span v-if="$utils.util.isEmpty(scope.row[column.prop]) ">{{
                                      column.defaultLabel || ''
                                    }}</span>
                                  <el-tag
                                    v-for="(value,index) in handleColumnDataConvert(scope.row[column.prop])"
                                    v-else
                                    :type="handleColumnOptions('type',column.tags,value,column)"
                                    :key="index">
                                    {{ handleColumnOptions('label', column.tags, value, column) }}
                                  </el-tag>
                            </template>
                            <template v-else-if="column.dataType==='ObjectList'">
                              <span v-if="$utils.util.isEmpty(scope.row[column.prop]) ">{{
                                  column.defaultLabel || ''
                                }}</span>
                              <el-tag v-for="(value,index) in scope.row[column.prop]" v-else :key="index">
                                {{ value[column.tagLabel] }}
                              </el-tag>
                            </template>
                            <template v-else>
                              <el-tag v-if="scope.row[column.prop] != null"
                                      :type="handleColumnOptions('type',column.tags,scope.row[column.prop],column)">{{
                                  handleColumnOptions('label', column.tags, scope.row[column.prop], column)
                                }}</el-tag>
                              <!-- 2019.1.19 新增，如果值是空，则显示 '--' -->
                              <span v-else>{{ ' ' }}</span>
                            </template>
                            </span>
              <!-- link组件-->
              <span v-else-if="column.link" class="ibps-table-column">
                                <a href="javascript:void(0)" class="table-column-link ibps-link"
                                   @click="handleColumnLink(scope.row, column)">{{ scope.row[column.prop] }}</a>
                            </span>
              <!-- linkFilter组件 20190313 新增(实收情况查询页面有用到)-->
              <!-- <span v-else-if="column.linkFilter" class="ibps-table-column ibps-table-column-link-filter">
                <a href="javascript:void(0)" class="table-column-link" @click="handleColumnLink(column,scope.row)">{{ Vue.filter(column['linkFilter'])(scope.row[column.prop]) }}</a>
              </span> -->
              <!-- 20190328 修复3731 -->
              <span v-else-if="column.linkFilter" class="ibps-table-column">
				                <span v-if="$utils.util.isEmpty(scope.row[column.prop])">{{ '--' }}</span>
                <!--<a v-else href="javascript:void(0)" class="table-column-link ibps-table-column-link-filter ibps-link" @click="handleColumnLink(column,scope.row)">{{ Vue.filter(column['linkFilter'])(scope.row[column.prop]) }}</a>-->
                                <span v-else :class="{'ibps-link':column.showLink?column.showLink(scope.row):true}"
                                      @click="handleColumnLink(scope.row, column)">{{
                                    Vue.filter(column['linkFilter'])(scope.row[column.prop])
                                  }}</span>
                            </span>
              <!-- 自定义slot组件-->
              <span v-else-if="column.slotName" class="ibps-table-column">
                                <slot :name="column.slotName" :row="scope.row" :$index="scope.$index"/>
                            </span>
              <!--自定义组件-->
              <render-custom-component
                v-else-if="column.component && column.component.name"
                v-model="scope.row[column.prop]"
                :component-name="column.component.name"
              />
              <!--渲染组件-->
              <render-component
                v-else-if="column.component && column.component.render"
                :render-function="column.component.render"
                :scope="scope"
              />
              <template v-else-if="column.toYMD">
                {{
                  (column.formatter ?
                    column.formatter(scope.row, scope.column, _get(scope.row, column.prop), scope.$index) :
                    (_get(scope.row, column.prop) ?
                        _get(scope.row, column.prop) :
                        '--'
                    )) | timeToYMD
                }}
              </template>
              <template v-else>
                {{
                  column.formatter ?
                    column.formatter(scope.row, scope.column, _get(scope.row, column.prop), scope.$index) :
                    ($utils.util.isEmpty(_get(scope.row, column.prop)) ? ' ' : _get(scope.row, column.prop))
                }}
              </template>
            </template>
            <!--子列 -->
            <template v-if="column.children">
              <!-- <el-table-column
                :show-overflow-tooltip="true"
                v-for="(column2, index2) in column.children"
                :key="index2"
                :label="handleAttribute(column2.title, '')"
                :prop="handleAttribute(column2.key, null)"
                v-bind="column2"
                :width="column2.width"
                :min-width="column2.minWidth"
              > -->
              <!-- 20190319 修改-->
              <el-table-column
                :show-overflow-tooltip="true"
                v-for="(column2, index2) in column.children"
                :key="'column2' + index2 + Math.random()"
                :label="handleAttribute(column2.label, '')"
                :prop="handleAttribute(column2.prop, null)"
                v-bind="column2"
                :width="column2.width"
                :align="column2.align || 'left'"
                :min-width="column2.minWidth"
              >
                <template slot-scope="scope">
                  <!--过滤器-->
                  <span v-if="column2.filter">
                    {{ Vue.filter(column2['filter'])(scope.row[column2.prop]) }}
                  </span>
                  <!-- 下拉组件-->
                  <span v-else-if="column2.options" class="table-column-options">
                    <span>{{ handleColumnOptions('label', column2.options, scope.row[column2.prop]) }}</span>
                  </span>
                  <!-- tags组件-->
                  <span v-else-if="column2.tags" class="table-column-tags">
                    <el-tag :type="handleTags('type',column2.tags,scope.row[column2.prop])">{{
                        handleTags('label', column2.tags, scope.row[column2.prop])
                      }}</el-tag>
                  </span>
                  <!-- link组件-->
                  <span v-else-if="column2.link">
                    <a href="javascript:void(0)" class="table-column-link" @click="handleColumnLink(column2,scope.row)">{{
                        scope.row[column2.prop]
                      }}</a>
                  </span>
                  <span v-else-if="column2.slotName">
                    <slot :name="column2.slotName" :row="scope.row" :$index="scope.$index"/>
                  </span>
                  <!--自定义组件-->
                  <render-custom-component
                    v-else-if="column2.component && column2.component.name"
                    v-model="scope.row[column2.prop]"
                    :component-name="column2.component.name"
                  />
                  <!--渲染组件-->
                  <render-component
                    v-else-if="column2.component && column2.component.render"
                    :render-function="column2.component.render"
                    :scope="scope"
                  />
                  <!-- <template v-else>{{ column2.formatter ? column2.formatter(scope.row, scope.column2, _get(scope.row, column2.prop), scope.$index) : _get(scope.row, column2.prop) }}</template> -->
                  <!-- 20190319 修改-->
                  <template v-else>
                    {{
                      column2.formatter ?
                        column2.formatter(scope.row, scope.column2, _get(scope.row, column2.prop),
                          scope.$index) :
                        ($utils.util.isEmpty(_get(scope.row, column2.prop)) ? '--' : _get(scope.row,
                          column2.prop))
                    }}
                  </template>
                </template>
              </el-table-column>
              <!-- end 子列-->
            </template>
          </el-table-column>


        </el-table>
        <!--树形列表-->
        <ibps-tree-table
          v-loading="loading"
          v-else
          ref="elTable"
          v-bind="options"
          :height="tableHeight"
          :index-row="indexRow"
          :data="ibpsData"
          :columns="columns"
          :selection-row="selectionRow"
          @selection-change="handleSelectionChange"
        />

      </div>
      <!--分页 或底部 自定义底部-->
      <div
        v-if="showPagination || $slots.footer"
        ref="ibpsCrudFooter"
        class="ibps-container-crud__footer "
      >
        <slot name="footer">
          <el-pagination
            :disabled="!openPagination"
            :current-page="currentPage"
            :page-size="pageSize"
            :page-count="pagination[pageCountKey]"
            :total="pagination[totalKey]"
            v-bind="paginationOptions"
            @size-change="handlePaginationSizeChange"
            @current-change="handlePaginationCurrentChange"
            @prev-click="handlePaginationPrevClick"
            @next-click="handlePaginationNextClick"
          >
            <span class="el-pagination__total">{{ pageInfo }}</span>
          </el-pagination>
        </slot>
      </div>

      <!-- 2021.5.17 动态列设置框 -->
      <dynamic-column
        v-if="showDynamicColDialog"
        :title="'动态列设置'"
        :data="sourceColumns"
        :default-check="defaultCheck"
        :originData="originColumns"
        :originDefaultCheckData="originDefaultCheckColumns"
        :profileKey="profileKey"
        :savePromise="savePromise"
        :preSaveValidateMethod="preSaveValidateMethod"
        :config="{
                    valueKey: 'prop',
                    labelKey: 'label',
                    titles: ['待选列', '已显示的列（勾选进行移动）'],
                    appendType: 'before',
                }"
        @close="showDynamicColDialog = false"
        @dynamic-column-confirm="handleConfirmSelectColumn"
      ></dynamic-column>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import base from './mixin/base'
import handleRow from './mixin/handleRow'
import data from './mixin/data'
import search from './mixin/search'
import column from './mixin/column'
import pagination from './mixin/pagination'
import utils from './mixin/utils'
import renderComponent from './components/render-component.vue'
import renderCustomComponent from './components/render-custom-component.vue'
import searchForm from './components/search-form'
// import IbpsTreeTable from '@/components/ibps-tree-table'
import drag from './mixin/drag'

export default {
  name: 'mars-crud',
  components: {
    'render-component': renderComponent,
    'render-custom-component': renderCustomComponent,
    'search-form': searchForm,
    // ibpsColumn
    // 'ibps-tree-table': IbpsTreeTable,
    'dynamic-column': () => import('./components/dynamic-column')
  },
  mixins: [
    base,
    data,
    search,
    column,
    handleRow,
    pagination,
    utils,
    drag,
  ],
  computed: {
    selectNode() {
      //  console.log('this.$selectNode ============>', this.$selectNode);
      return this.$selectNode
    },
  },
  data() {
    return {
      Vue,
    }
  },
}
</script>
<style lang="scss">
.table-dropdown-menu {
  &.el-popper[x-placement^="bottom"] {
    margin-top: -30px;
    padding: 5px 5px;
  }

  .popper__arrow {
    display: none;
  }
}

.button-link {
  :focus {
    text-decoration: underline;
  }

  margin-right: 0 !important;
  padding: 2px 3px !important;

  :hover {
    text-decoration: underline;
  }
}

.button-link + .button-link {
  margin-left: 0 !important;
}

/*.button-link:focus*/
/*.button-link:hover {*/
/*    text-decoration: underline;*/
/*}*/
</style>


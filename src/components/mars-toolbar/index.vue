<template>
  <div v-if="actions" class="ibps-toolbar">
    <template v-for="(button, btnIndex) in actions">
      <template v-if="type === 'icon'">
        <el-tooltip
          :key="button.key"
          :content="getLabel(button)"
          placement="bottom-start"
          >
          <el-button
            v-if="handleActionHidden(button)"
            :key="button.key"
            :size="button.size|| $ELEMENT.size "
            :type="getType(button)"
            :icon="getIcon(button)"
            :disabled="button.disabled"
            class="toolbar-icon"
            :style="button.style"
            @click="emitEventHandler('action-event',button.key, position, button.selectionType, leftNode, scopeData.$selections)"
          />
        </el-tooltip>
      </template>

      <template v-else>

        <!-- 1.19 新增自定义的 dropdown 类型按钮组 -->
        <!-- @mouseout="($event)=>handleMouseMoveOut($event,button)" -->
        <!-- :style="{ height: 32* button.downlist.length + 'px'}" -->
        <template v-if="button.type === 'dropdown'">
            <div class="mars-dropdown-container"
                v-clickoutside="event => handleWhenDropDownIsUnfold(event, button, btnIndex)"
                >
                <el-button
                        :type="button.btnType || 'primary'"
                        :icon="button.icon"
                        :size="button.size||$ELEMENT.size"
                        :style="button.style"
                        :disabled="button.disabled"
                        @click="event =>collapseDropdownList(event, button, btnIndex)"
                    >
                    {{ button.text }}
                    <i :class="{
                        'el-icon--right': true,
                        'el-icon-arrow-down': true,
                        'el-icon-arrow-up': openDropdownFlagList['btn'+btnIndex],
                        }"></i>
                </el-button>
                <div class="mars-dropdown">
                    <div
                        :class="{
                            'mar-dropdown-list': true,
                            'mars-dropdown-list-hide': true,
                            'mars-dropdown-list-show': openDropdownFlagList['btn'+btnIndex],
                        }"
                        >
                        <span
                            v-if="item.show === undefined?true:item.show"
                            class="mars-dropdown-list-a"
                            v-for="(item, index) in button.downlist"
                            :key="index"
                            @mouseup="(button)=>handleMouseUp(button, btnIndex)"
                            @mousedown="item.click"
                            >
                            <i v-if="button.listIcon?button.listIcon:false" :class="['fa', item.icon?('fa-'+ item.icon):'' ]"></i>
                            {{ item.text }}
                        </span>
                    </div>
                </div>
            </div>

        </template>

          <template v-if="button.type === 'mark'">
              <span style="color: red;margin-left: 20px;">{{button.label}}</span>
          </template>
          <template v-if="button.type === 'text'">
              <span style="margin-left: 20px;">{{button.label}}</span>
          </template>
          <template v-else-if="button.type === 'tag'">
              <el-tag style="margin-left: 5px;" :key="button.key" :type="button.btnType || 'danger'">{{ getLabel(button) }}</el-tag>
          </template>
          <template v-else-if="button.type === 'tips'">
              <el-tag style="margin-left: 5px;" :key="button.key" :color="button.color" effect="dark">{{ getLabel(button) }}</el-tag>
          </template>
        <template v-else>
            <el-button
                v-if="handleActionHidden(button)"
                :key="button.key"
                :size="button.size||$ELEMENT.size"
                :type="getType(button)"
                :icon="getIcon(button)"
                :disabled="button.disabled"
                :loading="button.loading"
                :style="button.style"
                :autofocus="false"
                :class="button.className"
                @click="emitEventHandler('action-event',button.key, position, button.selectionType, leftNode, scopeData.$selections)"
                >{{ getLabel(button) }}
            </el-button>
        </template>

      </template>
    </template>
  </div>
</template>
<script>
import { utilButton } from 'mars-ui-frame'
import Clickoutside from 'element-ui/src/utils/clickoutside'
// 工具类
export default {
  name: 'mars-toolbar',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    actions: {
      type: Array,
      default: ()=>[],
      required: true
    },
    position: {
      type: String,
      default: 'toolbar'
    },
    data: Object,
    socpe: {
      type: Object,
      default: () => { return this }
    },
    leftNode: { // 2019.1.21 新增左边传过来的树的节点
      type:Object,
      default: () => { return null }
    },
  },
  directives: { Clickoutside },
  data(){
      return {
          openDropdownFlagList: {},
      }
  },

  computed: {
     scopeData(){
       return this.socpe
     }
  },

  watch:{
    actions:{
       handler(nval, oval){
         this.openDropdownFlagList = {}
          if(this.actions && this.actions.length){
              this.actions.map((btn, index)=>{
                if(btn.type === 'dropdown'){
                    this.$set(this.openDropdownFlagList, 'btn'+index, false)
                }
              })
          }
          console.log('this.openDropdownFlagList：', this.openDropdownFlagList);
        },
        immediate: true
    },
  },

  methods: {
    emitEventHandler(event) {
      // console.log('mars-toolbar中watch的this.leftNode', this.leftNode );
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    /**
     * 处理按钮隐藏，显示
     */
    handleActionHidden(button) {
        let hidden=button.hidden
        if (button.type && button.type === 'dropdown') return false
        if (!hidden) return true
        if (typeof hidden === 'boolean') return !hidden
        return !hidden.call(this.socpe, this.data)
    },
    getLabel({ label,  key, customlabel }) {
      // console.log('label', label);
      // console.log('key', key);
      // console.log('customlabel', customlabel);
      if (customlabel) return customlabel
      if (label && !customlabel) return label
      return this.$te('common.buttons.' + key) ? this.$t('common.buttons.' + key) : key
    },
    getIcon({ icon, key }) {
      if (icon) { return icon }
      return utilButton.getButtonIcon(key)
    },
    getType({ type, key }) {
      if (type) { return type }
      return utilButton.getButtonType(key)
    },

    // 4.4 mars-toolbar 不能装2个 dropdown 的问题
    handleMouseUp(btn, btnIndex){
        this.$set(this.openDropdownFlagList, 'btn'+btnIndex, false)
    },

    // 1.19 新增自定义的下拉列表框事件
    collapseDropdownList(event, btn, btnIndex){
        this.$set(this.openDropdownFlagList, 'btn'+btnIndex, !this.openDropdownFlagList['btn'+btnIndex])
    },
    handleWhenDropDownIsUnfold(event, btn, btnIndex){
        // 只有当打开时，才可以允许触发 clickoutside
        this.$set(this.openDropdownFlagList, 'btn'+btnIndex, false)
    },
    handleMouseMoveOut(ev, btn){
        if(!btn.hideOnClick){
            // 如果设置了 hideOnClick = false，则是点击菜单后不关闭
        }
        this.$set(this.openDropdownFlagList, 'btn'+btnIndex, false)
    }
  }
}
</script>
<style lang="scss" scoped>
  .ibps-toolbar .toolbar-icon + .toolbar-icon{
    margin-left: 2px !important;
  }
</style>


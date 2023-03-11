<template>
  <mars-dialog
    :fullscreen="false"
    class="choice-dialog"
    :modal="true"
    :modal-append-to-body="false"
    title="更多搜索"
    v-if="visible"
    @close="closeDialog"
  >
    <div>
      <el-form :inline="true" ref="queryForm" label-width="120px" :model="queryForm">
        <el-form-item label="项目编号">
          <el-input style="width:220px" placeholder="请输入项目编号" v-model.trim="queryForm.code" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input style="width:220px" placeholder="请输入项目名称" v-model.trim="queryForm.code" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目级别">
          <el-select style="width:220px" v-model="queryForm.code" placeholder="请选择项目级别" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申报年度">
          <el-date-picker v-model="queryForm.code" type="year" placeholder="请选择申报年度" format="yyyy" value-format="yyyy"></el-date-picker>
        </el-form-item>
        <el-form-item label="评级">
          <el-select style="width:220px" v-model="queryForm.code" placeholder="请选择评级" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属单位">
          <el-select style="width:220px" v-model="queryForm.code" placeholder="请选择所属单位" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="存续状态">
          <el-select style="width:220px" v-model="queryForm.code" placeholder="请选择存续状态" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预算编制模式">
          <el-select style="width:220px" v-model="queryForm.code" placeholder="请选择预算编制模式" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有年度资金计划">
          <el-select style="width:220px" v-model="queryForm.code" placeholder="请选择有年度资金计划" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代编模式">
          <el-select style="width:220px" v-model="queryForm.code" placeholder="请选择代编模式" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预算项目类别">
          <el-select style="width:220px" v-model="queryForm.code" placeholder="请选择预算项目类别" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="一级项目">
          <el-select style="width:220px" v-model="queryForm.code" placeholder="请选择一级项目" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职能部门">
          <el-select style="width:220px" v-model="queryForm.code" placeholder="请选择职能部门" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代编状态">
          <el-select style="width:220px" v-model="queryForm.code" placeholder="请选择代编状态" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否已编制预算">
          <el-select style="width:220px" v-model="queryForm.code" placeholder="请选择是否已编制预算" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="一上预算状态">
          <el-select style="width:220px" v-model="queryForm.code" placeholder="请选择一上预算状态" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二上预算状态">
          <el-select style="width:220px" v-model="queryForm.code" placeholder="请选择二上预算状态" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template slot="ms-foot">
      <el-button type="primary" icon="ibps-icon-search" @click="handleSearch">查询</el-button>
      <el-button type="primary" icon="ibps-icon-refresh" @click="handleResetSearch">重置</el-button>
      <el-button @click="closeDialog" icon="el-icon-circle-close">取 消</el-button>
    </template>
  </mars-dialog>
</template>
<script>
export default {
  name: 'MoreSearchListDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      queryForm: {},
      options: []
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },

    handleSearch() {},

    handleResetSearch() {}
  }
}
</script>
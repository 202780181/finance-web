<template>
  <div class="dashboard-box">
    <div class="dashboard-box_message">
      <div class="dashboard-box_message-left">
        <div class="dashboard-box_message-title">
          <h3>待办事项</h3>
          <el-button type="text" @click="backlogMore">更多 ></el-button>
        </div>
        <p class="dashboard-box_message-content">
          <span class="dashboard-box_message-content-title" title="下达回收复核：批次XXX">下达回收复核：批次XXX</span>
          <span class="dashboard-box_message-content-date">2022年7月27日10:12:58</span>
        </p>
        <p class="dashboard-box_message-content">
          <span class="dashboard-box_message-content-title" title="下达回收复核：批次XXX">下达回收复核：批次XXX</span>
          <span class="dashboard-box_message-content-date">2022年7月27日10:12:58</span>
        </p>
        <p class="dashboard-box_message-content">
          <span class="dashboard-box_message-content-title" title="下达回收复核：批次XXX">下达回收复核：批次XXX</span>
          <span class="dashboard-box_message-content-date">2022年7月27日10:12:58</span>
        </p>
        <p class="dashboard-box_message-content">
          <span class="dashboard-box_message-content-title" title="下达回收复核：批次XXX">下达回收复核：批次XXX</span>
          <span class="dashboard-box_message-content-date">2022年7月27日10:12:58</span>
        </p>
      </div>
      <div class="dashboard-box_message-right">
        <div class="dashboard-box_message-title">
          <h3>系统公告</h3>
          <el-button type="text" @click="goNoticeMore">更多 ></el-button>
        </div>
        <p class="dashboard-box_message-content">
          <span class="dashboard-box_message-content-title" title="下达回收复核：批次XXX">下达回收复核：批次XXX</span>
          <span class="dashboard-box_message-content-date">2022年7月27日10:12:58</span>
        </p>
        <p class="dashboard-box_message-content">
          <span class="dashboard-box_message-content-title" title="下达回收复核：批次XXX">下达回收复核：批次XXX</span>
          <span class="dashboard-box_message-content-date">2022年7月27日10:12:58</span>
        </p>
        <p class="dashboard-box_message-content">
          <span class="dashboard-box_message-content-title" title="下达回收复核：批次XXX">下达回收复核：批次XXX</span>
          <span class="dashboard-box_message-content-date">2022年7月27日10:12:58</span>
        </p>
        <p class="dashboard-box_message-content">
          <span class="dashboard-box_message-content-title" title="下达回收复核：批次XXX">下达回收复核：批次XXX</span>
          <span class="dashboard-box_message-content-date">2022年7月27日10:12:58</span>
        </p>
        <p class="dashboard-box_message-content">
          <span class="dashboard-box_message-content-title" title="下达回收复核：批次XXX">下达回收复核：批次XXX</span>
          <span class="dashboard-box_message-content-date">2022年7月27日10:12:58</span>
        </p>
        <p class="dashboard-box_message-content">
          <span class="dashboard-box_message-content-title" title="下达回收复核：批次XXX">下达回收复核：批次XXX</span>
          <span class="dashboard-box_message-content-date">2022年7月27日10:12:58</span>
        </p>
        <p class="dashboard-box_message-content">
          <span class="dashboard-box_message-content-title" title="下达回收复核：批次XXX">下达回收复核：批次XXX</span>
          <span class="dashboard-box_message-content-date">2022年7月27日10:12:58</span>
        </p>
        <p class="dashboard-box_message-content">
          <span class="dashboard-box_message-content-title" title="下达回收复核：批次XXX">下达回收复核：批次XXX</span>
          <span class="dashboard-box_message-content-date">2022年7月27日10:12:58</span>
        </p>
        <p class="dashboard-box_message-content">
          <span class="dashboard-box_message-content-title" title="下达回收复核：批次XXX">下达回收复核：批次XXX</span>
          <span class="dashboard-box_message-content-date">2022年7月27日10:12:58</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import myUtil from '@/utils/myUtil.js'
export default {
  name: 'Dashboard',
  data() {
    return {
      myUtil
    }
  },
  methods: {
    //待办事项
    backlogMore() {},

    //公共栏目
    goNoticeMore() {}
  }
}
</script>
<style lang="scss" scoped>
.dashboard-box {
  width: 100%;
  background: #f6f9fc;
  box-sizing: border-box;
  padding: 20px;
  .dashboard-box_ul {
    display: flex;
    justify-content: space-between;
    li {
      width: 24%;
      height: 120px;
      background-color: red;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      border-radius: 6px;
      p {
        margin-bottom: 10px;
      }
      div {
        font-size: 28px;
      }
    }
  }
  .dashboard-box_message {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    .dashboard-box_message-left,
    .dashboard-box_message-right {
      width: 49%;
      border: 1px solid #eaedf0;
      border-radius: 6px;
      background-color: #fff;
      padding: 10px;
    }
  }
}
.dashboard-box_message-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eaedf0;
}
.dashboard-box_message-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #eaedf0;
  cursor: pointer;
  padding: 0 10px;
  .dashboard-box_message-content-title {
    font-weight: 600;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:hover .dashboard-box_message-content-title {
    color: #2284e5;
  }
  .dashboard-box_message-content-date {
    color: #999;
    margin-left: 10px;
  }
}
</style>

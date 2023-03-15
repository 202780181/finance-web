<!--
    @createTime: 3/14/23
    @author: aaron
    @desc: 空状态
    @update: 3/14/23
-->
<template>
  <div class="css-ph9edi ant-empty ant-empty-normal">
    <div class="ant-empty-image">
      <svg width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
          <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse>
          <g fill-rule="nonzero" stroke="#d9d9d9">
            <path
              d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
            <path
              d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
              fill="#fafafa">
            </path>
          </g>
        </g>
      </svg>
    </div>
    <div class="ant-empty-description">{{this.description}}</div>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    description: {
      type: String,
      default: '暂无数据'
    },
    imageStyle: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
:where(.css-ph9edi).ant-empty {
  margin-inline: 8px;
  font-size: 14px;
  line-height: 1.5714285714285714;
  text-align: center;
}
:where(.css-ph9edi).ant-empty-normal {
  margin-block: 32px;
  color: rgba(0,0,0,.25);
}
:where(.css-ph9edi)[class*=" ant-empty"] [class^=ant-empty] {
  box-sizing: border-box;
}
:where(.css-ph9edi).ant-empty .ant-empty-image {
  height: 100px;
  margin-bottom: 8px;
  opacity: 1;
}
:where(.css-ph9edi).ant-empty-normal .ant-empty-image {
  height: 40px;
}
:where(.css-ph9edi).ant-empty .ant-empty-image svg {
  height: 100%;
  margin: auto;
}
:where(.css-ph9edi).ant-empty .ant-empty-description {
  color: rgba(0,0,0,.88);
}
:where(.css-ph9edi).ant-empty-normal .ant-empty-description {
  color: rgba(0,0,0,.25);
}
</style>

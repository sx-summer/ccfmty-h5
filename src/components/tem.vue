<template>
  <ul class="function-bar">
    <li v-for="(item, index) in funObj" :key="index">
      <a :href="item.href">
        <van-icon class="item-icon" :name="item.icon" />
        <span>{{item.text}}</span>
      </a>
    </li>
  </ul>
</template>

<script>
  import { Toast } from "vant";

  export default {
    name: "FunctionBar",
    props: {
      funObj: Array
    },
    components: {
      // [Tabbar.name]: Tabbar,
    },
    data() {
      return {
        title: "sssss"
      };
    },
    computed: {
    },
    mounted() {
    },
    methods: {
      onChange(index) {
        this.active = index;
        Toast("首页");
      },
    },
  };
</script>
<style lang="less" scope>
  .function-bar{
    width: 100%;
    overflow: hidden;
    margin-top: -5px;
    font-size: 14px;
  }
</style>

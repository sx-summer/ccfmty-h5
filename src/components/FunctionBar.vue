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

  export default {
    name: "FunctionBar",
    props: {
      funObj: Array
    },
    components: {
    },
    data() {
      return {
      };
    },
    computed: {
    },
    mounted() {
    },
    methods: {
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
  .function-bar li{
    width: 25%;
    background-color: #e50021;
    float: left;
    color: #ffffff;
    padding: 10px;
    text-align: center;
  }
  .item-icon{
    font-size: 28px;
    display: block;
    margin-bottom: 3px;
  }
  .function-bar li:nth-child(even){
    background-color: #c80a23;
  }
  a{
    color: #ffffff;
  }

</style>

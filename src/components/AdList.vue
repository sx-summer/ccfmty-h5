<template>
  <div>
    
    <ItemTitle title="赛事专供" href="http://ccfmty.com" :needMore="true"></ItemTitle>

    <ul class="function-bar">
      <li v-for="(item, index) in funObj" :key="index">
        <a :href="item.href">
          <van-icon class="item-icon" :name="item.icon" />
          广告图片
        </a>
      </li>
    </ul>
  </div>
  
</template>

<script>
  import { Toast } from "vant";
  import ItemTitle from "@/components/ItemTitle.vue";


  export default {
    name: "FunctionBar",
    props: {
      funObj: Array
    },
    components: {
      ItemTitle
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
  
</style>

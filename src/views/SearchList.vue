<template>
  <div class="home">
    <HeadBar title="报名查询" />
  
    <ApplySearch :defaultName="defaultName" :defaultNumber="defaultNumber"></ApplySearch>

  </div>
</template>

<script>
  import HeadBar from "@/components/HeadBar.vue";
  import ApplySearch from "@/components/ApplySearch.vue";
  import { getQueryString, fetchHttp } from "@/util/fn.js";

  import {
    Button
  } from "vant";

  export default {
    name: "home",
    components: {
      HeadBar,
      [Button.name]: Button,
      ApplySearch
    },
    data() {
      return {
        title: '报名查询',
        defaultName: getQueryString('name'),
        defaultNumber:getQueryString('number')
      };
    },
    computed: {
    },
    mounted() {
    },
    methods: {
      
    }
  };
</script>
<style scope lang="less">
  .home {
    text-align: center;
  }
  
</style>

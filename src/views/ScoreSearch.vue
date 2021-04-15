<template>
  <div class="home">
    <HeadBar title="成绩查询" />
  
    <ScoreSearch :defaultName="defaultName" :defaultNumber="defaultNumber"></ScoreSearch>

  </div>
</template>

<script>
  import HeadBar from "@/components/HeadBar.vue";
  import ScoreSearch from "@/components/ScoreSearch.vue";
  import { getQueryString, fetchHttp } from "@/util/fn.js";

  import {
    Button
  } from "vant";

  export default {
    name: "home",
    components: {
      HeadBar,
      [Button.name]: Button,
      ScoreSearch
    },
    data() {
      return {
        title: '成绩查询',
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

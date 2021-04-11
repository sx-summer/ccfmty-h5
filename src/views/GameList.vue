<template>
  <div class="gameList">
    <HeadBar title="赛事列表" />
    <div class="gameBox">
      <!-- 赛事活动 -->
      <GamaList :gameList="gameList"></GamaList>
    </div>
  </div>
</template>

<script>
  import HeadBar from "@/components/HeadBar.vue";
  import GamaList from "@/components/GamaList.vue";
  import { getQueryString, fetchHttp, setCookie, getCookie, formatTime } from "@/util/fn.js";


  import {
    Toast
  } from "vant";

  export default {
    name: "gameList",
    components: {
      HeadBar,
      GamaList
    },
    data() {
      return {
        gameList: []
      };
    },
    computed: {
    },
    mounted() {

    //首页赛事模块
    fetchHttp('marathon/match/information', 'POST').then(res => {
      if (res && res.code === 0) {
        const dataList = res && res.data;
        let doing = [];
        let done = [];
        let lastData = [];
        dataList && dataList.length > 0  && dataList.forEach((item,index)=>{
          item.startTime = formatTime(item.startTime)
          item.endTime = formatTime(item.endTime)
          item.matchTime = formatTime(item.matchTime)
          if(item.state === 4){
            done.push(item)
          }else{
            doing.push(item)
          }
        })
        lastData = doing.concat(done)
        this.gameList = lastData
      }
    });


      
    },
    methods: {
      
      onSubmit() {
        Toast("赛事列表");
      }

    }
  };
</script>
<style scope lang="less">
  .gameList {
    text-align: center;
  }

</style>

<template>
  <div class="gameDetail">
    <HeadBar title="赛事详情" />
    <div class="gameContent">
      <div class="gameTop">
        <img :src="matchInfoAjax.pictureUrl" :alt="matchInfoAjax.matchName" width="100%">
        <div class="matchName pd10">{{matchInfoAjax.matchName}}</div>
      </div>
    </div>

    <div class="gameContent">
      <ul class="matchInfoList">
        <li>
          <van-icon name="underway-o" />
          <span>比赛时间：{{matchInfoAjax.matchTime}} </span>
        </li>
        <li>
          <van-icon name="location-o" />
          <span>比赛地点：{{matchInfoAjax.place}} </span>
        </li>
        <li v-if="matchInfoAjax.organizer">
          <van-icon name="medal-o" />
          <span>主办方：{{matchInfoAjax.organizer}} </span>
        </li>
        <li v-if="matchInfoAjax.undertakingUnit">
          <van-icon name="point-gift-o" />
          <span>承办方：{{matchInfoAjax.undertakingUnit}} </span>
        </li>
      </ul>
    </div>

    <div class="gameContent">

      <van-tabs v-model="active">
        <van-tab title="比赛项目">
          <ul class="gameProject">
            <li v-for="(item, index) in projectList" :key="index">
              <a  @click="goLink(item)">
                <div class="projectName">{{item.projectName}}</div>
                <div class="projectPrice">
                  <span class="projectDesc">参赛费用:</span>
                  <span v-if="item.price === 0 "> 免费 </span>
                  <span v-else> &yen;{{item.price}}元 </span>
                  <span class="baomingNum">报名人数:{{item.people}}/{{item.scale}}</span>
                  <van-button v-if="item.state === 2" type="danger" size="small" round class="goBaoming">去报名</van-button>
                  <van-button v-if="item.state === 4" type="danger" size="small" round class="goBaoming" disabled>已结束</van-button>
                  <van-button v-if="item.state === 1" type="danger" size="small" round class="goBaoming" disabled>准备中</van-button>
                  <van-button v-if="item.state === 3" type="info" size="small" round class="goBaoming" disabled>进行中{{item.state}}</van-button>
                </div>
              </a>

            </li>
          </ul>
        </van-tab>

        <van-tab v-for="(item, index ) in menuList" :title="item.name" :key="index">
          <NewsContent :newId="item.newSid"></NewsContent>
        </van-tab>


        <!-- <div v-html='newsData.newsContent'>
          </div> -->

        
      </van-tabs>

    </div>
  </div>
</template>

<script>
  import HeadBar from "@/components/HeadBar.vue";
  import { getQueryString, fetchHttp, formatTime } from "@/util/fn.js";
  import NewsContent from "@/components/NewsContent.vue";


  import {
    Toast,
    Button,
    Tab,
    Tabs,
  } from "vant";

  export default {
    name: "gameDetail",
    components: {
      HeadBar,
      [Button.name]: Button,
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      NewsContent
    },
    data() {
      return {
        active: 0,
        matchInfoAjax: {},
        menuList: [],
        matchId: getQueryString('matchId'),
        projectList: []
      };
    },
    computed: {
    },
    mounted() {

      let id = getQueryString('matchId');
      if (id) {
        //获取赛事详情
        fetchHttp('marathon/match/getMatchInfo', { id }, 'GET').then(
          res => {
            if (res && res.code === 0) {
              if (res.data && res.data.matchName) {
                if (res && res.data && res.data.matchTime) {
                  res.data.matchTime = formatTime(res.data.matchTime)
                }
                this.matchInfoAjax = res.data;
                let  menuList = res.data && res.data.newsList;
                let renderMenuList = [];
                menuList.forEach((item) => {
                  item.newSid ? renderMenuList.push(item) : ''
                });
                this.menuList = renderMenuList;
                // name: "比赛路线" newSid: ""
                console.log('matchInfoAjax', this.matchInfoAjax);
                console.log('menuList', this.menuList);
              } else {
                Toast('没有找到相关赛事');
              }
            }
          },
        );
        //获取项目信息
        fetchHttp('marathon/project/information', { matchId: id }, 'GET').then(
          res => {
            if (res && res.code === 0) {
              this.projectList = res.data;
              console.log('projectList', this.projectList);
            }
          },
        );
      } else {
        Toast('没有找到相关的赛事项目');
      }

    },
    methods: {
      goLink(item){
        let baomingHref = `gameSignUp?matchId=${this.matchId}&projectId=${item.id}`;
        let gameList = 'gameList'
        if(item.state === 2){
          window.location.href = baomingHref;
        }else{
          window.location.href = gameList;
        }
      },
      onClickIcon() {
        Toast("赛事详情");
      }
    }
  };
</script>
<style scope lang="less">
  .baomingNum{
    font-size: 12px;
    color: #999999;
    margin-left: 5px;
  }
  .projectPrice{
    font-size: 18px;
    color: #e50021;
    /* font-family: Chalet_out; */
  }
  .projectDesc{
    font-size: 16px;
    color: #666666;
  }
  .projectName {
    font-size: 15px;
    font-weight: normal;
    border-left: 3px solid #e50021;
    padding-left: 10px;
    margin-bottom: 10px;
  }

  .matchInfoList {
    color: #333333;
    font-size: 15px;
  }

  .matchInfoList li {
    line-height: 30px;
    border-bottom: 1px solid #f1f1f1;
    margin: 5px 0;
    padding: 5px;
    position: relative;
  }
  .goBaoming{
    position: absolute;
    right: 15px;
    bottom: 10px;
    width: 70px;
  }

  .matchInfoList .van-icon {
    font-size: 18px;
    margin-right: 6px;
    vertical-align: sub;
    font-weight: bold;
    color: red;
  }

  .pd10 {
    padding: 0 10px;
  }

  .gameDetail {
    font-size: 14px;
    background-color: #f7f7f7;
  }

  .matchName {
    font-size: 16px;
    margin: 5px 0;
    width: 100%;
    background-color: #fff;
  }

  .gameTop {
    background-color: #fff;
    padding-bottom: 10px;
  }

  .gameContent {
    font-size: 16px;
    margin: 0px 0px 10px 0;
    width: 100%;
    background-color: #fff;
  }

  .gameProject {
    color: #333333;
    padding: 0 10px;
    font-size: 15px;
  }

  .gameProject a {
    color: #333333;
  }

  .gameProject li {
    width: 100%;
    border: 1px solid #f1f1f1;
    margin: 10px 0;
    padding: 10px;
    position: relative;
  }

</style>

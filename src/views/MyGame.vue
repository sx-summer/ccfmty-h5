<template>
  <div class="my-game">
    <HeadBar title="我的报名" />

      <div class="news-content">
        <ul>
          <li v-for="(item, i) in newsList" :key="i">
            <div class="item">
              <img :src="item.url" :alt="item.matchName" class="news-image" />
              <span class="match-type">{{item.onLine === 1 ? '线上赛' : '线下赛'}}</span>
            </div>

             <div class="news-info">
                <div class="news-title">{{item.matchName}}</div>
                <p class="news-desc">
                  姓名: {{item.name}} ({{item.sex === 1 ? '男' : '女'}})
                </p>
                <p class="news-desc" v-if="item.projectName">
                  参赛项目：{{item.projectName}}
                </p>
                <p class="news-desc">比赛时间: {{myFormatTime(item.matchTime)}}</p>
                <p class="news-desc" v-if="item.price !== null">
                    <span class="mainColor">参赛费用: 
                      <span class="score_time">{{item.price === 0 ? '免费' : `${item.price}元`}}</span>
                    </span>
                </p>
                
                <!-- //状态 0待支付 1支付但未审核 2已审核通过 3拒绝' 4 完赛 -->
                <div v-if="item.status === 0" class="news-status">
                    <span>
                      参赛状态：
                      <van-icon name="gold-coin-o" size="16" class="mainColor" style="vertical-align: middle;"/>&nbsp;
                      <a class="mainColor" target="_blank" rel="noopener noreferrer"
                        :href="`pay?id=${item.id}&matchName=${item.matchName}&price=${item.price}`" >
                        待支付
                      </a>
                    </span>
                    <van-button type="danger" icon="gold-coin-o" round size="small"  :url="`pay?id=${item.id}&matchName=${item.matchName}&price=${item.price}`">
                      立即付款
                    </van-button>
                </div>

                  <!-- item.status === 1 -->
                <div v-else-if="item.status === 1" class="news-status">
                  <span>
                    参赛状态：
                    <van-icon name="clock-o" size="16" class="mainColor" style="vertical-align: middle;"/>&nbsp;
                    <a class="mainColor" target="_blank" rel="noopener noreferrer"
                      :href="`gameDetail?matchId=${item.matchId}`" >
                      待审核
                    </a>
                  </span>
                  <van-button type="danger" icon="clock-o" round size="small"  :url="`gameDetail?matchId=${item.matchId}`">
                    查看详情
                  </van-button>
                </div>

                <!-- item.status === 2 -->
                <div v-else-if="item.status === 2">
                    <p class="news-desc"  v-if="item.projectNumber">
                      <span>参赛号码: {{item.projectNumber}}</span>
                    </p>
                    <div class="news-status">
                      <span>
                        参赛状态：
                        <van-icon name="browsing-history-o" size="16" class="mainColor" style="vertical-align: middle;"/>&nbsp;
                        <a class="mainColor" target="_blank" rel="noopener noreferrer"
                          :href="`gameDetail?matchId=${item.matchId}`" >
                          审核通过
                        </a>
                      </span>
                      <van-button type="danger" icon="browsing-history-o" round size="small"  :url="`gameDetail?matchId=${item.matchId}`">
                        查看详情
                      </van-button>
                    </div>
                        
                    <p> 
                      <van-button v-if="item.onLine === 1 && item.onLineUrl === null"
                        type="danger" icon="browsing-history-o" round size="small"  :url="`uploadFinish?matchId=${item.matchId}&matchName=${item.matchName}&projectId=${item.projectId}`">
                        上传完赛证明
                      </van-button>
                      <van-button v-if="item.onLine === 1 && item.onLineUrl !== null"
                        type="danger" icon="browsing-history-o" round size="small">
                        证书上传完成,等待管理员审核
                      </van-button>
                    </p>
                </div>

                <!-- item.status === 3 -->
                <div v-else-if="item.status === 3" class="news-status">
                  <span>参赛状态：
                    <van-icon name="close" size="16" class="mainColor" style="vertical-align: middle;"/>&nbsp;
                    <a class="mainColor" target="_blank" rel="noopener noreferrer"
                      :href="`gameSignUp?matchId=${item.matchId}&projectId=${item.projectId}&price=${item.price}`" >
                      审核失败
                    </a>
                  </span>
                  <van-button type="danger" icon="close" round size="small"  :url="`gameSignUp?matchId=${item.matchId}&projectId=${item.projectId}&price=${item.price}`">
                    很遗憾，未中签
                  </van-button>
                </div>
                      
                <!-- item.status ===4 -->
                <div v-else-if="item.status === 4">
                  <p class="news-desc" v-if="item.projectNumber">
                    参赛号码: {{item.projectNumber}}
                  </p>
                  <p class="news-desc" v-if="item.personalScore">
                    参赛成绩: {{item.personalScore}}
                  </p>
                  <div class="news-status">
                    <span>参赛状态：
                      <van-icon name="passed" size="16" class="mainColor" style="vertical-align: middle;"/>&nbsp;
                      <a class="mainColor" target="_blank" rel="noopener noreferrer"
                        :href="getScoreUrl(item)" >
                        已完赛
                      </a>
                    </span>
                    <van-button type="danger" icon="passed" round size="small"  :url="getScoreUrl(item)">
                      查看成绩
                    </van-button>
                  </div>
                </div>

              </div>
          </li>
        
        </ul>
      </div>

  </div>
</template>

<script>
  import HeadBar from "@/components/HeadBar.vue";
  import { getQueryString, fetchHttp, formatTime, getCookie, setCookie } from "@/util/fn.js";
  import {
    Toast,
    Button
  } from "vant";

  const NEWS_LIST = [
    {
      "id": 7,
      "url": "https://s5.mogucdn.com/mlcdn/c45406/200424_1ljll1d9bgc26h7hi7f86b9b0k730_640x960.jpg_400x9999.v1c7E.81.webp",
      "name": "邵心心",
      "userId": 1,
      "matchId": 4,
      "matchName": "亚泰幸福家·悦奔跑 跃未来",
      "matchTime": "2020-04-30",
      "projectId": 1,
      "projectName": '19KM 半程',
      "tel": "13613619667",
      "number": "232324198402012992",
      "projectNumber": "MLS001",
      "sex": 1,
      "type": "身份证",
      "nationality": '中国',
      "personalMileage": "42.195", //个人总里程
      "startTime": "0:00:02",
      "endTime": "2:39:44",
      "price": "188.00",
      "status": 0,  //状态 0未支付 1支付但未审核 2已审核通过 3拒绝' 4 完赛
      "personalNetScore": "2:39:42", //干净成绩
      "personalRanking": 1, //排名
      "personalScore": "2:39:44" 
    },
    {
      "id": 8,
      "url": "https://s11.mogucdn.com/mlcdn/c45406/200410_89fk0h1elg0blha83a3fif1g014fk_3888x5832.jpg_400x9999.v1c7E.81.webp",
      "name": "刘福军",
      "userId": 1,
      "matchId": 4,
      "matchName": "半程19KM",
      "matchTime": "2020-04-30",
      "projectId": 1,
      "projectName": '"招商银行杯"朝阳区大众线上邀请赛',
      "tel": "13613619667",
      "number": "232324198402012992",
      "projectNumber": "MLS001",
      "sex": 1,
      "type": "身份证",
      "nationality": '中国',
      "personalMileage": "42.195", //个人总里程
      "startTime": "0:00:02",
      "endTime": "2:39:44",
      "price": "188.00",
      "status": 1,  //状态 0未支付 1支付但未审核 2已审核通过 3拒绝' 4 完赛
      "personalNetScore": "2:39:42", //干净成绩
      "personalRanking": 1, //排名
      "personalScore": "2:39:44" 
    },
    {
      "id": 9,
      "url": "https://s5.mogucdn.com/mlcdn/c45406/200411_7hb8hih3888hg05kiahjbf128d3ik_4800x6600.jpg_400x9999.v1c7E.81.webp",
      "name": "张三",
      "userId": 2,
      "matchId": 4,
      "matchName": "半程19KM",
      "matchTime": "2020-04-30",
      "projectId": 1,
      "projectName": '"招商银行杯"朝阳区大众线上邀请赛',
      "tel": "13613619667",
      "number": "232324198402012992",
      "projectNumber": "MLS001",
      "sex": 1,
      "type": "身份证",
      "nationality": '中国',
      "personalMileage": "42.195", //个人总里程
      "startTime": "0:00:02",
      "endTime": "2:39:44",
      "price": 188,
      "status": 2,  //状态 0未支付 1支付但未审核 2已审核通过 3拒绝' 4 完赛
      "personalNetScore": "2:39:42", //干净成绩
      "personalRanking": 1, //排名
      "personalScore": "2:39:44" 
    },
    {
      "id": 10,
      "url": "https://s5.mogucdn.com/mlcdn/c45406/200411_7hb8hih3888hg05kiahjbf128d3ik_4800x6600.jpg_400x9999.v1c7E.81.webp",
      "name": "李四",
      "userId": 3,
      "matchId": 4,
      "matchName": "半程19KM",
      "matchTime": "2020-04-30",
      "projectId": 1,
      "projectName": '"招商银行杯"朝阳区大众线上邀请赛',
      "tel": "13613619667",
      "number": "232324198402012992",
      "projectNumber": "MLS001",
      "sex": 1,
      "type": "身份证",
      "nationality": '中国',
      "personalMileage": "42.195", //个人总里程
      "startTime": "0:00:02",
      "endTime": "2:39:44",
      "price": 188,
      "status": 3,  //状态 0未支付 1支付但未审核 2已审核通过 3拒绝' 4 完赛
      "personalNetScore": "2:39:42", //干净成绩
      "personalRanking": 1, //排名
      "personalScore": "2:39:44" 
    },
    {
      "id": 11,
      "url": "https://s5.mogucdn.com/mlcdn/c45406/200411_7hb8hih3888hg05kiahjbf128d3ik_4800x6600.jpg_400x9999.v1c7E.81.webp",
      "name": "王二麻子",
      "userId": 4,
      "matchId": 4,
      "matchName": "半程19KM",
      "matchTime": "2020-04-30",
      "projectId": 1,
      "projectName": '"招商银行杯"朝阳区大众线上邀请赛',
      "tel": "13613619667",
      "number": "232324198402012992",
      "projectNumber": "MLS001",
      "sex": 1,
      "type": "身份证",
      "nationality": '中国',
      "personalMileage": "42.195", //个人总里程
      "startTime": "0:00:02",
      "endTime": "2:39:44",
      "price": 188,
      "status": 4,  //状态 0未支付 1支付但未审核 2已审核通过 3拒绝' 4 完赛
      "personalNetScore": "2:39:42", //干净成绩
      "personalRanking": 1, //排名
      "personalScore": "2:39:44" 
    }];

  export default {
    name: "home",
    components: {
      HeadBar,
      [Button.name]: Button
    },
    data() {
      return {
        newsList: [], //NEWS_LIST
        userId: getCookie('USERID'),
      };
    },
    computed: {
    },
    mounted() {
      // this.userId = '3006';
      // setCookie('FMTY_TOKEN', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxODgxMjM0NTY3OCIsImlkIjozMDA2LCJleHAiOjE2MTk5NzY3NDQsImlhdCI6MTYxOTYxNjc0NCwianRpIjoiN2FiMmFmYTYtMTU0NS00MzIyLThjMGEtMTliM2M5M2UxZmIyIiwidXNlcm5hbWUiOiIxODgxMjM0NTY3OCJ9.4xu15R7WN57rTLxEfSFtrsQYT3Qq5goG2rww0bQHFy4');
      fetchHttp('marathon/result/personalAllMatchInfo', { id: this.userId}, 'GET')
      .then(res => {
          if (res && res.code === 0) {
            this.newsList = res.data;
          }
        }
      );
    },
    methods: {
      myFormatTime(time){
        return formatTime(time);
      },
      getScoreUrl(item){
        let url = `scoreDetail?userId=${item.userId ? item.userId : this.userId}&matchId=${item.matchId}&projectId=${item.projectId}`;
        if(item.regular === 0 && item.regularUrl){
          url = item.regularUrl
        }
        return url;
      },
      onSubmit() {
        Toast("报名列表");
      }
    }
  };
</script>
<style scope lang="less">
  .my-game {
    background: #efefef;
    overflow: hidden;
  }
  .mainColor{
    color:red;
  }

  .news-content p{
    margin:0;
  }
  .news-content li {
      float: left;
      width: 100%;
      margin: 10px 0 0;
      color: #333;
      font-size:14px;
    }

  .news-content .news-title{
    width:100%;
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #333;
    font-size: 16px;
    font-weight: bold;
    border-left: 3px solid #e50021;
    padding-left: 5px;
    margin: 5px 0 ;
  }
    .news-content li{
      text-decoration: none;
      width: 100%;
      padding: 10px;
      background: #fff;
      border: 1px solid #f2f2f2;
      text-align: left;
    }
    .news-content li:hover {
      border: 1px solid #e50021;
    }
    .news-content .news-info{
      line-height: 25px;
    }
    .border-none{
        border-right: none!important;
    }
    .notesText {
      color: #999999;
      margin-top: 10px;
    }
    .news-content .item {
      overflow: hidden;
      position: relative;
    }
    .news-content .match-type{
      position: absolute;
      background: #e50021;
      color: #fff;
      left: 0;
      top: 0;
      width: 80px;
      text-align: center;
    }
    .news-content .score_time {
      font-size: 20px;
      font-family: Chalet_out;
      color: #e50021;
    }
    .news-content .news-image {
      width: 100%;
      height: 192px;
      border-radius: 5px;
    }
    .news-status{
      display:flex;
      align-items: center;
      justify-content: space-between;
    }
</style>

<template>
  <div>
    <ul :class="fromIndex ? 'twoList' : 'gameItem' ">
      <li v-for="(item, index) in gameList" :key="index">
        <a :href='`gameDetail?matchId=${item.id}`' class="activeItem">
          <div class="gameTop">
            <van-image fit="cover" lazy-load class="activeImg" :src="item.pictureUrl" :alt="item.matchName" />
            <p class="activeType">{{item.onLine === 1 ? '线上赛' : '线下赛'}}</p>
            <p class="activeName" v-if="!fromIndex">{{ item.matchName }}</p>
            <div class="activeBtn">
              <van-button size="small" v-if="item.state === 1" type="info">准备中</van-button>
              <van-button size="small" v-if="item.state === 2" type="danger">报名中</van-button>
              <van-button size="small" v-if="item.state === 3" type="warning">进行中</van-button>
              <van-button size="small" v-if="item.state === 4" type="danger" disabled>已结束</van-button>
            </div>
          </div>
          <div class="activeInfo">
            <div class="matchName" v-if="fromIndex">{{ item.matchName }}</div>
            <div v-if="!fromIndex">
              <div class="activeText">
                <van-icon name="flag-o" class="activeIcon" />比赛地点：{{item.place}}
              </div>
              <div class="activeText">
                <van-icon name="award-o" class="activeIcon" />报名时间：{{item.startTime}} ~ {{ item.endTime }}
              </div>
              <div class="activeText">
                <van-icon name="todo-list-o" class="activeIcon" />比赛时间：{{ item.matchTime }}
              </div>
            </div>

          </div>
        </a>
      </li>
    </ul>
  </div>

</template>

<script>
  import { Toast, Image as VanImage, Button } from "vant";

  // import ItemTitle from "@/components/ItemTitle.vue";

  export default {
    name: "FunctionBar",
    props: {
      gameList: Array,
      fromIndex: Boolean
    },
    components: {
      [VanImage.name]: VanImage,
      [Button.name]: Button,
    },
    data() {
      return {
        title: "sssss"
      };
    },
    computed: {
      formatTimeStr(time) {
        return time;
      }
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
  .matchName{
    font-size: 14px;
    width: 100%;
    height: 27px;
    line-height: 30px;
    overflow: hidden;
  }
  .activeItem {
    display: block;
    color: #333;
  }

  .activeBtn {
    position: absolute;
    right: -10px;
    bottom: 48px;
    color: #fff;
    margin: 0;
    padding: 0 10px;
  }

  .activeBtn .van-button{
    width: 80px;
    height: 26px;
  }

  .activeIcon {
    margin-right: 5px;
  }

  .activeInfo {
    text-align: left;
    padding: 0 10px;
    margin: 0;
    line-height: 28px;
    font-size: 15px;
  }

  .twoList .activeInfo{
    margin-top: -12px;
  }

  .twoList,
  .gameItem {
    width: 100%;
    overflow: hidden;
  }

  .gameItem li {
    width: 100%;
    margin-bottom: 10px;
  }

  .twoList li {
    width: 50%;
    padding: 5px;
    float: left;
  }

  .gameTop {
    position: relative;
  }

  .activeImg {
    width: 100%;
    height: 200px;
  }

  .twoList .activeImg{
    width: 100%;
    height: 100px;
    border:1px solid #f1f1f1;
  }

  .twoList .activeBtn{
    bottom: 16px;
  }

  .twoList .activeType{
    font-size: 14px;
    padding: 1px 10px;
  }

  .activeType {
    position: absolute;
    left: 0;
    top: 0;
    background: #e50021;
    color: #fff;
    margin: 0;
    padding: 3px 10px;
    font-size: 14px;
  }

  .activeName {
    position: absolute;
    left: 0;
    bottom: 15px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    margin: 0;
    padding: 5px 10px;
    width: 100%;
    height: 33px;
    overflow: hidden;
    line-height: 27px;
  }

</style>

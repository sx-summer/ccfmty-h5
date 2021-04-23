<template>
 <div class="agreement-dialog" :style="show ? 'display:block':'display:none'">
    <div class="agreement-content">
        <!-- header -->
        <section class="dialog-header">
            <div>赛事免责声明</div>
            <!-- <span class="dialog-close" @click="onClose">
                <van-icon name="cross" />
            </span> -->
        </section>
        <!-- content -->
        <section class="dialog-body">
            <!-- <div class="game-detail"> -->
                <div class="game-detail-text">
                    <h4 class="mb20">
                    一、参赛者应身体健康，经常性参加跑步锻炼或训练。参赛者可根据自己的身体状况和能力，选择是否参赛。以下疾病患者不宜参加比赛:
                    </h4>
                    <div class="gama-conent-desc">
                    <p>1、先天性心脏病和风湿性心脏病患者；</p>
                    <p>2、先天性心脏病和风湿性心脏病患者；</p>
                    <p>3、心肌炎和其他心脏病患者；</p>
                    <p>4、冠状动脉病患者和严重心律不齐者；</p>
                    <p>5、血糖过高或过少的糖尿病患者；</p>
                    </div>

                    <h4 class="mb20">二、请各位参赛者在参与活动过程中特别注意以下事项:</h4>
                    <div class="gama-conent-desc">
                    <p>1、请各位参赛者在参与活动过程中特别注意以下事项:</p>
                    <p>
                        2、跑步过程中，出现身体出现不适或者疲劳感等，请参赛者量力而行，必要时放弃比赛，以保证人身安全；
                    </p>
                    <p>
                        3、跑步过程中，如遇炎热、寒冷、大风、降水、雾霾沙尘等极端天气，请参赛者自行调整比赛计划，以保证人身及财产安全。
                    </p>
                    <p>4、尽量让家人或朋友了解您参赛当日的跑步地点、路线和时间。</p>
                    <p>5、血糖过高或过少的糖尿病患者；</p>
                    </div>

                    <h4 class="mb20">
                    三、健康情况申请
                    </h4>
                    <div class="gama-conent-desc">
                    <p>1、参赛者在报名之前请务必仔细阅读参赛须知中的健康要求，若因身体条件不足参赛导致的身体不适或意外，责任后果自负。</p>
                    </div>

                    <h4 class="mb20">
                    四、奖牌问题
                    </h4>
                    <div class="gama-conent-desc">
                    <p>1、因奖牌为定制类产品，一经报名成功，恕不接受退款申请。完赛纪念奖牌将于*月*号开始陆续安排邮寄，寄出后会有短信通知。若因用户自身（电话停机、地址错误、快递无法联系本人等）原因导致包裹无法寄到，责任由用户自行承担。</p>
                    </div>

                    <h4 class="mb20">
                    五、赛事免责声明
                    </h4>
                    <div class="gama-conent-desc">
                    <p>1、 咱家马拉松赛事组委会、长春疯马体育为活动承办方，主办、承办方不构成对参赛者人身和财产安全的任何承诺，如在活动过程中出现参赛者人身损害和财产损失，由参赛者个人承担。</p>
                    </div>

                    <h4 class="mb20">
                    六、本次活动最终解释权归咱家马拉松赛事组委会所有，未尽事宜，另行通知
                    </h4>
                    
                </div>
            <!-- </div>   -->
        </section>
        <!-- footer -->
        <section class="dialog-footer">
            <van-button type="danger" block @click="onAgree">我同意参赛协议并报名</van-button>
        </section>
     </div>
   
</div>
</template>
<script>
import {
    Button,
  } from "vant";

export default {
    name:'Agreement',
    props:{
        show: Boolean
    },
    components:{
        [Button.name]: Button,
    },   
    data(){
        return {
            // isShow:this.show
        }
    },
    methods: {
        // onClose(){
        //     this.isShow = false;
        // },
        onAgree(){
            // this.isShow = false;
            this.$emit('onAgree',{agree:true});
        }
    },
}
</script>
<style lang="less">
.agreement-dialog{
    position: fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    overflow: hidden;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.7);

}
.agreement-content {
    display:flex;
    flex-direction:column;
    position: absolute;
    width:100%;
    height:100%;
    top:0;
    left:0px;
    overflow: hidden;
    z-index: 101;
    background-color: #fff;
    
}
.dialog-header{
    position: relative;
    height:50px;
    line-height:50px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    border-bottom:1px solid #efefef;
}
.dialog-close{
    position: absolute;
    width:30px;
    height:30px;
    top:10px;
    right:10px;
    line-height: 30px;
}
.dialog-body{
    flex:1;
    overflow:hidden;
    padding: 0 10px;

}


.dialog-footer{
    height:50px;
    padding: 0 20px;
    overflow:hidden;
    display:flex;
    justify-content:center;
    align-items:center;
    border-top:1px solid #efefef;
}
 .dialog-footer .van-button{
     height:35px;
 }

    .game-detail-text{
        color: #666;
        font-size: 12px;
        width:100%;
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        webkit-overflow-scrolling: touch;
    }
    .conMenu {
      background: #e50021;
      font-size: 20px;
      float: left;
      width: 100%;
      margin-bottom: 30px;
    }

    .menuListRight {
      width: 100%;
      float: left;
      padding-bottom: 50px;
    }

    .menuListRight li a {
      color: #fff;
      float: left;
      width: 100%;
      text-decoration: none;
      font-size: 16px;
      padding: 20px 35px;
      border-bottom: 1px solid #c80a23;
    }

    .menuListRight li a:hover {
      background: #c80a23;
    }

    .menuListRight .active a {
      background: #c80a23;
    }

    .conMenu .cnDesc {
      font-size: 32px;
      font-weight: 300;
      padding: 20px 20px 10px 30px;
      color: #fff;
    }

    .conMenu .enDesc {
      font-size: 14px;
      font-weight: normal;
      padding: 0 30px;
      margin-bottom: 20px;
      color: #fff;
    }

    .conMenu .line {
      border-top: 2px solid #fff;
      width: 20px;
      height: 0;
      display: inline-block;
      margin-left: 35px;
      margin-bottom: 40px;
    }
    .mb20{
      margin-bottom: 20px;
    }
    .gama-conent-desc{
      padding-left: 15px;
    }

</style>
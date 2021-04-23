<template>
  <div class="game-pay">
    <HeadBar title="报名支付" />
    <div class="game-card">
      <p class="pay-detail-title">您正在报名参加【{{ matchName }}】 赛事</p>
      <p>
        费用为<span class="money">&yen;{{ price }} </span>元
      </p>
      <p class="pay-detail-desc">请您尽快完成付款，锁定参赛名额！</p>
    </div>

    <PayType @changePayType="changePayType"></PayType>
    <van-button block type="danger" @click="onGoPay()" class="btn-submit">去支付</van-button>
  </div>
</template>

<script>
import HeadBar from "@/components/HeadBar.vue";
import PayType from "@/components/PayType.vue";
import { getQueryString, fetchHttp, formatTime, getCookie } from "@/util/fn.js";
// import QRCode from 'qrcode';

import { Toast, Button } from "vant";
export default {
  name: "Pay",
  components: {
    HeadBar,
    PayType,
    [Button.name]: Button,
  },
  data() {
    return {
      isFetch: false,
      currentPay: "wechatPay",
      wxQrcode: "",
      visible: false,
      ua: '',
      isWechat: false,
      code: getQueryString("code"),
      orderId: getQueryString("id"),
      matchName: getQueryString("matchName"),
      price: getQueryString("price"),
    };
  },
  
  mounted() {
     this.ua = navigator.userAgent.toLowerCase();
    this.isWechat = this.ua.indexOf("micromessenger") > -1;
    //判断微信环境。获取用户的授权，拿到code
    if (this.isWechat) {
      if (this.code == null || this.code === "") {
        this.getWxLogin();
      }
    }
  },
  methods: {
    changePayType(e) {
      this.currentPay = e.currentPay;
    },
    getWxLogin() {
      let redirect_uri = `http://ccfmty.com/pay?id=${this.id}&matchName=${this.matchName}&price=${this.price}`;
      window.location.href =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxee4537952d11d0a3&redirect_uri=" +
        encodeURIComponent(redirect_uri) +
        "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
    },
    onGoPay() {
      
      //支付宝支付
      if (this.currentPay == "alipay") {
        fetchHttp("marathon/pay/aliPay", { id: this.orderId }, "GET").then((res) => {
          if (res && res.code === 0) {
            if (res.data) {
              let hash = res.data;
              window.open("https://openapi.alipay.com/gateway.do?" + hash);
            } else {
              Toast.fail(res.message);
            }
          }else{
            Toast.fail(res.message);
          }
        });
      } else if(this.currentPay =='wechatPay'){
        // this.goWxPay();
        Toast('微信支付的代码还没测试好！')
      }
    },
    goWxPay() {
      //微信支付 h5
      if (this.isWechat) {
        //获取用户的授权，拿到code
        if (this.code == null || this.code === "") {
          this.getWxLogin();
        } else {
          fetchHttp("marathon/pay/telPay",{ id: this.orderId, code: this.code }, "GET", "showError").then((res) => {
            if (res && res.code === 0) {
              let data = res.data;
              let postData = {
                appId: data.appId,
                timeStamp: data.timeStamp,
                nonceStr: data.noncestr,
                package: data.prepayId,
                signType: "MD5",
                paySign: data.sign,
              };
              console.log(objToUrl(postData));
              function onBridgeReady() {
                window.WeixinJSBridge.invoke(
                  "getBrandWCPayRequest",
                  postData,
                  function (res) {
                    if (res.err_msg === "get_brand_wcpay_request:ok") {
                      Toast.success("恭喜您，支付成功了，快去我的赛事页面查看详情吧！");
                      setTimeout(() => {
                        window.location.href = "personalSignUp.html";
                      }, 3000);
                    }
                    if (res.err_msg === "get_brand_wcpay_request:cancel") {
                      Toast.info("您取消了支付");
                      this.getWxLogin();
                    }

                    if (res.err_msg === "get_brand_wcpay_request:fail") {
                      Toast.error( "支付失败，请重试！");
                      this.getWxLogin();
                    }
                  }
                );
              }

              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
                } else if (document.attachEvent) {
                  document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
                  document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
                }
              } else {
                if (data.openId) {
                  onBridgeReady();
                } else {
                  Toast( "code过期，重新授权获取");
                  setTimeout(() => {
                    this.getWxLogin();
                  }, 2500);
                }
              }
            } else {
              Toast("code过期，重新授权获取");
              setTimeout(() => {
                this.getWxLogin();
              }, 2500);
            }
          });
        }
      }
    },
  },
};
</script>
<style lang="less">
body{
  background:#efefef;
}
.game-card{
  font-size:14px;
  padding:10px;
  margin-bottom:10px;
  p{
    margin: 0.5em;
  }
  .money{
    color: #e50021;
  }
}
.pay-detail-title{
  font-size:16px;
  font-weight: bold;
}
.btn-submit{
  width:95%;
  margin:0 auto;
}
</style>

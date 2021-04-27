<template>
    <section class="pay-box">
        <h2>付款方式</h2>
        <form>
            <ul class="pay-list">
                <li id="alipay-tab" :class="currentPay == 'alipay'?'checked':''" @click="changePayType('alipay')">
                    <img class="type-icon" src="https://s10.mogucdn.com/mlcdn/c45406/200426_708d8cb978ac5d914ck36aabgldbf_140x40.gif" alt="支付宝支付" >
                    <dl>
                        <dt>支付宝支付</dt>
                        <dd>使用支付宝支付, 安全便捷</dd>
                    </dl>
                    <label for="alipay"></label>
                    <input type="radio" name="payType" id="alipay" value="11">
                    <van-icon class="checked-icon" name="checked" size="22" />
                </li>
                <li id="wechat-tab" :class="currentPay == 'wechatPay'?'checked':''" @click="changePayType('wechatPay')">
                    <img class="type-icon" src="https://s10.mogucdn.com/mlcdn/c45406/200426_0b26fhh02a2l3l5icl7fe0e5791ld_140x40.gif" alt="微信支付">
                    <dl>
                        <dt>微信支付</dt>
                        <dd>使用微信支付, 安全便捷</dd>
                    </dl>
                    <label for="wechatPay"></label>
                    <input type="radio" name="payType" id="wechatPay" value="21">
                    <van-icon class="checked-icon" name="checked" size="22"/>
                </li>
            </ul>
        </form>
      </section>
</template>
<script>
export default {
    name:'PayType',
    data(){
        return {
            currentPay: 'wechatPay', 
        }
    },
    methods: {
    //选择支付方式
      changePayType(type){
        this.currentPay = type;
        this.$emit('changePayType', {currentPay: this.currentPay});
      }
    },
}
</script>
<style lang="less">
  .pay-box{
    position: relative;
    padding: 0 10px;
    margin-bottom: 20px;
    // line-height: 56px;
    background-color: #fff;

  }
  .pay-box h2 {
      padding: 7px 0;
      font-size: 15px;
      color: #333;
      border-bottom: 1px solid #efefef;
  }

  .pay-list li {
      position: relative;
      overflow: hidden;
      padding: 10px 0;
      margin-left:10px;
      border-bottom: 1px solid #efefef;
      
  }
 .pay-list li.checked .checked-icon{
    display: block;
  }
  .pay-list .type-icon {
      float: left;
      width: 140px;
      height: 40px;
  }
  .pay-list dl {
      float:left;
      // padding: 14px 0;
      height: 40px;
      line-height: 1.3;
      margin:0;
  }
  .pay-list dl dt {
    font-size: 15px;
    color: #333;
  }
  .pay-list dl dd {
      font-size: 13px;
      color: #999;
      margin:0;
  }
  .pay-list label {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
  }
  .pay-list input[type=radio] {
      position: absolute;
      left: -1000px;
  }
  .pay-list .checked-icon{
    display: none;
    position: absolute;
    right: 10px;
    top: 30%;
    color:#e50021;
  }
</style>
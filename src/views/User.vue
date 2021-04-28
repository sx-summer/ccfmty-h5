<template>
  <div class="loginIndex">
    <HeadBar title="个人中心" />
    <div class="loginBox" v-if="!FMTY_USERDATA">
      <img class="logoImg" src="https://s10.mogucdn.com/mlcdn/c45406/200516_5l13kba4ldk920bbaee5cikba12jj_300x236.png" width="150" alt="长春疯马体育" />
      <van-form @submit="postLogin" class="loginForm">
        <van-field v-model="postMobile" name="mobile" label="手机号" placeholder="手机号码" type="tel" ref="mobileInput" :rules="[{ required: true }]" />
        <!-- @input="onChange" @blur="checkMobile"  -->
        <van-field v-model="postCaptcha" type="number" name="captcha" label="验证码" placeholder="验证码" :rules="[{ required: false }]">
          <template #button>
            <van-button size="small" type="primary" @click="sendMsg">{{ countdownText || '发送验证码'}}</van-button>
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" class="font-24">登录</van-button>
        </div>
      </van-form>
    </div>
    <div class="userBox" v-else>
      <div class="headInfo">
        <p class="topBox">
          <img src="https://s5.mogucdn.com/mlcdn/c45406/210411_659iacg41725gkk82i9gca9j4ahaj_198x198.png" width="99" class="myPic" />
          <!-- <span class="userName">{{userData.name}} </span> -->
        </p>
        <p class="userMobile"> {{userData.userName}}</p>
      </div>
      <div class="itemList">
        <van-cell-group>
          <van-cell  is-link title="我的赛事" icon="star-o" url="/myGame"></van-cell>
          <van-cell  is-link title="我的资料" icon="newspaper-o" url="myInfo"></van-cell>
          <van-cell  is-link title="我的证书" icon="photo-o" url="myCertificate"></van-cell>
        </van-cell-group>
      </div>
      <div class="loginOutBox">
       <van-button round block type="info" @click="loginOut" class="font-24">退出</van-button>
      </div>
    </div>

  </div>
</template>

<script>

  import HeadBar from "@/components/HeadBar.vue";
  import { getQueryString, fetchHttp, setCookie, getCookie, removeCookie } from "@/util/fn.js";
  import {
    Toast,
    Button,
    Cell, CellGroup 
  } from "vant";
  const mobileReg = /^1[3456789]\d{9}$/;
  const captchaReg = /^\d{6}$/;
  let second = 0;
  let canClick = true;
  export default {
    name: "loginIndex",
    components: {
      HeadBar,
      [Button.name]: Button,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    },
    data() {
      return {
        postMobile: '',
        postCaptcha: '',
        FMTY_USERDATA: '',
        countdownText: '',
        activeNames: ['1']
      };
    },
    computed: {

    },
    mounted() {
        let FMTY_USERDATA = getCookie('FMTY_USERDATA');
        let userData = FMTY_USERDATA && JSON.parse(FMTY_USERDATA);
        this.userData = userData;
        this.FMTY_USERDATA = FMTY_USERDATA;
        console.log(userData);
    },
    methods: {
      //发送验证码
      sendMsg() {
        let mobile = this.postMobile;
        let self = this;
        if (mobileReg.test(mobile)) {
          if (canClick) {
            fetchHttp('marathon/sendCode', { tel: mobile }, 'POST').then(res => {
              canClick = false;
              if (res && res.code === 0) {
                Toast('验证码已发送，请注意查收');
                self.resetTime();
              }
            });
          }
        } else {
          this.$refs.mobileInput.focus();
          Toast('请填写正确的11位手机号码！');
        }
      },

      //重发验证码
      resetTime() {
        second = 10;
        canClick = false;
        let timer = null;
        timer = setInterval(() => {
          second -= 1;
          if (second > 0) {
            this.countdownText = second + '秒后重发';
            canClick = false;
          } else {
            second = 0;
            clearInterval(timer);
            this.countdownText = '';
            this.canSendMsg = true;
            canClick = true;
          }
        }, 1000);
      },

      //登录
      postLogin(values) {
        let { postMobile, postCaptcha } = this;
        if (captchaReg.test(postCaptcha)) {
          if (postMobile && postCaptcha) {
            fetchHttp(
              'marathon/login',
              {
                tel: postMobile,
                code: postCaptcha,
              },
              'POST',
            ).then(res => {
              if (res && res.code === 0) {
                Toast('登录成功，疯马体育欢迎您！');
                //设置token
                setCookie('FMTY_TOKEN', res.token);
                setCookie('FMTY_USERDATA', JSON.stringify(res.data));
                setCookie('USERID', (res.data && res.data.id) || '');
                //判断是否有来源refer
                setTimeout(() => {
                  if (getQueryString('redirect_url')) {
                    window.location.href = getQueryString('redirect_url');
                  } else {
                    window.location.href = 'user';
                  }
                }, 1500);
              }else{
                Toast(res.message);
              }
            });
          } else {
            Toast('请填写正确的手机号和验证码！');
          }
        }
        //  else {
        //   Toast('请填写正确的6位验证码！');
        // }
      },

      //退出
      loginOut() {
        removeCookie('FMTY_TOKEN');
        removeCookie('FMTY_USERDATA');
        removeCookie('USERID');
        window.location.reload();
      }
    }
  };
</script>
<style scope lang="less">
.loginBox{
  background-color: #ffffff;
  text-align: center;
  height: calc(100vh - 50px );
}
  .van-cell--clickable{
    line-height: 30px;
  }
  .userMobile{
    margin-top: 50px;
  }
  .topBox{
    position: relative;
    width: 100px;
    height: 100px;
    left: 50%;
    margin-left: -50px;
  }
  .userName{
    background: rgba(0, 0, 0, 0.5);
    width: 100px;
    display: inline-block;
    position: absolute;
    bottom: -30px;
    left: 0;
  }
  .myPic{
    border-radius: 100em;
    overflow: hidden;
    margin-top: 30px;
  }
  .headInfo{
    width: 100vw;
    height: 250px;
    background: linear-gradient(157deg,#5B6F95 0,#35425F 100%);
    text-align: center;
    color: #fff;
  }
  .itemList{
    width: 100%;
  }
  .loginOutBox{
    width: 90%;
    margin: 100px 5% 0px 5%;
  }
  .loginIndex {
    width: 100vw;
    height: calc(100vh - 50px );
    background-color: #f8f8f8;
    padding-bottom: 50px;
    margin-top: -16px;
  }

  .logoImg {
    margin: 50px 0;
  }

  .loginForm .van-cell {
    font-size: 16px;
  }

  .font-24 {
    font-size: 20px;
    margin-top: 50px;
  }

</style>

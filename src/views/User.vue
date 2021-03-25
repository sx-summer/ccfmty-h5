<template>
  <div class="home">
    <HeadBar title="个人中心" />
    <div class="box">
      
      <p>账号： {{postMobile}}</p>
      <p>密码： {{postCaptcha}}</p>
      <van-button type="info" @click="login">登陆后台</van-button>
      <van-button type="info" @click="onSubmit">获取个人信息</van-button>
      <p> 
        {{FMTY_USERDATA}}
      </p>
    </div>
  </div>
</template>

<script>
  import HeadBar from "@/components/HeadBar.vue";
  import { getQueryString, fetchHttp, setCookie, getCookie } from "@/util/fn.js";
  import {
    Toast,
    Button
  } from "vant";

  export default {
    name: "home",
    components: {
      HeadBar,
      [Button.name]: Button
    },
    data() {
      return {
        postMobile: 'Admin',
        postCaptcha: 'fmty@123',
        FMTY_USERDATA: ''
      };
    },
    computed: {
    },
    methods: {
      onSubmit() {
        Toast("获取信息成功！");
        let id = getQueryString('id');
        let FMTY_USERDATA = getCookie('FMTY_USERDATA');
        let userData = FMTY_USERDATA && JSON.parse(FMTY_USERDATA);
        this.FMTY_USERDATA = FMTY_USERDATA;
        console.log(userData);

      },
      login() {
        let { postMobile, postCaptcha } = this;
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
            }
          });
        } else {
          Toast('请填写正确的管理员账号密码！');
        }
      }
    }
  };
</script>
<style scope lang="less">
  .home {
    text-align: center;
  }

</style>

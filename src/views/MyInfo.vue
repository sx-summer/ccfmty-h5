<template>
  <div class="gameSignUp">
    <HeadBar title="我的资料" />
    <div class="gameSignUpInfo">
      
      <UserForm :originForm="form" @onSubmit="onSubmit"></UserForm>

    </div>
  </div>
</template>

<script>
  import HeadBar from "@/components/HeadBar.vue";
  import UserForm from "@/components/UserForm.vue";
  import { fetchHttp, getCookie } from "@/util/fn.js";

  import {
    Toast,
  } from "vant";

  export default {
    name: "gameSignUp",
    components: {
      HeadBar,
      UserForm,
    },
    data() {
      return {
        
        username: '',
        userId: getCookie('USERID'),
        // matchName: '',
        // matchId: getQueryString('matchId'),
        // projectId: getQueryString('projectId'),
        // price: getQueryString('price') ,
        // showPrice:0,
        // matchInfo: {},

        form:{
          name:'',  //真实姓名
          sex: 1,
          bloodType:'', //血型
          dressSize: '',
          type:'',  //证件类型
          number:'',  //身份证号码
          tel:'',
          contactsName:'',
          contactsTel: '',
          nationality: '中国',
          province: "浙江省",
          city: "杭州市",
          county: "西湖区",
          address: "",
          url: "", //完赛证书
          // agree: false,  我的资料页面无，报名页面有
          email: "", //我的资料页面有 邮箱，报名页面没有
        }
      };
    },
    computed: {
    },
    mounted() {
      this.getOriginData();
    },
    methods: {
      getOriginData(){
        //获取基本信息
        fetchHttp('marathon/getUserInfo', { id: this.userId }, 'GET').then(res => {
          if (res && res.code === 0) {
            let data = res.data;
            if (data) {
              // let picPath = this.transferUrlToArray(data.url);
              // let originData = Object.assign(data, { picPath });
              this.userName = data.username;
              if(data.province && data.city && data.county){
                this.areaString = data.province+'/'+ data.city+'/'+ data.county;
              }
              // this.showAgree = !data.agree;
              Object.assign(this.form, data);
              console.log('原始数据信息',this.form);
            }
          }
        });
      },

      //表单验证通过时的提交
      onSubmit(postData) {
        postData = Object.assign(postData, {
          userId : this.userId
        });
        console.log('提交数据', postData);
        fetchHttp('marathon/userInfo', postData, 'GET').then(res => {
          if (res && res.code === 0) {
            Toast.success('个人资料保存成功！');
            // setTimeout(() => {
            //   window.location.href = 'index';
            // }, 3000);
          }else{
            Toast.fail(res.message);
          }
        });
        
      },
    
    }
  };
</script>
<style scope lang="less">


/*遮罩层显示时body的样式*/
.notScroll {
  overflow: hidden;

}
.game-card{
  background: #fff;
  margin-bottom: 10px;
  padding:10px;
}

  .gameSignUp {
    color: #333333;
    background: #efefef;
  }

  .signUpTitle {
    // border-bottom: 2px solid #ddd;
    padding: 10px 0;
    font-size: 16px;
    margin:0;
  }
  .van-submit-bar{
    border-top: 1px solid #efefef;
  }
  .van-submit-bar__text{
    text-align: left;
  }
  .readAgree{
    margin-left:15px;
    color:#1890ff;

    text-decoration: underline;
  }

</style>

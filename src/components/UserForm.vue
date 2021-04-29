<template>
  <div class="signUpForm">
    <van-form @submit="onSubmit">
      <!-- 姓名 -->
      <van-field
        v-model="form.name"
        name="name"
        label="真实姓名"
        placeholder="真实姓名"
        required
        :rules="[{ required: true, message: '请填写真实姓名' }]"
      />
      <!-- 性别 -->
      <van-field name="sex" label="性别" required>
        <template #input>
          <van-radio-group v-model="form.sex" direction="horizontal">
            <van-radio name="1" value="1">男</van-radio>
            <van-radio name="2" value="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 血型 -->
      <van-field
        readonly
        clickable
        name="bloodType"
        label="血型"
        placeholder="点击选择血型"
        required
        v-model="form.bloodType"
        @click="showBloodType = true"
      />
      <van-popup v-model="showBloodType" position="bottom">
        <van-picker
          show-toolbar
          :columns="bloodTypeArr"
          @confirm="onBloodType"
          @cancel="showBloodType = false"
        />
      </van-popup>

      <!-- 衣服尺码 -->
      <van-field
        readonly
        clickable
        name="dressSize"
        label="衣服尺码"
        placeholder="点击选择衣服尺码"
        required
        v-model="form.dressSize"
        @click="showDressSize = true"
      />
      <van-popup v-model="showDressSize" position="bottom">
        <van-picker
          show-toolbar
          :columns="dressSizeArr"
          @confirm="onDressSize"
          @cancel="showDressSize = false"
        />
      </van-popup>

      <!-- 证件类型 -->
      <van-field
        readonly
        clickable
        name="type"
        label="证件类型"
        placeholder="点击选择证件类型"
        required
        v-model="form.type"
        @click="showType = true"
      />
      <van-popup v-model="showType" position="bottom">
        <van-picker
          show-toolbar
          :columns="typeArr"
          @confirm="onType"
          @cancel="showType = false"
        />
      </van-popup>

      <!-- 证件号码 -->
      <van-field
        v-model="form.number"
        name="number"
        label="证件号码"
        placeholder="证件号码"
        required
        :rules="[{ required: true, message: '请填写证件号码' }]"
      />
      <!-- 手机号码 -->
      <van-field
        v-model="form.tel"
        name="tel"
        label="手机号码"
        placeholder="手机号码"
        required
        :rules="[{ required: true, message: '请填写手机号码' }]"
      />
      <!-- 邮箱 -->
      <van-field
        v-model="form.email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        required
        :rules="[{ required: true, message: '请填写邮箱地址' }]"
      />
      <!-- 紧急联系人 -->
      <van-field
        v-model="form.contactsName"
        name="contactsName"
        label="紧急联系人"
        placeholder="紧急联系人"
        required
        :rules="[{ required: true, message: '请填写紧急联系人' }]"
      />
      <!-- 紧急联系人电话 -->
      <van-field
        v-model="form.contactsTel"
        name="contactsTel"
        label="紧急联系人电话"
        placeholder="紧急联系人电话"
        required
        :rules="[{ required: true, message: '请填写紧急联系人电话' }]"
      />

      <!-- 快递邮寄地址（省市区） -->
      <van-field
        readonly
        clickable
        name="area"
        label="地区选择"
        placeholder="点击选择省市区"
        required
        :value="areaString"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onConfirmAddress"
          @cancel="showArea = false"
        />
      </van-popup>
      <!--  快递邮寄详细地址-->
      <van-field
        v-model="form.address"
        name="address"
        label="快递邮寄详细地址"
        placeholder="快递邮寄详细地址"
        required
        :rules="[{ required: true, message: '快递邮寄详细地址' }]"
      />

      <!-- 完赛证书 -->
      <van-field name="uploader" label="一年内的完赛证明">
        <template #input>
          <van-uploader v-model="uploader"  max-count="1" />
        </template>
      </van-field>

      <!-- 参赛协议 -->
      <!-- <van-field name="agree" label="参赛协议" required>
        <template #input>
          <van-checkbox v-model="form.agree" shape="square"></van-checkbox>
          <a
            class="readAgree"
            href="javascript:void(0);"
            @click="showAgree = true"
            >阅读并同意参赛协议
          </a>
        </template>
      </van-field> -->

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { areaList } from "@vant/area-data";

import {
  Button,
  Form,
  Field,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Popup,
  Picker,
  Area,
  Uploader,
  SubmitBar,
  Toast
} from "vant";

export default {
  name: "UserForm",
  props:{
    originForm: Object
  },
  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Area.name]: Area,
    [Uploader.name]: Uploader,
    [SubmitBar.name]: SubmitBar,
  },
  data() {
    return {
      areaString: "", //浙江省/杭州市/西湖区
      areaList: areaList,
      bloodTypeArr: ["A", "B", "AB", "O", "其他"],
      dressSizeArr: ["S", "M", "L", "XL", "2XL", "3XL"],
      typeArr: ["身份证", "护照", "其他"],
      showArea: false, //地址popup的显示
      showBloodType: false, //血型popup的显示
      showDressSize: false, //衣服大小popup的显示
      showType: false, //护照类型popup的显示
      uploader: [],  //{ url: "https://img01.yzcdn.cn/vant/leaf.jpg" }
      // showAgree: true,

      form: {
        name: "", //真实姓名
        sex: 1,
        bloodType: "", //血型
        dressSize: "",
        type: "", //证件类型
        number: "", //身份证号码
        tel: "",
        contactsName: "",
        contactsTel: "",
        nationality: "中国",
        province: "浙江省",
        city: "杭州市",
        county: "西湖区",
        address: "",
        url: "", //完赛证书
        // agree: false,  我的资料页面无，报名页面有
        email: "", //我的资料页面有 邮箱，报名页面没有
      },
    };
  },
  mounted() {
    this.form = this.originForm;
  },
  methods: {
    onBloodType(value) {
      this.form.bloodType = value;
      this.showBloodType = false;
    },
    onDressSize(value) {
      this.form.dressSize = value;
      this.showDressSize = false;
    },
    onType(value) {
      this.form.type = value;
      this.showType = false;
    },
    onConfirmAddress(values) {
      this.areaString = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      // console.log(this.areaString);
      this.showArea = false;
    },
    //表单验证通过时的提交
    onSubmit(values) {
      console.log('form 中的数据', values);

      //校验省市区
      if (this.areaString.length < 1) {
        Toast("请正确选择省市区！");
        return;
      }

      // if (!this.form.agree) {
      //   Toast("请仔细阅读并同意参赛协议");
      //   return;
      // }
      //校验健康证明
      // if (!values.uploader[0].url) {
      //   Toast.fail('请上传一年内完赛证书！');
      //   return;
      // }

      var areaArr = this.areaString.split("/");
      let postData = Object.assign(this.form, {
        nationality: "中国",
        province: areaArr[0],
        city: areaArr[1],
        county: areaArr[2],
        // url: values.uploader[0].url
      });

      console.log(postData);
      console.log("提交数据", postData);
      this.$emit('onSubmit', postData);
    },
  },
};
</script>
<style lang="less" scope>
.gameSignUp {
  color: #333333;
  background: #efefef;
}
</style>
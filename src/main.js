import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Lazyload, Icon, Form, Field } from 'vant';

Vue.config.productionTip = false;
Vue.use(Lazyload);
Vue.use(Icon);
Vue.use(Field);
Vue.use(Form);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/iview.js";
//hotcss 移动端布局解决方案
import "./lib/hotcss/hotcss.js";
//vue官方推荐的vue校验
import VeeValidate from "vee-validate";
//引入mint-ui样式
import 'mint-ui/lib/style.css';
//引入mint-ui库
import MintUI from 'mint-ui';

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(MintUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
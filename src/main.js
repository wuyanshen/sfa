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

import util from './lib/util.js';

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(MintUI);

//路由全局守卫
router.beforeEach((to, from, next) => {
  if (to.path != '/') {
    //校验用户是否登录
    if (util.getTypes(store.getters.getLoginUser) === 'Object') {
      next();
    } else {
      next('/');
    }

  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
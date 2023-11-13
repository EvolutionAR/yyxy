// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "./utils/filter";
import "./api/api";
import "./assets/css/resetCss.css";
import Loading from "./components/public/loading";

import * as echarts from "echarts";

import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Loading);
Vue.prototype.$echarts = echarts; //将echarts作为全局变量加入Vue

/* eslint-disable no-new */
const on = Vue.prototype.$on;
Vue.prototype.$on = function(event, func) {
  let previous = 0;
  let newFunc = func;
  if (event === "click") {
    newFunc = function() {
      const now = new Date().getTime();
      if (previous + 1000 <= now) {
        func.apply(this, arguments);
        previous = now;
      }
    };
  }
  on.call(this, event, newFunc);
};
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

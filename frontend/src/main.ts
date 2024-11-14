import Vue, { CreateElement } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h: CreateElement) => h(App),
}).$mount("#app");

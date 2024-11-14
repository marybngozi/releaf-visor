import Vue, { CreateElement } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: "places",
  },
});

new Vue({
  router,
  store,
  render: (h: CreateElement) => h(App),
}).$mount("#app");

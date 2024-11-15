import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    loggedIn: false,
  },
  mutations: {
    setUser(state, value) {
      state.user = value;
    },
    setLoggedIn(state, value) {
      state.loggedIn = value;
    },
    logout(state) {
      state.loggedIn = false;
    },
  },
  actions: {},
  modules: {},
});

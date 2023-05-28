import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    removeToken(state) {
      state.token = null;
    },
  },
  actions: {
    logout({ commit }) {
      commit("removeToken");
      // Remove cookie here
    },
  },
  getters: {
    getToken: (state) => state.token,
  },
});

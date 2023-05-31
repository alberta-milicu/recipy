import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: {
      email: null,
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    removeToken(state) {
      state.token = null;
    },
    setUserEmail(state, email) {
      state.user.email = email;
    },
  },
  actions: {
    login({ commit }, { token, email }) {
      commit("setToken", token);
      commit("setUserEmail", email);
      // Set cookie here if needed
    },
    logout({ commit }) {
      commit("removeToken");
      commit("setUserEmail", null);
      // Remove cookie here
    },
  },
  getters: {
    getToken: (state) => state.token,
    getUserEmail: (state) => state.user.email,
  },
});

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-app>
    <app-home></app-home>
  </v-app>
</template>

<script lang="ts">
import Home from "../views/HomeView.vue";
// import 'babel-polyfill'
export default {
  components: {
    "app-home": Home,
  },
  data() {
    return {};
  },
};
</script>

<style>
.margin-top-container {
  margin-top: 0px;
}
</style>

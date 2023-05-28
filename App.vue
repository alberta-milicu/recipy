<template>
  <v-app>
    <app-header></app-header>
    <router-view />
    <app-footer></app-footer>
  </v-app>
</template>

<script lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
// import 'babel-polyfill'
export default {
  components: {
    "app-header": Header,
    "app-footer": Footer,
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

app-header {
  height: 10%;
}

router-view {
  height: 80%;
}

app-footer {
  height: 10%;
}
</style>

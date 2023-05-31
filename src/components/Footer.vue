<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <v-footer>
    <div class="footer-container">
      <p>{{ copyright }}</p>
    </div>
  </v-footer>
</template>

<script lang="ts">
export default {
  data() {
    return { copyright: "Copyright 2023 ReciPy" };
  },
};
</script>
<style scoped src="../assets/styles/footer.css"></style>

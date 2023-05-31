<template>
  <div>
    <ul>
      <li>
        <div class="container-div">
          <div>
            <h1>Unlimited virtual food source...</h1>
            <br /><br />
            <h2>just one click away!</h2>
            <br /><br /><br />
            <div class="button-container">
              <v-btn class="recipes-btn" color="primary" v-on:click="toRecipes"
                >To Recipes</v-btn
              >
            </div>
            <div v-if="showOops" class="alert-container">
              <v-alert dismissible icon="mdi-alert" :value="showOops">
                <div class="alert-content">
                  <div class="alert-message">
                    You must be logged in to view the Recipes.
                  </div>
                  <div class="alert-button">
                    <v-btn color="primary" text @click="showOops = false">
                      OK
                    </v-btn>
                  </div>
                </div>
              </v-alert>
            </div>
          </div>
          <div class="center-image">
            <img src="../assets/images/food.jpg" height="600px" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class MyComponent extends Vue {
  showOops = false;

  toRecipes() {
    if (localStorage.getItem("token")) {
      this.$router.push("/recipes");
    } else {
      this.showOops = true;
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Delicious+Handrawn&display=swap");

ul {
  list-style-type: none;
  display: inline-block;
}

h1 {
  margin-top: 0px;
  margin-left: 10px;
  text-align: center;
  font-family: "Delicious Handrawn", cursive;
  font-size: 45px;
}

h2 {
  margin-left: 400px;
  font-family: "Delicious Handrawn", cursive;
  font-size: 30px;
  color: #000000b8;
}

.button-container {
  margin-left: 240px;
  font-family: "Delicious Handrawn", cursive;
}

.recipes-btn {
  width: 160px;
  height: 70px;
  font-size: 24px;
  font-weight: bold;
}

.center-image {
  width: 350px;
  height: 0px;
}
.container-div {
  width: 100%;
  padding: 10px 0px;
  margin-top: 0px;
  display: flex;
  align-items: center;
}
.container-div .center-image {
  margin: 0 auto;
  margin-top: -350px;
  margin-left: 80px;
}

.container-div > div:first-child {
  padding-top: 300px;
}

.alert-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background-color: #ffffff;
  padding: 16px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.alert-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.alert-message {
  flex: 1;
}

.alert-button {
  margin-left: 16px;
}
</style>

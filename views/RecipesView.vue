<template>
  <v-app class="full-app">
    <v-content>
      <v-container class="recipe-container">
        <v-row>
          <v-col
            v-for="(recipe, index) in recipes"
            :key="recipe.id"
            cols="12"
            md="6"
            lg="4"
          >
            <v-card
              class="recipe-box"
              elevation="20"
              @click="showRecipe(recipe)"
            >
              <div class="circle-image">
                <img
                  class="recipe-image"
                  :src="require(`../assets/images/food_image1.png`)"
                  alt="Recipe Image"
                />
              </div>
              <v-card-title class="recipe-name">
                {{ recipe.name }}
              </v-card-title>
              <div class="bottom-right-button">
                <v-btn
                  class="image-button"
                  @click="toggleHeart(index)"
                  @click.stop
                >
                  <img
                    :src="
                      activeIndex === index
                        ? require(`../assets/images/red_heart.png`)
                        : require(`../assets/images/blank_heart.png`)
                    "
                    alt="Heart"
                    class="heart-icon"
                  />
                </v-btn>
              </div>
            </v-card>
          </v-col>
          <v-btn class="add-btn-plus" color="primary" @click="addRecipeDialog">
            +
          </v-btn>
        </v-row>
        <v-dialog v-model="dialogVisible" max-width="500">
          <v-card v-if="recipe">
            <v-card-title>{{ recipe.name }}</v-card-title>
            <v-card-text>Ingredients: {{ recipe.ingredients }}</v-card-text>
            <v-card-actions>
              <div class="text-right">
                <v-btn @click="recipe && deleteRecipe(recipe.id)">Delete</v-btn>
                <v-btn color="#000000b8" dark @click="closeDialog()"
                  >Close</v-btn
                >
              </div>
            </v-card-actions>
          </v-card>
          <v-card v-else>
            <v-card-title>Add Recipe</v-card-title>
            <v-card-text>
              <v-text-field
                label="Name"
                v-model="newName"
                required
              ></v-text-field>
              <v-text-field
                label="Ingredients"
                v-model="newIngredients"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <div class="btn-box">
                <v-btn @click="closeDialog">Cancel</v-btn>
                <v-btn class="add-btn" color="primary" @click="addRecipe"
                  >Add</v-btn
                >
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      recipes: [],
      newName: "",
      newIngredients: "",
      dialogVisible: false,
      recipe: null,
      activeIndex: null,
    };
  },
  mounted() {
    this.getRecipes();
  },
  methods: {
    async getRecipes() {
      const result = await axios.get("http://localhost:3000/recipes/");
      this.recipes = result.data.map((res) => ({
        id: res._id,
        name: res.name,
        ingredients: res.ingredients,
      }));
    },
    async addRecipe() {
      const newRecipe = {
        name: this.newName,
        ingredients: this.newIngredients,
        id: "",
      };
      await axios.post("http://localhost:3000/recipes/", newRecipe);
      this.newName = "";
      this.newIngredients = "";
      this.getRecipes();
      this.dialogVisible = false;
    },
    async deleteRecipe(id) {
      console.log("Entered delete");
      await axios.delete("http://localhost:3000/recipes/", {
        data: { id: id },
      });
      this.recipe = null;
      this.dialogVisible = false;
      this.getRecipes();
    },
    addRecipeDialog() {
      this.dialogVisible = true;
      this.recipe = null;
      this.newName = "";
      this.newIngredients = "";
    },
    showRecipe(recipe) {
      this.recipe = recipe;
      this.dialogVisible = true;
    },
    closeDialog() {
      this.recipe = null;
      this.dialogVisible = false;
    },
    toggleHeart(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Delicious+Handrawn&display=swap");

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.recipe-container {
  font-family: "Delicious Handrawn", cursive;
  margin-top: 200px;
}

.add-btn-plus {
  margin-left: 160px;
  margin-top: 50px;
  border-radius: 100px;
  font-size: 25px;
  font-weight: bold;
  font-family: "Courier New";
}

.recipe-name {
  display: flex;
  justify-content: center;
  font-size: 40px;
}

.text-right {
  justify-content: right;
}

.recipe-box {
  height: 200px; /* Increase the height to accommodate the image */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn-box {
  justify-content: flex-end;
}

.circle-image {
  width: 80px; /* Adjust the size of the circle image */
  height: 80px; /* Adjust the size of the circle image */
  border-radius: 50%;
  background-color: #eaeaea; /* Specify a background color for the circle */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px; /* Add some spacing below the circle image */
}

.recipe-image {
  width: 60px; /* Adjust the size of the recipe image */
  height: 60px; /* Adjust the size of the recipe image */
  object-fit: cover;
  border-radius: 50%;
}

.bottom-right-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1;
}

.image-button {
  background-color: transparent;
  padding: 0;
}

.heart-icon {
  width: 24px;
  height: 24px;
}
</style>

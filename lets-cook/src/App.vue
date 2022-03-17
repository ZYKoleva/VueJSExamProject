<template>
  <div id="app">
     <Header />
      <div class="main-wrapper">
      <div v-for="my_recipe in my_recipes" v-bind:key="my_recipe.id">
            <div>{{my_recipe.name}}</div>
      </div>
      <Recipes
        :recepies="recipes"
        :ingredientsIHave="ingredientsIHave"
        @recipeToggle="recipeToggle($event)"
        @addItemToInventoryList="addItemToInventoryList($event)"
        @newRecipeSavedBtnClicked="newRecipeSavedBtnClicked($event)"
      />
      <InventoryList :ingredientsIHave="ingredientsIHave" />
     
    </div>
  </div>
</template>

<script>
import Recipes from './components/Recipes.vue';
import Header from "./components/Header.vue";


export default {
  name: 'App',
  components: {
    Header,
    Recipes
  }
}
</script>

<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;1,100&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Kalam:wght@700&display=swap");
@import url("https://use.fontawesome.com/releases/v5.10.2/css/all.css");
* {
  margin: 0px;
  padding: 0px;
}
.main-wrapper {
  display: flex;
}
</style>

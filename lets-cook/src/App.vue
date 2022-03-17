<template>
  <div id="app">
     <Header />
      <div class="main-wrapper">
      <Recipes
        :recipes="recipes"
        :my-recipes="myRecipes"
        :isAuthorized="isAuthorized"
        @newRecipeSavedBtnClicked="newRecipeSavedBtnClicked($event)"
      />   
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Recipes from './components/Recipes.vue';
import Header from "./components/Header.vue";


export default {
  name: 'App',
  components: {
    Header,
    Recipes
  }, 
  data() {
    return {
      recipes: [],
      myRecipes: [],
      isAuthorized: false,
    }

  }, 
  mounted () {
    this.getAllRecipes (),
    this.getMyRecipes ()
  },
  methods: {
      getAllRecipes () {
      axios({
          method: 'get',
          url: 'http://127.0.0.1:8000/cook_recipes/',
          content_type: "application/json",
      }).then ( response => this.recipes = response.data['recipes'])
      },      
      getMyRecipes () {
          axios({
              method: 'get',
              url: 'http://127.0.0.1:8000/cook_recipes/auth/',
              headers: {Authorization: 'Token d266b2b317d9e7525fdf18f78e0f32321ea21cca20b2abdff8b72bdb4d1b3f84'} ,
              content_type: "application/json",
          }).then ( response => this.myRecipes = response.data['recipes'])
       },
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

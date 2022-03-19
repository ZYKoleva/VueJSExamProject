<template>
  <div id="app">
    <Header />
    <div class="main-wrapper">
      <Register
      @Registered = "Registered"
      />
      <Recipes
          :recipes="recipes"
          :my-recipes="myRecipes"
          :isAuthorized="isAuthorized"
          @SaveRecipeBtnClicked="SaveRecipeBtnClicked"
      />  
      <Login
      @LoggedIn = "LoggedIn"
      /> 
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Recipes from './components/Recipes.vue';
import Header from "./components/Header.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue"



export default {
  name: 'App',
  components: {
    Header,
    Recipes,
    Login,
    Register,
  }, 
  data() {
    return {
      recipes: [],
      myRecipes: [],
      isAuthorized: false,
      token: "",
    }

  }, 
  mounted () {
    this.getAllRecipes ()
    this.getMyRecipes ()
  },
   watch: {
    token(newValue) {
      if(this.isAuthorized) {
        this.getMyRecipes (newValue);
        console.log(newValue);
      }
    }
  },
  methods: {
      getAllRecipes () {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/cook_recipes/',
            headers: {
              "content-type": "application/json"
              },
          }).then ( response => this.recipes = response.data['recipes'])
        },      
      getMyRecipes () {
        axios({
          method: 'get',
          url: 'http://127.0.0.1:8000/cook_recipes/auth/',
          headers: {
            Authorization: `Token ${this.token}`,
            "content-type": "application/json"
          },
          }).then ( response => this.myRecipes = response.data['recipes'])
        },
      LoggedIn(token) {
        this.isAuthorized = true;
        this.token = token;
        this.getMyRecipes(this.token);
      },
      Registered(token) {
        this.token = token;
        this.getMyRecipes (this.token);
        this.isAuthorized = true;
      },
      SaveRecipeBtnClicked(newRecipe){
        const formData = new FormData();
        formData.append('image', newRecipe.image);
        formData.append('description', newRecipe.description);
        formData.append('name', newRecipe.name);
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/cook_recipes/auth/',
          headers: {
            Authorization: `Token ${this.token}`} ,
          data: formData
          }).then ( response => this.myRecipes = response.data['recipes'])
          console.log(newRecipe)
          this.getMyRecipes();
      }
       
  },
 
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

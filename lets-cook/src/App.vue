<template>
  <div id="app">
    <!-- <Header /> -->
    <Header 
    :username="username"
    :isAuth="isAuth"/>
    <Navigation
    :isAuth="isAuth"
    @loggedOut="loggedOut"/>
    <router-view
     @LoggedIn="LoggedIn" 
    @loggedOut="loggedOut"
     :isAuth="isAuth"
    />   
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
import Header from "./components/Header.vue";
import { getAllRecipes, getMyRecipes } from "./dataProviders/recipes.js"
import { getMyFavouriteRecipes } from "./dataProviders/recipes.js"
import { isAuthenticated, logOut } from "./dataProviders/authentication.js"

export default {
  name: 'App',
  components: {
    Header,
    Navigation,      
  },
  computed: {
   },

  data(){
    return {
      isAuth: isAuthenticated(),
    }
  },
  async created(){
    if(isAuthenticated()){
      await this.$store.dispatch("loadAllRecipes")
      await this.$store.dispatch("loadFavoriteRecipes")
      await this.$store.dispatch('loadMyRecipes')
      await this.$store.dispatch("loadFavoriteIds")
    } else {
      await this.$store.dispatch("loadAllRecipes")
    }
  },
  methods: {
    async getAuthData(){
      this.myRecipes = await getMyRecipes();   
      this.myFavourites = await getMyFavouriteRecipes();
      this.allRecipes = await getAllRecipes()
      this.username = JSON.parse(localStorage.getItem('username'))
    },
    LoggedIn(){
      console.log("you logged in from App")
      this.isAuth = isAuthenticated();
      if(this.isAuth){
        console.log(this.isAuth)
        this.getAuthData()
        console.log("got new data")
      }      
    },
    async loggedOut(){    
      await logOut()
      this.myRecipes = []
      this.myFavourites = []
      this.username = ''  
      localStorage.clear();
      this.isAuth = isAuthenticated();
      this.$router.push({ name: 'home' });
    },
    async addRecipe(){
      console.log("caught addRecipe in App")
      this.myRecipes = await getMyRecipes();
      this.allRecipes = await getAllRecipes()
      this.myFavourites = await getMyFavouriteRecipes()
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

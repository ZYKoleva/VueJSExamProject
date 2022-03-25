<template>
  <div id="app">
    <!-- <Header /> -->
    <Header 
    :username="getCurrentUser['username']"
    :isAuth="getCurrentUser['isAuth']"/>
    <Navigation
    :isAuth="getCurrentUser['isAuth']"
    />
    <router-view
     :isAuth="getCurrentUser['isAuth']"
    />   
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
import Header from "./components/Header.vue";
import { isAuthenticated } from "./dataProviders/authentication.js"
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
    Navigation,      
  },
  computed: {
    ...mapGetters(["getCurrentUser"])    
   },

  // data(){
  //   return {
  //     isAuth: isAuthenticated(),
  //   }
  // },
  async created(){
    if(isAuthenticated()){
      await this.$store.dispatch("loadAllRecipes")
      await this.$store.dispatch("loadFavoriteRecipes")
      await this.$store.dispatch('loadMyRecipes')
      await this.$store.dispatch("loadFavoriteIds")
      const username = localStorage.getItem('username')
      await this.$store.commit('currentUserData', {username: username, isAuth: true})
    } else {
      await this.$store.dispatch("loadAllRecipes")
    }
  }
 
}
  
</script>

<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;1,100&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Kalam:wght@700&display=swap");
@import url("https://use.fontawesome.com/releases/v5.10.2/css/all.css");
@import url("http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css");
* {
  margin: 0px;
  padding: 0px;
}
.main-wrapper {
  display: flex;
}
</style>

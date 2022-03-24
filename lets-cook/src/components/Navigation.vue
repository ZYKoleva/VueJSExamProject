<template>
  <div class="nav-wrapper">
    <el-menu
    class="el-menu-demo"
    mode="horizontal"
    >
    <el-menu-item :class="{active: currectLocation===1}" index="1"><router-link :to="{ name: 'home' }">Home</router-link></el-menu-item>
    <el-menu-item index="2"><router-link :to="{ name: 'allRecipes' }">All Recipes <span>({{getAllRecipes.length}})</span></router-link></el-menu-item>
    <el-menu-item index="3"><router-link :to="{ name: 'myRecipes' }">My Recipes <span v-if="isAuth">({{getMyRecipes.length}})</span></router-link></el-menu-item>
    <el-menu-item index="4"><router-link :to="{ name: 'myFavRecipes' }">My Favorite Recipes <span v-if="isAuth">({{getMyFavoriteRecipes.length}})</span></router-link></el-menu-item>
    <el-menu-item index="5"><router-link :to="{ name: 'addRecipe' }">Add Recipe</router-link></el-menu-item>
    <el-menu-item v-if="!isAuth" index="6"><router-link :to="{ name: 'login' }">Login/Register</router-link></el-menu-item>
    <el-menu-item v-else index="7" @click="logOutBtnClicked">Logout</el-menu-item>
  </el-menu>
  
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import { logOut } from "../dataProviders/authentication"

export default {
  name: 'Navigation',
  props: {
    isAuth: Boolean,
 },
  computed: {
    ...mapGetters(["getAllRecipes", "getMyFavoriteRecipes", "getMyRecipes"]),
    currectLocation(){
      if (window.location.pathname === `${this.baseUrl}/home`)
       { console.log(this.$route.query.page); return 1}
      else if (window.location.pathname === `${this.baseUrl}/all-recipes`)
        {return 2}
      else if (window.location.pathname === `${this.baseUrl}/my-recipes`)
      {return 3}
      else if (window.location.pathname === `${this.baseUrl}/my-favorite-recipes`)
      {return 4}
      else if (window.location.pathname === `${this.baseUrl}/add-recipe`)
      {return 5} 
            else if (window.location.pathname === `${this.baseUrl}/login`)
      {return 6} 
      else { return 10}
    },     
  },

  data(){
    return { 
      baseUrl: 'http://localhost:8083'
    }
  },
  async created(){
  },
  methods: {
    async logOutBtnClicked () {         
      await logOut();
      this.$store.commit('clearCurrentUserData');
      this.$store.commit('clearStoreData');
      console.log(this.$store.getters.getCurrentUser)
      localStorage.clear();
      this.$router.push({ name: 'home' });
    },
  }
};

</script>
<style scoped>
.nav-wrapper {
    display: flex;
    flex-direction: row;
    place-content: flex-start;
    gap: 160px;
}
.currectTab {
  text-decoration-line: underline;
  font-size: 1.2rem;
}


</style>

<template>
  <div class="nav-wrapper">
    <el-menu
    class="el-menu-demo"
    mode="horizontal"
    >
    <el-menu-item :class="{active: currentLocationIndex === 1}" index="1"><router-link :to="{ name: 'home' }">Home</router-link></el-menu-item>
    <el-menu-item :class="{active: currentLocationIndex === 2}" index="2"><router-link :to="{ name: 'allRecipes' }">All Recipes <span>({{getAllRecipes.length}})</span></router-link></el-menu-item>
    <el-menu-item :class="{active: currentLocationIndex === 3}" index="3"><router-link :to="{ name: 'myRecipes' }">My Recipes <span v-if="isAuth">({{getMyRecipes.length}})</span></router-link></el-menu-item>
    <el-menu-item :class="{active: currentLocationIndex === 4}" index="4"><router-link :to="{ name: 'myFavRecipes' }">My Favorite Recipes <span v-if="isAuth">({{getMyFavoriteRecipes.length}})</span></router-link></el-menu-item>
    <el-menu-item :class="{active: currentLocationIndex === 5}" index="5"><router-link :to="{ name: 'addRecipe' }">Add Recipe</router-link></el-menu-item>
    <el-menu-item :class="{active: currentLocationIndex === 6}" v-if="!isAuth" index="6"><router-link :to="{ name: 'login' }">Login/Register</router-link></el-menu-item>
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
  },

  data(){
    return { 
      baseUrl: 'http://localhost:8083',
      currentLocationIndex: 1,
    }
  },
  async created(){
  },
  watch:{
    $route(to) {
      if (to['path'] === '/home'){this.currentLocationIndex = 1}
      if (to['path'] === '/all-recipes'){this.currentLocationIndex = 2}
      if (to['path'] === '/my-recipes'){this.currentLocationIndex = 3}
      if (to['path'] === '/my-favorite-recipes'){this.currentLocationIndex = 4}
      if (to['path'] === '/add-recipe'){this.currentLocationIndex = 5}
      if (to['path'] === '/login'){this.currentLocationIndex = 6}     
    }
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
.active {
  text-decoration-line: underline;
  font-size: 1.2rem;
  font-weight: bold;

}
.el-menu-item * {
    vertical-align: top;
}



</style>

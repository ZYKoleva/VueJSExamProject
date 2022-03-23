<template>
  <div class="nav-wrapper">
    <el-menu
    class="el-menu-demo"
    mode="horizontal"
    >
    <el-menu-item index="1"><router-link :to="{ name: 'home' }">Home</router-link></el-menu-item>
    <el-menu-item index="2"><router-link :to="{ name: 'allRecipes' }">All Recipes <span>({{getAllRecipes.length}})</span></router-link></el-menu-item>
    <el-menu-item index="3"><router-link :to="{ name: 'myRecipes' }">My Recipes <span v-if="isAuth">({{getMyRecipes.length}})</span></router-link></el-menu-item>
    <el-menu-item index="4"><router-link :to="{ name: 'myFavRecipes' }">My Favorite Recipes <span v-if="isAuth">({{getMyFavoriteRecipes.length}})</span></router-link></el-menu-item>
    <el-menu-item index="5"><router-link :to="{ name: 'addRecipe' }">Add Recipe</router-link></el-menu-item>
    <el-menu-item v-if="!isAuth" index="6"><router-link :to="{ name: 'login' }">Login/Register</router-link></el-menu-item>
    <el-menu-item v-else index="7" @click="loggedOut">Logout</el-menu-item>
  </el-menu>
  
  </div>
</template>
<script>
import {mapGetters} from "vuex"

export default {
  name: 'Navigation',
  props: {
    isAuth: Boolean,
 },
  computed: {
    ...mapGetters(["getAllRecipes", "getMyFavoriteRecipes", "getMyRecipes"])     
  },
  data(){
    return { 
    }
  },
  async created(){
  },
  methods: {
    loggedOut(){      
      this.$emit("loggedOut")
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


</style>

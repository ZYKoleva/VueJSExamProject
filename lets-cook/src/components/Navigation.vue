<template>
    <el-menu
    class="el-menu-demo"
    mode="horizontal"
    >
    <el-menu-item index="1"><router-link :to="{ name: 'home' }">Home</router-link></el-menu-item>
    <el-menu-item index="2"><router-link :to="{ name: 'allRecipes' }">All Recipes <span>({{numAllRecipes}})</span></router-link></el-menu-item>
    <el-menu-item index="3"><router-link :to="{ name: 'myRecipes' }">My Recipes <span v-if="isAuthenticated">({{numMyRecipes}})</span></router-link></el-menu-item>
    <el-menu-item index="4"><router-link :to="{ name: 'addRecipe' }">Add Recipe</router-link></el-menu-item>
    <el-menu-item index="5"><router-link :to="{ name: 'login' }">Login/Register <span v-if="isAuthenticated">({{username}})</span></router-link></el-menu-item>
  </el-menu>
</template>
<script>
import { getAllRecipes } from "../dataProviders/recipes.js"
import { getMyRecipes } from "../dataProviders/recipes.js"
export default {
  data(){
    return {
      numAllRecipes: '',
      numMyRecipes: '',
      isAuthenticated: true,
      username: 'Pesho'
    }
  },
  async created(){
        const numRec = await getAllRecipes();
        this.numAllRecipes = numRec.length;
        if(this.isAuthenticated === true) {
          const myNumRec = await getMyRecipes();
          this.numMyRecipes = myNumRec.length;
        }
    }
  // methods: {
  //   async getNumAllRecipes(){
  //       const allRecipes = await getAllRecipes()
  //       this.numAllRecipes = allRecipes.length()
  //       console.log(this.numAllRecipes)
  //   }
  // }
};

</script>
<style scoped>

</style>

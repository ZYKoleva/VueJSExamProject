import Home from "@/views/Home.vue";
import RecipesList from "@/views/RecipesList.vue"
import AddRecipe from "@/views/AddRecipe.vue"
import MyRecipesList from "@/views/MyRecipesList.vue"
import MyFavoriteRecipesList from "@/views/MyFavoriteRecipesList"
import Login from "@/views/Login.vue"
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: '', name: "home", component: Home },
  { path: '/all-recipes', name: "allRecipes", component: RecipesList },
  { path: '/add-recipe', name: "addRecipe", component: AddRecipe },
  { path: '/my-recipes', name: "myRecipes", component: MyRecipesList },
  { path: '/my-favorite-recipes', name: "myFavRecipes", component: MyFavoriteRecipesList },
  {path: '/login', name: "login", component: Login},
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router;

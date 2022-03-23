import Vue from 'vue';
import Vuex from 'vuex';
import {getAllRecipes, 
  updateRecipeViewed, 
  updateRecipeLiked, 
  markedAsFavourite, 
  getMyFavouriteRecipes, 
  getMyRecipes, 
  deleteMyRecipe, 
  removeFromFavourite} 
  from '../dataProviders/recipes'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    allRecipes: [],
    myRecipes: [],
    myFavoriteRecipes: [],
    listFavoriteIds: [],
  },
  getters: {
    getLoadingState(state){
      return state.isLoading; 
    },
    getAllRecipes(state){
        return state.allRecipes;
      },
    getMyRecipes(state){
        return state.myRecipes;
    },
    getMyFavoriteRecipes(state){
        return state.myFavoriteRecipes;
    },
    getListFavoriteIds(state){
      return state.listFavoriteIds
    }
  },
  mutations: {
    setLoadingState(state, payload){
      state.isLoading = payload;
    },
    allRecipes (state, payload) {      
      state.allRecipes = payload;
      console.log("state was updated")
    },
    myFavoriteRecipes(state, payload) {
      state.myFavoriteRecipes = payload;
    },
    myRecipes(state, payload){
      state.myRecipes = payload
    },
    myFavoriteIds(state, list_favorite_ids){
      state.listFavoriteIds = list_favorite_ids
    }
  },
  actions: {
    async loadAllRecipes(context){      
      context.commit('setLoadingState', true);
      const list_recipes = await getAllRecipes();
      context.commit('allRecipes', list_recipes);
      context.commit('setLoadingState', false);
    },
    async loadFavoriteRecipes(context){      
      context.commit('setLoadingState', true);
      const list_favorite_recipes = await getMyFavouriteRecipes();
      context.commit('myFavoriteRecipes', list_favorite_recipes);
      context.commit('setLoadingState', false);
    },
    async loadMyRecipes(context){      
      context.commit('setLoadingState', true);
      const list_my_recipes = await getMyRecipes();
      context.commit('myRecipes', list_my_recipes);
      context.commit('setLoadingState', false);
    },
    async loadFavoriteIds(context){
      context.commit('setLoadingState', true);
      const list_favored_recipes = await getMyFavouriteRecipes();
      let list_favorite_ids = [];
      list_favored_recipes.forEach( rec => list_favorite_ids.push(rec["id"]));
      console.log(list_favorite_ids)
      context.commit('myFavoriteIds', list_favorite_ids)
    },
    async recipeViewed(context, payload){
      context.commit('setLoadingState', true);
      await updateRecipeViewed(payload.recipe_id, payload.formData)
      const list_recipes = await getAllRecipes();
      context.commit('allRecipes', list_recipes);
      context.commit('setLoadingState', false);
    },
    async recipeLiked(context, payload){
      context.commit('setLoadingState', true);
      await updateRecipeLiked(payload.recipe_id, payload.formData)
      const list_recipes = await getAllRecipes();
      context.commit('allRecipes', list_recipes);
      context.commit('setLoadingState', false);
    },
    async recipeFavored(context, recipe_id){
      context.commit('setLoadingState', true);
      await markedAsFavourite(recipe_id)
      const list_favored_recipes = await getMyFavouriteRecipes();
      context.commit('myFavoriteRecipes', list_favored_recipes);
      context.commit('setLoadingState', false);
    }, 
    async deleteRecipe(context, recipe_id) {
      context.commit('setLoadingState', true);
      await deleteMyRecipe(recipe_id);
      const list_recipes = await getAllRecipes();
      context.commit('allRecipes', list_recipes);
      const list_favorite_recipes = await getMyFavouriteRecipes();
      context.commit('myFavoriteRecipes', list_favorite_recipes);
      const list_my_recipes = await getMyRecipes();
      context.commit('myRecipes', list_my_recipes);
      context.commit('setLoadingState', false);
    },
    async removeFavorite(context, recipe_id) {
      context.commit('setLoadingState', true);
      await removeFromFavourite(recipe_id);
      const list_favorite_recipes = await getMyFavouriteRecipes();
      context.commit('myFavoriteRecipes', list_favorite_recipes);
      context.commit('setLoadingState', false);
      const list_favorite_ids = [];
      list_favorite_recipes.forEach( rec => list_favorite_ids.push(rec["id"]));
      console.log(list_favorite_ids)
      context.commit('myFavoriteIds', list_favorite_ids)
    }    
  }
})
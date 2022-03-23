import axios from "axios"
import {  getToken } from "../dataProviders/authentication.js"
const baseUrl = "http://127.0.0.1:8000/cook_recipes"
// const token = getToken()


export async function getAllRecipes(){
    try {
        const response = await axios.get(`${baseUrl}/`);
        const result = response.data['recipes']
        return result
        
    } catch (err) {
        console.error("Unexpected error occured while trying to get all the recipes", err);
        return [];
    }
}
export async function getMyRecipes(){
    const token = getToken()
    console.log(token)
    const headers = {
        Authorization: `Token ${token}`,
        "content-type": "application/json"
    }
    try{
        const response = await axios.get(`${baseUrl}/auth/`, {headers});
        const result = response.data['recipes']
        return result
    } catch (err) {
        console.error("Unexpected error occured while trying to get your the recipes", err);
        return [];
    }
}

export async function getMyFavouriteRecipes() {
    const token = getToken()
    const headers = {Authorization: `Token ${token}`}
    try {
    const response = await axios.get(
        `http://127.0.0.1:8000/cook_recipes/my_favorite_recipes/`, {headers})         
        return response.data['recipes']
    } catch (err) {
        console.error("Unexpected error occured while trying to get your favorite recipes", err);
        return [];
    }

  }
  export async function getMyFavouriteRecipesIds() {
    const list_fav_recipes = await getMyFavouriteRecipes();
    let list_ids_fav_recipes = [];
    list_fav_recipes.forEach( rec => list_ids_fav_recipes.push(rec["id"]));
    return list_ids_fav_recipes
  }

  export async function getSelectedRecipe(recipeId) {
    const token = getToken()
    const headers = {Authorization: `Token ${token}`}
    try {
        const response = await axios.get(
            `http://127.0.0.1:8000/cook_recipes/auth/${recipeId}`, {headers})         
        const selected_recipe =  response.data['recipe']
        return selected_recipe
        } catch (err) {
            console.error("Unexpected error occured while trying to get selected recipe", err);
            return [];
        }
    }

export async function addRecipe(formData){
    const token = getToken()
    const headers = {Authorization: `Token ${token}`}
    try {
        const response = await axios.post(
            `http://127.0.0.1:8000/cook_recipes/auth/`,
            formData, {headers})
        return response.data['recipes']
        } catch (err) { "An error occured while trying to save the recipe", err} 
    
    }

export async function updateRecipe(selected_recipe_id, formData){
    const token = getToken()
    const headers = {Authorization: `Token ${token}`}
    try {
        const response = await axios.put(
            `http://127.0.0.1:8000/cook_recipes/auth/${selected_recipe_id}/`,
            formData, {headers})
        return response.data['recipes']
        } catch (err) { "An error occured while trying to update the recipe", err} 
    }

export async function updateRecipeViewed(selected_recipe_id, formData){
    try {
        const response = await axios.put(
            `http://127.0.0.1:8000/cook_recipes/${selected_recipe_id}/`,
            formData)
        return response.data['recipe']
        } catch (err) { "An error occured while trying to update the recipe viewed property", err} 
    }
export async function updateRecipeLiked(recipe_id, formData){
    try {
        const response = await axios.put(
            `http://127.0.0.1:8000/cook_recipes/${recipe_id}/`,
            formData)
        return response.data['recipe']
        } catch (err) { "An error occured while trying to update the recipe viewed property", err} 
    }

export async function deleteMyRecipe(recipe_id) {
    const token = getToken()
    try {
        const headers = {Authorization: `Token ${token}`}
        await axios.delete(
        `http://127.0.0.1:8000/cook_recipes/auth/${recipe_id}/`, {headers: headers}
        )
        const listRecipes = await getMyRecipes()
        return listRecipes
        }
    catch (err) { "An error occured while trying to delete the recipe", err }      
    } 

export async function markedAsFavourite(recipe_id){
    try {
        const token = getToken()
        const headers = {Authorization: `Token ${token}`}
        await axios.post(
        `http://127.0.0.1:8000/cook_recipes/my_favorite_recipes/${recipe_id}/`,
        {}, {headers: headers}
        )
    } catch (err) { "An error occured while trying to add recipe to favorutes", err } 
}

export async function removeFromFavourite(recipe_id){
    const token = getToken()
    try {
        const headers = {Authorization: `Token ${token}`}
        await axios.delete(
        `http://127.0.0.1:8000/cook_recipes/my_favorite_recipes/${recipe_id}/`, {headers: headers}
        )
        const listRecipes = await getMyFavouriteRecipes()
        return listRecipes
        } catch (err) { "An error occured while trying to remove the recipe from your favourites", err } 
    }
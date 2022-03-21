<template>
    <div class="recepies-wrapper">
    <article class="recepies-wrapper" v-for="(recipe, index) in listRecipes" v-bind:key="index">
      <div class="img-wrapper">
        <img
          :class="[canBeCooked() ? 'cookable' : 'notCookable']"
          :src="recipe.image"
          alt=""
        />
      </div>
      <div class="btn-wrapper">
        <a class="heart-icon" @click="liked(recipe)"><i class="fa fa-thumbs-up fa-sm" aria-hidden="true"></i>{{recipe.liked}}</a>
        <a class="eye-icon"><i class="fa fa-eye fa-sm"></i>{{recipe.viewed}}</a>
        <a class="xmark-icon" @click="removeFromFavourite(recipe)">❌</a>
      </div> 
      <div class="recipe-title" @click="showHideDetails(recipe)">
        {{ recipe.name }} {{recipe.id}}        
      </div>
           
      <div>
        <div v-if="showDetailsIDs.includes(recipe.id)" class="description-wrapper">
          <h5>Preparation</h5>
          <p class="recipe-description">{{ recipe.description }}</p>
        </div>
      </div>
    </article> 
  </div> 
</template>

<script>
import axios from 'axios'
import { getMyFavouriteRecipes } from "../dataProviders/recipes.js"
export default {
  name: 'MyFavoriteRecipesList',
  components: {
  },
  data() {
    return {
        listRecipes: [],
        showDetailsIDs: [],
        token: '80c96815868f2aa232914fa24eefb49217eedec1e126a203256e7d7b7bf53c77',
        listIDsFavouriteRecipes: [],
      }
    },
    async created(){
        this.listRecipes = await getMyFavouriteRecipes();
    },
    methods: {
        canBeCooked () {
          return true
        },
    async showHideDetails(recipe) {
      if (this.showDetailsIDs.includes(recipe.id)){
        this.showDetailsIDs = []
      } else {
        this.showDetailsIDs = []
        this.showDetailsIDs.push(recipe.id)
      }
    },     
    async removeFromFavourite(recipe){
      const headers = {Authorization: `Token ${this.token}`}
      await axios.delete(
      `http://127.0.0.1:8000/cook_recipes/my_favorite_recipes/${recipe.id}/`, {headers: headers}
      )
      this.listRecipes = await getMyFavouriteRecipes()
    },
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.articles-wrapper {
  margin-top: 50px;
  margin-left: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}


.recepies-wrapper {
  margin-top: 50px;
  margin-left: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}


article {
  width: 300px;
  margin: 20px;
}
.recipe-title {
  text-align: center;
  margin: 40px;
  font-family: "Kalam", sans-serif;
  font-size: large;
}

.img-wrapper {
  width: 300px;
  height: 200px;
}
img {
  width: 100%;
  height: 100%;
}
.btn-wrapper {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: left;
}
.thumbs-icon {
  margin-left: 10px;
}
.eye-icon {
  margin-left: 10px;
}
.xmark-icon {
    margin-left: 50px;

}

ul {
  list-style: none;
}
.has-item {
  color: green;
  margin-right: 5px;
  margin-left: 5px;
}
.missing-item {
  color: red;
  margin-right: 5px;
  margin-left: 5px;
}

.description-wrapper {
  margin-top: 30px;
  text-align: center;
}
.recipe-description {
  justify-content: center;
  margin-top: 20px;
}
.cookable {
  border-radius: 6px;
  box-shadow: 0px 0px 5px 0px green;
}

.notCookable {
  border-radius: 6px;
  box-shadow: 0px 0px 5px 0px red;
}
.recipes-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 12px;
  padding: 0;
  margin: 0;
}
.p-viewed {
  margin-left: 100px;
}
</style>

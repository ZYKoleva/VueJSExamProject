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
        <div class="thumbs-icon" @click="liked(recipe)"><i class="fa fa-heart fa-sm" aria-hidden="true"></i>{{recipe.liked}}</div>
        <div class="eye-icon"><i class="fa fa-eye fa-sm"></i>{{recipe.viewed}}</div>
        <!-- <div class="heart-icon"><i class="fa fa-heart fa-sm"></i>{{recipe.viewed}}</div> -->
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
import { getAllRecipes } from "../dataProviders/recipes.js"
export default {
  name: 'RecipesList',
  // props: {
  //   listRecipes: Array
  // },  
  components: {
  },
  data() {
    return {
        listRecipes: [],
        showDetailsIDs: []
      }
    },
    async created(){
        this.listRecipes = await getAllRecipes();
    },
    methods: {
        canBeCooked () {
          return true
        },
    async showHideDetails(recipe) {
      const formData = new FormData();
      if (this.showDetailsIDs.includes(recipe.id)){
        this.showDetailsIDs = []
      } else {
        this.showDetailsIDs = []
        this.showDetailsIDs.push(recipe.id)
        const new_num = recipe.viewed + 1;
        formData.append('viewed', new_num)
      }
      await axios.put(
      `http://127.0.0.1:8000/cook_recipes/${recipe.id}/`,
      formData
      )
      const response = await axios.get("http://127.0.0.1:8000/cook_recipes/");
      this.listRecipes = response.data['recipes'];
    },  
    async liked(recipe) {
      const formData = new FormData();
      const new_num = recipe.liked + 1;
      formData.append('liked', new_num)
      await axios.put(
      `http://127.0.0.1:8000/cook_recipes/${recipe.id}/`,
      formData
      )
      const response = await axios.get("http://127.0.0.1:8000/cook_recipes/");
      this.listRecipes = response.data['recipes'];
    }      
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
  margin: 10px;
}
.eye-icon {
  margin: 10px;
}
.heart-icon {
  margin: 10px;
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

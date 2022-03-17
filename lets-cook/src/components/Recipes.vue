<template>
  <div class="recepies-wrapper">
    <div class="add-recipe-main-wrapper" v-if="isAuthorized">
      <div v-if="!this.isAddRecipeClicked" class="add-recipe-btn-wrapper" @click="addRecipeBtnClicked">
        <button class="btn-add-recipe">Add recipe</button>
      </div>
      <AddRecipe
        v-if="this.isAddRecipeClicked"
        @CancelBtnClicked = "CancelBtnClicked"
      />
    </div>
    <div class="articles-wrapper" v-if="isAuthorized">
    <article v-for="(recipe, index) in my_recipes" v-bind:key="index">
      <div class="img-wrapper">
        <img
          :class="[canBeCooked() ? 'cookable' : 'notCookable']"
          :src="recipe.image"
          alt=""
        />
      </div>
      <h3 class="recipe-title" @click="showHideDetails(recipe)">
        {{ recipe.name }} {{recipe.id}}
      </h3>
      <div>
        <div v-if="recipe.show_hide" class="description-wrapper">
          <h5>Preparation</h5>
          <p class="recipe-description">{{ recipe.description }}</p>
        </div>
      </div>
    </article>    
    </div>
    <div class="articles-wrapper" v-else>
    <article v-for="(recipe, index) in recipes" v-bind:key="index">
      <div class="img-wrapper">
        <img
          :class="[canBeCooked() ? 'cookable' : 'notCookable']"
          :src="recipe.image"
          alt=""
        />
      </div>
      <h3 class="recipe-title" @click="showHideDetails(recipe)">
        {{ recipe.name }} {{recipe.id}}
      </h3>
      <div>
        <div v-if="recipe.show_hide" class="description-wrapper">
          <h5>Preparation</h5>
          <p class="recipe-description">{{ recipe.description }}</p>
        </div>
      </div>
    </article>    
    </div>
  </div> 
</template>

<script>
import axios from 'axios'
import AddRecipe from "./AddRecipe.vue"

export default {
  name: 'Recipes',
  props: {
    msg: String
  },
  components: {
    AddRecipe,
  },
  data () {
      return  {
          recipes: [],
          my_recipes: [],
          isAuthorized: true,
          isAddRecipeClicked: false,
      }
  },
  mounted () {
      this.getAllRecipes (),
      this.getMyRecipes ()
  },
  methods: {
      getAllRecipes () {
          axios({
              method: 'get',
              url: 'http://127.0.0.1:8000/cook_recipes/',
              content_type: "application/json",
          }).then ( response => this.recipes = response.data['recipes'])
      },
      getMyRecipes () {
          axios({
              method: 'get',
              url: 'http://127.0.0.1:8000/cook_recipes/auth/',
              headers: {Authorization: 'Token 15a1b3fefcfd7d8d466cd9a3d3b233baeb02655709e00d32d99b8e638a3a9b5c'} ,
              content_type: "application/json",
          }).then ( response => this.my_recipes = response.data['recipes'])
       },
      canBeCooked () {
        return false
      },
      addRecipeBtnClicked () {
        this.isAddRecipeClicked = true;
        console.log("clicked");
      },
      CancelBtnClicked () {
        this.isAddRecipeClicked = false;
      },
      showHideDetails(recipe) {
       if(recipe.show_hide === false)  {
          recipe.show_hide = true
        } else {
          recipe.show_hide = false
        }
      },           
  }
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
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.add-recipe-btn-wrapper {
  width: 100%;
}
.btn-add-recipe {
  border-radius: 4px;
  padding: 5px 10px;
  background-color: midnightblue;
  color: white;
  margin: 10px;
}

article {
  width: 300px;
  margin: 20px;
}
.recipe-title {
  text-align: center;
  margin: 10px;
  font-family: "Kalam", sans-serif;
}

.img-wrapper {
  width: 300px;
  height: 200px;
}
img {
  width: 100%;
  height: 100%;
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
</style>

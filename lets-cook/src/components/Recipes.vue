<template>
  <div class="recepies-wrapper">
    <div class="add-recipe-main-wrapper">
    </div>
    <div v-if=isAuthorized()>
    <article v-for="recipe in my_recipes" v-bind:key="recipe.id">
      <div class="img-wrapper">
        <img
          :class="[canBeCooked() ? 'cookable' : 'notCookable']"
          :src="recipe.image"
          alt=""
        />
      </div>
      <h3 class="recipe-title" @click="recipeToggle(index)">
        {{ recipe.name }}
      </h3>
      <div>
        <!-- <p class="ingredients-title">Needed ingredients:</p> -->
        <!-- <ul
          class="ingredient-list"
          v-for="(ingredient, index) in recipe.ingredients"
          :key="index"
        >
          <li class="ingredient-list-items">
            <span class="has-item" v-if="ingredient.hasEnough">✔</span>
            <span class="missing-item" v-if="!ingredient.hasEnough">❌</span>
            {{ ingredient.name }} - {{ ingredient.quantity }}
            {{ ingredient.measurement }}
          </li>
        </ul> -->
        <div class="description-wrapper">
          <h5>Preparation</h5>
          <p class="recipe-description">{{ recipe.description }}</p>
        </div>
      </div>
    </article>    
    </div>
    <div v-else>
    <article v-for="recipe in recipes" v-bind:key="recipe.id">
      <div class="img-wrapper">
        <img
          :class="[canBeCooked() ? 'cookable' : 'notCookable']"
          :src="recipe.image"
          alt=""
        />
      </div>
      <h3 class="recipe-title" @click="recipeToggle(index)">
        {{ recipe.name }}
      </h3>
      <div>
        <!-- <p class="ingredients-title">Needed ingredients:</p> -->
        <!-- <ul
          class="ingredient-list"
          v-for="(ingredient, index) in recipe.ingredients"
          :key="index"
        >
          <li class="ingredient-list-items">
            <span class="has-item" v-if="ingredient.hasEnough">✔</span>
            <span class="missing-item" v-if="!ingredient.hasEnough">❌</span>
            {{ ingredient.name }} - {{ ingredient.quantity }}
            {{ ingredient.measurement }}
          </li>
        </ul> -->
        <div class="description-wrapper">
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

export default {
  name: 'Recipes',
  props: {
    msg: String
  },
  data () {
      return  {
          recipes: [],
          my_recipes: [],
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
              headers: {Authorization: 'Token a5f5bd9559b7ee36f9582c0bc378476a090e6b50bc86f084a3fbe57c0e757f28'} ,
              content_type: "application/json",
          }).then ( response => this.my_recipes = response.data['recipes'])
      },
      canBeCooked () {
        return true
      },
      addRecipeBtnClicked () {
      },
      isAuthorized () {
        return true
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>

<template>
  <div class="recepies-wrapper">
    <div class="add-recipe-main-wrapper">
    </div>
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
      <div v-if="recipe.showDetails">
        <p class="ingredients-title">Needed ingredients:</p>
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
          How to:
          <p class="recipe-description">{{ recipe.description }}</p>
        </div>
      </div>
    </article>
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
          recipes: []
      }
  },
  mounted () {
      this.getRecipes ()
  },
  methods: {
      getRecipes () {
          axios({
              method: 'get',
              url: 'http://127.0.0.1:8000/recipes/',
              content_type: "application/json",
          }).then ( response => this.recipes = response.data['recipes'])
      },
      canBeCooked () {
        return false
      },
      addRecipeBtnClicked () {

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

<template>
  <div class="recepies-wrapper">
    <div class="add-recipe-main-wrapper">
      <AddRecipe v-if="isAuthorized"
      @SaveRecipeBtnClicked="SaveRecipeBtnClicked"
      />
    </div>
    <Recipe class="articles-wrapper" v-if="isAuthorized"
      :listRecipes="myRecipes"
    />
    <Recipe class="articles-wrapper" v-else
      :listRecipes="recipes"
    />   
  </div> 
</template>

<script>

import AddRecipe from "./AddRecipe.vue"
import Recipe from "./Recipe.vue"

export default {
  name: 'Recipes',
  props: {
    recipes: Array,
    myRecipes: Array,
    isAuthorized: Boolean,
  },
  components: {
    AddRecipe,
    Recipe,
  },
  data () {
      return  {
          isAddRecipeClicked: false,
      }
  },
  methods: {
      canBeCooked () {
        return true
      },
      addRecipeBtnClicked () {
        this.isAddRecipeClicked = true;
        console.log("clicked");
      },
      CancelBtnClicked () {
        this.isAddRecipeClicked = false;
      },
      showHideDetails(recipe) {
        recipe.show_hide = !recipe.show_hide;
      }, 
      SaveRecipeBtnClicked(newRecipe){
        this.$emit("SaveRecipeBtnClicked", newRecipe)
      }          
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
</style>

<template>
<div>
      <RecipesCategory
    @categorySelected="categorySelected"/>
    <div class="recipes-main-wrapper">
    <article class="recepies-wrapper" v-for="(recipe, index) in filterList(getMyFavoriteRecipes, category)" v-bind:key="index">
      <div class="img-wrapper">
        <img
          class="cookable"
          :src="recipe.image"
          alt=""
        />
      </div>
      <div class="btn-wrapper">
        <a class="xmark-icon" @click="removeFromFavourite(recipe)">❌</a>
      <div class="viewed-liked">
        <div class="thumbs-icon"><i class="fa fa-thumbs-up fa-sm" aria-hidden="true"></i>{{recipe.liked}}</div>
        <div class="viewed">Viewed: {{recipe.viewed}}</div>
      </div>


      </div> 
      <div class="recipe-title" @click="showHideDetails(recipe)">
        {{recipe.id}}. {{ recipe.name }}        
      </div>
           
      <div>
        <div v-if="showDetailsIDs.includes(recipe.id)" class="description-wrapper">
          <h5>Method</h5>
          <p class="recipe-description">{{ recipe.description }}</p>
          <h5>Ingredients</h5>
          <p class="recipe-description">{{ recipe.ingredients }}</p>
        </div>
      </div>
    </article> 
  </div> 
</div>
</template>

<script>
import {mapGetters} from "vuex"
import RecipesCategory from './RecipeCategories.vue'
export default {
  name: 'MyFavoriteRecipesList',
  components: {
     RecipesCategory,
  },
  data() {
    return {
        showDetailsIDs: [],
        category: ''
      }
    },
    async created(){
    },
     computed: {
    ...mapGetters(["getMyFavoriteRecipes"])     
    },
    methods: {  
      categorySelected(selected) {
        this.category = selected
      } ,  
      filterList(items, category){
        if(this.category === "") {
          return items;
        } else {
          const filteredItems = items.filter(item => { return item.category === category});
          return filteredItems
        }
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
        if(confirm(`Are you sure you want to remove the recipe ${recipe.name} from your favorites?`)){
          const recipe_id = recipe.id
          await this.$store.dispatch('removeFavorite', recipe_id);        
        }
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
.recipes-main-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
}


.recepies-wrapper {
  margin-top: 50px;
  margin-left: 50px;

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
.recipe-title:hover {
  cursor: pointer;
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
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: left;
}
.viewed-liked {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.thumbs-icon {
  margin: 10px;
  color: darkgray;
}
.thumbs-icon:hover {
  cursor: not-allowed;
}

.viewed {
  margin: 10px;
  font-size: 0.8rem;
  color:darkgray;

}
.eye-icon {
  margin: 10px;
  color: grey;
}

.xmark-icon {
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

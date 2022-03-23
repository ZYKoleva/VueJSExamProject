<template>
    <div class="recepies-wrapper"
    >
    <article class="recepies-wrapper" v-for="(recipe, index) in getAllRecipes" v-bind:key="index">
      <div class="img-wrapper">
        <img
          class="cookable"
          :src="recipe.image"
          alt=""
        />
      </div>
      <div class="btn-wrapper">
        <a class="thumbs-icon" @click="liked(recipe)"><i class="fa fa-thumbs-up fa-sm" aria-hidden="true"></i>{{recipe.liked}}</a>
        <a class="eye-icon"><i class="fa fa-eye fa-sm"></i>{{recipe.viewed}}</a>
        <a v-if="!getListFavoriteIds.includes(recipe.id)" href='' @click.prevent="favoredBtnClicked(recipe)"><i class="fa fa-heart fa-sm" aria-hidden="true"></i></a>
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
import {mapGetters} from "vuex"
import { isAuthenticated } from "../dataProviders/authentication.js"
export default {
  name: 'RecipesList',
  props: {
    isAuth: Boolean,
  },
  computed: {
    ...mapGetters(["getAllRecipes", "getListFavoriteIds"])     
  },
  components: {
  },
  data() {
    return {
        showDetailsIDs: [],
      }
    },
    async created(){  
    },
    methods: {       
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
        const recipe_id = recipe.id
        await this.$store.dispatch("recipeViewed", {recipe_id, formData})        
        if(this.isAuth){
          await this.$store.dispatch("loadFavoriteRecipes")
          await this.$store.dispatch("loadMyRecipes")
        }
    },  
      async liked(recipe) {
        const formData = new FormData();
        const new_num = recipe.liked + 1;
        formData.append('liked', new_num)
        const recipe_id = recipe.id
        await this.$store.dispatch("recipeLiked", {recipe_id, formData})
        if(this.isAuth){
          await this.$store.dispatch("loadFavoriteRecipes")
          await this.$store.dispatch("loadMyRecipes")
        }
    },
      async favoredBtnClicked(recipe){      
        if(isAuthenticated()) {
          const recipe_id = recipe.id  
          await this.$store.dispatch('recipeFavored', recipe_id)
          await this.$store.dispatch('loadFavoriteIds')
        } else {
          alert("You need to be logged in in order to add recipe to your favourites!")
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

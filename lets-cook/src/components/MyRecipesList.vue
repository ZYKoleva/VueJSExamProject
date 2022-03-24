<template>
    <div class="recipes-main-wrapper">
    <article class="recepies-wrapper" v-for="(recipe, index) in getMyRecipes" v-bind:key="index">
      <div class="img-wrapper">
        <img
          class="cookable"
          :src="recipe.image"
          alt=""
        />
      </div>
      <div class="btn-wrapper">
        <div class="edit-delete-btn-wrapper">
           <a class="heart-icon" v-if="!getListFavoriteIds.includes(recipe.id)" href='' @click.prevent="favoredBtnClicked(recipe)"><i class="fa fa-heart fa-sm" aria-hidden="true"></i></a>
          <router-link :to="{ name: 'editMyRecipe', params: { recipeId: `${recipe.id}`}}"><i class="fa fa-pencil-square-o" title="Edit"></i></router-link>
          <a href='' @click="deleteMyRecipe(recipe)"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
        </div>
        <div class="viewed-seen-wrapper">
          <a class="thumbs-icon" @click="liked(recipe)"><i class="fa fa-thumbs-up fa-sm" aria-hidden="true"></i>{{recipe.liked}}</a>
         
            <div><span class="viewed">Viewed: {{recipe.viewed}}</span></div>  
        </div>    
       
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
export default {
  name: 'RecipesList',
  components: {
  },
  data() {
    return {
        showDetailsIDs: [],
      }
    },
    async created(){
    },
    computed: {
    ...mapGetters(["getMyRecipes", "getListFavoriteIds"])     
    },
    methods: {        
      async showHideDetails(recipe) {
        if (this.showDetailsIDs.includes(recipe.id)){
          this.showDetailsIDs = []
        } else {
          this.showDetailsIDs = []
          this.showDetailsIDs.push(recipe.id)
        }
      },  
      async favoredBtnClicked(recipe){    
        const recipe_id = recipe.id  
        await this.$store.dispatch('recipeFavored', recipe_id)
        await this.$store.dispatch('loadFavoriteIds')        
      },    
      async deleteMyRecipe(recipe) {
        if(confirm(`Are you sure you want to delete the recipe ${recipe.name}?`)) {
          const recipe_id = recipe.id;
          await this.$store.dispatch('deleteRecipe', recipe_id)
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
  margin: 20px;
  display: block;
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
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: left;
}
.edit-delete-btn-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 1.2rem;

}
.viewed-seen-wrapper{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.viewed {
  margin: 5px;
  font-size: 0.8rem;
  color:darkgray;

}
.thumbs-icon {
  margin: 10px;
  color: grey;

}
.eye-icon {
  margin: 10px;
  color: grey;
}
.heart-icon {
  margin: 10px;
  color:darkred;
}
.fa-pencil-square-o {
  color: green;
  margin: 10px;
}
.fa-trash {
  margin: 10px;
  color: red;
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

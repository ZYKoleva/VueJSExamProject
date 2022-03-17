<template>
  <div>
    <article v-for="(recipe, index) in listRecipes" v-bind:key="index">
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
</template>

<script>
export default {
  name: 'Recipe',
  props: {
    listRecipes: Array,
  },
  components: {

  },
  data () {
      return  {

      }
  },
  methods: {
      canBeCooked () {
        return true
      },
      // addRecipeBtnClicked () {
      //   this.isAddRecipeClicked = true;
      //   console.log("clicked");
      // },
      // CancelBtnClicked () {
      //   this.isAddRecipeClicked = false;
      // },
      showHideDetails(recipe) {
        recipe.show_hide = !recipe.show_hide;
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

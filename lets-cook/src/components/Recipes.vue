<template>
  <div class="home">
      <h1 class='title'>My Recipes</h1>
      <div v-for="recipe in recipes" v-bind:key="recipe.id">
            <p>{{recipe.name}}</p>
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
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

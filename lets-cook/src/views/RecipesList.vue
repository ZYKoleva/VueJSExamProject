<template>
    <div class="recepies-wrapper">
        <RecipesList
        />
    </div>
</template>
<script>
import RecipesList from "@/components/RecipesList.vue"
// import { getAllRecipes } from "../dataProviders/recipes.js"

export default {
    components: {
        RecipesList,
    },   
}
</script>
<style scoped>
.recepies-wrapper {
  margin-top: 50px;
  margin-left: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>
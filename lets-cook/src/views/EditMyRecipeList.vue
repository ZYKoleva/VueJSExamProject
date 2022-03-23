<template>
<div>
    <EditMyRecipe
    :selected_recipe="selected_recipe"
    />  
</div>
</template>

<script>
import EditMyRecipe from "@/components/EditMyRecipe.vue"
import {getSelectedRecipe} from "../dataProviders/recipes.js"

export default {
    components: {
        EditMyRecipe,        
    }, 
    data(){
        return {
            selected_recipe: {}
        }
    },
    async created(){ 
        const recipeId = this.$route['params']['recipeId']
        this.selected_recipe = await getSelectedRecipe(recipeId) 
    },   
}

</script>
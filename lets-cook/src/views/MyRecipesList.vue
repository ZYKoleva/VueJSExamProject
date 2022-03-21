<template>
    <div class="recepies-wrapper">
        <RecipesList v-if="isLoggedIn"
        :listRecipes="myListRecipes"/>
        <div v-else>
            <p>You need to logged in in order to see your recipes. Click <a href='' @click.prevent="goToLogin">here</a> to be redirected to login page</p>
        </div>
    </div>
</template>
<script>
import RecipesList from "@/components/RecipesList.vue"
import { getMyRecipes } from "../dataProviders/recipes.js"

export default {
    components: {
        RecipesList,
    },
    data() {
        return {
            myListRecipes: [],
            isLoggedIn: true
        }
    },
    methods: {
        goToLogin(){
            this.$router.push({name: "login"})
        }
    },
    async created(){
        this.myListRecipes = await getMyRecipes();
    }
    
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

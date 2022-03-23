<template>
    <div class="recepies-wrapper">
        <MyFavoriteRecipesList v-if="isLoggedIn"
        />       
        <div v-else>
            <p>You need to be logged in in order to see your favorite recipes. Click <a href='' @click.prevent="goToLogin">here</a> to be redirected to login page</p>
        </div>
    </div>
</template>
<script>
import MyFavoriteRecipesList from "@/components/MyFavoriteRecipesList.vue"
import { isAuthenticated } from "../dataProviders/authentication.js"

export default {
    components: {
        MyFavoriteRecipesList,
    },
    data() {
        return {
            isLoggedIn: isAuthenticated(),
        }
    },  
    methods: {
        goToLogin(){
            this.$router.push({name: "login"})
        }
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
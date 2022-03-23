<template>
<div>
    <AddRecipe v-if="isLoggedIn"
    @addRecipe="addRecipe"/>  
    <div class="add-recipe-wrapper" v-else>
        <p>You need to be logged in in order to add a recipe. Click <router-link :to="{ name: 'login'}">here</router-link> to be redirected to login page</p>
    </div>
</div>
</template>

<script>
import AddRecipe from "@/components/AddRecipe.vue"
import { isAuthenticated } from "../dataProviders/authentication.js"

export default {
    components: {
        AddRecipe
    },
     data() {
        return {
            isLoggedIn: isAuthenticated(),
        }
    },  
    methods: {
        goToLogin(){
            this.$router.push({name: "login"})
        },
        addRecipe(){
            this.$emit("addRecipe")
            console.log("emitted addRecipe from view")
        }
    },        
}

</script>
<style scoped>

.add-recipe-wrapper {
    margin: 50px;
}
</style>
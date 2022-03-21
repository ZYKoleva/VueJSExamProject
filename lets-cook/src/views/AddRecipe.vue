<template>
<div>
    <AddRecipe v-if="isLoggedIn"/>  
    <div v-else>
        <p>You need to be logged in in order to add a recipe. Click <a href='' @click.prevent="goToLogin">here</a> to be redirected to login page</p>
    </div>
</div>
</template>

<script>
import AddRecipe from "@/components/AddRecipe.vue"

export default {
    components: {
        AddRecipe
    },
     data() {
        return {
            isLoggedIn: true,
        }
    },  
    methods: {
        goToLogin(){
            this.$router.push({name: "login"})
        }
    },        
}

</script>
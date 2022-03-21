<template>
    <div class="recepies-wrapper">
        <MyRecipesList v-if="isLoggedIn"/>
        <div v-else>
            <p>You need to be logged in in order to see your recipes. Click <a href='' @click.prevent="goToLogin">here</a> to be redirected to login page</p>
        </div>
    </div>
</template>
<script>
import MyRecipesList from "@/components/MyRecipesList.vue"

export default {
    components: {
        MyRecipesList,
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
<style scoped>
.recepies-wrapper {
  margin-top: 50px;
  margin-left: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>

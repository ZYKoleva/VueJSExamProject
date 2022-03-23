<template>
    <div class="recepies-wrapper">
        <RecipesList
        :isAuth="isAuth"
        />
    </div>
</template>
<script>
import RecipesList from "@/components/RecipesList.vue"


export default {
    props: {
        isAuth: Boolean,
    },
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
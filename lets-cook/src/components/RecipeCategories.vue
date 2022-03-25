<template>
    <div class="categories-wrapper">
        <div class="form-inline">
        <label for="exampleFormControlSelect1">Select a category: </label>

        <select class="form-control" id="exampleFormControlSelect1" v-model="selected" @change="categorySelected(selected)">
        <option v-for="(category, index) in categories" :key="index">{{category}}</option>
        </select>

        </div>
    </div>
</template>
<script>

export default ({
    name: 'RecipesCategory',
    data () {
        return {
            categories: [ '', 'Starters', 'Main Courses', 'Deserts' ],
            selected: '' 
        }
    },
    methods: {
        categorySelected(selected) {
            this.$emit("categorySelected", selected)
        }
    }
})
</script>
<style scoped>
.categories-wrapper {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}
label {
    margin-right: 15px;
}


</style>

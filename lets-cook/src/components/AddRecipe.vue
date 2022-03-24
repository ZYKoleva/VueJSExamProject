<template>
  <div class="add-new-recipe-wrapper">
    <form class="add-form" action="" method="post" @submit.prevent="SaveRecipeBtnClicked" enctype="multipart/form-data">
      <div class="row">
        <div
          class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
        >
          <div class="form-group">
            <label for="name">Recipe Name</label>
            <input
              type="text" 
              id="name"
              class="form-control recipe-name"
              v-model.lazy="recipeForm.name"
            />
     
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea rows="8" cols="50"
              type="text"
              id="description"
              class="form-control recipe-description"
              v-model.lazy="recipeForm.description"
            />
         
          </div>
          <div class="form-group">
            <label for="image">
              <span class="span-picture">Picture</span>

              </label>
            <input
              type="file"
              id="image"
              @change="onFileUpload"
              
            />
          </div>
      
        </div>
      </div>
      <div class="button-wrapper">
        <div class="save-recipe-btn-wrapper" type="submit">
            <button type="submit" class="btn-save-recipe">Save recipe</button>
        </div>
      </div>   
    </form>

  </div>
</template>
<script>
import {addRecipe} from "../dataProviders/recipes.js";
export default {
  name: "AddRecipe",
  props: {
    },
  components: {
  },
  data() {
    return {
      recipeForm: {
        name: "",
        image: "",        
        description: "",
      },
    };
  },
  methods: {
    onFileUpload(event) {
        this.recipeForm.image = event.target.files[0]
      },
      async SaveRecipeBtnClicked() {
        const formData = new FormData();
        formData.append('image', this.recipeForm.image);
        formData.append('description', this.recipeForm.description);
        formData.append('name', this.recipeForm.name);
        await addRecipe(formData)
        await this.$store.dispatch('loadAllRecipes')
        await this.$store.dispatch('loadMyRecipes')
        console.log("Add recipe btn clicked from component")
        this.$router.push({name: "myRecipes"})
      },
    }  
  };
</script>
<style scoped>

.add-new-recipe-wrapper {
  margin: 50px;
}
.recipe-name {
  height: 25px;
  width: 200px;
}
.span-picture {
  margin-right: 10px;
}
.add-recipe-btn-wrapper {
  width: 100%;
}
.btn-add-recipe {
  border-radius: 4px;
  padding: 5px 10px;
  background-color: midnightblue;
  color: white;
  margin: 10px;
}
.save-recipe-btn-wrapper {
  width: 100%;
}
.button-wrapper {
    width: 80%;
    display: flex;
 
}

.btn-save-recipe {
  border-radius: 4px;
  padding: 5px 10px;
  background-color: lightskyblue;
  color: white;
  margin: 10px;
}
.btn-back-recipe {
  border-radius: 4px;
  padding: 5px 10px;
  background-color: lightpink;
  color: white;
  margin: 10px; 
}
</style>

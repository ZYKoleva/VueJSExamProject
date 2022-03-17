<template>
  <div class="add-new-recipe-wrapper">
    <form @submit.prevent="SaveRecipeBtnCliked()" enctype="multipart/form-data">
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
            <!---->
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              type="text"
              id="description"
              class="form-control recipe-description"
              v-model.lazy="recipeForm.description"
            />
            <!---->
          </div>
          <div class="form-group">
            <label for="image">Picture</label>
            <input
              type="file"
              id="image"
              @change="filesChange($event.target.name, $event.target.files)"
              accept="image/*"
              class="input-file"
            />
          </div>
          <!---->
        </div>
      </div>
      <div class="button-wrapper">
        <div class="save-recipe-btn-wrapper" @type="submit">
            <button class="btn-save-recipe">Save recipe</button>
        </div>
            <div>
        <button class="btn-back-recipe" @click="CancelBtnClicked">Cancel</button>
    </div>  
      </div>             
    </form>

  </div>
</template>
<script>

export default {
  name: "AddRecipe",
  props: {
    },
  components: {

  },
  data() {
    return {
      IsSaveNewRecipeBtnClicked: false,
      recipeForm: {
        name: "",
        image: "",        
        description: "",
      },
    };
  },
  methods: {
    SaveRecipeBtnCliked() {
      this.IsSaveNewRecipeBtnClicked = true;
      let newRecipe = {
        name: this.recipeForm.name,
        image: this.recipeForm.image,
        description: this.recipeForm.description,
      }
      this.$emit("newRecipeSavedBtnClicked", newRecipe)
      this.recipeForm = {
        name: "",
        description: "",
        image: "",
      }
      this.$emit("saveRecipeBtnWasClicked")
    },
    CancelBtnClicked () {
        this.$emit("CancelBtnClicked")
    }
  },
};
</script>
<style scoped>
.recipe-name {
  height: 25px;
  width: 200px;
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
  background-color: lightseagreen;
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

<template>
  <div class="add-new-recipe-wrapper">
    <div v-if="!this.isAddRecipeClicked" class="add-recipe-btn-wrapper" @click="addRecipeBtnClicked">
        <button class="btn-add-recipe">Add recipe</button>
    </div>
    <div v-if="this.isAddRecipeClicked" class="add-recipe-btn-wrapper" @click="CancelBtnClicked">
      <button class="btn-back-recipe">Cancel</button>
    </div>
    <form v-if="this.isAddRecipeClicked" action="" method="post" @submit.prevent="SaveRecipeBtnClicked" enctype="multipart/form-data">
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
              @change="onFileUpload"
            />
          </div>
          <!---->
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
      isAddRecipeClicked: false,
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  methods: {
    addRecipeBtnClicked () {
        this.isAddRecipeClicked = true;
        console.log("clicked");
    },
    CancelBtnClicked () {
        this.isAddRecipeClicked = false;
      },
      onFileUpload(event) {
        this.recipeForm.image = event.target.files[0]
        console.log(event)
      },
      SaveRecipeBtnClicked() {
        this.IsSaveNewRecipeBtnClicked = true;
        this.isAddRecipeClicked = false
        let newRecipe = {
          name: this.recipeForm.name,
          image: this.recipeForm.image,
          description: this.recipeForm.description,
        }
        console.log("before emitting the newRecepi to function", newRecipe)
        this.$emit("SaveRecipeBtnClicked", newRecipe)

      },
      // this.$emit("saveRecipeBtnWasClicked")
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    handlePictureCardPreview(file) {
      console.log(file.url)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      this.recipeForm.image = this.dialogImageUrl;
      console.log(this.recipeForm.image)
    },
  },
  
};
</script>
<style scoped>
.recipe-name {
  height: 25px;
  width: 200px;
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

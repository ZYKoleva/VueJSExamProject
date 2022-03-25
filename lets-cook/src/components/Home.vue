<template>
<div  class="home-page-wrapper">
    <h2>Welcome to our recipe website</h2>
    <h4 class="sub-title">You can view, filter recipes by category and like different recipes.</h4>
    <p>You can share with others your own recipes, modify them, if needed, as well as create/update your favorite recipe list.</p>
    <h5>Features:</h5>
    <p><i class="fa fa-thumbs-up fa-sm" aria-hidden="true"></i> Click on the icon to like a recipe.</p>
    <p><i class="fa fa-heart fa-sm" aria-hidden="true"></i> Click on the icon to add to your list of favorite recipes.</p>
    <p>Click on recipe title to view details. The <span class=".viewed">viewed</span> number represents the number of times people viewed recipe details.</p>
    <p><i class="fa fa-pencil-square-o" title="Edit"></i> Click on pencil to edit your recipe. You need to be logged in in order to have access to your recipes.</p>
    <p><i class="fa fa-trash-o" aria-hidden="true"></i> Click on trash icon to delete your recipe.</p>
    <p><span>❌</span> Click on the x-mark to remove a recipe from your list of favorites.</p>

</div>

</template>

<style scoped>
.home-page-wrapper {
    margin: 50px;
    text-align: center;
    justify-self: center;
}
.sub-title {
    margin: 50px;
}
span {
  margin: 5px;
  font-size: 1.2rem;
  color:darkgray;

}
.fa-thumbs-up {
  margin: 10px;
  color: green;

}
.eye-icon {
  margin: 10px;
  color: grey;
}
.fa-heart {
  margin: 10px;
  color:darkred;
}
.fa-pencil-square-o {
  color: green;
  margin: 10px;
}

.fa-trash-o {
  margin: 10px;
  color: red;
}
</style>
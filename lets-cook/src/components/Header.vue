<template>
  <div class="header">
    <header>
      <h2>What shall we cook today<span v-if="isAuth">, {{username}}</span> ?!?</h2>

    </header>

  </div>
</template>

<script>
export default {
  name: 'Recipes',
  props: {
    username: String,
    isAuth: Boolean
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  header {
    background-color: rgb(28, 235, 235);
    padding: 40px;
    text-align: center;
    color: white;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-style: italic;
    font-family: "Kalam", sans-serif;
  }
</style>

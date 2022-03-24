<template>
    <form class="login-form-wrapper" action="" method="post" @submit.prevent="loginBtnClicked">
      <p v-if="err">{{err}}</p>
  <div class="form-group">
    <label for="username">Username</label>
    <input v-model.lazy="loginData.username" type="username" class="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter Username">
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input v-model.lazy="loginData.password" type="password" class="form-control" id="password" placeholder="Password">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</template>

<script>
// import axios from 'axios'
import {logIn} from '../dataProviders/authentication'

export default {
  name: "Login",
  props: {
    },
  components: {

  },
  data () {
      return {
          username: '',
          loginData: {
              username: '',
              password: '',
          },
          err: '',
      }
  },
  methods: {
    async loginBtnClicked(){
      const loginData = this.loginData
      this.$store.commit('clearCurrentUserData');
      this.$store.commit('clearStoreData');
        try {
          await logIn(loginData)     
          this.$store.commit('currentUserData', {username: `${loginData.username}`, isAuth: true})
          await this.$store.dispatch("loadAllRecipes")
          await this.$store.dispatch("loadFavoriteRecipes")
          await this.$store.dispatch("loadMyRecipes")
          await this.$store.dispatch('loadFavoriteIds')
          this.$router.push({name: "myRecipes"})
        } catch (err) {
          this.err = err          
          console.error("An error occur during authentication", err);
          return [];
        }
      },
    },
};
</script>
<style>

.login-form-wrapper {
    width: 300px;
    margin: 50px;
}
</style>

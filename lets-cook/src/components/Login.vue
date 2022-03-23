<template>
    <form class="login-form-wrapper" action="" method="post" @submit.prevent="onLogin">
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
import axios from 'axios'

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
    async onLogin(){
        try {
          const response = await axios.post(
          'http://127.0.0.1:8000/auth/login/', this.loginData)
          this.token = response.data['token']
          const expiration = response.data['expiry']      
          localStorage.setItem("token", JSON.stringify(this.token))
          localStorage.setItem("username", JSON.stringify(this.loginData.username))
          localStorage.setItem('token_expiration', JSON.stringify(expiration))
          this.$emit("LoggedIn")
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

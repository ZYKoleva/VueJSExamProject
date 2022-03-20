<template>
    <form class="login-form-wrapper" action="" method="post" @submit.prevent="onLogin">
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
          token: '',
      }
  },
  methods: {
    onLogin(){
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/auth/login/',
          content_type: "application/json",
          data: this.loginData,
        }).then ( response => this.token = response.data['token'])
        this.$emit("LoggedIn", this.token)
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

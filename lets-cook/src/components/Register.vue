<template>
    <form class="login-form-wrapper" action="" method="post" @submit.prevent="onRegister">
  <div class="form-group">
    <label for="username">Username</label>
    <!-- <input v-model.lazy.trim="registerData.username" type="username" class="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter Username"> -->
    <input v-model.lazy.trim="$v.registerData.username.$model" type="username" class="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter Username">
  </div>
  <div class="error" v-if="!$v.registerData.username.required">Username is required field</div>
  <div class="error" v-if="!$v.registerData.username.minLength">Username must be at least {{$v.registerData.username.$params.minLength.min}} letters.</div>
    <div class="form-group">
    <label for="email">Email</label>
    <input v-model.lazy.trim="$v.registerData.email.$model" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="example@test.com">
  </div>
  <div class="error" v-if="!$v.registerData.email.required">Email is required field</div>
  <div class="error" v-if="!$v.registerData.email.email">email must be in correct format.</div>
   <div class="form-group">
    <label for="password">Password</label>
    <input v-model.lazy.trim="$v.registerData.password.$model" type="password" class="form-control" id="password" placeholder="Password">
  </div>
  <div class="error" v-if="!$v.registerData.password.required">Password is required field</div>
  <div class="error" v-if="!$v.registerData.password.minLength">Password must be at least {{$v.registerData.password.$params.minLength.min}} characters.</div>
  <div class="form-group">
    <label for="password2">Confirm password</label>
    <input v-model.lazy.trim="$v.password2.$model" type="password" class="form-control" id="password2" placeholder="Confirm password">
  </div>
  <div class="error" v-if="!$v.password2.required">Password is required field</div>
  <div class="error" v-if="!$v.password2.sameAsPassword">Passwords must be identical.</div>
  <button type="submit" class="btn btn-primary" :disabled="isSubmitBtnDisabled">Submit</button>
  <div>{{error}}</div>
</form>
</template>

<script>
import axios from 'axios'
import { required, minLength, email, sameAs} from 'vuelidate/lib/validators'
export default {
  name: "Register",
  props: {
    },
  components: {
  },
  data () {
    return {
        username: '',
        registerData: {
            username: '',
            email: '',
            password: '',            
        },
        password2: '',
        error: "",
    }
  },
    validations: {
        registerData: {
            username: {required, minLength: minLength(4)},
            email: {required, email},
            password: {required, minLength: minLength(4)},
        },
        password2: {required, sameAsPassword: sameAs(function() { return this.registerData.password })}
    },
    computed: {
        isSubmitBtnDisabled(){
            return this.$v.$invalid;
        }
    },
  methods: {
    onRegister(){
        console.log('vuelidate', this.$v)
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/auth/register/',
          content_type: "application/json",
          data: this.registerData,
        }).then ( response => this.token = response.data['token'])
        this.$emit("Registered", this.token)
      },
    },
};
</script>
<style>

.login-form-wrapper {
    width: 300px;
    margin: 50px;
}
.error {
    color: crimson;
}
</style>

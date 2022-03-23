<template>
    <div >
        <div v-if="!registerLinkClicked">
        <Login 
        @LoggedIn="LoggedIn"/>
        <p class="register-link">Click <a href='' @click.prevent="register">here</a> if you do not have registration yet.</p>
        </div>
        <Register v-if="registerLinkClicked"/>
    </div>
</template>

<script>

import Login from "@/components/Login.vue"
import Register from "@/components/Register.vue"

export default {
    components: {
        Login, 
        Register       
    },
    data() {
        return {
            registerLinkClicked: false
        }
    },
    methods: {
        register(){
            this.registerLinkClicked = true;
            
        },
        LoggedIn(){
            this.$emit("LoggedIn")
        }
    }
}
</script>
<style scoped>
.register-link {
    margin: 50px;
}
</style>
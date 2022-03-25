<template>
    <div >
        <div v-if="!registerLinkClicked">
        <Login 
        />
        <p class="click-here">Click <a href='' @click.prevent="register">here</a> if you do not have registration yet.</p>
        </div>
        <Register v-if="registerLinkClicked"/>
        <p v-if="registerLinkClicked" class="click-here">Click <a href='' @click.prevent="login">here</a> if you already have registration and want to log in.</p>
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
        login(){
            this.registerLinkClicked = false;
        }
    }
}
</script>
<style scoped>
.click-here {
    margin: 50px;
}
</style>
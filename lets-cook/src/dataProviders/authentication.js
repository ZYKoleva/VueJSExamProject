import axios from 'axios'

export async function logIn(loginData) {
    try {
        const response = await axios.post(
        'http://127.0.0.1:8000/auth/login/', loginData)
        const token = response.data['token']
        const expiration = response.data['expiry']      
        localStorage.setItem("token", JSON.stringify(token))
        localStorage.setItem("username", loginData['username'])
        localStorage.setItem('token_expiration', JSON.stringify(expiration))
    } catch (err) {     
        console.error("An error occur during authentication", err);
        return [];
    }
}

export async function register(registerData){
    try {
        await axios.post(
            'http://127.0.0.1:8000/auth/register/', registerData);
        const loginData = {
            username: registerData['username'],
            password: registerData['password']
            }
        await logIn(loginData);
          
    } catch (err) {         
        console.error("An error occur during authentication", err);
        return [];
    }
}

export async function getAllUsernames(){
    try {
        const username_list = await axios.get('http://127.0.0.1:8000/auth/users/');
        return username_list.data['usernames'];
    } catch(err) {
        console.log(err)
        return [];
    }
}

export function isAuthenticated() {
    const token_expiration = JSON.parse(localStorage.getItem('token_expiration'))
    if (token_expiration) {
        const isAuth = Date.now() < new Date(token_expiration)
        if(isAuth === false) {
            localStorage.clear();
            return false
        } else {
            return true
        }
    }
    else {
        localStorage.clear();
        return false
    }
}

export function getToken(){
    const isAuth =  isAuthenticated()
    if(isAuth) {
        const current_token = localStorage.getItem("token")
        return JSON.parse(current_token)
    }
}

export async function logOut(){
    const token = getToken()
    const headers = {Authorization: `Token ${token}`}
    try {
        const response = await axios.post(
            `http://127.0.0.1:8000/auth/logoutall/`,
           {}, {headers})
        return response.status
        } catch (err) { "An error occured while trying to save the recipe", err} 
    
}

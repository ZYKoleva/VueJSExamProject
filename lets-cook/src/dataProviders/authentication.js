import axios from 'axios'

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

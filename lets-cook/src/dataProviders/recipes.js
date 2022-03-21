import axios from "axios"

const baseUrl = "http://127.0.0.1:8000/cook_recipes"
const token = '80c96815868f2aa232914fa24eefb49217eedec1e126a203256e7d7b7bf53c77'

export async function getAllRecipes(){
    try {
        const response = await axios.get(`${baseUrl}/`);
        const result = response.data['recipes']
        console.log(result)
        return result
        
    } catch (err) {
        console.error("Unexpected error occured while trying to get all the recipes", err);
        return [];
    }
}
export async function getMyRecipes(){
    const headers = {
        Authorization: `Token ${token}`,
        "content-type": "application/json"
    }
    try{
        const response = await axios.get(`${baseUrl}/auth/`, {headers});
        const result = response.data['recipes']
        return result
    } catch (err) {
        console.error("Unexpected error occured while trying to get your the recipes", err);
        return [];
    }
}
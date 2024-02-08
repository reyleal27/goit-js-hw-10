import axios from "axios";
import { showLoader } from ".";


axios.defaults.headers.common["x-api-key"] =
"live_dmF2C6LzEvw2LfssPgsFsC9QnsJeyc6iCVBgYO5e6yEzYMAKxxK6k7EqmTQZdcX0";


const url = "https://api.thecatapi.com/v1/breeds";
const api_key = 
"live_dmF2C6LzEvw2LfssPgsFsC9QnsJeyc6iCVBgYO5e6yEzYMAKxxK6k7EqmTQZdcX0";

function fetchBreeds(){
   
   return fetch(url, axios)
.then((response) => {
    return response.json();
})
}   
function fetchCatByBreed(breedId){
    showLoader();
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then ((response) => {
        return response.json()})
    
}


export default { fetchBreeds, fetchCatByBreed};
import CATAPI from './cat-api';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector(".breed-select");
const loadingText = document.querySelector(".loading-text");

let storeBreeds = [];

CATAPI.fetchBreeds()
 
.then((data) => {
    storeBreeds = data;
    breedSelect.innerHTML = '';
    storeBreeds.forEach(breed => {
    let catBreedElement = document.createElement('option');
    catBreedElement.value = `${breed.id}`;
    catBreedElement.innerHTML = `${breed.name}`;
    breedSelect.appendChild(catBreedElement)});
    })

.catch(function error() {
const errorDisplay = document.querySelector(".error");
Notiflix.Notify.error(`${errorDisplay}`);
})



breedSelect.addEventListener("change", function onChange(){
 breedSelect.classList.add('hidden');
 const catInfo = document.querySelector(".cat-info");
    let selectedIndex = breedSelect.selectedIndex;
    let breedId = breedSelect.value;
    
  CATAPI.fetchCatByBreed(breedId)
  .then (data => {
    catInfo.innerHTML = '';
    const catByBreedElement = document.createElement('div');
            catByBreedElement.className = "catElement"
            catByBreedElement.innerHTML = `<img
                class="cat_image"
                src="${data[0].url}"
                width = "500px"
                height = "500px"
              />`
    catInfo.appendChild(catByBreedElement);
    fetchCatDetails(selectedIndex);
    breedSelect.classList.remove('hidden');
    console.log(breedId);
    hideLoader();
    }) 

    function fetchCatDetails(selectedIndex) {
        showLoader();
        const catDescription = document.createElement('div');
        catDescription.innerHTML =`
            <div class="cat-details">
            <h2>${storeBreeds[selectedIndex].name}</h2>
            <p class ="cat-description">${storeBreeds[selectedIndex].description}</p>
            <p class ="cat-temperament">
            <span>Temperament: </span>${storeBreeds[selectedIndex].temperament}</p>
            </div>`
        catInfo.appendChild(catDescription);
        
        hideLoader();
        };
});

export function showLoader(){
  
    loadingText.classList.add('show');
}

function hideLoader(){
    loadingText.classList.remove('show');
}






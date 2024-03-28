const localTemp = document.getElementById('temp');
const template = document.getElementById('pet-card-template');
const wrapper = document.createDocumentFragment();

// Get temperature for city
async function getWeather() {
  
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast");
  const weatherData = await weatherPromise.json();
  const temp = weatherData.properties.periods[0].temperature;

  const tempText = document.createTextNode(temp);
  localTemp.append(tempText);

  console.log(localTemp)
}
getWeather();

// Get pet data
async function petsArea() {
  
  const petsPromise = await fetch('https://learnwebcode.github.io/bootcamp-pet-data/pets.json');
  const petsData = await petsPromise.json();

  petsData.forEach(pet => {
    const clone = template.content.cloneNode(true);
    
    const petCard = clone.querySelector('.pet-card');
    petCard.setAttribute('data-species', pet.species);

    const petName = clone.querySelector('h3');
    petName.append(document.createTextNode(pet.name));

    const petDescription = clone.querySelector('.pet-description');
    petDescription.append(document.createTextNode(pet.description));

    const petAge = clone.querySelector('.pet-age');
    petAge.append(document.createTextNode(createAgeText(pet.birthYear)));

    const petImg = clone.querySelector('.pet-card-photo img');

    if (!pet.photo) pet.photo = "./images/fallback.jpg";
    
    petImg.setAttribute('src', pet.photo);
    petImg.setAttribute('alt', `A ${pet.species} named ${pet.name}.`);

    wrapper.append(clone);
  })
  const ourPets = document.querySelector('.list-of-pets');
  ourPets.append(wrapper)
}
petsArea();

// Format pet age
function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  if (age == 1) return `1 year old`;
  if (age == 0) return `Less than a year old`;
    
  return `${age} years old`;
}

// add/remove class for Show Me filter buttons
const btns = document.querySelectorAll('.pet-filter button');
btns.forEach(btn => {
  btn.addEventListener('click', handleButtonClick);
})

function handleButtonClick(e) {
  // remove "active" class if present
  btns.forEach(btn => btn.classList.remove("active")) 

  // add "active" class to btn clicked
  e.target.classList.add("active");

  // filter the pets based on active button
  const currentFilter = e.target.dataset.filter;
  const petCards = document.querySelectorAll(".pet-card");
  
  petCards.forEach(card => {
    if (currentFilter == card.dataset.species || currentFilter == "all") {
      card.style.display = "grid"
    } else {
      card.style.display = "none"
    }
  })
}
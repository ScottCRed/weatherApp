let place = 'London';

const newLocation = document.querySelector('.submit-button');
newLocation.addEventListener('click', changeLocation);
const render = document.querySelector('.submit-button');
render.addEventListener('click', displayInfo);

function changeLocation () {
    event.preventDefault();
    const searchKey = document.querySelector('form');
    place = searchKey.location.value;
    console.log(place);
    getWeather();
    searchKey.reset();
}

async function getWeather() {
    try {
const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=3ca24ea75ac143c4945115016230404&q=${place}`, {mode:"cors"});
const weatherData = await response.json();

return weatherData;
    }
    catch (error) {
        consolee.log('error');
    }

}

async function displayInfo () {
    const fetchData =  await getWeather();

    const displayInfo = document.querySelector('.infoDisplay');
    displayInfo.innerHTML = '';
    const newPlace = document.createElement('div');
    newPlace.classList.add('info');
    newPlace.textContent = 'Location:' 

     const temp = document.createElement('div');
     temp.classList.add('info');
     temp.textContent = 'Current Temperature: ' + fetchData.current.temp_c + ' Celcius.';

     const humid = document.createElement('div');
     humid.classList.add('info');
     humid.textContent = 'Current humidity: ' + fetchData.current.humidity + '%';

     const rain = document.createElement('div');
     rain.classList.add('info');
     rain.textContent = 'Predicted precipitation: ' + fetchData.current.precip_mm + 'mm';

    displayInfo.appendChild(newPlace);
     displayInfo.appendChild(temp);
     displayInfo.appendChild(humid);
     displayInfo.appendChild(rain);
 }

getWeather();
displayInfo();

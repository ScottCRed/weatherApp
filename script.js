let place = 'London';

const newLocation = document.querySelector('.submit-button');
newLocation.addEventListener('click', changeLocation);
const render = document.querySelector('submit-button');
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
console.log(weatherData)
return weatherData;
    }
    catch (error) {
        consolee.log('error');
    }

}

function displayInfo () {
    getWeather();
    const displayInfo = document.querySelector('.infoDisplay');
    const place = document.createElement('dive');
    place.classList.add('.info');
    place.textContent = 'Location:' + weatherData.Location.name + ' ' + weatherData.Location.country + '.';

    const temp = document.createElement('div');
    temp.classList.add('info');
    temp.textContent = 'Current Temperature: ' + weatherData.current.temp_c + ' Celcius.';

    const humid = document.createElement('div');
    humid.classList.add('info');
    humid.textContent = 'Current humidity: ' + weatherData.current.humidity + '%';

    const rain = document.createElement('div');
    rain.classList.add('info');
    rain.textContent = 'Predicted precipitation: ' + weatherData.current.precip_mm + 'mm';

    displayInfo.appendChild(place);
    displayInfo.appendChild(temp);
    displayInfo.appendChild(humid);
    displayInfo.appendChild(rain);
}

getWeather();

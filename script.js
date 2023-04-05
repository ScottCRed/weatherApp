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
    let object  = fetchData.current;

    const displayInfo = document.querySelector('.infoDisplay');
    displayInfo.innerHTML = '';

    const newPlace = document.createElement('div');
    newPlace.classList.add('info');
    newPlace.textContent = 'Current Location: ' + fetchData.location.name + ', ' + fetchData.location.country 

    const current = document.createElement('div');
    current.classList.add('info');
    current.textContent = 'Current condition: ' + object.condition.text;

    const currentImg = document.createElement('img');
    currentImg.src = object.condition.icon;

    const temp = document.createElement('div');
    temp.classList.add('info');
    temp.textContent = 'Current Temperature: ' + object.temp_c + '℃';

    const humid = document.createElement('div');
    humid.classList.add('info');
    humid.textContent = 'Current humidity: ' + object.humidity + '%';

    const rain = document.createElement('div');
    rain.classList.add('info');
    rain.textContent = 'Predicted precipitation: ' + object.precip_mm + 'mm';

    const wind = document.createElement('div');
    wind.classList.add('info');
    wind.textContent = 'Wind: ' + object.wind_kph + 'Km/h Direction: ' + object.wind_dir

    displayInfo.appendChild(newPlace);
    displayInfo.appendChild(current);
    displayInfo.appendChild(currentImg);
    displayInfo.appendChild(temp);
    displayInfo.appendChild(humid);
    displayInfo.appendChild(rain);
    displayInfo.appendChild(wind)
    console.log(fetchData)
 }

getWeather();
displayInfo();

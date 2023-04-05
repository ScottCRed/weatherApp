let place = 'London';
let units = true;
let tempUnit, precipUnit, windUnit, tempValue, precipValue, windValue;

const newLocation = document.querySelector('.submit-button');
newLocation.addEventListener('click', changeLocation);
const render = document.querySelector('.submit-button');
render.addEventListener('click', displayInfo);
const change = document.querySelector('.change');
change.addEventListener('click', changeUnits);


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
    await unitDisplay();

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
    temp.textContent = 'Current Temperature: ' + tempValue + tempUnit;

    const humid = document.createElement('div');
    humid.classList.add('info');
    humid.textContent = 'Current humidity: ' + object.humidity + '%';

    const rain = document.createElement('div');
    rain.classList.add('info');
    rain.textContent = 'Predicted precipitation: ' + precipValue + precipUnit;

    const wind = document.createElement('div');
    wind.classList.add('info');
    wind.textContent = 'Wind: ' + windValue + windUnit + ' Direction: ' + object.wind_dir;

    displayInfo.appendChild(newPlace);
    displayInfo.appendChild(current);
    displayInfo.appendChild(currentImg);
    displayInfo.appendChild(temp);
    displayInfo.appendChild(humid);
    displayInfo.appendChild(rain);
    displayInfo.appendChild(wind)
    console.log(fetchData)
 }

 async function unitDisplay () {
    const fetchData =  await getWeather();
    let object  = fetchData.current;
    if (units === true) {
        tempValue = object.temp_c;
        precipValue = object.precip_mm; 
        windValue = object.wind_kph;
        tempUnit = '°C';
        precipUnit = 'mm';
        windUnit = 'km/h';
    }
    else if (units === false) {
        tempValue = object.temp_f;
        precipValue = object.precip_in; 
        windValue = object.wind_mph;
        tempUnit = '°F';
        precipUnit = 'in';
        windUnit = 'm/h';
    }
 }

 async function changeUnits() {

    if (units === true) {
        units = false;
        await displayInfo();
    }
    else {
        units = true;
        await displayInfo();
    }
  
    console.log(units);
 }

getWeather();
displayInfo();

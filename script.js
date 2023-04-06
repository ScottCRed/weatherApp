let place = 'Cape Town';
let units = true;
let tempUnit, precipUnit, windUnit, tempValue, precipValue, windValue, maxValue, minValue, preCastValue;

const newLocation = document.querySelector('.submit-button');
newLocation.addEventListener('click', changeLocation);
const render = document.querySelector('.submit-button');
render.addEventListener('click', displayInfo);
render.addEventListener('click', displayForecast);
const change = document.querySelector('.change');
change.addEventListener('click', changeUnits);


function changeLocation () {
    event.preventDefault();
    const searchKey = document.querySelector('form');
    place = searchKey.location.value;
    getWeather();
    getForecast();
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
    newPlace.classList.add('location');
    newPlace.textContent = fetchData.location.name + ', ' + fetchData.location.country 

    const currentInfo = document.createElement('div');
    currentInfo.classList.add('info');
    currentInfo.textContent = 'Current Condition: ';
    const current = document.createElement('p');
    current.classList.add('value');
    current.textContent=  object.condition.text;

    const currentImg = document.createElement('img');
    currentImg.classList.add('image');
    currentImg.src = object.condition.icon;

    const tempInfo = document.createElement('div');
    tempInfo.classList.add('info');
    tempInfo.textContent = 'Current Temperature: '; 
    const temp = document.createElement('p');
    temp.classList.add('value');
    temp.textContent = + tempValue + tempUnit;

    const humidInfo = document.createElement('div');
    humidInfo.classList.add('info');
    humidInfo.textContent = 'Current Humidity: ';
    const humid = document.createElement('p');
    humid.classList.add('value');
    humid.textContent = object.humidity + '%';

    const rainInfo = document.createElement('div');
    rainInfo.classList.add('info');
    rainInfo.textContent = 'Predicted Precipitation: ';
    const rain = document.createElement('p');
    rain.classList.add('value');
    rain.textContent = precipValue + precipUnit;

    const windInfo = document.createElement('div');
    windInfo.classList.add('info');
    windInfo.textContent = 'Wind: ';
    const wind = document.createElement('p');
    wind.classList.add('value');
    wind.textContent=  windValue + windUnit + ' ' + object.wind_dir;

    displayInfo.appendChild(currentImg);
    displayInfo.appendChild(newPlace);
    displayInfo.appendChild(currentInfo);
    currentInfo.appendChild(current);
    displayInfo.appendChild(tempInfo);
    tempInfo.appendChild(temp);
    displayInfo.appendChild(humidInfo);
    humidInfo.appendChild(humid);
    displayInfo.appendChild(rainInfo);
    rainInfo.appendChild(rain);
    displayInfo.appendChild(windInfo);
    windInfo.appendChild(wind);
}
 
async function getForecast() {
    try {
const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=3ca24ea75ac143c4945115016230404&q=${place}&days=7`, {mode:"cors"});
const forecastData = await response.json();

return forecastData;
    }
    catch (error) {
        consolee.log('error');
    }

}

async function displayForecast () {
    const display= document.querySelector('.forecast');
    display.innerHTML = '';

    let fetchData = await getForecast();
    
     for (let i=0; i < 7; i++) {
        let object = fetchData.forecast.forecastday[i];
        await forecastUnit(i);
        const container = document.querySelector('.forecast');
        const box = document.createElement('div');
        box.classList.add('forecastBox');

        const foreImg = document.createElement('img');
        foreImg.src = object.day.condition.icon;

        const dateLine = document.createElement('p');
        dateLine.classList.add('date');
        dateLine.textContent = object.date;

        const maxLineInfo = document.createElement('div');
        maxLineInfo.classList.add('info');
        maxLineInfo.textContent = 'Max: ';
        const maxLine = document.createElement('p');
        maxLine.classList.add('smallValue');
        maxLine.textContent =  maxValue + tempUnit;

        const minLineInfo = document.createElement('div');
        minLineInfo.classList.add('info');
        minLineInfo.textContent = 'Min: ';
        const minLine = document.createElement('p');
        minLine.classList.add('smallValue')
        minLine.textContent = minValue + tempUnit;

        const precipLineInfo = document.createElement('div');
        precipLineInfo.classList.add('info');
        precipLineInfo.textContent = 'Rain: '; 
        const precipLine = document.createElement('p');
        precipLine.classList.add('smallValue');
        precipLine.textContent =  preCastValue + precipUnit;

        container.appendChild(box);
        box.appendChild(foreImg);
        box.appendChild(dateLine);
        box.appendChild(minLineInfo);
        minLineInfo.appendChild(minLine);
        box.appendChild(maxLineInfo);
        maxLineInfo.appendChild(maxLine);
        box.appendChild(precipLineInfo);
        precipLineInfo.appendChild(precipLine);
     }
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
 async function forecastUnit (i) {
    const fetchForecast = await getForecast();
    let castObject = fetchForecast.forecast.forecastday[i];
    if (units === true) {
        maxValue = castObject.day.maxtemp_c;
        minValue = castObject.day.mintemp_c;
        preCastValue = castObject.day.totalprecip_mm
        tempUnit = '°C';
        precipUnit = 'mm';
        windUnit = 'km/h';
    }
    else if (units === false) {
        maxValue = castObject.day.maxtemp_f;
        minValue = castObject.day.mintemp_f;
        preCastValue = castObject.day.totalprecip_in
        tempUnit = '°F';
        precipUnit = 'in';
        windUnit = 'm/h';
    }
 }
 async function changeUnits() {

    if (units === true) {
        units = false;
        await displayInfo();
        await displayForecast();
    }
    else {
        units = true;
        await displayInfo();
        await displayForecast();
    }
  
 }

getWeather();
getForecast();
displayInfo();
displayForecast();
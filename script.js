let place = 'London';

const newLocation = document.querySelector('.submit-button');
newLocation.addEventListener('click', changeLocation);

function changeLocation () {
    event.preventDefault();
    const searchKey = document.querySelector('form');
    palce = searchKey.Keyword.value;
    console.log(place);
    getImage();
    searchKey.reset();
}

async function getWeather() {
    try {
const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=3ca24ea75ac143c4945115016230404&q=${place}`, {mode:"cors"});
const weatherData = await response.json();
console.log(weatherData.current)
    }
    catch (error) {
        consolee.log('error');
    }

}

getWeather();
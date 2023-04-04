async function getWeather() {
    try {
const response = await fetch(`${keyword}`, {mode:"cors"});
const weatherData = await response.json();
console.log(weatherData.data)
    }
    catch (error) {
        consolee.log('error');
    }

}
const searchBtn = document.getElementById('search-btn');
const city = document.getElementById('city');
const state = document.getElementById('state');
const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
let lat = '37.7749'
let lon = '-122.4194'




searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    convertCityToNum()
    getCityWeather();
    
    
    
})

function convertCityToNum () {
    const cityUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city.value}&state=${state.value}&country=${country.value}&X-Api-Key=VgssbW4kdRpWeJjECntvng==nBgdtI7KDrVd5JZc`
    fetch (cityUrl)
    .then(response => response.json())
    .then(data => {
        lat = data[0].latitude
        lon = data[0].longitude
        // console.log(lat, lon)
    })
    .catch(error => {
        console.error('error fetching data:', error)
    })
    
}


function getCityWeather () {
    let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
    fetch(url) 
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })

}
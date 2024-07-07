const searchBtn = document.getElementById('search-btn');
const city = document.getElementById('city')
const state = document.getElementById('state')
const cityEx = 'London';
const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
const lat = '37.7749'
const lon = '-122.4194'
const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
const cityUrl = `https://api.api-ninjas.com/v1/geocoding?city=${cityEx}&X-Api-Key=VgssbW4kdRpWeJjECntvng==nBgdtI7KDrVd5JZc`




searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    // console.log("clicked")

//    console.log(city.value)
getCityWeather();
 
   
})



function getCityWeather () {
    fetch(cityUrl) 
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })

}
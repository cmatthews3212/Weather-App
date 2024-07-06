const searchBtn = document.getElementById('search-btn');
const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
const city = 'chicago'







searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("clicked")
    getCityWeather(city)
})

function getCityWeather (city) {
    const url = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`

fetch(url) 
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })

}
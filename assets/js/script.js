const searchBtn = document.getElementById('search-btn');
const city = document.getElementById('city');
const state = document.getElementById('state');
const topToday = document.getElementById('todays-weather');
const today = document.createElement('div');
const heading = document.createElement('h2');
const list = document.createElement('ul');
const liEl1 = document.createElement('li')
const liEl2 = document.createElement('li')
const liEl3 = document.createElement('li')
const sunnyData = document.createElement('h5')

list.append(liEl1)
list.append(liEl2)
list.append(liEl3)

let temp = ''
let wind = ''
let humid = ''
let sun = ''
const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
let lat =''
let lon = ''




searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    convertCityToNum();
    
    
    
})

function processData (data) {
    console.log('data received:' + data)
}




function convertCityToNum () {
    if (city.value === '') {
        alert('Please enter a city')
    } else if (state.value === '' && country.value !== '') {
        alert('Please enter both a state and country')
    } else if (state.value !== '' && country.value === '') {
        alert('Please enter both a state and country')
    } else {

    const cityUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city.value}&country=${country.value}&state=${state.value}&X-Api-Key=VgssbW4kdRpWeJjECntvng==nBgdtI7KDrVd5JZc`
    fetch (cityUrl)
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        lat = data[0].latitude
        lon = data[0].longitude
        // console.log(lat, lon)
        getCityWeather(lat, lon)
        
    })
    .catch(error => {
        console.error('error fetching data:', error)
    })
    }
    }
    



function getCityWeather () {
    let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    fetch(url) 
    .then(response => response.json())
    .then(data => {
        console.log(data)
        temp = data.current.temp;
        wind = data.current.wind_speed;
        humid = data.current.humidity
        sun = data.current.clouds
        createCurrentData(temp, wind, humid, sun)

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })

}






function createCurrentData () {
    today.classList.add('card-panel', 'pink', 'lighten-4');
    heading.textContent = `${city.value} Today`
    liEl1.textContent = `Temp: ${temp}`
    liEl2.textContent = `Wind: ${wind}`
    liEl3.textContent =  `Humidity: ${humid}`

    if (sun === 100) {
        sunnyData.textContent = `The Sun is hiding behind clouds completely today!`
    } else if (sun < 100 || sun >= 50) {
        sunnyData.textContent = `The Sun is peaking through the clouds a little today!`
    } else if (sun <= 49 || sun > 0) {
        sunnyData.textContent = `The Sun is peaking through the clouds a lot today!`
    } else if (sun === 0) {
        sunnyData.textContent = `The Sun is completely out today!`
    }

    today.appendChild(heading)
    today.appendChild(sunnyData)
    today.appendChild(list)
    topToday.appendChild(today)
    console.log(today)
}


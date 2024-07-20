const searchBtn = document.getElementById('search-city');
const cityInput = document.getElementById('city');

searchBtn.addEventListener('click', function(event) {
    event.preventDefault();
    // console.log(cityInput.value)
    readStorage()
    convertZip()
})


function convertZip () {
    const apiKey = 'VgssbW4kdRpWeJjECntvng==nBgdtI7KDrVd5JZc';
    const url = `https://api.api-ninjas.com/v1/zipcode?zip=${cityInput.value}&X-Api-Key=${apiKey}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            for(const city of data) {
                // console.log(city.city)
                setLocalStorage(city)
                convertToNum(city)
                createCurrentWeather(city)
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })

}

function readStorage () {
    let existingData = localStorage.getItem('city');
    const array = [];
    if (existingData == null) {
        localStorage.setItem('city', array)
    }
}


const cityArr = []

function setLocalStorage (cityName) {
    // console.log(cityName.city)
    readStorage()
    
    
    const cityObj = {city: cityName.city}
    
    
    // console.log(cityObj)
    
    cityArr.push(cityObj)
    const cityString = JSON.stringify(cityArr);
    localStorage.setItem('city', cityString);


}

function convertToNum (cityName) {
        const city = cityName.city
        
        const cityUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city}&X-Api-Key=VgssbW4kdRpWeJjECntvng==nBgdtI7KDrVd5JZc`
        fetch (cityUrl)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            lat = data[0].latitude
            lon = data[0].longitude
            // console.log(lat, lon)
            getCurrentWeather(lat, lon)
            // getDailyWeather(lat, lon)

         
    
       
    
            
        })
        .catch(error => {
            console.error('error fetching data:', error)
        })

        
}

function getCurrentWeather() {
    let currentDate = dayjs().format('YYYY-MM-DD')
    const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
    let url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${currentDate}&units=imperial&appid=${apiKey}`
    fetch(url) 
    .then(response => response.json())
    .then(data => {
        console.log(data)
        


    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })

}

function createCurrentWeather (cityName) {
    const cityToday = cityName.city
    const h2 = document.getElementById('city-today')
    h2.textContent = `${cityToday} Today`

    
}


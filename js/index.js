const searchBtn = document.getElementById('search-city');
const cityInput = document.getElementById('city');

//  button to search new zip code
searchBtn.addEventListener('click', function(event) {
    event.preventDefault();
    // console.log(cityInput.value)
    readStorage()
    convertZip()
})

//  convert zip code to city for weather api
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
                createCurrentWeatherName(city)
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })

}


// read cities added to storage

function readStorage () {
    let existingData = localStorage.getItem('city');
    const array = [];
    if (existingData == null) {
        localStorage.setItem('city', array)
    }


  
}


const cityArr = []

// set new city to local storage

function setLocalStorage (cityName) {
    // console.log(cityName.city)
    readStorage()
    
    
    const cityObj = {city: cityInput.value}
    
    
    // console.log(cityObj)
    
    cityArr.push(cityObj)
    const cityString = JSON.stringify(cityArr);
    localStorage.setItem('city', cityString);
    historyButtons()

}

// conver city name to latitude and longitude for weather api

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
            getTomorrowWeather(lat, lon)
            getTwoWeather(lat, lon)
            getThreeWeather(lat, lon)
            getFourWeather(lat, lon)
            getFiveWeather(lat, lon)


         
    
       
    
            
        })
        .catch(error => {
            console.error('error fetching data:', error)
        })

        
}


// get data for today's weather
function getCurrentWeather() {
    let currentDate = dayjs().format('YYYY-MM-DD')
    const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
    let url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${currentDate}&units=imperial&appid=${apiKey}`
    fetch(url) 
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        sun = data.cloud_cover.afternoon
        temp = data.temperature.max
        wind = data.wind.max.speed
        humid = data.humidity.afternoon
        
        createCurrentWeatherData(sun, temp, wind, humid)


    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })

}


// Add city name to displayed content
function createCurrentWeatherName (cityName) {
    const weather = document.getElementById('weather')
    weather.classList.remove('d-none')
    // city name
    const cityToday = cityName.city
    const h2 = document.getElementById('city-today')
    h2.textContent = `${cityToday} Today`
    

}

// Add city weather data to displayed content 
function createCurrentWeatherData () {

       // icon and sun info
       const icon = document.getElementById('icon')
       const sunInfo = document.getElementById('sun-info')
       if (sun > 90) {
           icon.setAttribute('src', './icons/brightness-high.svg')
           sunInfo.textContent = 'The sun is out today!'
       } else if (sun <= 90 && sun > 10) {
           icon.setAttribute('src', './icons/cloud-sun.svg')
           sunInfo.textContent = 'The sun is partially out today!'
       } else if (sun <= 10) {
           icon.setAttribute('src', './icons/cloud.svg')
           sunInfo.textContent = 'The sun is behind the clouds today!'
       }


    //    Ul info

    const tempInfo = document.getElementById('temp')
    const windInfo = document.getElementById('wind')
    const humidInfo = document.getElementById('humid');

    tempInfo.textContent = `Temp: ${temp} °F`
    windInfo.textContent = `Wind: ${wind}mph`
    humidInfo.textContent = `Humidity: ${humid}%`


}


// The following functions add weather data to the next five days after the current date

function getTomorrowWeather () {
    let tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD') 
    const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
    let url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${tomorrow}&units=imperial&appid=${apiKey}`
    fetch(url) 
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        sun = data.cloud_cover.afternoon
        temp = data.temperature.max
        wind = data.wind.max.speed
        humid = data.humidity.afternoon
        
        createTomorrowWeatherData(sun, temp, wind, humid)


    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })
}



function createTomorrowWeatherData () {
    let tomorrowFormat = dayjs().add(1, 'day').format('dddd') 

    const tomorrowName = document.getElementById('tomorrow-name')
    
    tomorrowName.textContent = tomorrowFormat
    
    // icon and sun info
    const tomorrowIcon = document.getElementById('tomorrow-icon')

       if (sun > 90) {
           tomorrowIcon.setAttribute('src', './icons/brightness-high.svg')
       } else if (sun <= 90 && sun > 10) {
           tomorrowIcon.setAttribute('src', './icons/cloud-sun.svg')
       } else if (sun <= 10) {
           tomorrowIcon.setAttribute('src', './icons/cloud.svg')
       }
    


    //    Ul info

    const tempInfo = document.getElementById('tomorrow-temp')
    const windInfo = document.getElementById('tomorrow-wind')
    const humidInfo = document.getElementById('tomorrow-humid');

    tempInfo.textContent = `Temp: ${temp} °F`
    windInfo.textContent = `Wind: ${wind}mph`
    humidInfo.textContent = `Humidity: ${humid}%`


}

function getTwoWeather () {
    let twoDays = dayjs().add(2, 'day').format('YYYY-MM-DD')
    const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
    let url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${twoDays}&units=imperial&appid=${apiKey}`
    fetch(url) 
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        sun = data.cloud_cover.afternoon
        temp = data.temperature.max
        wind = data.wind.max.speed
        humid = data.humidity.afternoon
        
        createTwoWeatherData(sun, temp, wind, humid)


    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })
}



function createTwoWeatherData () {
    let twoDays = dayjs().add(2, 'day').format('dddd')

    const twoName = document.getElementById('two-name')
    
    twoName.textContent = twoDays
    
    // icon and sun info
    const twoIcon = document.getElementById('two-icon')

       if (sun > 90) {
           twoIcon.setAttribute('src', './icons/brightness-high.svg')
       } else if (sun <= 90 && sun > 10) {
           twoIcon.setAttribute('src', './icons/cloud-sun.svg')
       } else if (sun <= 10) {
           twoIcon.setAttribute('src', './icons/cloud.svg')
       }
    


    //    Ul info

    const tempInfo = document.getElementById('two-temp')
    const windInfo = document.getElementById('two-wind')
    const humidInfo = document.getElementById('two-humid');

    tempInfo.textContent = `Temp: ${temp} °F`
    windInfo.textContent = `Wind: ${wind}mph`
    humidInfo.textContent = `Humidity: ${humid}%`


}

function getThreeWeather () {
    let threeDays = dayjs().add(3, 'day').format('YYYY-MM-DD')
    const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
    let url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${threeDays}&units=imperial&appid=${apiKey}`
    fetch(url) 
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        sun = data.cloud_cover.afternoon
        temp = data.temperature.max
        wind = data.wind.max.speed
        humid = data.humidity.afternoon
        
        createThreeWeatherData(sun, temp, wind, humid)


    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })
}



function createThreeWeatherData () {
    let threeDays = dayjs().add(3, 'day').format('dddd')

    const threeName = document.getElementById('three-name')
    
    threeName.textContent = threeDays
    
    // icon and sun info
    const threeIcon = document.getElementById('three-icon')

       if (sun > 90) {
           threeIcon.setAttribute('src', './icons/brightness-high.svg')
       } else if (sun <= 90 && sun > 10) {
           threeIcon.setAttribute('src', './icons/cloud-sun.svg')
       } else if (sun <= 10) {
           threeIcon.setAttribute('src', './icons/cloud.svg')
       }
    


    //    Ul info

    const tempInfo = document.getElementById('three-temp')
    const windInfo = document.getElementById('three-wind')
    const humidInfo = document.getElementById('three-humid');

    tempInfo.textContent = `Temp: ${temp} °F`
    windInfo.textContent = `Wind: ${wind}mph`
    humidInfo.textContent = `Humidity: ${humid}%`


}

function getFourWeather () {
    let fourDays = dayjs().add(4, 'day').format('YYYY-MM-DD')
    const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
    let url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${fourDays}&units=imperial&appid=${apiKey}`
    fetch(url) 
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        sun = data.cloud_cover.afternoon
        temp = data.temperature.max
        wind = data.wind.max.speed
        humid = data.humidity.afternoon
        
        createFourWeatherData(sun, temp, wind, humid)


    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })
}



function createFourWeatherData () {
    let fourDays = dayjs().add(4, 'day').format('dddd')

    const fourName = document.getElementById('four-name')
    
    fourName.textContent = fourDays
    
    // icon and sun info
    const fourIcon = document.getElementById('four-icon')

       if (sun > 90) {
           fourIcon.setAttribute('src', './icons/brightness-high.svg')
       } else if (sun <= 90 && sun > 10) {
           fourIcon.setAttribute('src', './icons/cloud-sun.svg')
       } else if (sun <= 10) {
           fourIcon.setAttribute('src', './icons/cloud.svg')
       }
    


    //    Ul info

    const tempInfo = document.getElementById('four-temp')
    const windInfo = document.getElementById('four-wind')
    const humidInfo = document.getElementById('four-humid');

    tempInfo.textContent = `Temp: ${temp} °F`
    windInfo.textContent = `Wind: ${wind}mph`
    humidInfo.textContent = `Humidity: ${humid}%`


}

function getFiveWeather () {
    let fiveDays = dayjs().add(5, 'day').format('YYYY-MM-DD')
    const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
    let url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${fiveDays}&units=imperial&appid=${apiKey}`
    fetch(url) 
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        sun = data.cloud_cover.afternoon
        temp = data.temperature.max
        wind = data.wind.max.speed
        humid = data.humidity.afternoon
        
        createFiveWeatherData(sun, temp, wind, humid)


    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })
}



function createFiveWeatherData () {
    let fiveDays = dayjs().add(5, 'day').format('dddd')

    const fiveName = document.getElementById('five-name')
    
    fiveName.textContent = fiveDays
    
    // icon and sun info
    const fiveIcon = document.getElementById('five-icon')

       if (sun > 90) {
           fiveIcon.setAttribute('src', './icons/brightness-high.svg')
       } else if (sun <= 90 && sun > 10) {
           fiveIcon.setAttribute('src', './icons/cloud-sun.svg')
       } else if (sun <= 10) {
           fiveIcon.setAttribute('src', './icons/cloud.svg')
       }
    


    //    Ul info

    const tempInfo = document.getElementById('five-temp')
    const windInfo = document.getElementById('five-wind')
    const humidInfo = document.getElementById('five-humid');

    tempInfo.textContent = `Temp: ${temp} °F`
    windInfo.textContent = `Wind: ${wind}mph`
    humidInfo.textContent = `Humidity: ${humid}%`


}


// History Buttons

function historyButtons () {
    const btnsDiv = document.getElementById('history-btns')

    // readStorage()
    const getHistory = localStorage.getItem('city')
    const historyParsed = JSON.parse(getHistory)
    const lastZip = historyParsed.pop()
    console.log(lastZip)
    const historyBtn = document.createElement('p')
    historyBtn.classList.add('history', 'rounded', 'p-3')

    const apiKey = 'VgssbW4kdRpWeJjECntvng==nBgdtI7KDrVd5JZc';
    const url = `https://api.api-ninjas.com/v1/zipcode?zip=${lastZip.city}&X-Api-Key=${apiKey}`
    fetch(url)
    .then(response => response.json())
    .then(data => {

       for (const city of data) {
        historyBtn.textContent = city.city
        btnsDiv.appendChild(historyBtn)
        
        historyBtn.addEventListener('click', function () {
            const zip = city.zip_code
             convertHistoryZip(zip)
            
        })
       }

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })

  


}

function convertHistoryZip (citySearch) {

    const apiKey = 'VgssbW4kdRpWeJjECntvng==nBgdtI7KDrVd5JZc';
    const url = `https://api.api-ninjas.com/v1/zipcode?zip=${citySearch}&X-Api-Key=${apiKey}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            city = data[0].city
            // console.log(city)
            searchHistory(city)
            searchCurrentWeatherName(city)


        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
        
     

}

function searchHistory (citySearch) {
    // console.log(citySearch)

    const cityUrl = `https://api.api-ninjas.com/v1/geocoding?city=${citySearch}&X-Api-Key=VgssbW4kdRpWeJjECntvng==nBgdtI7KDrVd5JZc`
    fetch (cityUrl)
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        lat = data[0].latitude
        lon = data[0].longitude
        // console.log(lat, lon)

        searchCurrentWeather(lat, lon)
        searchTomorrowWeather(lat, lon)
        searchTwoWeather(lat, lon)
        searchThreeWeather(lat, lon)
        searchFourWeather(lat, lon)
        searchFiveWeather(lat, lon)


        
    })
    .catch(error => {
        console.error('error fetching data:', error)
    })
    
}


function searchCurrentWeather() {
    let currentDate = dayjs().format('YYYY-MM-DD')
    const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
    let url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${currentDate}&units=imperial&appid=${apiKey}`
    fetch(url) 
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        sun = data.cloud_cover.afternoon
        temp = data.temperature.max
        wind = data.wind.max.speed
        humid = data.humidity.afternoon
        
        searchCurrentWeatherData(sun, temp, wind, humid)


    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })

}



function searchCurrentWeatherName (citySearch) {
    const weather = document.getElementById('weather')
    weather.classList.remove('d-none')
    // city name
    const cityToday = citySearch
    const h2 = document.getElementById('city-today')
    h2.textContent = `${cityToday} Today`
    

}

function searchCurrentWeatherData () {


       // icon and sun info
       const icon = document.getElementById('icon')
       const sunInfo = document.getElementById('sun-info')
       if (sun > 90) {
           icon.setAttribute('src', './icons/brightness-high.svg')
           sunInfo.textContent = 'The sun is out today!'
       } else if (sun <= 90 && sun > 10) {
           icon.setAttribute('src', './icons/cloud-sun.svg')
           sunInfo.textContent = 'The sun is partially out today!'
       } else if (sun <= 10) {
           icon.setAttribute('src', './icons/cloud.svg')
           sunInfo.textContent = 'The sun is behind the clouds today!'
       }


    //    Ul info

    const tempInfo = document.getElementById('temp')
    const windInfo = document.getElementById('wind')
    const humidInfo = document.getElementById('humid');

    tempInfo.textContent = `Temp: ${temp} °F`
    windInfo.textContent = `Wind: ${wind}mph`
    humidInfo.textContent = `Humidity: ${humid}%`


}


function searchTomorrowWeather () {
    let tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD') 
    const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
    let url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${tomorrow}&units=imperial&appid=${apiKey}`
    fetch(url) 
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        sun = data.cloud_cover.afternoon
        temp = data.temperature.max
        wind = data.wind.max.speed
        humid = data.humidity.afternoon
        
        searchTomorrowWeatherData(sun, temp, wind, humid)


    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })
}



function searchTomorrowWeatherData () {
    let tomorrowFormat = dayjs().add(1, 'day').format('dddd') 

    const tomorrowName = document.getElementById('tomorrow-name')
    
    tomorrowName.textContent = tomorrowFormat
    
    // icon and sun info
    const tomorrowIcon = document.getElementById('tomorrow-icon')

       if (sun > 90) {
           tomorrowIcon.setAttribute('src', './icons/brightness-high.svg')
       } else if (sun <= 90 && sun > 10) {
           tomorrowIcon.setAttribute('src', './icons/cloud-sun.svg')
       } else if (sun <= 10) {
           tomorrowIcon.setAttribute('src', './icons/cloud.svg')
       }
    


    //    Ul info

    const tempInfo = document.getElementById('tomorrow-temp')
    const windInfo = document.getElementById('tomorrow-wind')
    const humidInfo = document.getElementById('tomorrow-humid');

    tempInfo.textContent = `Temp: ${temp} °F`
    windInfo.textContent = `Wind: ${wind}mph`
    humidInfo.textContent = `Humidity: ${humid}%`


}

function searchTwoWeather () {
    let twoDays = dayjs().add(2, 'day').format('YYYY-MM-DD')
    const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
    let url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${twoDays}&units=imperial&appid=${apiKey}`
    fetch(url) 
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        sun = data.cloud_cover.afternoon
        temp = data.temperature.max
        wind = data.wind.max.speed
        humid = data.humidity.afternoon
        
        searchTwoWeatherData(sun, temp, wind, humid)


    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })
}



function searchTwoWeatherData () {
    let twoDays = dayjs().add(2, 'day').format('dddd')

    const twoName = document.getElementById('two-name')
    
    twoName.textContent = twoDays
    
    // icon and sun info
    const twoIcon = document.getElementById('two-icon')

       if (sun > 90) {
           twoIcon.setAttribute('src', './icons/brightness-high.svg')
       } else if (sun <= 90 && sun > 10) {
           twoIcon.setAttribute('src', './icons/cloud-sun.svg')
       } else if (sun <= 10) {
           twoIcon.setAttribute('src', './icons/cloud.svg')
       }
    


    //    Ul info

    const tempInfo = document.getElementById('two-temp')
    const windInfo = document.getElementById('two-wind')
    const humidInfo = document.getElementById('two-humid');

    tempInfo.textContent = `Temp: ${temp} °F`
    windInfo.textContent = `Wind: ${wind}mph`
    humidInfo.textContent = `Humidity: ${humid}%`


}

function searchThreeWeather () {
    let threeDays = dayjs().add(3, 'day').format('YYYY-MM-DD')
    const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
    let url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${threeDays}&units=imperial&appid=${apiKey}`
    fetch(url) 
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        sun = data.cloud_cover.afternoon
        temp = data.temperature.max
        wind = data.wind.max.speed
        humid = data.humidity.afternoon
        
        searchThreeWeatherData(sun, temp, wind, humid)


    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })
}



function searchThreeWeatherData () {
    let threeDays = dayjs().add(3, 'day').format('dddd')

    const threeName = document.getElementById('three-name')
    
    threeName.textContent = threeDays
    
    // icon and sun info
    const threeIcon = document.getElementById('three-icon')

       if (sun > 90) {
           threeIcon.setAttribute('src', './icons/brightness-high.svg')
       } else if (sun <= 90 && sun > 10) {
           threeIcon.setAttribute('src', './icons/cloud-sun.svg')
       } else if (sun <= 10) {
           threeIcon.setAttribute('src', './icons/cloud.svg')
       }
    


    //    Ul info

    const tempInfo = document.getElementById('three-temp')
    const windInfo = document.getElementById('three-wind')
    const humidInfo = document.getElementById('three-humid');

    tempInfo.textContent = `Temp: ${temp} °F`
    windInfo.textContent = `Wind: ${wind}mph`
    humidInfo.textContent = `Humidity: ${humid}%`


}

function searchFourWeather () {
    let fourDays = dayjs().add(4, 'day').format('YYYY-MM-DD')
    const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
    let url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${fourDays}&units=imperial&appid=${apiKey}`
    fetch(url) 
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        sun = data.cloud_cover.afternoon
        temp = data.temperature.max
        wind = data.wind.max.speed
        humid = data.humidity.afternoon
        
        searchFourWeatherData(sun, temp, wind, humid)


    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })
}



function searchFourWeatherData () {
    let fourDays = dayjs().add(4, 'day').format('dddd')

    const fourName = document.getElementById('four-name')
    
    fourName.textContent = fourDays
    
    // icon and sun info
    const fourIcon = document.getElementById('four-icon')

       if (sun > 90) {
           fourIcon.setAttribute('src', './icons/brightness-high.svg')
       } else if (sun <= 90 && sun > 10) {
           fourIcon.setAttribute('src', './icons/cloud-sun.svg')
       } else if (sun <= 10) {
           fourIcon.setAttribute('src', './icons/cloud.svg')
       }
    


    //    Ul info

    const tempInfo = document.getElementById('four-temp')
    const windInfo = document.getElementById('four-wind')
    const humidInfo = document.getElementById('four-humid');

    tempInfo.textContent = `Temp: ${temp} °F`
    windInfo.textContent = `Wind: ${wind}mph`
    humidInfo.textContent = `Humidity: ${humid}%`


}

function searchFiveWeather () {
    let fiveDays = dayjs().add(5, 'day').format('YYYY-MM-DD')
    const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
    let url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${fiveDays}&units=imperial&appid=${apiKey}`
    fetch(url) 
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        sun = data.cloud_cover.afternoon
        temp = data.temperature.max
        wind = data.wind.max.speed
        humid = data.humidity.afternoon
        
        searchFiveWeatherData(sun, temp, wind, humid)


    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })
}



function searchFiveWeatherData () {
    let fiveDays = dayjs().add(5, 'day').format('dddd')

    const fiveName = document.getElementById('five-name')
    
    fiveName.textContent = fiveDays
    
    // icon and sun info
    const fiveIcon = document.getElementById('five-icon')

       if (sun > 90) {
           fiveIcon.setAttribute('src', './icons/brightness-high.svg')
       } else if (sun <= 90 && sun > 10) {
           fiveIcon.setAttribute('src', './icons/cloud-sun.svg')
       } else if (sun <= 10) {
           fiveIcon.setAttribute('src', './icons/cloud.svg')
       }
    


    //    Ul info

    const tempInfo = document.getElementById('five-temp')
    const windInfo = document.getElementById('five-wind')
    const humidInfo = document.getElementById('five-humid');

    tempInfo.textContent = `Temp: ${temp} °F`
    windInfo.textContent = `Wind: ${wind}mph`
    humidInfo.textContent = `Humidity: ${humid}%`


}







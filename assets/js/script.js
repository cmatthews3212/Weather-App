const searchBtn = document.getElementById('search-btn');
const city = document.getElementById('city');
const state = document.getElementById('state');
const topToday = document.getElementById('todays-weather');
const today = document.createElement('div');
const todayHeading = document.createElement('h2');
const list = document.createElement('ul');
const liEl1 = document.createElement('li')
const liEl2 = document.createElement('li')
const liEl3 = document.createElement('li')
const sunnyData = document.createElement('h5')

const thisWeek = document.getElementById('future-weather');
const weekHeading = document.createElement('h2')
const weekCards = document.createElement('div')
const card1 = document.createElement('div')
const card2 = document.createElement('div')
const card3 = document.createElement('div')
const card4= document.createElement('div')
const card5 = document.createElement('div')

let cardsArray = [card1, card2, card3, card4, card5];


list.appendChild(liEl1)
list.appendChild(liEl2)
list.appendChild(liEl3)




let temp = ''
let wind = ''
let humid = ''
let sun = ''
const apiKey = 'ccf6ee45f4426f5df18513805a5e47df';
let lat =''
let lon = ''
let date = ''

// const currentDate = new Date();

// const year = currentDate.getFullYear();
// const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
// const day = currentDate.getDate().toString().padStart(2, '0');

// let formattedDate = `${year}-${month}-${day}`

let currentDate = dayjs().format('YYYY-MM-DD')
// console.log(currentDate)


let tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD') 
let twoDays = dayjs().add(2, 'day').format('YYYY-MM-DD')
let threeDays = dayjs().add(3, 'day').format('YYYY-MM-DD')
let fourDays = dayjs().add(4, 'day').format('YYYY-MM-DD')
let fiveDays = dayjs().add(5, 'day').format('YYYY-MM-DD')

let daysOfWeekArray = [tomorrow, twoDays, threeDays, fourDays, fiveDays]









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
        getCurrentWeather(lat, lon)
        getDailyWeather(lat, lon)
        // getTomWeather(lat, lon)
        // getTwoWeather(lat, lon)
        // getThreeWeather(lat, lon)
        // getFourWeather(lat, lon)
        // getFiveWeather(lat, lon)

   

        
    })
    .catch(error => {
        console.error('error fetching data:', error)
    })
    }
    }
    



function getCurrentWeather () {
    let url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${currentDate}&units=imperial&appid=${apiKey}`
    fetch(url) 
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        temp = data.temperature.max;
        wind = data.wind.max.speed;
        humid = data.humidity.afternoon;
        sun = data.cloud_cover.afternoon
        createCurrentData(temp, wind, humid, sun)

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })

}

function getDailyWeather () {

    for(let i = 0; i < daysOfWeekArray.length; i++) {
        console.log(daysOfWeekArray[i])
    let dayUrl = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${daysOfWeekArray[i]}&units=imperial&appid=${apiKey}`
    fetch(dayUrl) 
    .then(response => response.json())
    .then(data => {
        console.log(data)
        temp = data.temperature.max;
        wind = data.wind.max.speed;
        humid = data.humidity.afternoon;
        sun = data.cloud_cover.afternoon
        date = data.date
        createDailyData(temp, wind, humid, sun, date)
        
        
        
        
    })
    
    .catch(error => {
        console.error('Error fetching data:', error);
    })
}
}



// function getTomWeather () {
//     let tomUrl = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${tomorrow}&units=imperial&appid=${apiKey}`
//     fetch(tomUrl) 
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//         tomTemp = data.temperature.max;
//         tomWind = data.wind.max.speed;
//         tomHumid = data.humidity.afternoon;
//         tomSun = data.cloud_cover.afternoon
//         tomDate = data.date
//         createTomorrowData(tomTemp, tomWind, tomHumid, tomSun, tomDate)
        
        
        
        
//     })
    
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     })
// }

// function getTwoWeather () {
//     let twoUrl = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${twoDays}&units=imperial&appid=${apiKey}`
//     fetch(twoUrl) 
//     .then(response => response.json())
//     .then(data => {
//         // console.log(data)
//         twoTemp = data.temperature.max;
//         twoWind = data.wind.max.speed;
//         twoHumid = data.humidity.afternoon;
//         twoSun = data.cloud_cover.afternoon
//         twoDate = data.date
//         createTwoData(twoTemp, twoWind, twoHumid, twoSun, twoDate)
        
        
        
        
//     })
    
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     })
// }

//     function getThreeWeather() {
//     let threeUrl = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${threeDays}&units=imperial&appid=${apiKey}`
//     fetch(threeUrl) 
//     .then(response => response.json())
//     .then(data => {
//         // console.log(data)
//         threeTemp = data.temperature.max;
//         threeWind = data.wind.max.speed;
//         threeHumid = data.humidity.afternoon;
//         threeSun = data.cloud_cover.afternoon
//         threeDate = data.date
//         createThreeData(threeTemp, threeWind, threeHumid, threeSun, threeDate)
        
        
        
        
//     })
    
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     })

// }

// function getFourWeather () {
//     let fourUrl = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${fourDays}&units=imperial&appid=${apiKey}`
//     fetch(fourUrl) 
//     .then(response => response.json())
//     .then(data => {
//         // console.log(data)
//         fourTemp = data.temperature.max;
//         fourWind = data.wind.max.speed;
//         fourHumid = data.humidity.afternoon;
//         fourSun = data.cloud_cover.afternoon
//         fourDate = data.date
//         createFourData(fourTemp, fourWind, fourSun, fourDate)
        
        
        
        
//     })
    
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     })

// }

// function getFiveWeather () {
//     let fiveUrl = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${fiveDays}&units=imperial&appid=${apiKey}`
//     fetch(fiveUrl) 
//     .then(response => response.json())
//     .then(data => {
//         // console.log(data)
//         fiveTemp = data.temperature.max;
//         fiveWind = data.wind.max.speed;
//         fiveHumid = data.humidity.afternoon;
//         fiveSun = data.cloud_cover.afternoon
//         fiveDate = data.date
//         createFiveData(fiveTemp, fiveWind, fiveHumid, fiveSun, fiveDate)
        
        
        
        
//     })
    
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     })
// }

// function getDailyWeather () {
    
//     for (let i = 0; i < daysOfWeekArray.length; i++) {
//         let url = `https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${daysOfWeekArray[i]}&units=imperial&appid=${apiKey}`
//         fetch(url) 
//         .then(response => response.json())
//         .then(data => {
//             // console.log(data)
//             temp = data.temperature.max;
//             wind = data.wind.max.speed;
//             humid = data.humidity.afternoon;
//             sun = data.cloud_cover.afternoon
//             dateNum = data.date
            
//             createDailyData(temp, wind, humid, sun, dateNum)
            
            
            
            
//         })
        
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         })
//     }
    
// }





function createCurrentData () {
    today.classList.add('card-panel', 'pink', 'lighten-4');
    todayHeading.textContent = `${city.value} Today`
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
    
    today.appendChild(todayHeading)
    today.appendChild(sunnyData)
    today.appendChild(list)
    topToday.appendChild(today)
    
    
    
}



let dateNumArr = []

let dateArray = []
let tempArray = []
let windArray = []
let humidArray = []
// let dateNumArr = []
function createDailyData () {
    thisWeek.classList.add('card-panel', 'pink', 'lighten-2')
    weekCards.classList.add('row')
    card1.classList.add('col', '12', 'card-panel', 'pink', 'lighten-4')
    card2.classList.add('col', '12', 'card-panel', 'pink', 'lighten-4')
    card3.classList.add('col', '12', 'card-panel', 'pink', 'lighten-4')
    card4.classList.add('col', '12', 'card-panel', 'pink', 'lighten-4')
    card5.classList.add('col', '12', 'card-panel', 'pink', 'lighten-4')
    
    weekCards.appendChild(card1)
weekCards.appendChild(card2)
weekCards.appendChild(card3)
weekCards.appendChild(card4)
weekCards.appendChild(card5)

    
let h5 = document.createElement('h5')
let div1 = document.createElement('div')
let div2 = document.createElement('div')
let div3 = document.createElement('div')
    let div4 = document.createElement('div')
    dateNumArr.push(date)
    dateNumArr.sort()
    console.log(dateNumArr)

    
        let day = dayjs(date) 
        let dayOfWeek = day.format('dddd')
    
    weekHeading.textContent = 'This Week'
    
    h5.textContent = dayOfWeek
    console.log(h5)
    div2.textContent = `Temp: ${temp}`
    div3.textContent = `Wind: ${wind}`
    div4.textContent = `Humidity: ${humid}`


  
    
    //  console.log(array)
    
    dateArray.push(h5)
    // dateArray.sort(function (a, b) {
    //     for (let i = 0; i < dateArray.length; i++) {
    //         const date = dateArray[i].innerText
        
    //     }
    //     })
    
    console.log(dateArray)

    tempArray.push(div2)
    windArray.push(div3)
    humidArray.push(div4)

  

    

    // console.log(dateArray)
    // card1.appendChild(h5)
    // card2.appendChild(h5)

   for (let i = 0; i < cardsArray.length; i++) {
       // console.log(cardsArray[i])
       for (let i = 0; i < dateArray.length; i++) {
           //  console.log(dateArray[i])
        cardsArray[i].appendChild(dateArray[i])
        
    }
    for (let i = 0; i < tempArray.length; i++) {
        cardsArray[i].appendChild(tempArray[i])
    }
    for (let i = 0; i < windArray.length; i++) {
        cardsArray[i].appendChild(windArray[i])
    }
    for (let i = 0; i < humidArray.length; i++) {
        cardsArray[i].appendChild(humidArray[i])
    }
    // let div5 = document.createElement('div')
    // div5.textContent = `__________________________`
    // cardsArray[i].appendChild(div5)
    
   }


//    for ( const card of cardsArray) {
//     console.log(card)
//    }

//    for (const date of dateArray) {
//     console.log(date)
//    }
    
    thisWeek.appendChild(weekHeading)
    thisWeek.appendChild(weekCards)


    
}
// function createTomorrowData () {
//     const card1 = document.createElement('div')
//     weekCards.classList.add('row')
  
//     thisWeek.classList.add('card-panel', 'pink', 'lighten-2')
//     card1.classList.add('col', '12', 'card-panel', 'pink', 'lighten-4')
//     weekHeading.textContent = 'This Week'

//         thisWeek.appendChild(weekHeading)
//         thisWeek.appendChild(weekCards)
        
//         weekCards.appendChild(card1)
    
        
//     let h5 = document.createElement('h5')
//     let div1 = document.createElement('div')
//     let div2 = document.createElement('div')
//     let div3 = document.createElement('div')
//         let div4 = document.createElement('div')

//         let dateStr = tomDate
//         let date =  dayjs(dateStr)
//         let dayOfWeek = date.format('dddd')

         
//     h5.textContent = dayOfWeek
//     div2.textContent = `Temp: ${tomTemp}`
//     div3.textContent = `Wind: ${tomWind}`
//     div4.textContent = `Humidity: ${tomHumid}`

//     card1.appendChild(h5)
//     card1.appendChild(div2)
//     card1.appendChild(div3)
//     card1.appendChild(div4)

// }

// function createTwoData () {

// const card2 = document.createElement('div')

//         card2.classList.add('col', '12', 'card-panel', 'pink', 'lighten-4')
        
//         weekCards.appendChild(card2)
    
        
//     let h5 = document.createElement('h5')
//     let div1 = document.createElement('div')
//     let div2 = document.createElement('div')
//     let div3 = document.createElement('div')
//         let div4 = document.createElement('div')

        
//         let dateStr = twoDate
//         let date =  dayjs(dateStr)
//         let dayOfWeek = date.format('dddd')

         
//     h5.textContent = dayOfWeek
//     div2.textContent = `Temp: ${twoTemp}`
//     div3.textContent = `Wind: ${twoWind}`
//     div4.textContent = `Humidity: ${twoHumid}`

//     card2.appendChild(h5)
//     card2.appendChild(div2)
//     card2.appendChild(div3)
//     card2.appendChild(div4)
// }
// function createThreeData () {

// const card3 = document.createElement('div')

//     card3.classList.add('col', '12', 'card-panel', 'pink', 'lighten-4')
    
//     weekCards.appendChild(card3)

    
// let h5 = document.createElement('h5')
// let div1 = document.createElement('div')
// let div2 = document.createElement('div')
// let div3 = document.createElement('div')
//     let div4 = document.createElement('div')

    
//     let dateStr = threeDate
//     let date =  dayjs(dateStr)
//     let dayOfWeek = date.format('dddd')

     
// h5.textContent = dayOfWeek
// div2.textContent = `Temp: ${threeTemp}`
// div3.textContent = `Wind: ${threeWind}`
// div4.textContent = `Humidity: ${threeHumid}`

// card3.appendChild(h5)
// card3.appendChild(div2)
// card3.appendChild(div3)
// card3.appendChild(div4)
// }
// function createFourData () {

// const card4= document.createElement('div')
//     card4.classList.add('col', '12', 'card-panel', 'pink', 'lighten-4')
    
//     weekCards.appendChild(card4)

    
// let h5 = document.createElement('h5')
// let div1 = document.createElement('div')
// let div2 = document.createElement('div')
// let div3 = document.createElement('div')
//     let div4 = document.createElement('div')

    
//     let dateStr = fourDate
//     let date =  dayjs(dateStr)
//     let dayOfWeek = date.format('dddd')

     
// h5.textContent = dayOfWeek
// div2.textContent = `Temp: ${fourTemp}`
// div3.textContent = `Wind: ${fourWind}`
// div4.textContent = `Humidity: ${fourHumid}`

// card4.appendChild(h5)
// card4.appendChild(div2)
// card4.appendChild(div3)
// card4.appendChild(div4)
// }
// function createFiveData () {
 
// const card5 = document.createElement('div')
//     card5.classList.add('col', '12', 'card-panel', 'pink', 'lighten-4')
    
//     weekCards.appendChild(card5)

    
// let h5 = document.createElement('h5')
// let div1 = document.createElement('div')
// let div2 = document.createElement('div')
// let div3 = document.createElement('div')
//     let div4 = document.createElement('div')

    
//     let dateStr = fiveDate
//     let date =  dayjs(dateStr)
//     let dayOfWeek = date.format('dddd')

     
// h5.textContent = dayOfWeek
// div2.textContent = `Temp: ${fiveTemp}`
// div3.textContent = `Wind: ${fiveWind}`
// div4.textContent = `Humidity: ${fiveHumid}`

// card5.appendChild(h5)
// card5.appendChild(div2)
// card5.appendChild(div3)
// card5.appendChild(div4)
// }


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
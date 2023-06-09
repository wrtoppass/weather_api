const API_KEY='6cd69b8ce54cc7a06d21d93812c656ec'


const api = API_KEY

const input = document.getElementById('locationInput')

const forecast = document.getElementById("infoForecast")

const high = document.getElementById("infoHigh")

const low = document.getElementById("infoLow")

const temp = document.getElementById("infoTemp")

const feels = document.getElementById("infoFeels")

const humidity = document.getElementById("infoHumidity")

const choice = document.getElementById('locationChoice')

const tempUnit = document.getElementById('tempUnit')

const header = document.getElementById('cityHeader')


async function apiWeatherCall(input, zipOrCity, unit) {
    let between = ""
    zipOrCity == "zip" ? between = `zip=${input},us` : between = `q=${input}`
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${between}&appid=${api}&units=${unit}`
    )
    if (res.ok) {
        const data = await res.json()
        return data
    }
}

console.log(apiWeatherCall('houston', 'city', 'standard'))
apiWeatherCall('houston', 'city', 'standard')


weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const data = await apiWeatherCall(input.value, choice.value, tempUnit.value)
    if (choice.value == 'zip') {
        fillData(data, input.value)
    } else {
        fillData(data)
    }
});

function fillData(data, zip=null) {
    const zipCode = zip ? `${zip} - ` : ''
    header.innerText = `${zipCode}${data.name}, ${data.sys.country}`
    forecast.innerText = data.weather[0].main
    high.innerText = `${Math.round(data.main.temp_max)}°`
    low.innerText = `${Math.round(data.main.temp_min)}°`
    temp.innerText = `${Math.round(data.main.temp)}°`
    feels.innerText = `${Math.round(data.main.feels_like)}°`
    humidity.innerText = `${Math.round(data.main.humidity)}%`
}
(async () => {
    const data = await apiWeatherCall("77082", "zip", "imperial");
    fillData(data);
  })();
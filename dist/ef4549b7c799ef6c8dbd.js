import './styles.css';
const HTML = document;
const FORM = HTML.getElementById("form");
const CITY = HTML.getElementById("city");
const RESULT = HTML.getElementById("result");

//import './styles.css';

async function getWeather(city) {
    RESULT.innerText = "LOADING...";
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + city + '?unitGroup=us&key=QCECY96CCHKCNCN5RP8VQBCEW&contentType=json');
    if (response.ok) {
        const weather = await response.json();
        console.log(weather.currentConditions.temp);
        RESULT.innerText = "Temp: " + weather.currentConditions.temp + "°F";
    }
    else {
        RESULT.innerText = "INVALID LOCATION";
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}

FORM.addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(FORM);
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject.city);
    let city = formObject.city;
    getWeather(city);
});

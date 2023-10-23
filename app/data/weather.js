const API_KEY = 'cc2955eaa05b2beceea27a0fc21f4767';
const LOCATION_ENDPOINT = 'http://api.openweathermap.org/geo/1.0/reverse';
const DATA_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall';

export const getWeatherData = async () => {

    try {
        const res = await fetch(`${DATA_ENDPOINT}?lat=40.730610&lon=-73.935242&units=imperial&exclude=alerts&appid=${API_KEY}`);

        if (!res.ok) {
            throw new Error(`API responded with status: ${res.status}`);
        }

        const weatherData = await res.json();
        return weatherData;

    } catch (err) {
        console.log(err);
    }

}

export const getLocationData = async () => {

    try {
        const res = await fetch(`${LOCATION_ENDPOINT}?lat=40.730610&lon=-73.935242&limit=5&appid=${API_KEY}`)

        if (!res.ok) {
            throw new Error(`API responded with status: ${res.status}`);
        }

        const locationData = await res.json();
        return locationData;

    } catch (err) {
        console.log(err)
    }
}
export const getWeatherData = async () => {
    const API_KEY = 'cc2955eaa05b2beceea27a0fc21f4767';
    const ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall';

    try {
        const res = await fetch(`${ENDPOINT}?lat=40.730610&lon=-73.935242&units=imperial&exclude=alerts&appid=${API_KEY}`);

        if (!res.ok) {
            throw new Error(`API responded with status: ${res.status}`);
        }

        const data = await res.json();
        return data;

    } catch (err) {
        console.error(err);
    }

}
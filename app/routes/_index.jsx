import { getLocationData, getWeatherData } from "../data/weather";
import usZips from 'us-zips'
import Widget from "../components/Widget";
import Search from "../components/Search";
import { json, redirect } from "@remix-run/node";

export const meta = () => {
    return [{ title: "Remix Weather App" }];
};

export const loader = async ({request}) => {
    const url = new URL(request.url);
    const error = url.searchParams.get('error');
    const lat = url.searchParams.get('lat') || '40.75080'
    const lon = url.searchParams.get('lon') || '-73.99612'

    if (error) {
        return {errorMessage: error}
    }
    
    const [locationData, weatherData] = await Promise.all([
        getLocationData(lat, lon),
        getWeatherData(lat, lon)
    ]);

    return {
        location: locationData[0],
        weatherData: weatherData
    }

}

export const action = async ({request}) => {
    const searchForm = await request.formData();
    const searchQuery = searchForm.get('search'); // zip code

    if (!usZips[searchQuery]) {
        return json({errorMessage: 'Invalid ZIP Code'})
    }

    const {latitude: lat, longitude: lon} = usZips[searchQuery]; // convert zip code to coordinates
    return redirect(`/?lat=${lat}&lon=${lon}`);
}

export default function Index() {

    return (
        <>
            <div class="mx-auto p-4 bg-gray-600 h-screen flex-col justify-center">
                <div class='mb-10'>
                    <h1 class='text-center text-white text-xl font-bold'>
                        Simple Weather Widget Built With Remix and Tailwind CSS
                    </h1>
                </div>
                <Search />
                <Widget />
            </div>
        </>
    );
}


/*
dayjs format:

MMM = Abbreviated month name
DD  = Day of the month, 2 digits
ddd = The short name of the day of the week
*/
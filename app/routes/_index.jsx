import { getLocationData, getWeatherData } from "../data/weather";
import usZips from 'us-zips'
import Widget from "../components/Widget";
import Search from "../components/Search";
import { redirect } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export const meta = () => {
    return [{ title: "Remix Weather App" }];
};

export const loader = async ({request}) => {
    const url = new URL(request.url);
    const lat = url.searchParams.get('lat') || '40.75080'
    const lon = url.searchParams.get('lon') || '-73.99612'

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


export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div>
              <h1>
                {error.status} {error.statusText}
              </h1>
              <p>{error.data}</p>
            </div>
          );
    } else {
        return <h1>Unknown Error</h1>;
      }
}

/*
dayjs format:

MMM = Abbreviated month name
DD  = Day of the month, 2 digits
ddd = The short name of the day of the week
*/
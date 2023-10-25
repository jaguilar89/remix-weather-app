import { getLocationData, getWeatherData } from "../data/weather";
import Widget from "../components/Widget";
import Search from "../components/Search";

export const meta = () => {
    return [{ title: "Remix Weather App" }];
};

export const loader = async () => {
    const [locationData, weatherData] = await Promise.all([
        getLocationData(),
        getWeatherData()
    ]);

    return {
        location: locationData[0],
        weatherData: weatherData
    }
}

export default function Index() {

    return (
        <>
            <div class="mx-auto p-4 bg-gray-600 h-screen flex-col justify-center">
                <div class='mb-10'>
                    <h1 class='text-center text-white text-xl font-bold'>
                        Weather Widget Built With Remix and Tailwind CSS
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
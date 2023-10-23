import { useLoaderData } from "@remix-run/react";
import { getLocationData, getWeatherData } from "../data/weather";
import dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat.js';

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
    const data = useLoaderData();
    console.log(data.weatherData.current.weather[0])
    const currentDate = new Date(data.weatherData.current.dt * 1000)
    dayjs.extend(LocalizedFormat);

  return (
    <>
    <div class="mx-auto p-4 bg-slate-300 h-screen flex justify-center">
    <div class="flex flex-wrap">
        <div class="w-full px-2">
            <div class="bg-gray-900 text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full bg-white dark:bg-gray-600">
                <div class="px-6 py-6 relative">
                    <div class="flex mb-4 justify-between items-center">
                        <div>
                            <h5 class="mb-0 font-medium text-xl">{`${data.location.local_names.en}, ${data.location.state}`}</h5>
                            <h6 class="mb-0">{dayjs(currentDate).format('LL')}</h6>
                            <small>{data.weatherData.current.weather[0].main}</small>
                            <p><small>{data.weatherData.current.weather[0].description}</small></p>
                        </div>
                        <div class="text-right">
                            <h3 class="font-bold text-4xl mb-0"><span>{Math.round(data.weatherData.current.temp)}&deg;</span></h3>
                        </div>
                    </div>
                    <div class="block sm:flex justify-between items-center flex-wrap">
                        <div class="w-full sm:w-1/2">
                            <div class="flex mb-2 justify-between items-center"><span>Temp</span><small class="px-2 inline-block">{Math.round(data.weatherData.current.temp)}&nbsp;&deg;</small></div>
                        </div>
                        <div class="w-full sm:w-1/2">
                            <div class="flex mb-2 justify-between items-center"><span>Feels like</span><small class="px-2 inline-block">{Math.round(data.weatherData.current.feels_like)}&nbsp;&deg;</small></div>
                        </div>
                        <div class="w-full sm:w-1/2">
                            <div class="flex mb-2 justify-between items-center"><span>Humidity</span><small class="px-2 inline-block">{Math.round(data.weatherData.current.humidity)} %</small></div>
                        </div>
                        <div class="w-full sm:w-1/2">
                            <div class="flex mb-2 justify-between items-center"><span>Dew Point</span><small class="px-2 inline-block">{Math.round(data.weatherData.current.dew_point)}&nbsp;&deg;</small></div>
                        </div>
                    </div>
                </div>
                <div class="divider table mx-2 text-center bg-transparent whitespace-nowrap"><span class="inline-block px-3"><small>Forecast</small></span></div>
                <div class="px-6 py-6 relative">
                    <div class="text-center justify-between items-center flex" style={{flexFlow: 'initial'}}>
                        <div class="text-center mb-0 flex items-center justify-center flex-col"><span class="block my-1">Sun</span><img src="https://i.imgur.com/ffgW9JQ.png" class="block w-8 h-8" /><span class="block my-1">38.3&deg;</span></div>
                        <div class="text-center mb-0 flex items-center justify-center flex-col"><span class="block my-1">Mon</span><img src="https://i.imgur.com/BQbzoKt.png" class="block w-8 h-8" /><span class="block my-1">39.9&deg;</span></div>
                        <div class="text-center mb-0 flex items-center justify-center flex-col"><span class="block my-1">Tue</span><img src="https://i.imgur.com/BQbzoKt.png" class="block w-8 h-8" /><span class="block my-1">40.1&deg;</span></div>
                        <div class="text-center mb-0 flex items-center justify-center flex-col"><span class="block my-1">Wed</span><img src="https://i.imgur.com/ffgW9JQ.png" class="block w-8 h-8" /><span class="block my-1">41.5&deg;</span></div>
                        <div class="text-center mb-0 flex items-center justify-center flex-col"><span class="block my-1">Thu</span><img src="https://i.imgur.com/ffgW9JQ.png" class="block w-8 h-8" /><span class="block my-1">40.1&deg;</span></div>
                        <div class="text-center mb-0 flex items-center justify-center flex-col"><span class="block my-1">Fri</span><img src="https://i.imgur.com/BQbzoKt.png" class="block w-8 h-8" /><span class="block my-1">38&deg;</span></div>
                        <div class="text-center mb-0 flex items-center justify-center flex-col"><span class="block my-1">Sat</span><img src="https://i.imgur.com/BQbzoKt.png" class="block w-8 h-8" /><span class="block my-1">38&deg;</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  );
}

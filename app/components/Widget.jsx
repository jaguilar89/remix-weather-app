import Forecast from "./Forecast"
import { useActionData, useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat.js';

export default function Widget() {
    const data = useLoaderData();
    const error = useActionData();
    const currentDate = new Date(data.weatherData.current.dt * 1000)
    dayjs.extend(LocalizedFormat);

    return (
        <>
            {error && (
                <div class="text-center text-orange-500 text-2xl">
                    <h1>
                    {error.errorMessage}
                    </h1>
                </div>
            )}
                <div class="flex flex-wrap justify-center">
                    <div class="px-2 max-w-2xl">
                        <div class="bg-gray-900 text-white relative min-w-0 break-words rounded-lg overflow-hidden mb-4 w-full bg-white dark:bg-gray-600">
                            <div class="px-6 py-6 relative">
                                <div class="flex mb-4 justify-between items-center">
                                    <div>
                                        <h5 class="mb-0 font-medium text-xl">{`${data.location.local_names?.en || 'Undefined Location'}, ${data.location.state}`}</h5>
                                        <h6 class="mb-0">{dayjs(currentDate).format('dddd LL')}</h6>
                                        <small>{data.weatherData.current.weather[0].main}</small>
                                    </div>
                                    <div class="text-right mt-2 mr-4">
                                        <div class='text-center'>
                                            <h3 class="font-bold text-4xl mb-0"><span>{Math.round(data.weatherData.current.temp)}&deg;</span>
                                                <img src={`https://openweathermap.org/img/wn/${data.weatherData.current.weather[0].icon}.png`} class='inline-block pl-3'/>
                                            </h3>
                                            <p class='text-left'><small>{data.weatherData.current.weather[0].description}</small></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="block sm:flex justify-between items-center flex-wrap pt-5">
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
                            <div class="divider table mx-2 text-center bg-transparent whitespace-nowrap"><span class="inline-block px-3"><h6>7 Day Forecast</h6></span></div>

                            <Forecast data={data} />

                        </div>
                    </div>
                </div>
        </>
    )
}

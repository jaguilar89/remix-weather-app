import dayjs from "dayjs"

export default function Forecast({ data }) {
    const days = data.weatherData.daily.map((day, index) => {
        if (index === 0) return null // start at index 1 to exclude the current day
        
        return (
            <div key={day.dt} class="text-center mb-0 flex items-center justify-center flex-col">
                <span class="block my-1">{dayjs(day.dt * 1000).format('ddd')}</span>
                <span class="block my-1">{dayjs(day.dt * 1000).format('MMM DD')}</span>
                <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} class="block w-8 h-8" />
                <span class="block my-1">{Math.round(day.temp.day)}&deg;</span>
            </div>
        )
    })

    return (
        <div class="px-6 py-6 relative">
                    <div class="text-center justify-between items-center flex space-x-10" style={{flexFlow: 'initial'}}>
                        
                        {days}

                    </div>
        </div>
    )
}


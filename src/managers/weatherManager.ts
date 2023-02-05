import { weatherRequestApi, weatherResponseApi, weatherTypeDto } from '../contracts/weather';
import weatherModule from '../modules/services/weatherModule';

class WeatherManager {
    public async getWeather(city: string, units: string = 'celcius', days: number = 7, lang: string = 'fr'): Promise<weatherTypeDto> {
        const weatherData = await weatherModule.forecastWeather({ city, units, days, lang  });
        const formatData = (x: weatherResponseApi): weatherTypeDto => {
            return {
                cod: x.cod,
                city: x.city.name,
                cityId: x.city.id,
                country: x.city.country,
                icon: x.list[0].weather[0].icon,
                description: x.list[0].weather[0].description,
                temp: Math.round(x.list[0].main.temp),
                minTemp: Math.round(x.list[0].main.temp_min),
                maxTemp: Math.round(x.list[0].main.temp_max),
                humidity: x.list[0].main.humidity,
                speed: x.list[0].wind.speed,
                sunrise: x.city.sunrise,
                sunset: x.city.sunset,
                forecastWeather: x.list.map((y) => {
                    return {
                        date: y.dt,
                        icon: y.weather[0].icon,
                        temp: Math.round(y.main.temp),
                    };
                }),
            };
        };
        return formatData(weatherData);
    }
}

export default new WeatherManager();

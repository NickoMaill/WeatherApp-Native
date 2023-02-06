import { Latitude } from '~/components/common/SearchBar';
import { weatherRequestApi, weatherForecastResponseApi, weatherTypeDto, WeatherCurrentResponseApi } from '~/contracts/weather';
import weatherModule from '~/modules/services/weatherModule';

class WeatherManager {
    public async getWeatherByCity(city: string, units: string = 'celcius', days: number = 7, lang: string = 'fr'): Promise<weatherTypeDto> {
        const weatherData = await weatherModule.forecastWeather({ city, units, days, lang });
        return this.formatForecastData(weatherData);
    }

    public async getWeatherByCityId(cityId: number) {
        const weatherData = await weatherModule.getWeatherByCityId(cityId);
        return this.formatForecastData(weatherData);
    }

    public async getWeatherByCoordinatePoint(coordinate: Latitude) {
        const weatherData = await weatherModule.getWeatherByCoordinate(coordinate);
        return this.formatForecastData(weatherData);
    }
    
    public async getCurrentWeatherByCoordinate(coordinate: Latitude) {
        const weatherData = await weatherModule.getCurrentWeatherByCoordinate(coordinate)
        return this.formatCurrentData(weatherData);
    }
    
    public async getCurrentWeatherByCityId(cityId: number) {
        const weatherData = await weatherModule.getCurrentWeatherByCityId(cityId)
        return this.formatCurrentData(weatherData);
    }

    private formatForecastData(x: weatherForecastResponseApi): weatherTypeDto {
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
    }

    private formatCurrentData(x: WeatherCurrentResponseApi): weatherTypeDto {
        return {
            cod: String(x.cod),
            city: x.name,
            cityId: x.id,
            country: x.sys.country,
            icon: x.weather[0].icon,
            description: x.weather[0].description,
            temp: Math.round(x.main.temp),
            minTemp: Math.round(x.main.temp_min),
            maxTemp: Math.round(x.main.temp_max),
            humidity: x.main.humidity,
            speed: x.wind.speed,
            sunrise: x.sys.sunrise,
            sunset: x.sys.sunset,
        }
    }
}

export default new WeatherManager();

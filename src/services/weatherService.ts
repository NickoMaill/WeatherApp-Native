import { Latitude } from '~/components/common/SearchBar';
import apiManager from '~/managers/apiManager';
import { weatherRequestApi, weatherForecastResponseApi, WeatherCurrentResponseApi, WeatherTypeDto, ForecastWeatherDto, FavoriteWeatherDto } from '~/types/weather';
import configManager from '~/managers/configManager';
import ServiceBase from './serviceBase';

export type WeatherParams = {
    coordinate?: Latitude;
    lang?: 'en' | 'fr';
    units?: 'metric' | 'imperial';
    cityId?: number;
    cityName?: string;
};

class WeatherService extends ServiceBase {
    public async getWeatherByCoordinate(lon: number, lat: number, units: 'metric' | 'imperial' = 'metric'): Promise<ForecastWeatherDto[]> {
        const data = await apiManager.get<weatherForecastResponseApi>('weather', `forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${configManager.getConfig.WEATHER_API_KEY}`);
        return this.formatForecastData(data);
    }

    public async getWeatherByCityId(cityId: number, units: 'metric' | 'imperial' = 'metric', lang: 'en' | 'fr' = 'fr'): Promise<ForecastWeatherDto[]> {
        const params: WeatherParams = {
            cityId,
            lang,
            units,
        };

        const data = await apiManager.get<weatherForecastResponseApi>(
            'weather',
            `forecast?id=${params.cityId}&units=${params.units}&lang=${params.lang}&appid=${configManager.getConfig.WEATHER_API_KEY}`
        );
        return this.formatForecastData(data);
    }

    public async getCurrentWeatherByCoordinate(lon: number, lat: number, units: 'metric' | 'imperial' = 'metric', lang: 'en' | 'fr' = 'fr'): Promise<WeatherTypeDto> {
        const data = await apiManager.get<WeatherCurrentResponseApi>(
            'weather',
            `weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${configManager.getConfig.WEATHER_API_KEY}`
        );
        return this.formatCurrentData(data);
    }

    public async getCurrentWeatherByCityId(cityId: number, units: 'metric' | 'imperial' = 'metric', lang: 'en' | 'fr' = 'fr'): Promise<WeatherTypeDto> {
        const data = await this.asServicePromise<WeatherCurrentResponseApi>(apiManager.get<WeatherCurrentResponseApi>(
            'weather',
            `weather?id=${cityId}&units=${units}&lang=${lang}&appid=${configManager.getConfig.WEATHER_API_KEY}`
        ));

        return this.formatCurrentData(data);
    }

    public async getFavoriteCurrentWeatherByCityId(cityId: number, units: 'metric' | 'imperial' = 'metric', lang: 'en' | 'fr' = 'fr'): Promise<FavoriteWeatherDto> {
        const favorite = await apiManager.get<WeatherCurrentResponseApi>(
            'weather',
            `weather?id=${cityId}&units=${units}&lang=${lang}&appid=${configManager.getConfig.WEATHER_API_KEY}`
        );
        return this.formatCurrentFavoriteData(favorite);
    }

    private formatForecastData(x: weatherForecastResponseApi): ForecastWeatherDto[] {
        return x.list.map((y) => {
            return {
                date: y.dt,
                icon: y.weather[0].icon,
                temp: Math.round(y.main.temp),
            };
        });
    }

    private formatCurrentFavoriteData(x: WeatherCurrentResponseApi): FavoriteWeatherDto {
        return {
            city: x.name,
            country: x.sys.country,
            temp: Math.round(x.main.temp),
            icon: x.weather[0].icon,
            description: x.weather[0].description,
        };
    }

    private formatCurrentData(x: WeatherCurrentResponseApi): WeatherTypeDto {
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
        };
    }
}

export default new WeatherService();

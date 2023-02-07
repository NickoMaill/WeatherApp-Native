import { Latitude } from '~/components/common/SearchBar';
import apiManager from '~/managers/apiManager';
import { weatherRequestApi, weatherForecastResponseApi, WeatherCurrentResponseApi } from '~/contracts/weather';
import configManager from '~/managers/configManager';

export type WeatherParams = {
    coordinate?: Latitude,
    lang?: 'en' | 'fr',
    units?: 'metric' | 'imperial'
    cityId?: number,
    cityName?: string,
}

class WeatherModule {
    public async forecastWeather(weatherObj: weatherRequestApi): Promise<weatherForecastResponseApi> {
        const data = await apiManager.get<weatherForecastResponseApi>('weather', `forecast?q=${weatherObj.city}&appid=${configManager.getConfig.WEATHER_API_KEY}`);
        return data;
    }

    public async getWeatherByCoordinate(coordinate: Latitude): Promise<weatherForecastResponseApi> {
        const data = await apiManager.get<weatherForecastResponseApi>('weather', `forecast?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${configManager.getConfig.WEATHER_API_KEY}`);
        return data;
    }

    public async getWeatherByCityId(params: WeatherParams): Promise<weatherForecastResponseApi> {
        const data = await apiManager.get<weatherForecastResponseApi>('weather', `forecast?id=${params.cityId}&units=${params.units}&lang=${params.lang}&appid=${configManager.getConfig.WEATHER_API_KEY}`);
        return data;
    }

    public async getCurrentWeatherByCoordinate(params: WeatherParams): Promise<WeatherCurrentResponseApi> {
        const data = await apiManager.get<WeatherCurrentResponseApi>('weather', `weather?lat=${params.coordinate.lat}&lon=${params.coordinate.lon}&units=${params.units}&lang=${params.lang}&appid=${configManager.getConfig.WEATHER_API_KEY}`);
        return data;
    }

    public async getCurrentWeatherByCityId(params: WeatherParams): Promise<WeatherCurrentResponseApi> {
        const data = await apiManager.get<WeatherCurrentResponseApi>('weather', `weather?id=${params.cityId}&units=${params.units}&lang=${params.lang}&appid=${configManager.getConfig.WEATHER_API_KEY}`);
        return data;
    }
}

export default new WeatherModule();

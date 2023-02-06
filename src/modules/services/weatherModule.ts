import { Latitude } from '~/components/common/SearchBar';
import apiManager from '~/managers/apiManager';
import { weatherRequestApi, weatherForecastResponseApi, WeatherCurrentResponseApi } from '~/contracts/weather';
import configManager from '~/managers/configManager';

class WeatherModule {
    public async forecastWeather(weatherObj: weatherRequestApi): Promise<weatherForecastResponseApi> {
        const data = await apiManager.get<weatherForecastResponseApi>('weather', `forecast?q=${weatherObj.city}&appid=${configManager.getConfig.WEATHER_API_KEY}`);
        return data;
    }

    public async getWeatherByCoordinate(coordinate: Latitude): Promise<weatherForecastResponseApi> {
        const data = await apiManager.get<weatherForecastResponseApi>('weather', `forecast?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${configManager.getConfig.WEATHER_API_KEY}`);
        return data;
    }

    public async getWeatherByCityId(cityId: number): Promise<weatherForecastResponseApi> {
        const data = await apiManager.get<weatherForecastResponseApi>('weather', `forecast?id=${cityId}&appid=${configManager.getConfig.WEATHER_API_KEY}`);
        return data;
    }

    public async getCurrentWeatherByCoordinate(coordinate: Latitude): Promise<WeatherCurrentResponseApi> {
        const data = await apiManager.get<WeatherCurrentResponseApi>('weather', `weather?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${configManager.getConfig.WEATHER_API_KEY}`);
        return data;
    }

    public async getCurrentWeatherByCityId(cityId: number): Promise<WeatherCurrentResponseApi> {
        const data = await apiManager.get<WeatherCurrentResponseApi>('weather', `weather?id=${cityId}&appid=${configManager.getConfig.WEATHER_API_KEY}`);
        console.log(data);
        return data;
    }
}

export default new WeatherModule();

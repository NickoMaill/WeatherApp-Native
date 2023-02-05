import { weatherRequestApi, weatherResponseApi } from '../../contracts/weather';
import configManager from '../../managers/configManager';

class WeatherModule {
    public async forecastWeather(weatherObj: weatherRequestApi): Promise<weatherResponseApi> {
        const url = `${configManager.getConfig.WEATHER_API_BASE_URL}/forecast?q=${weatherObj.city}&appid=${configManager.getConfig.WEATHER_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
}

export default new WeatherModule();

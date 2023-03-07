import { IConfigEnv } from '../types/config';
import { Dimensions, Platform } from 'react-native';
import { REACT_APP_WEATHER_API_BASE_URL, REACT_APP_WEATHER_API_KEY, NODE_ENV, REACT_APP_MAPBOX_BASE_URL, REACT_APP_MAPBOX_API_KEY } from '@env';

const { width, height } = Dimensions.get('screen');
class ConfigManager {
    public readonly __env: IConfigEnv;

    public get getConfig() {
        return {
            NODE_ENV,
            MAPBOX_API_KEY: REACT_APP_MAPBOX_API_KEY,
            MAPBOX_BASE_URL: REACT_APP_MAPBOX_BASE_URL,
            WEATHER_API_BASE_URL: REACT_APP_WEATHER_API_BASE_URL,
            WEATHER_API_KEY: REACT_APP_WEATHER_API_KEY,
        };
    }

    public configEnvFile(): string | undefined {
        if (this.__env.NODE_ENV === 'development') {
            return '.env.development.local';
        }

        if (this.__env.NODE_ENV === 'production') {
            return '.env';
        }
    }

    public get deviceInfo() {
        return {
            width,
            height,
            os: Platform.OS,
            version: Platform.Version,
        };
    }

    public get dimension() {
        return {
            width,
            height,
        };
    }

    public isAndroid() {
        return this.deviceInfo.os === 'android';
    }

    public isIos() {
        return this.deviceInfo.os === 'ios';
    }
}

export default new ConfigManager();

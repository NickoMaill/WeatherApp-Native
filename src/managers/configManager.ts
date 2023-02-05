import { IConfigEnv } from '../contracts/config';
import { WEATHER_API_BASE_URL, WEATHER_API_KEY, NODE_ENV } from '@env';

class ConfigManager {
    public readonly __env: IConfigEnv;
    constructor() {
        // this.__env = {
        //     NODE_ENV,
        //     WEATHER_API_BASE_URL,
        //     WEATHER_API_KEY,
        // };
    }

    public get getConfig() {
        return {
            WEATHER_API_BASE_URL: WEATHER_API_BASE_URL,
            WEATHER_API_KEY: WEATHER_API_KEY,
            NODE_ENV: NODE_ENV,
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
}

export default new ConfigManager();

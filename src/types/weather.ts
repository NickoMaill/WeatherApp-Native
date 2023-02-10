export type weatherRequestApi = {
    city?: string;
    units?: string | 'celsius' | 'metric';
    days?: number;
    lang?:
        | string
        | 'fr'
        | 'eng'
        | 'af'
        | 'al'
        | 'ar'
        | 'az'
        | 'bg'
        | 'ca'
        | 'cz'
        | 'da'
        | 'de'
        | 'el'
        | 'en'
        | 'eu'
        | 'fa'
        | 'fi'
        | 'fr'
        | 'gl'
        | 'he'
        | 'hi'
        | 'hr'
        | 'hu'
        | 'id'
        | 'it'
        | 'ja'
        | 'kr'
        | 'la'
        | 'lt'
        | 'mk'
        | 'no'
        | 'nl'
        | 'pl'
        | 'pt'
        | 'pt_br'
        | 'ro'
        | 'ru'
        | 'sv'
        | 'sk'
        | 'sl'
        | 'sp'
        | 'sr'
        | 'th'
        | 'tr'
        | 'ua'
        | 'vi'
        | 'zh_cn'
        | 'zh_tw'
        | 'zu';
};

export type weatherForecastResponseApi = {
    cod: string;
    message: number;
    cnt: number;
    list: ListResponseApi[];
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
};

export type ListResponseApi = {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };
    weather: weatherDetailsApi[];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
        pod: string;
    };
    dt_txt: Date;
};

type weatherDetailsApi = {
    id: number;
    main: string;
    description: string;
    icon: string;
};

export type WeatherCurrentResponseApi = {
    coord: {
        lon: number;
        lat: number;
    };
    weather: weatherDetailsApi[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
};

export type WeatherTypeDto = {
    cod: string;
    city: string;
    country: string;
    icon: string;
    description: string;
    temp: number;
    minTemp: number;
    maxTemp: number;
    humidity: number;
    sunrise: number;
    sunset: number;
    speed: number;
    cityId: number;
    forecastWeather?: ForecastWeatherDto[];
};

export type ForecastWeatherDto = {
    date: number;
    icon: string;
    temp: number;
};

export interface IWeatherData {
    cod: string;
    city: string;
    country: string;
    icon: string;
    description: string;
    temp: number;
    minTemp: number;
    maxTemp: number;
    humidity: number;
    speed: number;
    forecastWeather: ForecastWeatherDto[];
}

export type FavoriteWeatherDto = {
    city: string;
    country: string;
    temp: number;
    icon: string
    description: string;
}
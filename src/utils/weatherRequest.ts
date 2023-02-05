// import { REACT_APP_API_KEY2, REACT_APP_API_KEY } from '@env';

export const getWeather = async (city, units) => {
    if (!city) {
        city = 'paris';
    }

    if (!units) {
        units = 'metric';
    }

    const { REACT_APP_API_KEY2, REACT_APP_API_KEY } = process.env;

    const fetchUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${REACT_APP_API_KEY2}&lang=fr&units=${units}`;

    return fetch(fetchUrl).then((res) => res.json());
};

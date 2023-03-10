export enum WeatherCodeEnum {
    SUN = '01d',
    NIGHT_SUN = '01n',
    CLOUDY = '02d',
    NIGHT_CLOUDY = '02n',
    CLOUDS = '03d',
    NIGHT_CLOUDS = '03n',
    BROKEN_CLOUDS = '04d',
    NIGHT_BROKEN_CLOUDS = '04n',
    RAINY = '09d',
    NIGHT_RAINY = '09n',
    RAIN = '10d',
    NIGHT_RAIN = '10n',
    THUNDER = '11d',
    NIGHT_THUNDER = '11n',
    SNOW = '13d',
    NIGHT_SNOW = '13n',
    MIST = '50d',
    NIGHT_MIST = '50n',
}

export enum DefaultScreenEnum {
    BLACK_SCREEN = '99b',
    WHITE_SCREEN = '99w',
}
class assetsWeatherManager {
    public displayIcon(picCode: string) {
        switch (picCode) {
            case WeatherCodeEnum.SUN:
                return require('../assets/icons/sun.png');
            case WeatherCodeEnum.NIGHT_SUN:
                return require('../assets/icons/moon.png');
            case WeatherCodeEnum.CLOUDY:
                return require('../assets/icons/cloudy.png');
            case WeatherCodeEnum.NIGHT_CLOUDY:
                return require('../assets/icons/moon.png');
            case WeatherCodeEnum.CLOUDS:
                return require('../assets/icons/cloudy.png');
            case WeatherCodeEnum.NIGHT_CLOUDS:
                return require('../assets/icons/cloud.png');
            case WeatherCodeEnum.BROKEN_CLOUDS:
                return require('../assets/icons/cloud.png');
            case WeatherCodeEnum.NIGHT_BROKEN_CLOUDS:
                return require('../assets/icons/moon.png');
            case WeatherCodeEnum.RAINY:
                return require('../assets/icons/raining.png');
            case WeatherCodeEnum.NIGHT_RAINY:
                return require('../assets/icons/raining.png');
            case WeatherCodeEnum.RAIN:
                return require('../assets/icons/raining.png');
            case WeatherCodeEnum.NIGHT_RAIN:
                return require('../assets/icons/raining.png');
            case WeatherCodeEnum.THUNDER:
                return require('../assets/icons/storm.png');
            case WeatherCodeEnum.NIGHT_THUNDER:
                return require('../assets/icons/storm.png');
            case WeatherCodeEnum.SNOW:
                return require('../assets/icons/snow.png');
            case WeatherCodeEnum.NIGHT_SNOW:
                return require('../assets/icons/snow.png');
            case WeatherCodeEnum.MIST:
                return require('../assets/icons/mist.png');
            case WeatherCodeEnum.NIGHT_MIST:
                return require('../assets/icons/mist.png');
            default:
                return require('../assets/icons/mist.png');
        }
    }

    public displayBackground(picCode: string) {
        switch (picCode) {
            case WeatherCodeEnum.SUN:
                return require('../assets/pictures/sun.jpg');
            case WeatherCodeEnum.NIGHT_SUN:
                return require('../assets/pictures/sun-night.jpeg');
            case WeatherCodeEnum.CLOUDY:
                return require('../assets/pictures/cloudy.jpg');
            case WeatherCodeEnum.NIGHT_CLOUDY:
                return require('../assets/pictures/moon-and-clouds.jpg');
            case WeatherCodeEnum.CLOUDS:
                return require('../assets/pictures/cloudy.jpg');
            case WeatherCodeEnum.NIGHT_CLOUDS:
                return require('../assets/pictures/moon-and-clouds.jpg');
            case WeatherCodeEnum.BROKEN_CLOUDS:
                return require('../assets/pictures/clouds.jpeg');
            case WeatherCodeEnum.NIGHT_BROKEN_CLOUDS:
                return require('../assets/pictures/moon-and-clouds.jpg');
            case WeatherCodeEnum.RAINY:
                return require('../assets/pictures/rain-day.jpg');
            case WeatherCodeEnum.NIGHT_RAINY:
                return require('../assets/pictures/rain-night.jpg');
            case WeatherCodeEnum.RAIN:
                return require('../assets/pictures/rain-day.jpg');
            case WeatherCodeEnum.NIGHT_RAIN:
                return require('../assets/pictures/rain-night.jpg');
            case WeatherCodeEnum.THUNDER:
                return require('../assets/pictures/thunder-and-lightning.jpg');
            case WeatherCodeEnum.NIGHT_THUNDER:
                return require('../assets/pictures/thunder-and-lightning.jpg');
            case WeatherCodeEnum.SNOW:
                return require('../assets/pictures/snow-day.jpg');
            case WeatherCodeEnum.NIGHT_SNOW:
                return require('../assets/pictures/snow-day.jpg');
            case WeatherCodeEnum.MIST:
                return require('../assets/icons/mist.png');
            case WeatherCodeEnum.NIGHT_MIST:
                return require('../assets/icons/mist.png');
            case DefaultScreenEnum.BLACK_SCREEN:
                return require('../assets/pictures/blackScreen.jpg');
            case DefaultScreenEnum.WHITE_SCREEN:
                return require('../assets/pictures/whiteScreen.jpeg');
            default:
                return require('../assets/icons/mist.png');
        }
    }
}

export default new assetsWeatherManager();

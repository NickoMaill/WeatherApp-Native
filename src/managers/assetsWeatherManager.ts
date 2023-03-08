class assetsWeatherManager {
    public displayIcon(picCode: string) {
        switch (picCode) {
            case '01d':
                return require('../assets/icons/sun.png');
            case '01n':
                return require('../assets/icons/moon.png');
            case '02d':
                return require('../assets/icons/cloudy.png');
            case '02n':
                return require('../assets/icons/moon.png');
            case '03d':
                return require('../assets/icons/cloudy.png');
            case '03n':
                return require('../assets/icons/cloud.png');
            case '04d':
                return require('../assets/icons/cloud.png');
            case '04n':
                return require('../assets/icons/moon.png');
            case '09d':
                return require('../assets/icons/raining.png');
            case '09n':
                return require('../assets/icons/raining.png');
            case '10d':
                return require('../assets/icons/raining.png');
            case '10n':
                return require('../assets/icons/raining.png');
            case '11d':
                return require('../assets/icons/storm.png');
            case '11n':
                return require('../assets/icons/storm.png');
            case '13d':
                return require('../assets/icons/snow.png');
            case '13n':
                return require('../assets/icons/snow.png');
            case '50d':
                return require('../assets/icons/mist.png');
            case '50n':
                return require('../assets/icons/mist.png');
            default:
                return require('../assets/icons/mist.png');
        }
    }

    public displayBackground(picCode: string) {
        switch (picCode) {
            case '01d':
                return require('../assets/pictures/sun.jpg');
            case '01n':
                return require('../assets/pictures/sun-night.jpeg');
            case '02d':
                return require('../assets/pictures/cloudy.jpg');
            case '02n':
                return require('../assets/pictures/moon-and-clouds.jpg');
            case '03d':
                return require('../assets/pictures/cloudy.jpg');
            case '03n':
                return require('../assets/pictures/moon-and-clouds.jpg');
            case '04d':
                return require('../assets/pictures/clouds.jpeg');
            case '04n':
                return require('../assets/pictures/moon-and-clouds.jpg');
            case '09d':
                return require('../assets/pictures/rain-day.jpg');
            case '09n':
                return require('../assets/pictures/rain-night.jpg');
            case '10d':
                return require('../assets/pictures/rain-day.jpg');
            case '10n':
                return require('../assets/pictures/rain-night.jpg');
            case '11d':
                return require('../assets/pictures/thunder-and-lightning.jpg');
            case '11n':
                return require('../assets/pictures/thunder-and-lightning.jpg');
            case '13d':
                return require('../assets/pictures/snow-day.jpg');
            case '13n':
                return require('../assets/pictures/snow-day.jpg');
            case '50d':
                return require('../assets/icons/mist.png');
            case '50n':
                return require('../assets/icons/mist.png');
            case '99b':
                return require('../assets/pictures/blackScreen.jpg');
            case '99w':
                return require('../assets/pictures/whiteScreen.jpeg');
            default:
                return require('../assets/icons/mist.png');
        }
    }
}

export default new assetsWeatherManager();

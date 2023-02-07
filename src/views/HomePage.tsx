import React, { useContext, useEffect, useState } from 'react';
import weatherManager from '~/managers/weatherManager';
import useStorage from '~/hooks/useStorage';
import Loader from '~/components/common/Loader';
import { weatherTypeDto } from '~/contracts/weather';
import { WeatherContext } from '~/context/Context';
import { BackHandler, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WeatherParams } from '~/modules/services/weatherModule';
import SearchBar, { Latitude } from '~/components/common/SearchBar';
import useNotification from '~/hooks/useNotification';
import GestureRecognizer from 'react-native-swipe-gestures';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainWeather from '~/components/home/MainWeather';
import WeatherDetails from '~/components/home/WeatherDetails';
import ForecastWeather from '~/components/home/ForecastWeather';
import Sunrise from '~/components/home/Sunrise';

export default function HomePage() {
    const Storage = useStorage();
    const Navigation = useNavigation();
    const Notification = useNotification();
    const Context = useContext(WeatherContext);
    const [data, setData] = useState<weatherTypeDto | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [units, setUnits] = useState<boolean>(true);
    const [isFavorites, setIsFavorites] = useState(false);
    const [search, setSearch] = useState<string>('');
    const [isRefresh, setIsRefresh] = useState<boolean>(false);

    BackHandler.addEventListener('hardwareBackPress', () => {
        preventBackTooForward();
        return true;
    });

    const preventBackTooForward = () => {
        if (Navigation.getState().index === 1) {
            BackHandler.exitApp();
        }
        return true;
    };

    const preventNonConfiguredApp = async () => {
        const isConfigured = Storage.isConfigured();

        if (!isConfigured) {
            Navigation.navigate('Hello');
        }
    };

    const onMetricChange = () => {
        setUnits(!units);
    };

    const onFavoriteChange = () => {
        setIsFavorites(!isFavorites);
    };

    const refreshCurrentWeather = async () => {
        const favorites = await Storage.getFavorite();
        const params: WeatherParams = {
            cityId: favorites[0],
            units: units ? 'metric' : 'imperial',
        };
        const weather = await weatherManager.getCurrentWeatherByCityId(params.cityId, params.units);
        setData(weather);
    };

    const getDefaultWeather = async () => {
        setIsLoading(true);
        const defaultWeather = await Storage.getFavorite();

        const weather = await weatherManager.getCurrentWeatherByCityId(defaultWeather[0]);
        setData(weather);
        Context.setBackgroundImage(weather.icon);
    };

    const onSearch = async (coor: Latitude, units: boolean) => {
        if (!coor) {
            Notification.displayWarning('Aucune ville sélectionnée', 'Vous devez choisir une ville pour pouvoir afficher sa météo');
            return;
        }

        setIsLoading(true);

        const params: WeatherParams = {
            coordinate: coor,
            units: units ? 'metric' : 'imperial',
        };

        await weatherManager
            .getCurrentWeatherByCoordinate(params.coordinate, params.units)
            .then((res) => setData(res))
            .finally(() => setIsLoading(false));
    };

    const onSwipe = (gestureName: string) => {
        // const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case 'SWIPE_LEFT':
                Navigation.navigate('Setup');
                break;
            case 'SWIPE_RIGHT':
                Navigation.navigate('Favorites');
            default:
                break;
        }
    };

    useEffect(() => {
        preventNonConfiguredApp();
        getDefaultWeather().finally(() => setIsLoading(false));
    }, []);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <GestureRecognizer style={{ flex: 1 }} onSwipe={(gestureName) => onSwipe(gestureName)}>
                    <SafeAreaView style={styles.body}>
                        <View>
                            <SearchBar value={search} onPress={(coor) => onSearch(coor, units)} onChange={(text: string) => setSearch(text)} />
                            <View>
                                <MainWeather data={data} valueMetric={units} onChangeMetric={onMetricChange} valueFavorites={isFavorites} onChangeFavorites={onFavoriteChange} />
                                <WeatherDetails data={data} />
                                <ForecastWeather cityId={data.cityId} units={units ? 'metric' : 'imperial'} isRefresh={isRefresh} />
                                <Sunrise data={data} />
                            </View>
                        </View>
                    </SafeAreaView>
                </GestureRecognizer>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        marginHorizontal: 10,
    },
    imageStyle: {
        // padding: 10,
        margin: 5,
        height: 15,
        width: 15,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    centerItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionStyle: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#000',
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 50,
        margin: 10,
    },
    inputSearch: {
        flex: 1,
    },
    mainView: {
        marginTop: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

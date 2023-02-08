import React, { useContext, useEffect, useState } from 'react';
import useStorage from '~/hooks/useStorage';
import Loader from '~/components/common/Loader';
import { ForecastWeatherDto, WeatherTypeDto } from '~/contracts/weather';
import { WeatherContext } from '~/context/Context';
import { BackHandler, StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import weatherService from '~/services/weatherService';
import SearchBar, { Latitude } from '~/components/common/SearchBar';
import useNotification from '~/hooks/useNotification';
import GestureRecognizer from 'react-native-swipe-gestures';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainWeather from '~/components/home/MainWeather';
import WeatherDetails from '~/components/home/WeatherDetails';
import ForecastWeather from '~/components/home/ForecastWeather';
import Sunrise from '~/components/home/Sunrise';
import { IHomeProps } from '~/core/router/routerType';

export default function HomePage({ navigation, route }: IHomeProps) {
    const Storage = useStorage();
    const Navigation = useNavigation();
    const Notification = useNotification();
    const Context = useContext(WeatherContext);
    const [data, setData] = useState<WeatherTypeDto | null>(null);
    const [forecastData, setForecastData] = useState<ForecastWeatherDto[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [units, setUnits] = useState<boolean>(true);
    const [isFavorites, setIsFavorites] = useState(false);
    const [search, setSearch] = useState<string>('');

    BackHandler.addEventListener('hardwareBackPress', () => {
        preventBackTooForward();
        return true;
    });

    navigation.addListener('focus', () => {
        if(!isLoading && data) {
            setIsFavorites(!checkIfFavorite(data.cityId))
        }
    })

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

    const onFavoriteChange = (bool: boolean) => {
        setIsFavorites(!isFavorites);
        if (bool) {
            addToFavorite(data.cityId);
        }

        if (!bool) {
            deleteFavorite(data.cityId);
        }
    };

    const refreshCurrentWeather = async () => {
        setIsLoading(true);
        const chooseUnit = units ? 'metric' : 'imperial';

        const weather = await weatherService.getCurrentWeatherByCityId(data.cityId, chooseUnit);
        const forecast = await weatherService.getWeatherByCityId(data.cityId, chooseUnit);
        setForecastData(forecast)
        setData(weather);
    };

    const getDefaultWeather = async () => {
        setIsLoading(true);
        const defaultWeather = await Storage.getDefaultCity();
        console.log(typeof defaultWeather)

        if (!defaultWeather) {
            await Storage.setAppConfigured(false);
            Navigation.navigate('Hello');
            Context.setBackgroundImage('');
            return;
        }

        await weatherService.getCurrentWeatherByCityId(defaultWeather).then((res) => {
            setData(res);
            checkIfFavorite(res.cityId)
            Context.setBackgroundImage(res.icon);
        });
        await weatherService.getWeatherByCityId(defaultWeather).then((res) => setForecastData(res));
    };

    const onSearch = async (coor: Latitude, units: boolean) => {
        if (!coor) {
            Notification.displayWarning('Aucune ville sélectionnée', 'Vous devez choisir une ville pour pouvoir afficher sa météo');
            return;
        }

        setIsLoading(true);

        const chooseUnits =  units ? 'metric' : 'imperial';
        await weatherService.getCurrentWeatherByCoordinate(coor.lon, coor.lat, chooseUnits).then((res) => {
            setData(res)
            checkIfFavorite(res.cityId);
        });
        await weatherService.getWeatherByCoordinate(coor.lon, coor.lat, chooseUnits).then((res) =>setForecastData(res));
    };

    const onSelectedFavorite = async (cityId: number) => {
        setIsLoading(true);
        const chooseUnits =  units ? 'metric' : 'imperial';
        await weatherService.getCurrentWeatherByCityId(cityId, chooseUnits).then((res) => {
            setData(res)
            checkIfFavorite(res.cityId);
        });
        await weatherService.getWeatherByCityId(cityId, chooseUnits).then((res) =>setForecastData(res));
    }

    const checkIfFavorite = async (cityId: number) => {
        const favorite = await Storage.getFavorite();

        if (favorite.length === 0) {
            setIsFavorites(false);
            return false;
        }

        const index = favorite.indexOf(cityId);

        if (index < 0) {
            setIsFavorites(false)
            return false
        } else {
            setIsFavorites(true);
            return true
        }
    }

    const addToFavorite = async (cityId: number) => {
        const favoriteArray = await Storage.getFavorite();
        const isFavorite = favoriteArray.includes(cityId);

        if (isFavorite) {
            return;
        }

        favoriteArray.push(cityId);
        setIsFavorites(true);
        await Storage.addToFavorite(favoriteArray).then(() => Notification.displaySuccess('Favori ajouté !', `vous avez ajouté ${data.city} a vos favoris, consultez sa météo a tout moment`))

    }

    const deleteFavorite = async (cityId: number) => {
        const favoriteArray = await Storage.getFavorite();
        const isFavorite = favoriteArray.includes(cityId);

        if (!isFavorite) {
            return;
        }

        await Storage.removeFavorite(favoriteArray, cityId).then(() => Notification.displayInfo('Favori supprimé !', `vous avez supprimé ${data.city}`))
        setIsFavorites(false); 
    }

    const onSwipe = (gestureName: string) => {
        // const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case 'SWIPE_RIGHT':
                Navigation.navigate('Setup');
                break;
            case 'SWIPE_LEFT':
                Navigation.navigate('Favorites');
            default:
                break;
        }
    };

    useEffect(() => {
        preventNonConfiguredApp();
        getDefaultWeather().finally(() => setIsLoading(false))
    }, []);

    useEffect(() => {
        if (!isLoading) {
            refreshCurrentWeather().finally(() => setIsLoading(false));
        }
    }, [units])

    useEffect(() => {
        if (route.params) {
            onSelectedFavorite(route.params.cityId).finally(() => setIsLoading(false));
        }
    }, [route.params])

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <GestureRecognizer style={{ flex: 1 }} onSwipe={(gestureName) => onSwipe(gestureName)}>
                    <SafeAreaView style={styles.body}>
                        <View>
                            <SearchBar value={search} onPress={(coor) => onSearch(coor, units).finally(() => setIsLoading(false))} onChange={(text: string) => setSearch(text)} />
                            <View>
                                <MainWeather data={data} valueMetric={units} onChangeMetric={onMetricChange} valueFavorites={isFavorites} onChangeFavorites={(bool) => onFavoriteChange(bool)} />
                                <WeatherDetails data={data} />
                                <ForecastWeather data={forecastData} />
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

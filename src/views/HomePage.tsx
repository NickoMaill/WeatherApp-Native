import React, { useEffect, useState } from 'react';
import useStorage from '~/hooks/useStorage';
import LoaderFullWidth from '~/components/common/LoaderFullWidth';
import { ForecastWeatherDto, WeatherTypeDto } from '~/types/weather';
import { BackHandler, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
import useResources from '~/hooks/useResources';
import { useAppDispatch, useAppSelector } from '~/store/storeHooks';
import { backgroundImageSlice } from '~/store/AppContext/backgroundImage';
import stylesResources from '~/resources/stylesResources';

export default function HomePage({ navigation, route }: IHomeProps) {
    // singleton --> start region ////////////////////////////////
    // singleton --> end region //////////////////////////////////

    // hooks --> start region ////////////////////////////////////
    const Storage = useStorage();
    const Navigation = useNavigation();
    const Notification = useNotification();
    const Resources = useResources();
    const DispatchReducer = useAppDispatch();
    // hooks --> end region //////////////////////////////////////

    // state --> start region ////////////////////////////////////
    const backgroundImage = useAppSelector((state) => state.backgroundImage.value);
    const [data, setData] = useState<WeatherTypeDto | null>(null);
    const [forecastData, setForecastData] = useState<ForecastWeatherDto[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [units, setUnits] = useState<boolean>(true);
    const [isFavorites, setIsFavorites] = useState(false);
    const [search, setSearch] = useState<string>('');
    // state --> end region //////////////////////////////////////

    // listeners --> start region ////////////////////////////////
    /**
     * @name BackHandler_Listener
     * @description listener that handle back press button to quit app
     * @return {boolean}
     */
    BackHandler.addEventListener('hardwareBackPress', () => {
        preventBackTooForward();
        return true;
    });

    /**
     * @name Navigation_Listener
     * @description listener that handle navigation focus state
     * @return {void}
     */
    navigation.addListener('focus', (_e) => {
        if (!isLoading && data) {
            setIsFavorites(!checkIfFavorite(data.cityId));
        }

        if (data && (backgroundImage === stylesResources.backgroundImageCode.black || backgroundImage === stylesResources.backgroundImageCode.white)) {
            DispatchReducer(backgroundImageSlice.actions.setBackground(data.icon));
        }

        if (route.params) {
            onSelectedFavorite(route.params.cityId).finally(() => setIsLoading(false));
        }
    });
    // listeners --> end region //////////////////////////////////

    // methods --> start region //////////////////////////////////
    /**
     * @name PreventBackTooForward
     * @description method that prevent to back on splash screen and exit app when hit back button
     * @return {void}
     */
    const preventBackTooForward = (): void => {
        if (Navigation.getState().routes[Navigation.getState().index].name === 'Home') {
            BackHandler.exitApp();
        }
    };

    /**
     * @name PreventNonConfiguredApp
     * @description method prevent non configured app to access homepage
     * @return {void}
     */
    const preventNonConfiguredApp = async (): Promise<void> => {
        const isConfigured = Storage.isConfigured();

        if (!isConfigured) {
            Navigation.navigate('Hello');
        }
    };

    /**
     * @name onMetricChange
     * @description method that set units to C° {true} or F° {false}
     * @return {void}
     */
    const onMetricChange = (): void => {
        setUnits(!units);
    };

    /**
     * @name OnFavoriteChange
     * @description method that call addToFavorite method if {true} and deleteFavorite if {false}
     * @param {boolean} bool
     * @return {void}
     */
    const onFavoriteChange = (bool: boolean): void => {
        setIsFavorites(!isFavorites);
        if (bool) {
            addToFavorite(data.cityId);
        }

        if (!bool) {
            deleteFavorite(data.cityId);
        }
    };

    /**
     * @name RefreshCurrentWeather
     * @description method that refresh current weather when app parameter (units, etc, ...) change
     * @return {void}
     */
    const refreshCurrentWeather = async (): Promise<void> => {
        setIsLoading(true);
        const chooseUnit = units ? 'metric' : 'imperial';

        const weather = await weatherService.getCurrentWeatherByCityId(data.cityId, chooseUnit);
        const forecast = await weatherService.getWeatherByCityId(data.cityId, chooseUnit);
        setForecastData(forecast);
        setData(weather);
    };

    /**
     * @name GetWeather
     * @description method that get weather by city id
     * @param {number} cityId
     * @return {void}
     */
    const getWeather = async (cityId: number): Promise<void> => {
        const chooseUnits = units ? 'metric' : 'imperial';

        await weatherService
            .getCurrentWeatherByCityId(cityId, chooseUnits)
            .then((res) => {
                setData(res);
                checkIfFavorite(res.cityId);
                DispatchReducer(backgroundImageSlice.actions.setBackground(res.icon));
            })
            .catch((err) => {
                navigation.navigate('Error');
            });
        await weatherService.getWeatherByCityId(cityId, chooseUnits).then((res) => setForecastData(res));
    };

    /**
     * @name GetWeatherByCoordinate
     * @description method that get weather by city coordinate points
     * @param {Latitude} coor
     * @return {void}
     */
    const getWeatherByCoordinate = async (coor: Latitude): Promise<void> => {
        const chooseUnits = units ? 'metric' : 'imperial';

        await weatherService.getCurrentWeatherByCoordinate(coor.lon, coor.lat, chooseUnits).then((res) => {
            setData(res);
            checkIfFavorite(res.cityId);
        });
        await weatherService.getWeatherByCoordinate(coor.lon, coor.lat, chooseUnits).then((res) => setForecastData(res));
    };

    /**
     * @name PreventBackTooForward
     * @description method that get default weather
     * @return {void}
     */
    const getDefaultWeather = async (): Promise<void> => {
        setIsLoading(true);
        const defaultWeather = await Storage.getDefaultCity();

        if (!defaultWeather) {
            await Storage.setAppConfigured(false);
            Navigation.navigate('Hello');
            DispatchReducer(backgroundImageSlice.actions.setWhiteBackground());
            return;
        }

        await getWeather(defaultWeather).then(() => setIsLoading(false));
    };

    /**
     * @name OnSearch
     * @description method that get weather on value searched in search bar
     * @param {Latitude} coor
     * @return {void}
     */
    const onSearch = async (coor: Latitude): Promise<void> => {
        if (!coor) {
            Notification.displayWarning(Resources.translate('common.toast.noCityTitle'), Resources.translate('common.toast.noCityMessage'));
            return;
        }

        setIsLoading(true);
        await getWeatherByCoordinate(coor).finally(() => setIsLoading(true));
    };

    /**
     * @name OnSelectedFavorite
     * @description method that load current weather for selected favorite
     * @param {number} cityId
     * @return {void}
     */
    const onSelectedFavorite = async (cityId: number): Promise<void> => {
        setIsLoading(true);
        await getWeather(cityId).finally(() => setIsLoading(false));
    };

    /**
     * @name CheckIfFavorite
     * @description method that check if current city id is favorite
     * @param {number} cityId
     * @return {void}
     */
    const checkIfFavorite = async (cityId: number): Promise<boolean> => {
        const favorite = await Storage.getFavorite();

        if (favorite.length === 0) {
            setIsFavorites(false);
            return false;
        }

        const index = favorite.indexOf(cityId);

        if (index < 0) {
            setIsFavorites(false);
            return false;
        } else {
            setIsFavorites(true);
            return true;
        }
    };

    /**
     * @name AddToFavorite
     * @description method that add current weather in favorite
     * @param {number} cityId
     * @return {void}
     */
    const addToFavorite = async (cityId: number): Promise<void> => {
        const favoriteArray = await Storage.getFavorite();
        const isFavorite = favoriteArray.includes(cityId);

        if (isFavorite) {
            return;
        }

        favoriteArray.push(cityId);
        setIsFavorites(true);
        await Storage.addToFavorite(favoriteArray).then(() =>
            Notification.displaySuccess(Resources.translate('common.toast.favoriteAddedTitle'), Resources.translate('common.toast.favoriteAddedMessage', { city: data.city }))
        );
    };

    /**
     * @name DeleteFavorite
     * @description method that delete favorite
     * @param {number} cityId
     * @return {void}
     */
    const deleteFavorite = async (cityId: number): Promise<void> => {
        const favoriteArray = await Storage.getFavorite();
        const isFavorite = favoriteArray.includes(cityId);

        if (!isFavorite) {
            return;
        }

        await Storage.removeFavorite(favoriteArray, cityId).then(() =>
            Notification.displayInfo(Resources.translate('common.toast.favoriteDeletedTitle'), Resources.translate('common.toast.favoriteDeletedMessage', { city: data.city }))
        );

        setIsFavorites(false);
    };

    /**
     * @name OnSwipe
     * @description method that handle swipe gesture for navigate between views
     * @param {string} gestureName
     * @return {void}
     */
    const onSwipe = (gestureName: string): void => {
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
    // methods --> end region ////////////////////////////////////

    // useEffect --> start region ////////////////////////////////
    useEffect(() => {
        preventNonConfiguredApp();
        getDefaultWeather();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            refreshCurrentWeather().finally(() => setIsLoading(false));
        }
    }, [units]);
    // useEffect --> end region //////////////////////////////////

    // render --> start region ///////////////////////////////////
    return (
        <>
            {isLoading ? (
                <LoaderFullWidth />
            ) : (
                <GestureRecognizer style={{ flex: 1 }} onSwipe={(gestureName) => onSwipe(gestureName)}>
                    <SafeAreaView style={styles.body}>
                        <View>
                            <SearchBar value={search} onPress={(coor) => onSearch(coor).finally(() => setIsLoading(false))} onChange={(text: string) => setSearch(text)} />
                            <View>
                                <MainWeather
                                    data={data}
                                    valueFavorites={isFavorites}
                                    onChangeFavorites={(bool) => onFavoriteChange(bool)}
                                />
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
    // render --> end region /////////////////////////////////////
}

// styles --> start region //////////////////////////////////////
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
// styles --> end region ////////////////////////////////////////

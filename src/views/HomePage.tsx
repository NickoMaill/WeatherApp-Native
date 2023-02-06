import React, { useContext, useEffect, useState } from 'react';
import weatherManager from '~/managers/weatherManager';
import useStorage from '~/hooks/useStorage';
import Loader from '~/components/common/Loader';
import MainHome from '~/components/home/MainHome';
import AppConfiguration from '~/components/home/AppConfiguration';
import { weatherTypeDto } from '~/contracts/weather';
import Error from './Error';
import { WeatherContext } from '~/context/Context';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {
    const Storage = useStorage();
    const Navgation = useNavigation();
    const Context = useContext(WeatherContext);
    const [data, setData] = useState<weatherTypeDto | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isConfigured, setIsConfigured] = useState<boolean>(false);

    BackHandler.addEventListener('hardwareBackPress', () => {
        preventBackTooForward();
        return true
    })

    const preventBackTooForward = () => {
        console.log()
        if (Navgation.getState().index === 1) {
            BackHandler.exitApp();
        }
        return true
    }

    const getWeather = async () => {
        setIsLoading(true);
        const defaultWeather = await Storage.getFavorite();

        if (!defaultWeather) {
            setIsConfigured(false);
            setIsLoading(false);
        }

        const weather = await weatherManager.getCurrentWeatherByCityId(defaultWeather[0]);
        setData(weather);
        Context.setBackgroundImage(weather.icon);
    };

    useEffect(() => {
        Storage.isConfigured().then((res) => setIsConfigured(res));
    }, []);

    useEffect(() => {
        if (isConfigured) {
            Context.setIsConfigured(isConfigured);
            getWeather().finally(() => setIsLoading(false));
        }
    }, [isConfigured]);

    return (
        <>
            {isLoading && !isConfigured ? (
                <AppConfiguration isLoading={isLoading} setIsLoading={setIsLoading} setIsConfigured={setIsConfigured} />
            ) : isLoading && isConfigured || isLoading && !isConfigured ? (
                <Loader />
            ) : !isLoading && isConfigured && data ? (
                <MainHome data={data} />
            ) : (
                <Error />
            )}
        </>
    );
}

import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { WeatherContext } from '../context/Context';
import { HomeScreenNavigationProp } from '../contracts/navigation';
import weatherManager from '../managers/weatherManager';
import useStorage from '../hooks/useStorage';
import Loader from '../components/common/Loader';
import MainHome from '../components/MainHome';
import AppConfiguration from '../components/home/AppConfiguration';

export default function HomePage() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const Context = useContext(WeatherContext);
    const Storage = useStorage();
    const cityName = !Context.isLoading ? Context.data.city : '';
    const [search, setSearch] = useState(cityName);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isConfigured, setIsConfigured] = useState<boolean>(false);

    const weatherRes = async () => {
        setIsLoading(true);
        const weather = await weatherManager.getWeather(search).finally(() => setIsLoading(false));
        console.log(weather);
        Context.setData(weather);
    };

    useEffect(() => {
        Storage.isConfigured().then((res) => setIsConfigured(res))
    }, []);

    return <>{Context.isLoading && !isConfigured ? <AppConfiguration /> : Context.isLoading && isConfigured ? <Loader /> : !Context.isLoading && isConfigured ? <MainHome /> : <></>}</>;
    // return <></>
}

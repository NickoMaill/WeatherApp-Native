import React, { useContext, useEffect, useState } from 'react';
import { Animated, SafeAreaView, Text, View } from 'react-native';
import FavoriteCard from '~/components/favorites/FavoriteCard';
import { WeatherContext } from '~/context/Context';
import { getWeather } from '~/utils/weatherRequest';
import { useNavigation } from '@react-navigation/native';
import TranslateView from '~/components/animations/TranslateView';
import useStorage from '~/hooks/useStorage';
import Loader from '~/components/common/Loader';
import NoFavorites from '~/components/favorites/NoFavorites';
import weatherService from '~/services/weatherService';
import { FavoriteWeatherDto } from '~/contracts/weather';
import useNotification from '~/hooks/useNotification';

export default function Favorites() {
    const Navigation = useNavigation();
    const Storage = useStorage();
    const Toast = useNotification();

    const [favoritesData, setFavoritesData] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

    const getFullData = (cityId: number) => {
        Navigation.navigate('Home', { cityId });
    };

    const checkFavorites = async () => {
        setIsLoading(true);
        const favorites = await Storage.getFavorite();

        if (!favorites) {
            setIsLoading(false);
            return;
        }
        
        setFavorites(favorites);
    };

    const deleteFavorite = async (id: number) => {
        setIsLoadingDelete(true);
        const defaultWeather = await Storage.getDefaultCity();
        
        if (id === defaultWeather) {
            Toast.displayWarning('Suppression impossible', 'vous ne pouvez pas supprimer votre ville par défaut')
            setIsLoadingDelete(false);
            return;
        }
        await Storage.removeFavorite(favorites, id);

        const newFavorites = await Storage.getFavorite();
        setFavorites(newFavorites);
        setIsLoadingDelete(false);
    };

    const animationSequence = () => {
        Animated.sequence([]).start()        
    }

    useEffect(() => {
        checkFavorites().finally(() => setIsLoading(false))
    }, []);

    return (
        <>
            {!isLoading ? (
                favorites.length > 0 ? (
                    favorites.map((fav, i) => {
                        return (
                            <FavoriteCard
                                key={i}
                                isLoadingDelete={isLoadingDelete}
                                cityId={fav}
                                index={i}
                                onCrossPress={() => deleteFavorite(fav)}
                                onPressButton={() => getFullData(fav)}
                            />
                        );
                    })
                ) : (
                    <NoFavorites/>
                )
            ) : (
                <Loader/>
            )}
        </>
    );
}

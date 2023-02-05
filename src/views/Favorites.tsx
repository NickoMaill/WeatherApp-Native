import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import FavoriteCard from '../components/FavoriteCard';
import { WeatherContext } from '../context/Context';
import { getWeather } from '../utils/weatherRequest';
import Spinner from 'react-native-spinkit';
import { useNavigation } from '@react-navigation/native';
import TranslateView from '../components/animations/TranslateView';
import useStorage from '../hooks/useStorage';

export default function Favorites() {
    const navigation = useNavigation();
    const storage = useStorage();
    const Context = useContext(WeatherContext);

    const [favoritesData, setFavoritesData] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getFullData = (city) => {
        navigation.navigate('Home');
        Context.setIsLoading(true);
        getWeather(city)
            .then((res) => Context.setData(res))
            .finally(() => Context.setIsLoading(false));
    };

    const checkFavorites = async () => {
        Context.setIsLoading(true);
        const favorite = await storage.getFavorite();
        setFavorites(favorite);
    };

    const deleteFavorite = async (id: string) => {
        Context.setIsLoading(true);
        await storage.removeFavorite(favorites, id).finally(() => {
            Context.setIsLoading(false);
            favoritesMap();
        });
    };

    const favoritesMap = () => {
        if (favorites.length > 0) {
            favorites.map((favName) => {
                getWeather(favName, 'metric').then((res) => {
                    setFavoritesData((prevState) => [...prevState, res]);
                });
            });
            Context.setIsLoading(false);
        } else {
            Context.setIsLoading(false);
        }
    };

    useEffect(() => {
        Context.setIsLoading(true);
        setFavoritesData([]);
        checkFavorites();
    }, []);

    useEffect(() => {
        favoritesMap();
    }, [favorites]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {!Context.isLoading ? (
                favorites.length > 0 ? (
                    favoritesData.map((fav, i) => {
                        if (i <= favorites.length) {
                            if (favorites.includes(fav.city.name)) {
                                return (
                                    <TranslateView initialValue={500} endValue={0} duration={500}>
                                        <FavoriteCard key={i} loading={isLoading} data={fav} index={i} onCrossPress={() => deleteFavorite(fav.city.name)} onPressButton={() => getFullData(fav.city.name)} />
                                    </TranslateView>
                                );
                            }
                        }
                    })
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, color: '#fff' }}>Vous n'avez pas de favoris...</Text>
                    </View>
                )
            ) : (
                <Spinner type="Bounce" />
            )}
        </SafeAreaView>
    );
}

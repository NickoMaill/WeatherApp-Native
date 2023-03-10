import React, { useEffect, useState } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import FavoriteCard from '~/components/favorites/FavoriteCard';
import { useNavigation } from '@react-navigation/native';
import useStorage from '~/hooks/useStorage';
import LoaderFullWidth from '~/components/common/LoaderFullWidth';
import NoFavorites from '~/components/favorites/NoFavorites';
import useNotification from '~/hooks/useNotification';
import GestureRecognizer from 'react-native-swipe-gestures';
import Title from '~/components/common/Texted';
import useResources from '~/hooks/useResources';
import { AppError, ErrorTypeEnum } from '~/core/appError';

export default function Favorites() {
    const Navigation = useNavigation();
    const Storage = useStorage();
    const Toast = useNotification();
    const Resources = useResources();

    const [favorites, setFavorites] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
    const [defaultCity, setDefaultCity] = useState<number | null>(null);

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

        if (id === defaultCity) {
            Toast.displayWarning('Suppression impossible', 'vous ne pouvez pas supprimer votre ville par défaut');
            setIsLoadingDelete(false);
            throw new AppError(ErrorTypeEnum.Functional, 'cannot delete favorite');
        }
        await Storage.removeFavorite(favorites, id).then(() =>
            Toast.displayInfo(Resources.translate('favorites.toast.deletedTitle'), Resources.translate('favorites.toast.deletedContent'))
        );

        const newFavorites = await Storage.getFavorite();
        setFavorites(newFavorites);
        setIsLoadingDelete(false);
    };

    const onChangeDefault = async (cityId: number) => {
        await Storage.setDefaultCity(cityId).then(() => setDefaultCity(cityId));
    };

    const animationSequence = () => {
        Animated.sequence([]).start();
    };

    const onSwipe = (gestureName: string) => {
        // TODO --> to type
        switch (gestureName) {
            case 'SWIPE_RIGHT':
                Navigation.navigate('Home');
            default:
                break;
        }
    };

    useEffect(() => {
        Storage.getDefaultCity().then((res) => setDefaultCity(res));
        checkFavorites().finally(() => setIsLoading(false));
    }, []);

    return (
        <GestureRecognizer style={{ flex: 1 }} onSwipe={(gestureName) => onSwipe(gestureName)}>
            <ScrollView>
                {!isLoading ? (
                    <View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Title style={{ fontSize: 20 }}>{Resources.translate('favorites.yourFavorites')}</Title>
                        </View>
                        {favorites.length > 0 ? (
                            favorites.map((fav, i) => {
                                return (
                                    <FavoriteCard
                                        key={i}
                                        onDefaultButton={() => onChangeDefault(fav)}
                                        isDefaultCity={fav === defaultCity}
                                        isLoadingDelete={isLoadingDelete}
                                        cityId={fav}
                                        index={i}
                                        onCrossPress={() => deleteFavorite(fav)}
                                        onPressButton={() => getFullData(fav)}
                                    />
                                );
                            })
                        ) : (
                            <NoFavorites />
                        )}
                    </View>
                ) : (
                    <LoaderFullWidth />
                )}
            </ScrollView>
        </GestureRecognizer>
    );
}

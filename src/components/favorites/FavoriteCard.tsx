import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FavoriteWeatherDto } from '~/contracts/weather';
import stylesResources from '~/resources/stylesResources';
import weatherService from '~/services/weatherService';
import { regularStyle } from '../../styles/regularStyle';
import { displayPic } from '../../utils/displayWeatherPic';
import Title from '../common/Title';

export default function FavoriteCard({ cityId, index, onCrossPress, onPressButton, isLoadingDelete }: IFavoriteCard) {
    const color = ['#00A8F4', '#CDDC39', '#607D8A', '#00A8F4', '#673AB6', '#ed9c10', '#ed577d', '#3f3c1a'];

    const [data, setData] = useState<FavoriteWeatherDto | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getWeatherData = async () => {
        setIsLoading(true);

        const favoriteData = await weatherService.getFavoriteCurrentWeatherByCityId(cityId);
        setData(favoriteData);
    };

    useEffect(() => {
        getWeatherData().finally(() => setIsLoading(false));
    }, []);

    return (
        <TouchableOpacity onPress={onPressButton} style={[styles.mainContainer, { backgroundColor: color[index] }]}>
            {!isLoading ? (
                <>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center', marginRight: 30 }}>
                            <Image style={styles.image} source={displayPic(data.icon)} />
                            <Text style={[regularStyle.mainFont, { fontSize: 15 }]}>{Math.round(data.temp)} °C</Text>
                        </View>
                        <View>
                            <Title size={17}>
                                {data.city}, {data.country}
                            </Title>
                            <Text style={[regularStyle.mainFont, { fontSize: 15 }]}>{data.description}</Text>
                        </View>
                    </View>
                    {!isLoadingDelete ? (
                        <TouchableOpacity onPress={onCrossPress}>
                            <Image style={styles.closeCross} source={require('../../assets/icons/cross.png')} />
                        </TouchableOpacity>
                    ) : (
                        <ActivityIndicator size={60} color={stylesResources.color.white}/>
                    )}
                </>
            ) : (
                <ActivityIndicator size={60} color={stylesResources.color.white} />
            )}
        </TouchableOpacity>
    );
}

interface IFavoriteCard {
    cityId: number;
    index: number;
    isLoadingDelete: boolean;
    onCrossPress: () => void;
    onPressButton: () => void;
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        margin: 7,
        borderRadius: 10,
    },
    image: {
        width: 40,
        tintColor: '#fff',
        height: 40,
    },
    closeCross: {
        tintColor: '#fff',
        width: 40,
        height: 40,
    },
});

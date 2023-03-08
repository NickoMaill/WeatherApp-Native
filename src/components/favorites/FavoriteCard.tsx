import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FavoriteWeatherDto } from '~/types/weather';
import stylesResources from '~/resources/stylesResources';
import weatherService from '~/services/weatherService';
import { regularStyle } from '../../styles/regularStyle';
import { displayPic } from '../../utils/displayWeatherPic';
import { Regular } from '../common/Texted';
import Title from '../common/Texted';
import Icon from "react-native-vector-icons/AntDesign"
import Icon2 from "react-native-vector-icons/Entypo"

export default function FavoriteCard({ cityId, index, onCrossPress, onPressButton, isLoadingDelete, isDefaultCity, onDefaultButton }: IFavoriteCard) {
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
                            <Regular style={{ fontSize: 15 }}>{Math.round(data.temp)} °C</Regular>
                        </View>
                        <View>
                            <Title style={{ fontSize: 17 }}>
                                {data.city}, {data.country}
                            </Title>
                            <Regular style={[regularStyle.mainFont, { fontSize: 15 }]}>{data.description}</Regular>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onDefaultButton}>
                            <Icon2 color={isDefaultCity ? stylesResources.color.warn : stylesResources.color.white} size={40} name='location-pin' />
                        </TouchableOpacity>
                        {!isLoadingDelete ? (
                            <TouchableOpacity onPress={onCrossPress}>
                                <Icon size={40} color={stylesResources.color.white} name="close"/>
                            </TouchableOpacity>
                        ) : (
                            <ActivityIndicator size={60} color={stylesResources.color.white} />
                        )}
                    </View>
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
    isDefaultCity?: boolean;
    onCrossPress: () => void;
    onPressButton: () => void;
    onDefaultButton: () => void;
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
    buttonContainer: {
        flexDirection: 'row',

    }
});

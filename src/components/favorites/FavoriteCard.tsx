import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Spinner from 'react-native-spinkit';
import { regularStyle } from '../../styles/regularStyle';
import { displayPic } from '../../utils/displayWeatherPic';
import Title from '../common/Title';

export default function FavoriteCard({ data, index, onCrossPress, loading, onPressButton }: IFavoriteCard) {
    const color = ['#00A8F4', '#CDDC39', '#607D8A', '#00A8F4', '#673AB6', '#ed9c10', '#ed577d', '#3f3c1a'];

    return (
        <TouchableOpacity onPress={onPressButton} style={[styles.mainContainer, { backgroundColor: color[index] }]}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center', marginRight: 30 }}>
                    <Image style={styles.image} source={displayPic(data.list[0].weather[0].icon)} />
                    <Text style={[regularStyle.mainFont, { fontSize: 15 }]}>{Math.round(data.list[0].main.temp)} °C</Text>
                </View>
                <View>
                    <Title size={17}>
                        {data.city.name}, {data.city.country}
                    </Title>
                    <Text style={[regularStyle.mainFont, { fontSize: 15 }]}>{data.list[0].weather[0].description}</Text>
                </View>
            </View>
            <View>
                {loading ? (
                    <Spinner color="#fff" type="CircleFlip" size={40} />
                ) : (
                    <TouchableOpacity onPress={onCrossPress}>
                        <Image style={styles.closeCross} source={require('../../assets/icons/cross.png')} />
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
}

interface IFavoriteCard {
    data: any;
    index: number;
    loading: boolean;
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

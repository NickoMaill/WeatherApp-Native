import React from 'react';
import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { WeatherTypeDto } from '~/types/weather';
import { regularStyle } from '~/styles/regularStyle';
import { displayPic } from '~/utils/displayWeatherPic';
import { Regular } from '../common/Texted';
import Title from '../common/Texted';
import Icon from 'react-native-vector-icons/AntDesign';

export default function MainWeather({ valueFavorites, onChangeFavorites, data }: IMainWeather) {
    return (
        <View>
            <View style={styles.titleContainer}>
                <Title style={{ fontSize: 20 }}>
                    {data.city}, {data.country}
                </Title>
                <TouchableOpacity style={styles.favButton} onPress={() => onChangeFavorites(!valueFavorites)}>
                    {!valueFavorites ? <Icon name="staro" size={30} color={'white'} /> : <Icon name="star" size={30} color={'#FFFF00'} />}
                </TouchableOpacity>
            </View>
            <View style={styles.mainView}>
                <View style={styles.centerItem}>
                    <Image style={{ tintColor: '#fff', width: 60, height: 60 }} source={displayPic(data.icon)} />
                </View>
                <View style={[styles.centerItem, styles.tempContainer]}>
                    <Regular style={{ color: '#fff', fontSize: 20, marginVertical: 15 }}>{data.description}</Regular>
                    <Title style={{ fontSize: 35 }}>{Math.round(data.temp)} °C</Title>
                </View>
            </View>
        </View>
    );
}

interface IMainWeather {
    valueFavorites: boolean;
    onChangeFavorites: (bool: boolean) => void;
    data: WeatherTypeDto;
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'column',
        marginHorizontal: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    switchContainer: {
        flexDirection: 'row',
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
        marginTop: 0,
    },
    favButton: {
        marginLeft: 10
    },
    tempContainer: {
        marginVertical: 15,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

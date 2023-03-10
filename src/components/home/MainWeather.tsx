import React from 'react';
import { Image, StyleSheet, Switch, Text, View } from 'react-native';
import { WeatherTypeDto } from '~/types/weather';
import { regularStyle } from '~/styles/regularStyle';
import { displayPic } from '~/utils/displayWeatherPic';
import { Regular } from '../common/Texted';
import Title from '../common/Texted';

export default function MainWeather({ valueMetric, onChangeMetric, valueFavorites, onChangeFavorites, data }: IMainWeather) {
    return (
        <View>
            <View style={styles.centerItem}>
                <Title style={{ fontSize: 20 }}>
                    {data.city}, {data.country}
                </Title>
            </View>
            <View style={[styles.centerItem, styles.titleContainer]}>
                <View style={[styles.centerItem, styles.switchContainer]}>
                    <Image
                        source={require('../../assets/icons/favorite.png')}
                        style={[{ width: 30, height: 30, marginRight: 10 }, valueFavorites ? { tintColor: 'yellow' } : { tintColor: '#fff' }]}
                    />
                    <Switch value={valueFavorites} onValueChange={(e) => onChangeFavorites(e)} />
                </View>
                <View style={[styles.centerItem, styles.switchContainer]}>
                    <Regular style={[regularStyle.mainFont, { alignItems: 'center', marginHorizontal: 5 }]}>F°</Regular>
                    <Switch value={valueMetric} onChange={onChangeMetric} />
                    <Regular style={[regularStyle.mainFont, { alignItems: 'center', marginHorizontal: 5 }]}>C°</Regular>
                </View>
            </View>
            <View style={styles.mainView}>
                <View style={styles.centerItem}>
                    <Image style={{ tintColor: '#fff', width: 60, height: 60 }} source={displayPic(data.icon)} />
                </View>
                <View style={styles.centerItem}>
                    <Regular style={{ color: '#fff', fontSize: 20, marginVertical: 15 }}>{data.description}</Regular>
                    <Title style={{ fontSize: 25 }}>{Math.round(data.temp)} °C</Title>
                </View>
            </View>
        </View>
    );
}

interface IMainWeather {
    valueMetric: boolean;
    valueFavorites: boolean;
    onChangeMetric: () => void;
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
        justifyContent: 'space-between',
        marginTop: 10,
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { WeatherContext } from '~/context/Context';
import { weatherTypeDto } from '~/contracts/weather';
import WeatherInfo from './WeatherInfo';

export default function WeatherDetails({ data }: IWeatherDetails) {
    const Context = useContext(WeatherContext);

    return (
        <View style={styles.infoGroup}>
            <WeatherInfo data={Math.round(data.minTemp) + '°'} icon={require('../../assets/icons/minTemp.png')} />
            <WeatherInfo data={Math.round(data.maxTemp) + '°'} icon={require('../../assets/icons/maxTemp.png')} />
            <WeatherInfo data={data.humidity + ' %'} icon={require('../../assets/icons/drop.png')} />
            <WeatherInfo data={data.speed + ' m/s'} icon={require('../../assets/icons/wind.png')} />
        </View>
    );
}

interface IWeatherDetails {
    data: weatherTypeDto
}

const styles = StyleSheet.create({
    infoGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 15,
    },
});

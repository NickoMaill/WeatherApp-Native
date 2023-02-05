import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { WeatherContext } from '../context/Context';
import WeatherInfo from './WeatherInfo';

export default function WeatherDetails() {
    const Context = useContext(WeatherContext);
    const data = Context.data;

    return (
        <View style={styles.infoGroup}>
            <WeatherInfo data={Math.round(data.minTemp) + '°'} icon={require('../assets/icons/minTemp.png')} />
            <WeatherInfo data={Math.round(data.maxTemp) + '°'} icon={require('../assets/icons/maxTemp.png')} />
            <WeatherInfo data={data.humidity + ' %'} icon={require('../assets/icons/drop.png')} />
            <WeatherInfo data={data.speed + ' m/s'} icon={require('../assets/icons/wind.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    infoGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 15,
    },
});

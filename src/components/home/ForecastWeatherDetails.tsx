import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ForecastWeatherDto } from '~/contracts/weather';
import { regularStyle } from '~/styles/regularStyle';
import { frenchDays } from '~/utils/convertDays';
import { displayPic } from '~/utils/displayWeatherPic';
import { Regular } from '../common/Texted';
import Title from '../common/Texted';
import moment from 'moment';

export default function ForecastWeatherDetails({ data }: IForecastWeatherDetails) {
    const fullDate: Date = new Date(data.date * 1000);
    return (
        <View style={styles.forecastContainer}>
            <Title style={{ fontSize: 15, textTransform: 'uppercase' }}>{moment(data.date * 1000).format('ddd').substring(0, 3)}</Title>
            <Image  style={{ width: 30, height: 30, tintColor: "#fff" }} source={displayPic(data.icon)} />
            <Regular style={{ textAlign: 'right' }}>{Math.round(data.temp)} °</Regular>
        </View>
    );
}

interface IForecastWeatherDetails {
    data: ForecastWeatherDto;
}

const styles = StyleSheet.create({
    forecastContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingHorizontal: 25,
        paddingBottom: 8,
        borderRadius: 10,
        marginTop: 10
    }
})

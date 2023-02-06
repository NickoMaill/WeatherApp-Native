import React from 'react';
import { Image, Text, View } from 'react-native';
import { ListResponseApi } from '~/contracts/weather';
import { regularStyle } from '~/styles/regularStyle';
import { frenchDays } from '~/utils/convertDays';
import { displayPic } from '~/utils/displayWeatherPic';
import Title from '../common/Title';

export default function ForecastWeatherDetails({ data }: IForecastWeatherDetails) {
    const fullDate: Date = new Date(data.dt * 1000);

    return (
        <View>
            <Title size={15}>{frenchDays(fullDate.toUTCString().substring(0, 3))}</Title>
            <Image style={{ width: 30, height: 30, tintColor: '#fff' }} source={displayPic(data.weather[0].icon)} />
            <Text style={regularStyle.mainFont}>{Math.round(data.main.temp)} °</Text>
        </View>
    );
}

interface IForecastWeatherDetails {
    data: ListResponseApi;
}

import React from 'react';
import { Image, Text, View } from 'react-native';
import { forecastWeatherDto, ListResponseApi } from '~/contracts/weather';
import { regularStyle } from '~/styles/regularStyle';
import { frenchDays } from '~/utils/convertDays';
import { displayPic } from '~/utils/displayWeatherPic';
import Title from '../common/Title';

export default function ForecastWeatherDetails({ data }: IForecastWeatherDetails) {
    const fullDate: Date = new Date(data.date * 1000);
    return (
        <View>
            <Title size={15}>{frenchDays(fullDate.toUTCString().substring(0, 3))}</Title>
            <Image  style={{ width: 30, height: 30, tintColor: "#fff" }} source={displayPic(data.icon)} />
            <Text style={[regularStyle.mainFont, { textAlign: 'right' }]}>{Math.round(data.temp)} °</Text>
        </View>
    );
}

interface IForecastWeatherDetails {
    data: forecastWeatherDto;
}

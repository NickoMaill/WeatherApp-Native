import moment from 'moment';
import React, { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { WeatherContext } from '~/context/Context';
import { WeatherTypeDto } from '~/types/weather';
import { regularStyle } from '~/styles/regularStyle';
import { Regular } from '../common/Texted';


export default function Sunrise({ data }: ISunrise) {
    return (
        <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: 40 }}>
            <View>
                <Image style={{ tintColor: '#fff', height: 50, width: 50 }} source={require('../../assets/icons/sunrise.png')} />
                <Regular style={{ marginVertical: 5 }}>{moment(data.sunrise * 1000).format('LT')}</Regular>
            </View>
            <View>
                <Image style={{ tintColor: '#fff', height: 50, width: 50 }} source={require('../../assets/icons/sunset.png')} />
                <Regular style={{ marginVertical: 5 }}>{moment(data.sunset * 1000).format('LT')}</Regular>
            </View>
        </View>
    );
}

interface ISunrise {
    data: WeatherTypeDto
}
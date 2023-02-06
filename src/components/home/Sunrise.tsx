import React, { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { WeatherContext } from '~/context/Context';
import { regularStyle } from '~/styles/regularStyle';


export default function Sunrise() {
    const Context = useContext(WeatherContext);
    const data = Context.data;
    const date = (time: number) => new Date(time * 1000).toLocaleTimeString().substring(0, 5);
    return (
        <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: 40 }}>
            <View>
                <Image style={{ tintColor: '#fff', height: 50, width: 50 }} source={require('../../assets/icons/sunrise.png')} />
                <Text style={[regularStyle.mainFont, { marginVertical: 10 }]}>{date(data.sunrise)}</Text>
            </View>
            <View>
                <Image style={{ tintColor: '#fff', height: 50, width: 50 }} source={require('../../assets/icons/sunset.png')} />
                <Text style={[regularStyle.mainFont, { marginVertical: 10 }]}>{date(data.sunset)}</Text>
            </View>
        </View>
    );
}

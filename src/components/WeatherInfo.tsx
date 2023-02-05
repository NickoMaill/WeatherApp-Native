import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { regularStyle } from '../styles/regularStyle';

export default function WeatherInfo({ data, icon }: IWeatherInfo) {
    return (
        <View style={styles.infoContainer}>
            <Image style={{ width: 25, height: 25, tintColor: '#fff' }} source={icon} />
            <Text style={[regularStyle.mainFont, { marginHorizontal: 5, fontSize: 17 }]}>{data}</Text>
        </View>
    );
}

interface IWeatherInfo {
    data: any;
    icon: ImageSourcePropType;
}

const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

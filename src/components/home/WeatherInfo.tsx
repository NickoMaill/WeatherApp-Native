import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { regularStyle } from '../../styles/regularStyle';
import { Regular } from '../common/Texted';

export default function WeatherInfo({ data, icon }: IWeatherInfo) {
    return (
        <View style={styles.infoContainer}>
            <Image style={{ width: 25, height: 25, tintColor: '#fff' }} source={icon} />
            <Regular style={{ marginHorizontal: 3, fontSize: 17 }}>{data}</Regular>
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

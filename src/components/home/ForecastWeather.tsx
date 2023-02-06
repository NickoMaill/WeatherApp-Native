import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { WeatherContext } from '~/context/Context';
import { regularStyle } from '~/styles/regularStyle';
import ForecastWeatherDetails from './ForecastWeatherDetails';

// singleton --> start region ////////////////////////////////////,
// singleton --> end region //////////////////////////////////////,

export default function ForecastWeather() {
    // hooks --> start region ////////////////////////////////////,
    const Context = useContext(WeatherContext);
    const data = Context.data;
    // hooks --> end region //////////////////////////////////////,

    // state --> start region ////////////////////////////////////
    const [forecast, setForecast] = useState([]);
    // state --> end region //////////////////////////////////////

    // methods --> start region //////////////////////////////////
    /**
     * @description form
     * @param n/a
     * @return void
     */
    const forecastDetails = () => {
        const tempArray = [];
        data.forecastWeather.map((day) => {
            const date = new Date(day.date * 1000);
            if (date.getDate() !== new Date().getDate()) {
                if (date.getHours() === 14) {
                    tempArray.push(day);
                }
            }
        });
        setForecast(tempArray);
    };
    // methods --> end region ////////////////////////////////////

    // useEffect --> start region ////////////////////////////////
    useEffect(() => {
        if (!Context.isLoading) {
            forecastDetails();
        }
    }, [Context.isLoading]);
    // useEffect --> end region //////////////////////////////////

    // render --> start region ///////////////////////////////////
    return (
        <View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#fff', paddingBottom: 10, marginTop: 20, alignItems: 'center' }}>
                <Text style={[regularStyle.mainFont, { fontSize: 16 }]}>Météo pour les 4 prochains jours</Text>
            </View>
            {!Context.isLoading ? (
                <View>
                    <FlatList
                        data={forecast}
                        renderItem={(data) => <ForecastWeatherDetails data={data.item} />}
                        keyExtractor={(_data, index) => index.toString()}
                        ItemSeparatorComponent={() => <View style={{ borderRightWidth: 2, borderRightColor: '#fff' }}/>}
                        contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}
                    />
                </View>
            ) : (
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <ActivityIndicator size="large" />
                    <ActivityIndicator size="large" />
                    <ActivityIndicator size="large" />
                    <ActivityIndicator size="large" />
                    <ActivityIndicator size="large" />
                    <ActivityIndicator size="large" />
                </View>
            )}
        </View>
    );
    // render --> end region /////////////////////////////////////
}

import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { WeatherContext } from '../context/Context';
import { regularStyle } from '../styles/regularStyle';
import ForecastWeatherDetails from './ForecastWeatherDetails';

export default function ForecastWeather() {
    const Context = useContext(WeatherContext);
    const [forecast, setForecast] = useState([]);
    const data = Context.data;

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
    useEffect(() => {
        if (!Context.isLoading) {
            forecastDetails();
        }
    }, [Context.isLoading]);
    return (
        <View>
            <View
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#fff',
                    paddingBottom: 10,
                    marginTop: 20,
                    alignItems: 'center',
                }}
            >
                <Text style={[regularStyle.mainFont, { fontSize: 16 }]}>Météo pour les 4 prochains jours</Text>
            </View>
            {!Context.isLoading ? (
                <View>
                    <FlatList
                        data={forecast}
                        renderItem={(data) => <ForecastWeatherDetails data={data.item} />}
                        keyExtractor={(_data, index) => index.toString()}
                        ItemSeparatorComponent={() => (
                            <View
                                style={{
                                    borderRightWidth: 2,
                                    borderRightColor: '#fff',
                                }}
                            />
                        )}
                        contentContainerStyle={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    />
                </View>
            ) : (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}
                >
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
}

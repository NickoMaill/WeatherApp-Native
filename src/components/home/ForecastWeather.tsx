import moment from 'moment';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { WeatherContext } from '~/context/Context';
import { forecastWeatherDto, weatherTypeDto } from '~/contracts/weather';
import useStorage from '~/hooks/useStorage';
import weatherManager from '~/managers/weatherManager';
import stylesResources from '~/resources/stylesResources';
import { regularStyle } from '~/styles/regularStyle';
import ForecastWeatherDetails from './ForecastWeatherDetails';

// singleton --> start region ////////////////////////////////////,
// singleton --> end region //////////////////////////////////////,

export default function ForecastWeather({ cityId, units, isRefresh }: IForecastWeather) {
    // hooks --> start region ////////////////////////////////////,
    const Context = useContext(WeatherContext);
    const Storage = useStorage();
    // hooks --> end region //////////////////////////////////////,

    // state --> start region ////////////////////////////////////
    const [forecastData, setForecastData] = useState<forecastWeatherDto[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    // state --> end region //////////////////////////////////////

    // methods --> start region //////////////////////////////////
    /**
     * @description get the forecast weather for 4 days and format hours
     * @param n/a
     * @return void
     */
    const getForecastWeather = async () => {
        setIsLoading(true);
        const forecast = await weatherManager.getWeatherByCityId(cityId, units);

        if (!forecast) {
            setError(true);
        }

        const average = generateTempAverage(4, forecast.forecastWeather);
        setForecastData(average);
    };

    const generateTempAverage = (numberOfDay: number, forecastWeather: forecastWeatherDto[]) => {
        let finalArray = []; // --> create empty output array
        
        for (let i = 1; i <= numberOfDay; i++) { // --> for loop to create forecast temp average
            const sortedForecast = forecastWeather.map((weather) => { // --> map all forecasts by day based on "i"
                    if (moment(weather.date * 1000).day() === moment().add(i, 'day').day()) {
                        return weather;
                    }
            }).filter((entry) => entry); // --> array filtered if there's undefined entries
            
            const temperatureArray = sortedForecast.map((weather) => { // --> map all temperature values for create an average
                return weather.temp;
            });
       
            const averageTemp = Math.round(temperatureArray.reduce((a, b) => a + b) / temperatureArray.length); // --> make average
            
            const averageToPush = sortedForecast.map((weather) => { // --> filter forecast weather that it on the midday
                if (moment(weather.date * 1000).hour() > 10 && moment(weather.date * 1000).hour() < 17) {
                    return weather;
                }
            })
            .filter((entry) => entry);
            
            averageToPush[0].temp = averageTemp; // --> select first entry of array and rewrite temperature by the average

            finalArray.push(averageToPush[0]); // --> push data to output array to be saved with a "setStateAction"
        }
        return finalArray;
    };
    // methods --> end region ////////////////////////////////////

    // useEffect --> start region ////////////////////////////////
    useEffect(() => {
        getForecastWeather().finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (isRefresh) {
            getForecastWeather();
        }
    }, [isRefresh])
    // useEffect --> end region //////////////////////////////////

    // render --> start region ///////////////////////////////////
    return (
        <View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#fff', paddingBottom: 10, marginTop: 20, alignItems: 'center' }}>
                <Text style={[regularStyle.mainFont, { fontSize: 16 }]}>Météo pour les 4 prochains jours</Text>
            </View>
            {!isLoading ? (
                <View>
                    <FlatList
                        data={forecastData}
                        renderItem={(data) => <ForecastWeatherDetails data={data.item} />}
                        keyExtractor={(_data, index) => index.toString()}
                        ItemSeparatorComponent={() => <View style={{ borderRightWidth: 2, borderRightColor: '#fff' }}></View>}
                        contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}
                    />
                </View>
            ) : (
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 50 }}>
                    <ActivityIndicator color={stylesResources.color.white} size="large" />
                </View>
            )}
        </View>
    );
    // render --> end region /////////////////////////////////////
}

interface IForecastWeather {
    cityId: number;
    units: 'metric' | 'imperial';
    isRefresh: boolean;
}

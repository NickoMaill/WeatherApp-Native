import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ForecastWeatherDto } from '~/contracts/weather';
import { regularStyle } from '~/styles/regularStyle';
import { Regular } from '../common/Texted';
import ForecastWeatherDetails from './ForecastWeatherDetails';

// singleton --> start region ////////////////////////////////////,
// singleton --> end region //////////////////////////////////////,

export default function ForecastWeather({ data }: IForecastWeather) {
    // hooks --> start region ////////////////////////////////////,
    // hooks --> end region //////////////////////////////////////,

    // state --> start region ////////////////////////////////////
    const [forecastData, setForecastData] = useState<ForecastWeatherDto[] | null>(null);
    // state --> end region //////////////////////////////////////

    // methods --> start region //////////////////////////////////

    const generateTempAverage = (numberOfDay: number, forecastWeather: ForecastWeatherDto[]) => {
        let finalArray = []; // --> create empty output array

        for (let i = 1; i <= numberOfDay; i++) {
            // --> for loop to create forecast temp average
            const sortedForecast = forecastWeather
                .map((weather) => {
                    // --> map all forecasts by day based on "i"
                    if (moment(weather.date * 1000).day() === moment().add(i, 'day').day()) {
                        return weather;
                    }
                })
                .filter((entry) => entry); // --> array filtered if there's undefined entries

            const temperatureArray = sortedForecast.map((weather) => {
                // --> map all temperature values for create an average
                return weather.temp;
            });

            const averageTemp = Math.round(temperatureArray.reduce((a, b) => a + b) / temperatureArray.length); // --> make average

            const averageToPush = sortedForecast
                .map((weather) => {
                    // --> filter forecast weather that it on the midday
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
        setForecastData(generateTempAverage(4, data))
    }, []);

    // useEffect --> end region //////////////////////////////////

    // render --> start region ///////////////////////////////////
    return (
        <View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#fff', paddingBottom: 10, marginTop: 20, alignItems: 'center' }}>
                <Regular style={{ fontSize: 16 }}>Météo pour les 4 prochains jours</Regular>
            </View>
            <View>
                <FlatList
                    data={forecastData}
                    extraData={forecastData}
                    renderItem={(data) => <ForecastWeatherDetails data={data.item} />}
                    keyExtractor={(_data, index) => index.toString()}
                    contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}
                />
            </View>
        </View>
    );
    // render --> end region /////////////////////////////////////
}

interface IForecastWeather {
    data: ForecastWeatherDto[];
}

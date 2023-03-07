import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import useStorage from '~/hooks/useStorage';
import weatherService from '~/services/weatherService';
import FullModalLayout from '../common/FullModalLayout';
import SearchBar, { Latitude } from '../common/SearchBar';
import Title, { Regular } from '../common/Texted';

// singleton --> start region ////////////////////////////////////
// singleton --> end region //////////////////////////////////////

export default function DefaultCityModal({ onPress }: IDefaultCityModal) {
    // state --> start region ////////////////////////////////////
    const [defaultCityName, setDefaultCityName] = useState<string>("");
    // state --> end region //////////////////////////////////////

    // hooks --> start region ////////////////////////////////////
    const Storage = useStorage();
    // hooks --> end region //////////////////////////////////////

    // methods --> start region //////////////////////////////////
    const getDefaultCityInfo = async (id: number): Promise<void> => {
        const defaultCity = await weatherService.getCurrentWeatherByCityId(id);
        setDefaultCityName(`${defaultCity.city}, ${defaultCity.country}`)
    }

    const searchNewDefaultCity = async (coordinate: Latitude): Promise<void> => {
        await weatherService.getCurrentWeatherByCoordinate(coordinate.lon, coordinate.lat).then((res) => {
            Alert.alert("Attention", `Voulez vous réellement définir ${res.city}, ${res.country} comme ville par default ?`, [
                {
                    text: "Oui",
                    onPress: () => {
                        Storage.setDefaultCity(res.cityId);
                        setDefaultCityName(`${res.city}, ${res.country}`)
                    }
                },
                {
                    text: "Non",
                    onPress: null,
                }
            ])
        })

    }
    // methods --> end region ////////////////////////////////////

    // useEffect --> start region ////////////////////////////////
    useEffect(() => {
        (async () => {
            const defaultCityId = await Storage.getDefaultCity()
            await getDefaultCityInfo(defaultCityId);
        })()
    }, [])
    // useEffect --> end region //////////////////////////////////

    // render --> start region ///////////////////////////////////
    return (
        <FullModalLayout title="Ville par défaut" onPressClose={onPress}>
            <Title style={{ textAlign: 'center' }}>Choisissez votre ville par default</Title>
            <View>
                <Regular>ville par default : {defaultCityName}</Regular>
                <SearchBar onPress={(lat) => searchNewDefaultCity(lat)}/>
            </View>
        </FullModalLayout>
    );
    // render --> end region /////////////////////////////////////
}

// props interface --> start region //////////////////////////////
interface IDefaultCityModal {
    onPress: () => void;
}
// props interface --> end region ////////////////////////////////

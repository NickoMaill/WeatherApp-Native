import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, TextInput, View, TouchableOpacity, Keyboard, FlatList, Dimensions, BackHandler } from 'react-native';
import { PlaceDetails } from '~/types/mapbox';
import mapboxModule from '~/services/mapboxService';
import ItemListAutoComplete from './ItemListAutoComplete';
import { FontAwesome } from '@expo/vector-icons';
import stylesResources from '~/resources/stylesResources';
import { WeatherContext } from '~/context/Context';
import configManager from '~/managers/configManager';

export type Latitude = { lon?: number; lat?: number };

export default function SearchBar({ onPress, onChange, value }: ISearchBar) {
    const Context = useContext(WeatherContext);
    const [city, setCity] = useState<string>('');
    const [autocompleteCities, setAutocompleteCities] = useState<PlaceDetails[] | null>(null);
    const [coordinate, setCoordinate] = useState<Latitude | null>(null);
    const [buttonColor, setButtonColor] = useState<string>(stylesResources.color.black);

    BackHandler.addEventListener('hardwareBackPress', () => {
        if (autocompleteCities !== null) {
            setAutocompleteCities(null);
        }
        return true
    })

    const handleCityChange = async (e: string) => {
        setCity(e);
        if (!city) return;

        const res = await mapboxModule.autoCompleteCity(city);

        if (res.features) {
            if (res.features.length < 1) {
                setAutocompleteCities(null);
            } else {
                setAutocompleteCities(res.features.map((place) => place));
            }
        }
    };

    const onCitySelected = (i: number) => {
        Keyboard.dismiss();
        const currentCoordinate = autocompleteCities[i].geometry.coordinates;

        setCoordinate({ lon: currentCoordinate[0], lat: currentCoordinate[1] });
        setCity(autocompleteCities[i].place_name);
        setAutocompleteCities(null);
        setButtonColor(stylesResources.color.blue);
    };

    useEffect(() => {
        if (city.length < 1) {
            setAutocompleteCities(null);
            setCoordinate(null);
            setButtonColor(stylesResources.color.black);
        }
        console.log(Context.isConfigured)
    }, [autocompleteCities]);

    return (
        <>
            <View style={styles.sectionStyle}>
                <Image style={styles.imageStyle} source={require('~/assets/pictures/search-interface-symbol.png')} />
                <TextInput
                    autoComplete="off"
                    value={city}
                    onChangeText={handleCityChange}
                    style={styles.inputSearch}
                    placeholder="Rechercher une ville"
                    textContentType="addressCityAndState"
                />
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => onPress(coordinate)}>
                        <FontAwesome size={30} style={{ paddingHorizontal: 3, paddingVertical: 5 }} color={buttonColor} name="arrow-circle-right" />
                    </TouchableOpacity>
                </View>
            </View>
            {autocompleteCities && (
                <View style={[styles.listContainer, { height: autocompleteCities.length - 1 * 50, top: Context.isConfigured ? 60 : 120, left: Context.isConfigured ? 40 : 0}]}>
                    <FlatList
                        data={autocompleteCities}
                        renderItem={(place) => <ItemListAutoComplete onPress={() => onCitySelected(place.index)} city={place.item.place_name} />}
                        keyExtractor={(_item, i) => i.toString()}
                    />
                </View>
            )}
        </>
    );
}

interface ISearchBar {
    onPress?: (latitude: Latitude) => void;
    onChange?: (text: string) => void;
    value?: string;
}

const styles = StyleSheet.create({
    imageStyle: {
        margin: 5,
        height: 15,
        width: 15,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    centerItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#000',
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 50,
        margin: 10,
    },
    inputSearch: {
        flex: 1,
    },
    listContainer: {
        marginLeft: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 3,
        paddingLeft: 10,
        flexGrow: 0,
        width: 250,
        position: 'absolute',
        backgroundColor: stylesResources.color.white,
        elevation: 1,
        zIndex: 2,
    },
});

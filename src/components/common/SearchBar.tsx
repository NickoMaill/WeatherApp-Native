import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Keyboard, FlatList, BackHandler } from 'react-native';
import { PlaceDetails } from '~/types/mapbox';
import mapboxModule from '~/services/mapboxService';
import ItemListAutoComplete from './ItemListAutoComplete';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SearchIcon from 'react-native-vector-icons/AntDesign';
import stylesResources from '~/resources/stylesResources';
import { useAppSelector } from '~/store/storeHooks';

export type Latitude = { lon?: number; lat?: number };

export default function SearchBar({ onPress, onChange, value }: ISearchBar) {
    // singleton --> start region ////////////////////////////////
    // singleton --> end region //////////////////////////////////

    // hooks --> start region ////////////////////////////////////
    // hooks --> end region //////////////////////////////////////

    // state --> start region ////////////////////////////////////
    const isAppConfigured = useAppSelector((state) => state.isAppConfigured.value);
    const [city, setCity] = useState<string>('');
    // const [displayList, setDisplayList] = useState<boolean>(false);
    const [autocompleteCities, setAutocompleteCities] = useState<PlaceDetails[] | null>(null);
    const [coordinate, setCoordinate] = useState<Latitude | null>(null);
    const [buttonColor, setButtonColor] = useState<string>(stylesResources.color.black);
    // state --> end region //////////////////////////////////////

    // listeners --> start region ////////////////////////////////
    BackHandler.addEventListener('hardwareBackPress', () => {
        Keyboard.dismiss();
        if (autocompleteCities !== null) {
            setAutocompleteCities(null);
        }
        return true;
    });
    // listeners --> end region //////////////////////////////////

    // methods --> start region //////////////////////////////////
    /**
     * @name HandleCityCHange
     * @description method that search city
     * @param {string} e 
     * @return {void}
     */
    const handleCityChange = async (e: string): Promise<void> => {
        setCity(e);
        if (!city) {
            return;
        }

        const res = await mapboxModule.autoCompleteCity(city);

        if (res.features) {
            if (res.features.length < 1) {
                setAutocompleteCities(null);
            } else {
                setAutocompleteCities(res.features.map((place) => place));
            }
        }
    };

    const onCitySelected = (i: number): void => {
        Keyboard.dismiss();
        const currentCoordinate = autocompleteCities[i].geometry.coordinates;

        setCoordinate({ lon: currentCoordinate[0], lat: currentCoordinate[1] });
        setCity(autocompleteCities[i].place_name);
        setAutocompleteCities(null);
        setButtonColor(stylesResources.color.blue);
    };
    // methods --> end region ////////////////////////////////////

    // useEffect --> start region ////////////////////////////////
    // useEffect --> end region //////////////////////////////////

    useEffect(() => {
        if (city.length < 1) {
            setAutocompleteCities(null);
            setCoordinate(null);
            setButtonColor(stylesResources.color.black);
        }
    }, [autocompleteCities]);

    // render --> start region ///////////////////////////////////
    return (
        <>
            <View style={styles.sectionStyle}>
                <SearchIcon size={20} name='search1' style={{ marginLeft: 5 }}/>
                <TextInput
                    autoComplete="off"
                    value={city}
                    blurOnSubmit={false}
                    onChangeText={handleCityChange}
                    style={styles.inputSearch}
                    placeholder="Rechercher une ville"
                    textContentType="addressCityAndState"
                />
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => onPress(coordinate)}>
                        <Icon size={30} style={{ marginRight: 3 }} color={buttonColor} name="arrow-circle-right" />
                    </TouchableOpacity>
                </View>
            </View>
            {autocompleteCities && (
                <View style={[styles.listContainer, { height: autocompleteCities.length - 1 * 50, top: isAppConfigured ? 60 : 120, left: isAppConfigured ? 40 : 0 }]}>
                    <FlatList
                        data={autocompleteCities}
                        renderItem={(place) => <ItemListAutoComplete onPress={() => onCitySelected(place.index)} city={place.item.place_name} />}
                        keyExtractor={(_item, i) => i.toString()}
                    />
                </View>
            )}
        </>
    );
    // render --> end region /////////////////////////////////////
}

// styles --> start region //////////////////////////////////////
// styles --> end region ////////////////////////////////////////

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

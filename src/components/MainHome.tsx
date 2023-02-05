import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GestureRecognizer from 'react-native-swipe-gestures';
import { WeatherContext } from '../context/Context';
import { HomeScreenNavigationProp } from '../contracts/navigation';
import FadeInView from './animations/FadeInView';
import SearchBar from './common/SearchBar';
import ForecastWeather from './ForecastWeather';
import MainWeather from './MainWeather';
import Sunrise from './Sunrise';
import WeatherDetails from './WeatherDetails';

export default function MainHome() {
    const Context = useContext(WeatherContext);
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const cityName = !Context.isLoading ? Context.data.city : '';
    const [metric, setMetric] = useState<boolean>(true);
    const [isFavorites, setIsFavorites] = useState(false);
    const [search, setSearch] = useState(cityName);

    const onMetricChange = () => {
        setMetric(!metric);
    };

    const onFavoriteChange = () => {
        setIsFavorites(!isFavorites);
    };

    const onSearch = async () => {
        // await weatherRes();
        Keyboard.dismiss();
    };


    const onSwipe = (gestureName: string) => {
        // const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (gestureName) {
            case 'SWIPE_LEFT':
                navigation.navigate('Setup');
                break;
            case 'SWIPE_RIGHT':
                navigation.navigate('Favorites');
            default:
                break;
        }
    };

    return (
        <GestureRecognizer style={{ flex: 1 }} onSwipe={(gestureName) => onSwipe(gestureName)}>
            <SafeAreaView style={styles.body}>
                <View>
                    <SearchBar value={search} onPress={onSearch} onChange={(text: string) => setSearch(text)} />
                    <FadeInView initialValue={0} endValue={1} duration={500}>
                        <View>
                            <MainWeather valueMetric={metric} onChangeMetric={onMetricChange} valueFavorites={isFavorites} onChangeFavorites={onFavoriteChange} />
                            <WeatherDetails />
                            <ForecastWeather />
                            <Sunrise />
                        </View>
                    </FadeInView>
                </View>
            </SafeAreaView>
        </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
    body: {
        marginHorizontal: 10,
    },
    imageStyle: {
        // padding: 10,
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
        // justifyContent: 'center',
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
    mainView: {
        marginTop: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

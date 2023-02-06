import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GestureRecognizer from 'react-native-swipe-gestures';
import { WeatherContext } from '~/context/Context';
import { HomeScreenNavigationProp } from '~/contracts/navigation';
import { weatherTypeDto } from '~/contracts/weather';
import FadeInView from '../animations/FadeInView';
import SearchBar from '../common/SearchBar';
import MainWeather from './MainWeather';
import WeatherDetails from './WeatherDetails';

export default function MainHome({ data }: IMainHome) {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [metric, setMetric] = useState<boolean>(true);
    const [isFavorites, setIsFavorites] = useState(false);
    const [search, setSearch] = useState<string>('');

    const onMetricChange = () => {
        setMetric(!metric);
    };

    const onFavoriteChange = () => {
        setIsFavorites(!isFavorites);
    };

    const onSearch = async (coor) => {
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
                    <SearchBar value={search} onPress={(coor) => onSearch(coor)} onChange={(text: string) => setSearch(text)} />
                    <FadeInView initialValue={0} endValue={1} duration={500}>
                        <View>
                            <MainWeather data={data} valueMetric={metric} onChangeMetric={onMetricChange} valueFavorites={isFavorites} onChangeFavorites={onFavoriteChange} />
                            <WeatherDetails data={data}/>
                            {/* <ForecastWeather /> */}
                            {/* <Sunrise /> */}
                        </View>
                    </FadeInView>
                </View>
            </SafeAreaView>
        </GestureRecognizer>
    );
};

interface IMainHome {
    data?: weatherTypeDto;
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

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { WeatherContext } from '~/context/Context';
import useNotification from '~/hooks/useNotification';
import useStorage from '~/hooks/useStorage';
import configManager from '~/managers/configManager';
import SearchBar, { Latitude } from '~/components/common/SearchBar';
import Title from '~/components/common/Texted';
import Loader from '~/components/common/Loader';
import { useNavigation } from '@react-navigation/native';
import weatherService from '~/services/weatherService';

// singleton --> start region ////////////////////////////////////
const message = ['Bienvenue sur WeatherApp', 'Ceci est une appli de test'];
// singleton --> end region //////////////////////////////////////

export default function Hello() {
    // hooks --> start region ////////////////////////////////////
    const Toast = useNotification();
    const Context = useContext(WeatherContext);
    const Storage = useStorage();
    const Navigation = useNavigation();
    // hooks --> end region //////////////////////////////////////

    // state --> start region ////////////////////////////////////
    const opacity = useRef(new Animated.Value(0)).current; // start point for animation
    const [messageToDisplay, setMessageToDisplay] = useState<number>(0); // @index of message to display
    const [displayForm, setDisplayForm] = useState<boolean>(false); // @boolean to display search bar
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // state --> end region //////////////////////////////////////

    // methods --> start region //////////////////////////////////

    /**
     * @description Animation for create a fade in effect with opacity style ref
     * @param n/a
     * @return void
     */
    const fadeIn = () => {
        return Animated.timing(opacity, {
            toValue: 5,
            duration: 2000,
            useNativeDriver: true,
        });
    };

    /**
     * @description Animation for create a fade out effect with opacity style ref
     * @param n/a
     * @return void
     */
    const fadeOut = () => {
        return Animated.timing(opacity, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
        });
    };

    /**
     * @description Execute animation sequence -> to prevent node and too much code
     * @param n/a;
     * @return void
     */
    const animationSequence = () => {
        Animated.sequence([
            fadeIn(), // --> Display first message
            fadeOut(), // --> Hide first message
            fadeIn(), // __> display second message
            fadeOut(), // --> hide second message
        ]).start(() => setDisplayForm(true));
    };

    /**
     * @description Check if a city is choose, and call ->
     * {1} - weatherManager to get current weather by coordinate point
     * {2} - storage for add cityId in 'favorites' slot
     * {3} - storage for set App configured in 'isAppConfigured' slot
     * @param {coordinatePoint} - latitude and longitude object
     * @returns void
     */
    const onPress = async (coor: Latitude) => {
        if (!coor) {
            return Toast.displayWarning('aucune ville sélectionnée', 'vous devez séléctioner une ville pour acceder a la meteo');
        }

        setIsLoading(true);

        try {
            const weather = await weatherService.getCurrentWeatherByCoordinate(coor.lon, coor.lat);
            await Storage.addToFavorite([weather.cityId]);
            await Storage.setDefaultCity(weather.cityId);
            await Storage.setAppConfigured(true);
            Context.setIsConfigured(true);
            Context.setShowFooter(true);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    // methods --> end region ////////////////////////////////////

    // useEffect --> start region ////////////////////////////////
    useEffect(() => {
        animationSequence();
        setTimeout(() => {
            setMessageToDisplay(1);
        }, 4000); // --> TODO set message to display with event instead of setTimeOut to prevent bad performance of the device
    }, []);

    useEffect(() => {
        if (displayForm) {
            fadeIn().start(); // --> Display search form (with fadeIn animation effect)
        }
    }, [displayForm]);
    // useEffect --> end region //////////////////////////////////

    // render --> start region ///////////////////////////////////
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <View style={styles.animationContainer}>
                    {!displayForm ? (
                        <Animated.View style={{ opacity }}>
                            <Title style={styles.title}>{message[messageToDisplay]}</Title>
                        </Animated.View>
                    ) : (
                        <Animated.View style={{ opacity }}>
                            <Title style={{ color: 'black', fontSize: 30 }}>Choisissez une ville</Title>
                            <SearchBar onPress={(coor) => onPress(coor).finally(() => Navigation.navigate('Home'))} />
                        </Animated.View>
                    )}
                </View>
            )}
        </>
    );
    // render --> end region /////////////////////////////////////
}

const styles = StyleSheet.create({
    animationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: configManager.dimension.height,
    },
    title: {
        color: 'black',
        textAlign: 'center',
        fontSize: 50,
    },
});

import React, { useEffect, useRef, useState } from 'react';
import { Animated, Keyboard, StyleSheet, View } from 'react-native';
import useNotification from '~/hooks/useNotification';
import useStorage from '~/hooks/useStorage';
import configManager from '~/managers/configManager';
import SearchBar, { Latitude } from '~/components/common/SearchBar';
import Title from '~/components/common/Texted';
import Loader from '~/components/common/Loader';
import { useNavigation } from '@react-navigation/native';
import weatherService from '~/services/weatherService';
import useResources from '~/hooks/useResources';
import { useAppDispatch } from '~/store/storeHooks';
import { isAppConfiguredSlice } from '~/store/AppContext/isAppConfigured';
import { showFooterSlice } from '~/store/AppContext/showFooter';

export default function Hello() {
    // singleton --> start region ////////////////////////////////////
    // singleton --> end region //////////////////////////////////////

    // hooks --> start region ////////////////////////////////////
    const Toast = useNotification();
    const Storage = useStorage();
    const Navigation = useNavigation();
    const Resources = useResources();
    const Dispatch = useAppDispatch();
    // hooks --> end region //////////////////////////////////////

    // state --> start region ////////////////////////////////////
    const opacity = useRef(new Animated.Value(0)).current; // start point for animation
    const position = useRef(new Animated.Value(0)).current;
    const message = [Resources.translate('hello.splashMessage1'), Resources.translate('hello.splashMessage2')];
    const [messageToDisplay, setMessageToDisplay] = useState<number>(0); // @index of message to display
    const [displayForm, setDisplayForm] = useState<boolean>(false); // @boolean to display search bar
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // state --> end region //////////////////////////////////////

    // listeners --> start region //////////////////////////////////
    Keyboard.addListener('keyboardDidShow', () => {
        onKeyboardOn();
    });
    
    Keyboard.addListener('keyboardDidHide', () => {
        onKeyboardOff();
    });
    // listeners --> end region ////////////////////////////////////

    // methods --> start region //////////////////////////////////
    /**
     * @description Animation for create a fade in effect with opacity style ref
     * @param {*} n/a
     * @return {Animated.CompositeAnimation}
     */
    const fadeIn = (): Animated.CompositeAnimation => {
        return Animated.timing(opacity, {
            toValue: 5,
            duration: 2000,
            useNativeDriver: true,
        });
    };

    /**
     * @description Animation for create a fade out effect with opacity style ref
     * @param {*} n/a
     * @return {Animated.CompositeAnimation}
     */
    const fadeOut = (): Animated.CompositeAnimation => {
        return Animated.timing(opacity, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
        });
    };

    /**
     * @description Execute animation sequence -> to prevent node and too much code
     * @param {*} n/a;
     * @return {void}
     */
    const animationSequence = (): void => {
        Animated.sequence([
            fadeIn(), // --> Display first message
            fadeOut(), // --> Hide first message
            fadeIn(), // --> display second message
            fadeOut(), // --> hide second message
        ]).start(() => setDisplayForm(true));
    };

    const onKeyboardOn = () => {
        return Animated.timing(position, {
            toValue: -configManager.dimension.height / 2.5,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const onKeyboardOff = () => {
        return Animated.timing(position, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    /**
     * @description Check if a city is choose, and call ->
     * {1} - weatherManager to get current weather by coordinate point
     * {2} - storage for add cityId in 'favorites' slot
     * {3} - storage for set App configured in 'isAppConfigured' slot
     * @param {Latitude} coor - and longitude object
     * @return {void}
     */
    const onPress = async (coor: Latitude): Promise<void> => {
        if (!coor) {
            Toast.displayWarning(Resources.translate('common.toast.noCityTitle'), Resources.translate('common.toast.noCityMessage'));
            return;
        }

        setIsLoading(true);
        fadeOut();

        try {
            const weather = await weatherService.getCurrentWeatherByCoordinate(coor.lon, coor.lat);
            await Storage.addToFavorite([weather.cityId]);
            await Storage.setDefaultCity(weather.cityId);
            await Storage.setAppConfigured(true);
            Dispatch(isAppConfiguredSlice.actions.setToTrue());
            Dispatch(showFooterSlice.actions.setToTrue());
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

        Keyboard.addListener('keyboardDidShow', () => {
            onKeyboardOn();
        });

        Keyboard.addListener('keyboardDidHide', () => {
            onKeyboardOff();
        });
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
                        <Animated.View style={{ transform: [{ translateY: position }] }}>
                            <Animated.View style={{ opacity }}>
                                <Title style={{ fontSize: 30 }}>{Resources.translate('hello.chooseCity')}</Title>
                                <SearchBar onPress={(coor) => onPress(coor).finally(() => Navigation.navigate('Home'))} />
                            </Animated.View>
                        </Animated.View>
                    )}
                </View>
            )}
        </>
    );
    // render --> end region /////////////////////////////////////
}

// styles --> start region ///////////////////////////////////
const styles = StyleSheet.create({
    animationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: configManager.dimension.height,
    },
    title: {
        textAlign: 'center',
        fontSize: 50,
    },
});
// styles --> end region /////////////////////////////////////
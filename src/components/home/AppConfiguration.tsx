import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { dimension } from '../../constant/styleConstant';
import Title from '../common/Title';
import FormConfiguration from './FormConfiguration';

export default function AppConfiguration() {
    const opacity = useRef(new Animated.Value(0)).current;
    const [messageToDisplay, setMessageToDisplay] = useState<number>(0);
    const [displayForm, setDisplayForm] = useState<boolean>(false);
    const message = ['Bienvenue sur WeatherApp', 'Ceci est une appli de test'];

    const fadeIn = () => {
        return Animated.timing(opacity, {
            toValue: 5,
            duration: 2000,
            useNativeDriver: true,
        })
    };

    const fadeOut = () => {
        return Animated.timing(opacity, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
        })
    };

    const animationSequence = () => {
        fadeIn().start((res) => {
            if (res['finished']) {
                fadeOut().start((res) => {
                    if (res['finished']) {
                        setMessageToDisplay((prevState) => prevState + 1);
                        fadeIn().start((res) => {
                            if (res['finished']) {
                                fadeOut().start((res) => {
                                    if (res['finished']) {
                                        setMessageToDisplay((prevState) => prevState + 1);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    useEffect(() => {
        animationSequence();
    }, []);

    useEffect(() => {
        if (messageToDisplay > 1) {
            fadeIn().stop()
            fadeOut().stop();
            setDisplayForm(true);
        }
    }, [messageToDisplay]);

    return (
        <View style={styles.animationContainer}>
            {!displayForm ? (
                <Animated.View style={{ opacity }}>
                    <Title style={styles.title} size={50}>
                        {message[messageToDisplay]}
                    </Title>
                </Animated.View>
            ) : (
                <FormConfiguration />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    animationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: dimension.height,
    },
    title: {
        color: 'black',
        textAlign: 'center',
    },
});

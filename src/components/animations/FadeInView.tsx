import React, { ReactNode, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function FadeInView({ style, children, initialValue, endValue, duration }: IFadeInView) {
    const fadeIn = useRef(new Animated.Value(initialValue)).current;

    useEffect(() => {
        Animated.timing(fadeIn, {
            toValue: endValue,
            duration,
            useNativeDriver: false,
        }).start();
    }, [fadeIn]);

    return <Animated.View style={[style, { opacity: fadeIn }]}>{children}</Animated.View>;
}

interface IFadeInView {
    style?: any;
    children: ReactNode;
    initialValue: number;
    endValue: number;
    duration: number;
}

import React, { ReactNode, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function TranslateView({ style, children, initialValue, endValue, duration }: ITranslateView) {
    const translate = useRef(new Animated.Value(initialValue)).current;

    useEffect(() => {
        Animated.timing(translate, {
            toValue: endValue,
            duration: duration,
            useNativeDriver: false,
        }).start();
    }, [translate]);

    return <Animated.View style={[style, { left: translate }]}>{children}</Animated.View>;
}

interface ITranslateView {
    style?: any;
    children: ReactNode;
    initialValue: number;
    endValue: number;
    duration: number;
}

import React, { ReactNode } from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';

export default function Title({ children, size, style }: ITtile) {
    return <Text style={[styles.title, { fontSize: size }, style]}>{children}</Text>;
}

interface ITtile {
    children: ReactNode;
    size: number;
    style?: StyleProp<TextStyle>;
}

const styles = StyleSheet.create({
    title: {
        color: '#F1F1F1',
        fontWeight: 'bold',
        marginVertical: 10,
    },
});

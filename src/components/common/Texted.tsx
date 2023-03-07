import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { regularStyle } from '~/styles/regularStyle';

export function Regular(props: TextProps) {
    return <Text {...props} style={[regularStyle.mainFont, props.style, { fontFamily: 'lato-regular' }]} />;
}
export function Bold(props: TextProps) {
    return <Text {...props} style={[regularStyle.mainFont, props.style, { fontFamily: 'lato-bold' }]} />;
}
export function Thin(props: TextProps) {
    return <Text {...props} style={[regularStyle.mainFont, props.style, { fontFamily: 'lato-thin' }]} />;
}

export default function Title(props: TextProps) {
    return <Bold {...props} style={[styles.title, props.style]} />;
}

const styles = StyleSheet.create({
    title: {
        color: '#F1F1F1',
        fontWeight: 'bold',
        marginVertical: 10,
    },
});

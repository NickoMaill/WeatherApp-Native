import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView, Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

export default function Setup() {
    const Navigation = useNavigation();

    const onSwipe = (gestureName: string) => {
        switch (gestureName) {
            case 'SWIPE_LEFT':
                Navigation.navigate('Home');
            default:
                break;
        }
    };

    return (
        <GestureRecognizer style={{ flex: 1 }} onSwipe={(gestureName) => onSwipe(gestureName)}>
            <Text>Setup</Text>
        </GestureRecognizer>
    );
}

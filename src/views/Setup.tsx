import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Setup() {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <Text>Setup</Text>
        </SafeAreaView>
    );
}

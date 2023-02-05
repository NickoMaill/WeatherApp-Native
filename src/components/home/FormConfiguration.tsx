import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../common/SearchBar';
import Title from '../common/Title';

export default function FormConfiguration() {
    return (
        <SafeAreaView>
            <Title style={{ color: 'black' }} size={30}>Choisissez une ville</Title>
            <SearchBar/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

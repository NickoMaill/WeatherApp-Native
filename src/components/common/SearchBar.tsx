import React from 'react';
import { Image, StyleSheet, TextInput, View, TouchableOpacity, Keyboard } from 'react-native';

export default function SearchBar({ onPress, onChange, value }: ISearchBar) {
    return (
        <View style={styles.sectionStyle}>
            <Image style={styles.imageStyle} source={require('../../assets/pictures/search-interface-symbol.png')} />
            <TextInput value={value} onChangeText={onChange} style={styles.inputSearch} placeholder="Rechercher une ville" textContentType="countryName" />
            <View
                style={{
                    borderRadius: 50,
                    margin: 5,
                    padding: 3,
                    backgroundColor: 'blue',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity onPress={onPress}>
                    <Image style={[styles.imageStyle, { tintColor: '#fff' }]} source={require('../../assets/pictures/search-interface-symbol.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

interface ISearchBar {
    onPress?: () => void;
    onChange?: (text: string) => void;
    value?: string;
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'column',
        marginHorizontal: 10,
    },
    imageStyle: {
        // padding: 10,
        margin: 5,
        height: 15,
        width: 15,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    centerItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#000',
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 50,
        margin: 10,
    },
    inputSearch: {
        flex: 1,
    },
    mainView: {
        marginTop: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

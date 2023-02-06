import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ItemListAutoComplete({ city, onPress }: IItemListAutocomplete) {
    return (
        <TouchableOpacity style={styles.placesContainer} onPress={onPress}>
            <FontAwesome style={styles.icon} name= 'map-marker' size={25} />
            <Text style={styles.text} ellipsizeMode='tail' numberOfLines={1}>{city}</Text>
        </TouchableOpacity>
    );
}

interface IItemListAutocomplete {
    city: string;
    onPress: () => void;
}

const styles = StyleSheet.create({
    placesContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
    },
    icon: {
        marginRight: 15
    },
    text: {
        flex: 1
    }
})

import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function Error() {
    const onRefresh = () => {};

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center' }}>oups une erreur est survenu... veuillez recharger l'application</Text>
            <TouchableOpacity onPress={onRefresh}>
                <Image source={require('../assets/icons/refresh.png')} style={{ marginTop: 40, width: 40, height: 40 }} />
            </TouchableOpacity>
        </View>
    );
}

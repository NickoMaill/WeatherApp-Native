import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Regular } from '~/components/common/Texted';

export default function Error() {
    const onRefresh = () => {};

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Regular style={{ textAlign: 'center' }}>oups une erreur est survenu... veuillez recharger l'application</Regular>
            <TouchableOpacity onPress={onRefresh}>
                <Image source={require('../assets/icons/refresh.png')} style={{ marginTop: 40, width: 40, height: 40 }} />
            </TouchableOpacity>
        </View>
    );
}

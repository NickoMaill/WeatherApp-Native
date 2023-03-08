import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Regular } from '~/components/common/Texted';

export default function Error() {
    // singleton --> start region ////////////////////////////////
    // singleton --> end region //////////////////////////////////

    // hooks --> start region ////////////////////////////////////
    // hooks --> end region //////////////////////////////////////

    // state --> start region ////////////////////////////////////
    // state --> end region //////////////////////////////////////

    // listeners --> start region ////////////////////////////////
    // listeners --> end region //////////////////////////////////

    // methods --> start region //////////////////////////////////
    const onRefresh = () => {};
    // methods --> end region ////////////////////////////////////

    // useEffect --> start region ////////////////////////////////
    // useEffect --> end region //////////////////////////////////

    // render --> start region ///////////////////////////////////
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Regular style={{ textAlign: 'center' }}>oups une erreur est survenu... veuillez recharger l'application</Regular>
            <TouchableOpacity onPress={onRefresh}>
                <Image source={require('../assets/icons/refresh.png')} style={{ marginTop: 40, width: 40, height: 40 }} />
            </TouchableOpacity>
        </View>
    );
    // render --> end region /////////////////////////////////////
}

// styles --> start region //////////////////////////////////////
// styles --> end region ////////////////////////////////////////

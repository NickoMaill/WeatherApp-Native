import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { DeviceInfo, dimension, favoritesColor, isAndroid } from '../../constant/styleConstant';
import { regularStyle } from '../../styles/regularStyle';

export default function Loader() {
    const [color, setColor] = useState<string>('#00A8F4');
    
    useEffect(() => {
        let i = 0
        const id = setInterval(() => {
            i > 7 ? i = 0 : i++;
            setColor(favoritesColor[i]);
          }, 800);
          return () => clearInterval(id);
    }, []);

    return (
        <View style={styles.spinnerContainer}>
            <ActivityIndicator size={isAndroid() ? 100 : 'large'} color={color} hidesWhenStopped={false} />
            <Text style={[regularStyle.mainFont, styles.loaderMessage]}>L'application est en cours de chargement</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    spinnerContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: dimension.height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderMessage: {
        color: 'black',
        marginTop: 30
    }
});

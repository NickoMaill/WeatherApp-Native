import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import configManager from '~/managers/configManager';
import { regularStyle } from '~/styles/regularStyle';
import stylesResources from '~/resources/stylesResources';

export default function Loader() {
    const [color, setColor] = useState<string>(stylesResources.color.blue);

    useEffect(() => {
        let i = 0;
        const id = setInterval(() => {
            i > 7 ? (i = 0) : i++;
            setColor(stylesResources.favoritesColor[i]);
        }, 800);
        return () => clearInterval(id);
    }, []);

    return (
        <View style={styles.spinnerContainer}>
            <ActivityIndicator size={configManager.isAndroid() ? 100 : 'large'} color={color} hidesWhenStopped={false} />
            <Text style={[regularStyle.mainFont, styles.loaderMessage]}>L'application est en cours de chargement</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    spinnerContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        height: configManager.dimension.height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderMessage: {
        color: stylesResources.color.white,
        marginTop: 30,
        textShadowColor: '#000000',
        textShadowRadius: 3,
        textShadowOffset: { width: 10, height: 1 }
    },
});

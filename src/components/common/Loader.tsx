import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import configManager from '~/managers/configManager';
import { regularStyle } from '~/styles/regularStyle';
import stylesResources from '~/resources/stylesResources';
import { Regular } from './Texted';

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
            <Regular style={styles.loaderMessage}>L'application est en cours de chargement ...</Regular>
        </View>
    );
}

const styles = StyleSheet.create({
    spinnerContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        height: configManager.dimension.height,
        width: configManager.dimension.width,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        paddingBottom: 40
    },
    loaderMessage: {
        color: stylesResources.color.white,
        marginTop: 30,
        textAlign: 'center',
    },
});

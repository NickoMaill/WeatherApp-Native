import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { HomeScreenNavigationProp } from '../contracts/navigation';
import navigationResources from '../resources/navigationResources';
import configManager from '~/managers/configManager';

export default function Footer() {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <View style={styles.footer}>
            {navigationResources.footerNavLink.map((navLink, i) => {
                return (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate(navLink.to)}>
                        <Image source={navLink.iconPath} style={navLink.style} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 40,
        elevation: 2
    },
});

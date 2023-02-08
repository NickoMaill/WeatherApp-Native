import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { HomeScreenNavigationProp } from '../contracts/navigation';
import navigationResources from '../resources/navigationResources';
import configManager from '~/managers/configManager';

export default function Footer() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [currentSelected, setCurrentSelected] = useState<number>(1)
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';

    const stylesNavigation = (screen, index: number) => {
        setCurrentSelected(index)
        navigation.navigate(screen);
    }

    return (
        <View style={styles.footer}>
            {navigationResources.footerNavLink.map((navLink, i) => {
                return (
                    <TouchableOpacity style={{ backgroundColor: i === currentSelected ? '#000000' : '', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 18 }} key={i} onPress={() => stylesNavigation(navLink.to, i)}>
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

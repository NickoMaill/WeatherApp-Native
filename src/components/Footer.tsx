import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { HomeScreenNavigationProp } from '../contracts/navigation';
import { DeviceInfo } from '../constant/styleConstant';
import navigationResources from '../resources/navigationResources';

export default function Footer() {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <SafeAreaView style={styles.footer}>
            {navigationResources.footerNavLink.map((navLink, i) => {
                return (
                    <TouchableOpacity key={i} onPress={() => navigation.navigate(navLink.to)}>
                        <Image source={navLink.iconPath} style={navLink.style} />
                    </TouchableOpacity>
                )
            })}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: DeviceInfo.os === "android" ? 10 : 0
    },
});

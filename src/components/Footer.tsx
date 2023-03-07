import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, StyleSheet, TouchableOpacity, View, ListRenderItemInfo } from 'react-native';
import { HomeScreenNavigationProp, StackNavigatorParamList } from '../types/navigation';
import navigationResources, { FooterNavLink } from '../resources/navigationResources';
import stylesResources from '~/resources/stylesResources';
import { useAppDispatch } from '~/store/storeHooks';
import { backgroundImageSlice } from '~/store/AppContext/backgroundImage';

export default function Footer() {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const Dispatch = useAppDispatch();
    const [currentSelected, setCurrentSelected] = useState<number>(1);

    const stylesNavigation = (screen: keyof StackNavigatorParamList, index: number) => {
        setCurrentSelected(index);
        navigation.navigate(screen);
    };

    const renderItem = (item: ListRenderItemInfo<FooterNavLink>) => {
        const backgroundColor = item.index === currentSelected ? stylesResources.color.white : '#00000000';
        const tintColor = item.index === currentSelected ? stylesResources.color.blue : stylesResources.color.white;

        return <ItemFooter tintColor={tintColor} onPress={() => stylesNavigation(item.item.to, item.index)} backgroundColor={backgroundColor} navLink={item.item} />;
    };

    useEffect(() => {
        navigation.addListener('state', (s) => {
            const state = s.data.state;
            if (state) {
                switch (state.routes[state.index].name) {
                    case 'Setup':
                        setCurrentSelected(0);
                        Dispatch(backgroundImageSlice.actions.setDefaultBackground())
                        break;
                    case 'Home':
                        setCurrentSelected(1);
                        break;
                    case 'Favorites':
                        setCurrentSelected(2);
                        break;
                }
            }
        });
    }, []);

    return (
        <View style={styles.footer}>
            <FlatList
                data={navigationResources.footerNavLink}
                renderItem={renderItem}
                keyExtractor={(_item, i) => i.toString()}
                extraData={currentSelected}
                contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}
            />
        </View>
    );
}

function ItemFooter({ onPress, backgroundColor, navLink, tintColor }) {
    return (
        <TouchableOpacity style={{ backgroundColor: backgroundColor, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 18 }} onPress={onPress}>
            <Image source={navLink.iconPath} style={[navLink.style, { tintColor }]} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    footer: {
        marginBottom: 40,
    },
});

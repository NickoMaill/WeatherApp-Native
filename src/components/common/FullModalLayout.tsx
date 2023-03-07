import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Title from './Texted';
import Icon from 'react-native-vector-icons/AntDesign';
import stylesResources from '~/resources/stylesResources';

// singleton --> start region ////////////////////////////////////
// singleton --> end region //////////////////////////////////////

export default function FullModalLayout({ title, children, onPressClose }: IFullModalLayout) {
    // state --> start region ////////////////////////////////////
    // state --> end region //////////////////////////////////////

    // hooks --> start region ////////////////////////////////////
    // hooks --> end region //////////////////////////////////////

    // methods --> start region //////////////////////////////////
    // methods --> end region ////////////////////////////////////

    // useEffect --> start region ////////////////////////////////
    // useEffect --> end region //////////////////////////////////

    // render --> start region ///////////////////////////////////
    return (
        <View style={{ flex: 1, backgroundColor: stylesResources.color.black }}>
            <View style={styles.modalTitleContainer}>
                <Title>{title}</Title>
                <TouchableOpacity style={{ marginRight: 10, position: 'absolute', right: 0 }} onPress={onPressClose}>
                    <Icon name="close" size={24} color={stylesResources.color.white} />
                </TouchableOpacity>
            </View>
            <View>{children}</View>
        </View>
    );
    // render --> end region /////////////////////////////////////
}

// props interface --> start region //////////////////////////////
interface IFullModalLayout {
    title: string;
    children: ReactNode;
    onPressClose: () => void;
}
// props interface --> end region ////////////////////////////////

const styles = StyleSheet.create({
    modalTitleContainer: {
        backgroundColor: '#1F1F1F',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

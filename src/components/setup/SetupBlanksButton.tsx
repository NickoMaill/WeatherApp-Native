import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { Regular } from '../common/Texted';
import { MaterialIcons } from '@expo/vector-icons';
import stylesResources from '~/resources/stylesResources';

// singleton --> start region ////////////////////////////////////
// singleton --> end region //////////////////////////////////////

export default function SetupBlanksButton({ label, onPress, index, customStyle }: ISetupBlanksButton) {
    // state --> start region ////////////////////////////////////
    // state --> end region //////////////////////////////////////

    // hooks --> start region ////////////////////////////////////
    // hooks --> end region //////////////////////////////////////

    // methods --> start region //////////////////////////////////
    const customBorderRadius = (): StyleProp<ViewStyle> => {
        const radius = 20;
        if (index < 4) {
            return {
                borderTopLeftRadius: index === 0 ? radius : 0, 
                borderTopRightRadius: index === 0 ? radius : 0, 
                borderBottomLeftRadius: index === 3 ? radius : 0, 
                borderBottomRightRadius: index === 3 ? radius : 0,
            }
        } else {
            return {
                borderRadius: radius
            }
        }
    }
    // methods --> end region ////////////////////////////////////

    // useEffect --> start region ////////////////////////////////
    // useEffect --> end region //////////////////////////////////

    // render --> start region ///////////////////////////////////
    return (
        <TouchableOpacity style={[styles.button, customBorderRadius(), customStyle]} onPress={onPress}>
            <Regular>{label}</Regular>
            <MaterialIcons name="keyboard-arrow-right" size={22} color={stylesResources.color.white} />
        </TouchableOpacity>
    );
    // render --> end region /////////////////////////////////////
}

// props interface --> start region //////////////////////////////
interface ISetupBlanksButton {
    label: string;
    onPress: () => void;
    index?: number;
    customStyle?: StyleProp<ViewStyle>
}
// props interface --> end region ////////////////////////////////

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: stylesResources.color.customBlack,
        padding: 20,
        borderWidth: 1,
        borderColor: stylesResources.color.black
    }
})

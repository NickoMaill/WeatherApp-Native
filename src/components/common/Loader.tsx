import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native';
import configManager from '~/managers/configManager';
import stylesResources from '~/resources/stylesResources';

// singleton --> start region ////////////////////////////////////
// singleton --> end region //////////////////////////////////////

export default function Loader ({}: ILoader) {
    // state --> start region ////////////////////////////////////
    const [color, setColor] = useState<string>(stylesResources.color.blue);
    // state --> end region //////////////////////////////////////

    // hooks --> start region ////////////////////////////////////
    // hooks --> end region //////////////////////////////////////

    // methods --> start region //////////////////////////////////
    // methods --> end region ////////////////////////////////////

    // useEffect --> start region ////////////////////////////////
    useEffect(() => {
        let i = 0;
        const id = setInterval(() => {
            i > 7 ? (i = 0) : i++;
            setColor(stylesResources.favoritesColor[i]);
        }, 800);
        return () => clearInterval(id);
    }, []);
    // useEffect --> end region //////////////////////////////////

    // render --> start region ///////////////////////////////////
    return (
        <ActivityIndicator size={configManager.isAndroid() ? 100 : 'large'} color={color} hidesWhenStopped={false} />
    );
    // render --> end region /////////////////////////////////////
}

// props interface --> start region //////////////////////////////
interface ILoader {}
// props interface --> end region ////////////////////////////////
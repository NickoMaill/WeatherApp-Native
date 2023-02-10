import React from 'react'
import FullModalLayout from '../common/FullModalLayout';
import Title from '../common/Texted';

// singleton --> start region ////////////////////////////////////
// singleton --> end region //////////////////////////////////////

export default function DefaultCityModal ({ onPress }: IDefaultCityModal) {
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
        <FullModalLayout title='Ville par défaut' onPressClose={onPress}>
            <Title>Bonjour</Title>
        </FullModalLayout>
    );
    // render --> end region /////////////////////////////////////
}

// props interface --> start region //////////////////////////////
interface IDefaultCityModal {
    onPress: () => void
}
// props interface --> end region ////////////////////////////////
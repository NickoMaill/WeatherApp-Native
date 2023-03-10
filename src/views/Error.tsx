import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Regular } from '~/components/common/Texted';
import Icon from 'react-native-vector-icons/Feather';
import stylesResources from '~/resources/stylesResources';
import { useAppDispatch, useAppSelector } from '~/store/storeHooks';
import { showFooterSlice } from '~/store/AppContext/showFooter';
import apiManager from '~/managers/apiManager';
import weatherService from '~/services/weatherService';
import { useNavigation } from '@react-navigation/native';
import Loader from '~/components/common/Loader';
import useResources from '~/hooks/useResources';

export default function Error() {
    // singleton --> start region ////////////////////////////////
    // singleton --> end region //////////////////////////////////

    // hooks --> start region ////////////////////////////////////
    const Navigation = useNavigation();
    const DispatchReducer = useAppDispatch();
    const Resources = useResources();
    // hooks --> end region //////////////////////////////////////

    // state --> start region ////////////////////////////////////
    // const showFooter = useAppSelector((state) => state.showFooter.value);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // state --> end region //////////////////////////////////////

    // listeners --> start region ////////////////////////////////
    // listeners --> end region //////////////////////////////////

    // methods --> start region //////////////////////////////////
    const onRefresh = async () => {
        setIsLoading(true);
        const testConnection = await weatherService.checkConnection().finally(() => setIsLoading(false));

        if (testConnection) {
            Navigation.navigate('Home');
        }
    };
    // methods --> end region ////////////////////////////////////

    // useEffect --> start region ////////////////////////////////
    useEffect(() => {
        DispatchReducer(showFooterSlice.actions.setToFalse());
    }, []);
    // useEffect --> end region //////////////////////////////////

    // render --> start region ///////////////////////////////////
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/icons/networkError.png')} style={{ tintColor: '#ffffff', width: 100, height: 100 }} />
            <Regular style={{ textAlign: 'center' }}>{Resources.translate('error.errorMessage')}</Regular>
            {isLoading ? (
                <Loader />
            ) : (
                <TouchableOpacity onPress={onRefresh}>
                    <Icon name="refresh-cw" size={40} color={stylesResources.color.white} />
                </TouchableOpacity>
            )}
        </View>
    );
    // render --> end region /////////////////////////////////////
}

// styles --> start region //////////////////////////////////////
// styles --> end region ////////////////////////////////////////

import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import useStorage from '~/hooks/useStorage';
import { View } from 'react-native';
import { useAppDispatch } from '~/store/storeHooks';
import { showFooterSlice } from '~/store/AppContext/showFooter';
import { isAppConfiguredSlice } from '~/store/AppContext/isAppConfigured';
import { backgroundImageSlice } from '~/store/AppContext/backgroundImage';

export default function Splash() {
    const navigate = useNavigation();
    const Storage = useStorage();
    const DispatchReducer = useAppDispatch();

    const navigateToNextStep = async () => {
        const isConfigured = await Storage.isConfigured();

        if (isConfigured) {
            DispatchReducer(showFooterSlice.actions.setToTrue());
            DispatchReducer(isAppConfiguredSlice.actions.setValue(isConfigured));
            navigate.navigate('Home');
        } else {
            navigate.navigate('Hello');
        }
    };

    useEffect(() => {
        DispatchReducer(backgroundImageSlice.actions.setWhiteBackground());
    }, []);

    return (
        <View style={{ flex: 1 }} onTouchStart={navigateToNextStep}>
            <LottieView source={require('../assets/splash.json')} autoPlay loop={false} onAnimationFinish={navigateToNextStep} />
        </View>
    );
}

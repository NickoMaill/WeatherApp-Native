import React, { useContext } from 'react';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import useStorage from '~/hooks/useStorage';
import { WeatherContext } from '~/context/Context';
import { View } from 'react-native';

export default function Splash() {
    const navigate = useNavigation();
    const Storage = useStorage();
    const Context = useContext(WeatherContext);

    const navigateToNextStep = async () => {
        const isConfigured = await Storage.isConfigured();

        if (isConfigured) {
            Context.setShowFooter(true);
            navigate.navigate('Home');
        } else {
            navigate.navigate('Hello')
        }
    };

    return (
        <View style={{ flex: 1 }} onTouchStart={navigateToNextStep}>
            <LottieView source={require('../assets/splash.json')} autoPlay loop={false} onAnimationFinish={navigateToNextStep} />
        </View>
    );
}

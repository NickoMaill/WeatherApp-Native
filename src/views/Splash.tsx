import React from 'react';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

export default function Splash() {
    const navigate = useNavigation();

    const navigateToHome = () => {
        navigate.navigate('Home');
    };

    return <LottieView source={require('../assets/splash.json')} autoPlay loop={false} speed={1} onAnimationFinish={navigateToHome} />;
}

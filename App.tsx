import { useEffect, useLayoutEffect, useState } from 'react';
import { ImageBackground, StatusBar, StyleSheet } from 'react-native';
import { WeatherContext } from './src/context/Context';
import assetsWeatherManager from './src/managers/assetsWeatherManager';
import 'react-native-gesture-handler';
import { AppContextInterface } from './src/context/Context';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Router from './src/core/router/Router';
import useCachedResources from './src/hooks/useCachedResources';
import Loader from './src/components/common/Loader';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { customToastConfig } from './src/hooks/useNotification';
import configManager from '~/managers/configManager';
import * as NavigationBar from 'expo-navigation-bar';

export default function App() {
    const isResourcesLoaded = useCachedResources();
    const [backgroundImage, setBackgroundImage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isConfigured, setIsConfigured] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [showFooter, setShowFooter] = useState<boolean>(false);

    NavigationBar.addVisibilityListener(({ visibility }) => {
        if (visibility === 'visible') {
            setTimeout(() => {
                NavigationBar.setVisibilityAsync('hidden');
            }, 2000)
        }
    })

    const value: AppContextInterface = {
        backgroundImage,
        setBackgroundImage,
        isLoading,
        setIsLoading,
        isConfigured,
        setIsConfigured,
        favorites,
        setFavorites,
        showFooter, 
        setShowFooter
    };

    useEffect(() => {
        NavigationBar.setVisibilityAsync('hidden');
        NavigationBar.setBackgroundColorAsync('black')
        NavigationBar.setBorderColorAsync('black')
    }, [])

    return (
        <>
            {isResourcesLoaded ? (
                <WeatherContext.Provider value={value}>
                    <StatusBar barStyle={'light-content'} />
                    <SafeAreaProvider>
                        <SafeAreaView style={styles.droidSafeArea}>
                            <ImageBackground source={backgroundImage.length > 0 ? assetsWeatherManager.displayBackground(backgroundImage) : ''} style={styles.image}>
                                <Router />
                                <Toast config={customToastConfig} />
                            </ImageBackground>
                        </SafeAreaView>
                    </SafeAreaProvider>
                </WeatherContext.Provider>
            ) : (
                <Loader />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        height: configManager.dimension.height,
    },

    droidSafeArea: {
        flex: 1,
        paddingTop:  configManager.isIos() ? -48 : 0,
    },
});

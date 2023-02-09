import { useEffect, useState } from 'react';
import { ImageBackground, StatusBar, StyleSheet } from 'react-native';
import { WeatherContext } from './src/context/Context';
import assetsWeatherManager from './src/managers/assetsWeatherManager';
import 'react-native-gesture-handler';
import { AppContextInterface } from './src/context/Context';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Router from './src/core/router/Router';
import useCachedResources from './src/hooks/useCachedResources';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { customToastConfig } from './src/hooks/useNotification';
import configManager from '~/managers/configManager';
import * as NavigationBar from 'expo-navigation-bar';
import 'moment/locale/fr';
import 'moment/locale/en-gb';
import moment from 'moment';
import './src/resources/i18n/i18n'

export default function App() {
    const isResourcesLoaded = useCachedResources();
    const [backgroundImage, setBackgroundImage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isConfigured, setIsConfigured] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [showFooter, setShowFooter] = useState<boolean>(false);

    moment.locale('fr');

    NavigationBar.addVisibilityListener(({ visibility }) => {
        if (visibility === 'visible') {
        }
    });

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
        setShowFooter,
    };

    useEffect(() => {
        NavigationBar.setVisibilityAsync('hidden');
        NavigationBar.setBehaviorAsync('overlay-swipe');
    }, []);
    
    if (!isResourcesLoaded) {
        return null
    } else {
        return (
            <>
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
            </>
        );
    }

}

const styles = StyleSheet.create({
    image: {
        height: configManager.dimension.height,
    },

    droidSafeArea: {
        flex: 1,
        paddingTop: configManager.isIos() ? -48 : 0,
    },
});

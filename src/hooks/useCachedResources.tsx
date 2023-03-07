import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
    const [iseLoadingComplete, setIsLoadingComplete] = useState<boolean>(false);

    const loadResourcesAndDataAsync = async (): Promise<void> => {
        await Font.loadAsync({
            ...Icon.font,
            'lato-regular': require('../assets/fonts/Lato/Lato-Regular.ttf'),
            'lato-bold': require('../assets/fonts/Lato/Lato-Bold.ttf'),
            'lato-thin': require('../assets/fonts/Lato/Lato-Thin.ttf'),
        })
            .finally(() => {
                setIsLoadingComplete(true);
            })
            .catch((error) => {
                throw new Error('an happened while charging resources');
            });
    };

    useEffect(() => {
        loadResourcesAndDataAsync();
    }, []);

    return iseLoadingComplete;
}

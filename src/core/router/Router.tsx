import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '~/views/Splash';
import Footer from '~/components/Footer';
import Error from '~/views/Error';
import Favorites from '~/views/Favorites';
import HomePage from '~/views/HomePage';
import Setup from '~/views/Setup';
import { RootStackParamList } from './routerType';
import Hello from '~/views/Hello';
import { ImageBackground, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { useAppSelector } from '~/store/storeHooks';
import assetsWeatherManager from '~/managers/assetsWeatherManager';
import configManager from '~/managers/configManager';

export default function Router() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const showFooter = useAppSelector((state) => state.showFooter.value);
    const backgroundImage = useAppSelector((state) => state.backgroundImage.value);

    return (
        <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: 'transparent' } }}>
            <ImageBackground source={assetsWeatherManager.displayBackground(backgroundImage)} style={styles.image}>
                <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false, gestureDirection: 'horizontal' }}>
                    <Stack.Screen name="Splash" component={Splash} />
                    <Stack.Screen name="Hello" component={Hello} />
                    <Stack.Screen name="Home" component={HomePage} />
                    <Stack.Screen name="Favorites" component={Favorites} />
                    <Stack.Screen name="Setup" component={Setup} />
                    <Stack.Screen name="Error" component={Error} />
                </Stack.Navigator>
                {showFooter && <Footer />}
            </ImageBackground>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    image: {
        height: configManager.dimension.height,
    },
});

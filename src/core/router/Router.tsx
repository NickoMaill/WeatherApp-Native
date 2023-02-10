import { DefaultTheme, NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import Splash from '~/views/Splash';
import Footer from '~/components/Footer';
import { WeatherContext } from '~/context/Context';
import Error from '~/views/Error';
import Favorites from '~/views/Favorites';
import HomePage from '~/views/HomePage';
import Setup from '~/views/Setup';
import { RootStackParamList } from './routerType';
import Hello from '~/views/Hello';
import { ScrollView } from 'react-native';

export default function Router() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const Context = useContext(WeatherContext);

    return (
        <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: 'transparent' } }}>
            <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false, gestureDirection: 'horizontal' }}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Hello" component={Hello} />
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="Favorites" component={Favorites} />
                <Stack.Screen name="Setup" component={Setup} />
                <Stack.Screen name="Error" component={Error} />
            </Stack.Navigator>
            {Context.showFooter && <Footer />}
        </NavigationContainer>
    );
}

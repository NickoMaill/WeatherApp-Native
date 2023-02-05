import { useState } from 'react';
import { ImageBackground, StatusBar, StyleSheet } from 'react-native';
import { WeatherContext } from './src/context/Context';
import assetsWeatherManager from './src/managers/assetsWeatherManager';
import 'react-native-gesture-handler';
import { weatherTypeDto } from './src/contracts/weather';
import { AppContextInterface } from './src/contracts/context';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { dimension } from './src/constant/styleConstant';
import Router from './src/core/router/Router';

export default function App() {
    const [data, setData] = useState<weatherTypeDto | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isBackgroundLoading, setIsBackgroundLoading] = useState<boolean>(true);

    const value: AppContextInterface = {
        data,
        setData,
        isLoading,
        setIsLoading,
        favorites,
        setFavorites,
    };

    return (
        <WeatherContext.Provider value={value}>
			<StatusBar barStyle={'default'} />
            <SafeAreaProvider>
                <ImageBackground 
					onLoadStart={() => setIsBackgroundLoading(true)} 
					onLoadEnd={() => console.log('loaded')} 
					source={data ? assetsWeatherManager.displayBackground(data.icon) : ''} 
					style={styles.image}
				>
						<Router/>
                </ImageBackground>
            </SafeAreaProvider>
        </WeatherContext.Provider>
    );
}

const styles = StyleSheet.create({
    image: {
        height: dimension.height,
    },
});

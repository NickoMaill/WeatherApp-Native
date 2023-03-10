import { useEffect } from 'react';
import { AppState, StatusBar, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Router from '~/core/router/Router';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { customToastConfig } from '~/hooks/useNotification';
import configManager from '~/managers/configManager';
import 'moment/locale/fr';
import 'moment/locale/en-gb';
import moment from 'moment';
import '~/resources/i18n/i18n';
import stylesResources from '~/resources/stylesResources';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { Provider } from 'react-redux';
import Store from './store';

export default function App() {
    // singleton --> start region ////////////////////////////////
    moment.locale('fr');
    // singleton --> end region //////////////////////////////////

    // hooks --> start region ////////////////////////////////////
    // hooks --> end region //////////////////////////////////////

    // state --> start region ////////////////////////////////////
    const isResourcesLoaded = true;
    // state --> end region //////////////////////////////////////

    // listeners --> start region ////////////////////////////////
    AppState.addEventListener('change', (s) => {
        if (s === 'active' && configManager.isAndroid()) {
            SystemNavigationBar.navigationHide();
            SystemNavigationBar.setNavigationColor('#000000');
        }
    });
    // listeners --> end region //////////////////////////////////

    // useEffect --> start region ////////////////////////////////
    useEffect(() => {
        if (configManager.isAndroid()) {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor('#000000');
        }
        // Location.getCurrentPosition((info) => console.log(info));
    }, []);
    // useEffect --> end region //////////////////////////////////

    // render --> start region ///////////////////////////////////
    if (!isResourcesLoaded) {
        return null;
    } else {
        return (
            <>
                <SafeAreaProvider>
                    <Provider store={Store}>
                        <SafeAreaView style={styles.droidSafeArea}>
                            <Router />
                            <Toast config={customToastConfig} />
                        </SafeAreaView>
                    </Provider>
                </SafeAreaProvider>
            </>
        );
    }
    // render --> end region /////////////////////////////////////
}

// styles --> start region ///////////////////////////////////////
const styles = StyleSheet.create({
    image: {
        height: configManager.dimension.height,
    },

    droidSafeArea: {
        flex: 1,
        paddingTop: configManager.isIos() ? -48 : 0,
        backgroundColor: stylesResources.color.black,
    },
});
// styles --> end region /////////////////////////////////////////

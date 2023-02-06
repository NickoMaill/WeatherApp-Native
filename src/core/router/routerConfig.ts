import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './routerType';

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ['/'],
    config: {
        screens: {
            Splash: 'Splash',
            Home: 'Home',
            Favorites: 'Favorites',
            Setup: 'Setup',
            Error: 'Error',
            NotFound: '*',
        },
    },
};

export default linking;

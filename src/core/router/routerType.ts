import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type RootStackParamList = {
    Splash;
    Hello;
    Home: { cityId?: number; isNewDefaultCity?: boolean };
    Favorites;
    Setup;
    Error;
    NotFound;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;
export interface IHomeProps extends NativeStackScreenProps<RootStackParamList, 'Home'> {
    cityId: number;
}

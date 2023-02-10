import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type StackNavigatorParamList = {
    Home: undefined;
    Favorites: undefined;
    Setup: undefined;
    Error: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<StackNavigatorParamList>;

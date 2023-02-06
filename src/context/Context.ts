import { createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { weatherTypeDto } from '../contracts/weather';

export interface AppContextInterface {
    backgroundImage: string;
    setBackgroundImage: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    isConfigured: boolean;
    setIsConfigured: Dispatch<SetStateAction<boolean>>;
    favorites: string[];
    setFavorites: Dispatch<SetStateAction<string[]>>;
}

export const WeatherContext = createContext<AppContextInterface | null>(null);

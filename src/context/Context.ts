import { createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { weatherTypeDto } from '../types/weather';

export interface AppContextInterface {
    backgroundImage: string;
    setBackgroundImage: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    isConfigured: boolean;
    setIsConfigured: Dispatch<SetStateAction<boolean>>;
    favorites: string[];
    setFavorites: Dispatch<SetStateAction<string[]>>;
    showFooter: boolean, 
    setShowFooter: Dispatch<SetStateAction<boolean>>
}

export const WeatherContext = createContext<AppContextInterface | null>(null);

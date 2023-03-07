import { createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';

export interface AppContextInterface {
    isConfigured: boolean;
    setIsConfigured: Dispatch<SetStateAction<boolean>>;
    favorites: string[];
    setFavorites: Dispatch<SetStateAction<string[]>>;
    showFooter: boolean;
    setShowFooter: Dispatch<SetStateAction<boolean>>;
}

export const WeatherContext = createContext<AppContextInterface | null>(null);

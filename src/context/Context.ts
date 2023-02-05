import { createContext } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { weatherTypeDto } from '../contracts/weather';

interface AppContextInterface {
    data: weatherTypeDto | null;
    setData: Dispatch<SetStateAction<weatherTypeDto>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    favorites: string[];
    setFavorites: Dispatch<SetStateAction<string[]>>;
}

export const WeatherContext = createContext<AppContextInterface | null>(null);

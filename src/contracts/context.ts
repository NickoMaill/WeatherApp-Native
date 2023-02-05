import { Dispatch, SetStateAction } from 'react';
import { weatherResponseApi, weatherTypeDto } from './weather';

export interface AppContextInterface {
    data: weatherTypeDto | null;
    setData: Dispatch<SetStateAction<weatherTypeDto>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    favorites: string[];
    setFavorites: Dispatch<SetStateAction<string[]>>;
}

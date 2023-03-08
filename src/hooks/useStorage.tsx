import React from 'react';
import storageManager from '../managers/storageManager';

export default function useStorage(): IUseStorage {
    const getFavorite = async (): Promise<number[]> => {
        const data = await storageManager.getItem<number[]>('favorites');
        if (!data) {
            return null;
        }
        return data;
    };

    const addToFavorite = async (favorites: number[]): Promise<void> => {
        await storageManager.setItem('favorites', favorites);
    };

    const removeFavorite = async (favorites: number[], id: number): Promise<void> => {
        const array = favorites.filter((favorite) => favorite !== id);
        await storageManager.setItem('favorites', array);
    };

    const removeAllFavorites = async (): Promise<void> => {
        await storageManager.removeItem('favorites');
    };

    const setAppConfigured = async (bool: boolean) => {
        await storageManager.setItem('isConfigured', bool);
    };

    const isConfigured = async (): Promise<boolean> => {
        const bool = await storageManager.getItem('isConfigured');
        if (!bool) {
            return false;
        }
        return true;
    };

    const getDefaultCity = async (): Promise<number> => {
        const cityId = await storageManager.getItem<number>('defaultCity');
        if (!cityId) {
            return null;
        }
        return cityId;
    };

    const isDefaultCity = async (cityId: number): Promise<boolean> => {
        const storedId = await storageManager.getItem<number>('defaultCity');

        if (storedId === cityId) {
            return true
        } else {
            return false
        }
    }

    const setDefaultCity = async (cityId: number): Promise<void> => {
        await storageManager.setItem<number>('defaultCity', cityId);
    };

    return { 
        getFavorite, 
        addToFavorite, 
        removeFavorite, 
        removeAllFavorites, 
        isConfigured, 
        setAppConfigured, 
        isDefaultCity,
        getDefaultCity, 
        setDefaultCity 
    };
}

interface IUseStorage {
    getFavorite: () => Promise<number[]>;
    addToFavorite: (favorites: number[]) => Promise<void>;
    removeFavorite: (favorites: number[], id: number) => Promise<void>;
    removeAllFavorites: () => Promise<void>;
    isConfigured: () => Promise<boolean>;
    setAppConfigured: (bool: boolean) => Promise<void>;
    isDefaultCity: (cityId: number) => Promise<boolean>;
    getDefaultCity: () => Promise<number>;
    setDefaultCity: (cityId: number) => Promise<void>;
}

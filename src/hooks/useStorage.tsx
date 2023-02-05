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

    const isConfigured = async (): Promise<boolean> => {
        const bool = await storageManager.getItem('isConfigured');
        if (!bool) {
            return false;
        }
        return true;
    };

    return { getFavorite, addToFavorite, removeFavorite, removeAllFavorites, isConfigured };
}

interface IUseStorage {
    getFavorite: () => Promise<number[]>;
    addToFavorite: (favorites: number[]) => Promise<void>;
    removeFavorite: (favorites: number[], id: number) => Promise<void>;
    removeAllFavorites: () => Promise<void>;
    isConfigured: () => Promise<boolean>;
}

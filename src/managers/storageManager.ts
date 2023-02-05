import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
import { RecursiveKeyOf } from '../core/types/common';

type StorageNameReference = {
    favorites;
    isConfigured
};

class StorageManager {
    public async getItem<T>(key: RecursiveKeyOf<StorageNameReference>): Promise<T> {
        const data = await AsyncStorage.getItem(key);
        const dataDecoded = JSON.parse(decodeURIComponent(data));

        if (!dataDecoded) {
            return null;
        }

        return dataDecoded as T;
    }

    public async getMultipleItem(array: RecursiveKeyOf<StorageNameReference>[]): Promise<readonly KeyValuePair[] | null> {
        const items = await AsyncStorage.multiGet(array);

        if (!items) {
            return null;
        }

        return items;
    }

    public async setItem<T>(key: RecursiveKeyOf<StorageNameReference>, value: T): Promise<void> {
        const out = JSON.stringify(value);
        await AsyncStorage.setItem(key, out);
    }

    public async removeItem(key: RecursiveKeyOf<StorageNameReference>): Promise<void> {
        await AsyncStorage.removeItem(key);
    }

    public async mergeItem<T>(key: string, value: T): Promise<void> {
        const out = JSON.stringify(value);
        await AsyncStorage.mergeItem(key, out);
    }

    public async getAllKeys(): Promise<readonly string[]> {
        const keys = await AsyncStorage.getAllKeys();
        return keys;
    }
}

export default new StorageManager();

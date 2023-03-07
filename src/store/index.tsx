import { configureStore } from '@reduxjs/toolkit';
import backgroundImage from './AppContext/backgroundImage';
import isAppConfigured from './AppContext/isAppConfigured';
import isLoading from './AppContext/isLoading';
import showFooter from './AppContext/showFooter';

const store = configureStore({
    reducer: {
        isLoading: isLoading,
        backgroundImage: backgroundImage,
        isAppConfigured: isAppConfigured,
        showFooter: showFooter,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

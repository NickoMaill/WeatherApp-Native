import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultScreenEnum } from '~/managers/assetsWeatherManager';
import { RootState } from '~/store';

interface BackgroundImageState {
    value: string;
}

const initialState: BackgroundImageState = {
    value: DefaultScreenEnum.WHITE_SCREEN,
};

export const backgroundImageSlice = createSlice({
    name: 'backgroundImage',
    initialState: initialState,
    reducers: {
        setBackground: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        setWhiteBackground: (state) => {
            state.value = DefaultScreenEnum.WHITE_SCREEN;
        },
        setBlackBackground: (state) => {
            state.value = DefaultScreenEnum.BLACK_SCREEN;
        },
    },
});

export const { setBackground, setWhiteBackground, setBlackBackground } = backgroundImageSlice.actions;
export const selectBackgroundImage = (state: RootState) => state.backgroundImage.value;
export default backgroundImageSlice.reducer;

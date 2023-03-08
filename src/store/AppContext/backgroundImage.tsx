import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import stylesResources from '~/resources/stylesResources';
import { RootState } from '~/store';

interface BackgroundImageState {
    value: string;
}

const initialState: BackgroundImageState = {
    value: '99w',
};

export const backgroundImageSlice = createSlice({
    name: 'backgroundImage',
    initialState: initialState,
    reducers: {
        setBackground: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        setWhiteBackground: (state) => {
            state.value = stylesResources.backgroundImageCode.white;
        },
        setBlackBackground: (state) => {
            state.value = stylesResources.backgroundImageCode.black;
        },
    },
});

export const { setBackground, setWhiteBackground, setBlackBackground } = backgroundImageSlice.actions;
export const selectBackgroundImage = (state: RootState) => state.backgroundImage.value;
export default backgroundImageSlice.reducer;

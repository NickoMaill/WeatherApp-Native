import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store';


interface BackgroundImageState {
    value: string | null;
}

const initialState: BackgroundImageState = {
    value: null,
}

export const backgroundImageSlice = createSlice({
    name: 'backgroundImage',
    initialState: initialState,
    reducers: {
        setBackground: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        setDefaultBackground: (state) => {
            state.value = null;
        }
    },
});

export const { setBackground, setDefaultBackground } = backgroundImageSlice.actions;
export const selectBackgroundImage = (state: RootState) => state.backgroundImage.value;
export default backgroundImageSlice.reducer;

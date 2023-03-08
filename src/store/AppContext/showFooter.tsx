import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '~/store';

interface ShowFooterState {
    value: boolean;
}

const initialState: ShowFooterState = {
    value: false,
};

export const showFooterSlice = createSlice({
    name: 'showFooter',
    initialState: initialState,
    reducers: {
        setToFalse: (state) => {
            state.value = false;
        },
        setToTrue: (state) => {
            state.value = true;
        },
    },
});

export const { setToFalse, setToTrue } = showFooterSlice.actions;
export const selectShowFooter = (state: RootState) => state.showFooter.value;
export default showFooterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '~/store';

interface IsLoadingState {
    value: boolean;
}

const initialState: IsLoadingState = {
    value: true,
};

export const isLoadingSlice = createSlice({
    name: 'isLoading',
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

export const { setToFalse, setToTrue } = isLoadingSlice.actions;
export const selectIsLoading = (state: RootState) => state.isLoading.value;
export default isLoadingSlice.reducer;

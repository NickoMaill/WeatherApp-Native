import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '~/store';

interface IsAppConfiguredState {
    value: boolean;
}

const initialState: IsAppConfiguredState = {
    value: true,
};

export const isAppConfiguredSlice = createSlice({
    name: 'isAppConfigured',
    initialState: initialState,
    reducers: {
        setToFalse: (state) => {
            state.value = false;
        },
        setToTrue: (state) => {
            state.value = true;
        },
        setValue: (state, actions) => {
            state.value = actions.payload;
        },
    },
});

export const { setToFalse, setToTrue } = isAppConfiguredSlice.actions;
export const selectIsAppConfigured = (state: RootState) => state.isAppConfigured.value;
export default isAppConfiguredSlice.reducer;

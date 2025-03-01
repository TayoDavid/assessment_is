import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const biometricSlice = createSlice({
    name: 'biometric',
    initialState: {
        value: false
    },
    reducers: {
        toggleBiometricEnabled: state => {
            state.value = !state.value
        }
    }
})

export const { toggleBiometricEnabled } = biometricSlice.actions

// export const biometricSelector = (state: boolean) => state;
export const biometricSelector = (state: { biometric: { value: boolean } }) => state.biometric.value;

export default biometricSlice.reducer
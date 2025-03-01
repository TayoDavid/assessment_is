import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'


export interface AuthUser {
    fullname: string
    username: string
    password: string
    id: string
}

export interface UserState {
    user: AuthUser | undefined
}

const initialState: UserState = {
    user: undefined
}

const authUserSlice = createSlice({
    name: 'authUser',
    initialState: initialState,
    reducers: {
        addAuthUser: (state, action: PayloadAction<AuthUser>) => {
            console.log(action.payload);
            state.user = action.payload
        }
    }
})

export const { addAuthUser } = authUserSlice.actions

export const userSelector = (state: UserState): AuthUser | undefined => state.user

export default authUserSlice.reducer

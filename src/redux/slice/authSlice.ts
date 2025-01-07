import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface LoginData {
    _id: string
    first_name: string
    last_name: string
    email: string
    role: string
    status: string
}

interface authData {
    loginData: LoginData | null
}

const initialState: authData = {
  loginData: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<null>) => {            
            state.loginData = action.payload
        },
        // logout: (state) => {
        //     state.loginData = null
        //     localStorage.removeItem('token') // Optional: remove token on logout
        //     toast.success('Logged out successfully')
        // }
    }
})

export const { login } = authSlice.actions

export default authSlice.reducer
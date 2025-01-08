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
    loginData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : null
}

export const authSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<null>) => {            
            state.loginData = action.payload
        }, 
        logout: (state) => {
            state.loginData = null;
            localStorage.removeItem('token')
            localStorage.removeItem('userData'); // Remove user data from localStorage
        }
    }
})

export const { setUserData, logout } = authSlice.actions

export default authSlice.reducer
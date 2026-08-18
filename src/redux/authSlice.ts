import { createSlice , type PayloadAction  } from "@reduxjs/toolkit";

// Define the user type

interface User {

    id: string,
    email: string,
    name: string,
    surname: string ,
    cellNumber: string

}

// Define the authentication state type

interface AuthState{

    user : User | null,
    isAuthenticated: boolean,
    token : string,
}

// Initial State

const initialState : AuthState = {

    user : null,
    isAuthenticated : false,
    token : ''
}

// Create Auth Slice

const authSlice = createSlice({

    name: 'auth',
    initialState,
     reducers : {

        // set User when loged in

        setUser :(state , action:PayloadAction<User>) =>{

           state.user = action.payload
        },

        // Set authenticaion  token

        setToken: (state , action:PayloadAction<string>) =>{

            state.token = action.payload
        },

        // Logout User

        logout: (state) => {

            state.user = null
            state.isAuthenticated = false,
            state.token = ''
        },
     },


});


export const {setUser , setToken , logout} = authSlice.actions
export default authSlice.reducer
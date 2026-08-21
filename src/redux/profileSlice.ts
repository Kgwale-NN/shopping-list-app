import { createSlice ,type  PayloadAction } from "@reduxjs/toolkit";

interface  Profile{

    id: string,
    email: string,
    name: string,
    surname: string,
    cellNumber: string

}

interface ProfileState{

    data: Profile | null,
    loading: boolean,
    error: string
    
}

const initialState: ProfileState ={

    data: null,
    loading: false,
    error: ''

}

const profileSlice = createSlice ({

    name: 'profile',
    initialState,
    reducers :{

        // profile data

        setProfile: (state , action:PayloadAction<Profile>) =>{

            state.data = action.payload
        },

        // update Profile

        updateProfile: (state , action:PayloadAction<Profile>) =>{

             if(state.data){

                state.data = {...state.data,... action.payload}
             }
        },

        // set loading state

        setLoading: (state , action:PayloadAction<boolean>) => {

            state.loading = action.payload
        },

        setError: (state , action:PayloadAction<string>) => {

            state.error = action.payload
        },

        // clear profile data

        clearProfile: (state) =>{

            state.data = null
            state.loading = false
            state.error = ''
        }

    }
})

export const {setProfile,updateProfile,setLoading,setError,clearProfile} = profileSlice.actions
export default profileSlice.reducer
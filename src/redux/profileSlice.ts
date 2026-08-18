import { createSlice , type PayloadAction } from "@reduxjs/toolkit";

// I defined the profile type

interface Profile {

    id :string,
    email: string,
    name: string,
    surname : string,
    cellNumber : string

}

// Profile State type

interface ProfileState {

    data : Profile | null,
    loading: boolean ,
    error: string
}

// Initail state

const initialState: ProfileState = {

    data : null,
    loading : false,
    error : ' '

}


// The profile slice

const  profileSlice = createSlice({

    name : 'Profile',
    initialState,
    reducers : {

        // Data of the profile

        setProfile: (state , action: PayloadAction<Profile>) => {

            state.data = action.payload
        },

          // Update profile

        updateProfile: (state , action: PayloadAction<Partial<Profile>>) => {
           
            if(state.data){

                state.data = {... state.data , ...action.payload}
            }

        },


       //  Loading state is set 

        setLoading: (state, action:PayloadAction<boolean>) => {

            state.loading = action.payload
        },


        setError: (state , action:PayloadAction<string>) =>{

            state.error = action.payload

        },

        // clear profile data 


        clearProfile: (state) => {

            state.data = null,
            state.loading = false,
            state.error = ''

        },


    },
})

export const {setProfile,updateProfile,setLoading,setError} = profileSlice.actions
export default profileSlice.reducer


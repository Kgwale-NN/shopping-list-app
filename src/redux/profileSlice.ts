import { createSlice , type PayloadAction } from "@reduxjs/toolkit";

interface Profile{

    id:string,
    email:string,
    name:string,
    surname:string,
    cellNumber:string
}

interface ProfileState{

    data : Profile | null,
    loading: boolean,
    error: string
}

const initialState: ProfileState ={

        data : null,
        loading: false,
        error: ''
 
}

const profileSlice = createSlice ({

    name:'profile',
    initialState,
    reducers:{

        setProfile: (state,action:PayloadAction<Profile>) =>{

            state.data = action.payload
        },

        // update the profile

        setUpdateProfile: (state,action:PayloadAction<Profile>) => {

              state.data = state.data ? {... state.data, ... action.payload} : action.payload

        },

        setLoading: (state,action:PayloadAction<boolean>) => {

            state.loading = action.payload
        },

        setError: (state,action:PayloadAction<string>) =>{

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

export const {setProfile,setUpdateProfile,setLoading,setError,clearProfile} = profileSlice.actions
export default profileSlice.reducer


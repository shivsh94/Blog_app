import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null, 
    };  

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUser:(state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        deleteUser:(state) => {
            state.currentUser = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");

        }
        
    }
});

export const { setUser, deleteUser } = loginSlice.actions;
export default loginSlice.reducer;
import {configureStore} from '@reduxjs/toolkit';
import loginSlice from '../features/Login/loginSlice';

export default configureStore({
    reducer: {
        login: loginSlice,
    },
})
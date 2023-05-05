import {configureStore} from '@reduxjs/toolkit';
import authReducers from './AuthSlice';


export const  store =configureStore({
    reducer:{
        auth:authReducers
    }
})
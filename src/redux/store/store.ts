import {configureStore} from "@reduxjs/toolkit";
import personReducer from '../slices/personSlice';

export const store = configureStore({
    reducer:{
        personList: personReducer,
    }
})

export type AppDispatch = typeof store.dispatch
import {configureStore} from "@reduxjs/toolkit";
import personReducer from '../slices/personSlice';
import formReducer from '../slices/formSlice';

export const store = configureStore({
    reducer:{
        personList: personReducer,
        addPersonForm: formReducer
    }
})

export type AppDispatch = typeof store.dispatch
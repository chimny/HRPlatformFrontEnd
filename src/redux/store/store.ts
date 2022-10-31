import {configureStore} from "@reduxjs/toolkit";
import personReducer from '../slices/personSlice';
import updateFormReducer from '../slices/updateFormSlice'

export const store = configureStore({
    reducer:{
        personList: personReducer,
        updatePersonForm: updateFormReducer
    }
})

export type AppDispatch = typeof store.dispatch
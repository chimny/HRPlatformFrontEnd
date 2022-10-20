import {configureStore} from "@reduxjs/toolkit";
import personReducer from '../slices/personSlice';
import formReducer from '../slices/formSlice';
import updateFormReducer from '../slices/updateFormSlice'

export const store = configureStore({
    reducer:{
        personList: personReducer,
        addPersonForm: formReducer,
        updatePersonForm: updateFormReducer
    }
})

export type AppDispatch = typeof store.dispatch
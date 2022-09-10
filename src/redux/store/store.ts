import {configureStore} from "@reduxjs/toolkit";
import personReducer from '../slices/personSlice'
import {StoreInterface} from "./storeType";

export const store  = configureStore({
    reducer:{
        personList: personReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
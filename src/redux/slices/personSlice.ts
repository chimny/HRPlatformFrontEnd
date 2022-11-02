import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {UsersState} from "../store/storeType";


export const getPeopleList = createAsyncThunk(
    'personList/getPeopleList',
    async () => {
        const res = await fetch(`http://localhost:3001/personList`);
        return await res.json()
    }
)

export const removePerson = createAsyncThunk(
    'personList/removePerson',
    async (id: string) => {
        await fetch(`http://localhost:3001/personList/deletePerson/${id}`, {method: 'DELETE'});
    }
)


const initialState: UsersState = {
    receivedData: {personPositionData: []},
    status: null
}


export const personSlice = createSlice({
    name: 'personList',
    initialState,
    reducers: {
        removePersonFromState: (state: UsersState, {payload}): UsersState => {
            const {id} = payload;
            const filteredPersonList = state.receivedData.personPositionData.filter(el => el.personId !== id);
            return {...state, receivedData: {personPositionData: filteredPersonList}}
        },


    },
    extraReducers: (builder) => {
        builder.addCase(getPeopleList.pending, (state) => {
            state.status = 'pending';

        })
        builder.addCase(getPeopleList.fulfilled, (state, {payload}) => {
            state.status = 'succeeded';
            state.receivedData = payload
        })
        builder.addCase(getPeopleList.rejected, (state) => {
            state.status = 'failed'
        })
    },
})

export const {removePersonFromState} = personSlice.actions;



export default personSlice.reducer



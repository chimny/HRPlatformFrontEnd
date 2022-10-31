import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {FormInterface} from "../../components/Form/SingleInput";
import { InsertedPersonRes } from "../../../../backend/types/person";
import {getPeopleList} from "./personSlice";
import {UpdateFormStoreInterface, UsersState} from "../store/storeType";


// const initialState: FormInterface[]
const formInitialState: FormInterface[] = [{label:'name',value:'',error:false,errorMessage:'',inputFieldType:'textField'},
    {label:'surname',value:'',error:false,errorMessage:'',inputFieldType:'textField'},
    {label:'salary',value:'',error:false,errorMessage:'',inputFieldType:'textField'},
    {label:'position',value:'',error:false,errorMessage:'',inputFieldType:'select'},
]

//@todo rewrite logic to migrate json data into formInitial state
const initialState: UpdateFormStoreInterface = {
    receivedData: {chosenPersonData: null},
    formData: formInitialState,
    status: null
}




export const receivePerson = createAsyncThunk(
    'updatePersonForm/receivePerson',
    async (personID:string,thunkAPI) => {

        const res = await fetch(`http://localhost:3001/personList/chosenPerson/${personID}`);
        return await res.json()

    }
)



export const updateFormSlice = createSlice({
    name: 'updatePersonForm',
    initialState,
    reducers: {
        //
        updateForm: (state:any, {payload}) => {
            const receivedStateData = state.receivedData.chosenPersonData
            const {label,value} = payload;
            return state.formData = state.formData.map((el:any) => el.label === label ? {...el,value:value}: {...el})
        },



    },


    extraReducers: (builder) => {
        builder.addCase(receivePerson.pending, (state) => {
            state.status = 'pending';

        })
        builder.addCase(receivePerson.fulfilled, (state, {payload}) => {
            state.status = 'succeeded';
            state.receivedData = payload
        })
        builder.addCase(receivePerson.rejected, (state) => {
            state.status = 'failed'
        })
    },

})


export default updateFormSlice.reducer



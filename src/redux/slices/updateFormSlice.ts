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




// export const submitUpdatePerson = createAsyncThunk(
//     'updatePersonForm/submitUpdatePerson',
//     async () => {
//
//         const res = await fetch(`http://localhost:3001/addPerson`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(initialState),
//         });
//         const responseMes: InsertedPersonRes = await res.json();
//
//     }
// )


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
        //
        // setError: (state,{payload})=>{
        //     const {label, errorMsg} = payload;
        //     // return state.map( el => el.label === label ? {...el,error:true,errorMessage:errorMsg}: {...el})
        // },
        //
        // clearError: (state,{payload})=>{
        //     const {label} = payload;
        //     // return state.map( el => el.label === label ? {...el,error:false,errorMessage:''}: {...el})
        // },
        //
        // restartForm: ()=> initialState,
        //


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

// export const {updateForm,restartForm,setError,clearError} = formSlice.actions;

export default updateFormSlice.reducer



import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {FormInterface} from "../../components/AddPerson/SingleInput";
import { InsertedPersonRes } from "../../../../backend/types/person";
import {getPeopleList} from "./personSlice";


// const initialState: FormInterface[]
/*const initialState: any = [{label:'name',value:'',error:false,errorMessage:'',inputFieldType:'textField'},
    {label:'surname',value:'',error:false,errorMessage:'',inputFieldType:'textField'},
    {label:'salary',value:'',error:false,errorMessage:'',inputFieldType:'textField'},
    {label:'position',value:'',error:false,errorMessage:'',inputFieldType:'select'},
]*/

const initialState: any = {
    receivedData: undefined,
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
        // const responseMes: InsertedPersonRes = await res.json();

        return await res.json()




    }
)



export const updateFormSlice = createSlice({
    name: 'updatePersonForm',
    initialState,
    reducers: {
        //
        // updateForm: (state:FormInterface[], {payload}) => {
        //     const {label,value} = payload;
        //     return state.map(el => el.label === label ? {...el,value:value}: {...el})
        // },
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



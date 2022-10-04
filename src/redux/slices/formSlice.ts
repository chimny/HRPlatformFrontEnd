import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {FormInterface} from "../../components/AddPerson/SingleInput";
import { InsertedPersonRes } from "../../../../backend/types/person";



const initialState: FormInterface[] = [{label:'name',value:'',error:false,errorMessage:'',inputFieldType:'textField'},
    {label:'surname',value:'',error:false,errorMessage:'',inputFieldType:'textField'},
    {label:'salary',value:'',error:false,errorMessage:'',inputFieldType:'textField'},
    {label:'position',value:'',error:false,errorMessage:'',inputFieldType:'select'},
]

export const submitPerson = createAsyncThunk(
    'personForm/submitPerson',
    async () => {

        console.log('ok');


            const res = await fetch(`http://localhost:3001/addPerson`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(initialState),
            });
            const responseMes: InsertedPersonRes = await res.json();

    }
)



export const formSlice = createSlice({
    name: 'personForm',
    initialState,
    reducers: {

        updateForm: (state, {payload}) => {
            const {label,value} = payload;
            return state.map(el => el.label === label ? {...el,value:value}: {...el})
        },

        restartForm: ()=> initialState,



    },
})

export const {updateForm,restartForm} = formSlice.actions;

export default formSlice.reducer



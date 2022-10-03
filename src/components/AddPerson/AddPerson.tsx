import {FormEvent, useState} from "react"
import {InsertedPersonRes} from "../../../../backend/types/person";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {FormControl, FormLabel,FormHelperText} from '@mui/material';

import './styledForm.css'
import {Spinner} from "../Spinner/Spinner";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import {Alert} from "@mui/material";
import {SeverityStatus} from "./interface/severityStatusInterface";
import {updateForm} from "../../Utils/functions/updateForm";
import {AddPersonType} from "./interface/formInterface";
import {positionList} from "../../data/positionList";
import {response, validationFunction} from "./functions/validationFunction";
import {FormInterface, SingleInput} from "./SingleInput";
import {useSelector} from "react-redux";


export const AddPerson = () => {

    const initialState: AddPersonType = {
        name: '',
        surName: '',
        position: '',
        salary: '',
    };


    const updatedInitialState: FormInterface[] = [{label:'name',value:'',error:false,errorMessage:'',inputFieldType:'textField'},
        {label:'surname',value:'',error:false,errorMessage:'',inputFieldType:'textField'},
        {label:'salary',value:'',error:false,errorMessage:'',inputFieldType:'textField'},
        {label:'position',value:'',error:false,errorMessage:'',inputFieldType:'select'},
    ]


    const reduxValue : FormInterface[] = useSelector((state:any) => state.addPersonForm);

    console.log(reduxValue)


    const initialSeverityStatusState: SeverityStatus = {
        status: 'error',
        message: 'unexpected error, please try again later'
    }

    const [form, setForm] = useState<AddPersonType>(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [severityStatus, setSeverityStatus] = useState<SeverityStatus>(initialSeverityStatusState)



    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const sendForm = async (e: FormEvent) => {


        //@todo validation function
        // setName (validationFunction('name',form.name))



        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3001/addPerson`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const responseMes: InsertedPersonRes = await res.json();

            setSeverityStatus({status: responseMes.status, message: responseMes.message})


        } catch (e) {
            console.error(`unexpected error occured ${e}`);
            setSeverityStatus(initialSeverityStatusState)
        } finally {
            setLoading(false);
            handleClick();
            setForm(initialState);
        }
    };


    if (loading) {
        return (
            <Spinner/>
        )
    }


    return (<Container
            maxWidth="sm" sx={{padding: '20px'}}
        >
            <form className={'styledForm'}>

                {reduxValue.map(({label,value,error,errorMessage,inputFieldType})=>{
                    return(
                        <SingleInput key={label} label={label} value={value} errorMessage={errorMessage} inputFieldType={inputFieldType} error={error} />
                    )
                })}

                <Button variant="contained" sx={{margin: '12px auto'}} onClick={sendForm}>Send</Button>
            </form>

            <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>

                <Alert onClose={handleClose} severity={severityStatus.status} sx={{width: '100%'}}>
                    {severityStatus.message}
                </Alert>

            </Snackbar>


        </ Container>
    )
}
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import {FormEvent, useState} from "react"
import {InsertedPersonRes, PersonEntity} from "../../../../backend/types/person"

import './styledForm.css'
import {Spinner} from "../Spinner/Spinner";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import {Alert} from "@mui/material";
import {SeverityStatus} from "./interface/severityStatusInterface";
import {updateForm} from "../../Utils/functions/updateForm";


export const AddPerson = () => {


    const initialState: PersonEntity = {
        name: '',
        surName: ''
    };

    const initialSeverityStatusState: SeverityStatus = {status: 'error', message: 'unexpected error, please try again later'}


    const [form, setForm] = useState<PersonEntity>(initialState);
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
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3001/persons/addPerson`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const responseMes: InsertedPersonRes = await res.json();

         setSeverityStatus({status:responseMes.status, message:responseMes.message})


        }
        catch (e) {
            console.error(`unexpected error occured ${e}`);
            setSeverityStatus(initialSeverityStatusState)
        }
        finally {
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


    return (<Container maxWidth="sm" sx={{padding: '20px'}}>
            <form className={'styledForm'}>
                <TextField id="outlined-basic" label="Name" variant="outlined" value={form.name} sx={{padding: '8px'}}
                          onChange={e => updateForm('name', e.target.value,form,setForm)}/>
                <TextField id="outlined-basic" label="SurName" variant="outlined" value={form.surName}
                           sx={{padding: '8px'}}
                           onChange={e => updateForm('surName', e.target.value,form,setForm)}/>

                <Button variant="contained" sx={{margin: '0 auto'}} onClick={sendForm}>Send</Button>
            </form>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>

                <Alert onClose={handleClose} severity={severityStatus.status} sx={{width: '100%'}}>
                    {severityStatus.message}
                </Alert>

            </Snackbar>


        </ Container>
    )
}
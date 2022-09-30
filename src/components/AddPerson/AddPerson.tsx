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


export const AddPerson = () => {

    const initialState: AddPersonType = {
        name: '',
        surName: '',
        position: '',
        salary: '',
    };

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
            <div className={'styledForm'}
                 // fullWidth={true}
            >

                <TextField error   helperText="Name can't be empty." id="outlined-basic" label="Name" variant="outlined" value={form.name} sx={{padding: '8px'}}
                           onChange={e => updateForm('name', e.target.value, form, setForm)}/>

                <TextField  error   helperText="Surname can't be empty." id="outlined-basic" label="Surname" variant="outlined" value={form.surName}
                           sx={{padding: '8px'}}
                           onChange={e => updateForm('surName', e.target.value, form, setForm)}/>

                <TextField error   helperText="Please provide salary"  id="outlined-basic" label="Salary" variant="outlined" value={form.salary}
                           sx={{padding: '8px'}}
                           onChange={e => updateForm('salary', e.target.value, form, setForm)}/>

                <FormControl className={'styledForm'} fullWidth={true} error>
                <FormLabel id="position-label"   >Position</FormLabel>
                <Select
                    error
                    labelId="position-label"
                    id="demo-simple-select"
                    value={form.position}
                    label="Position"
                    onChange={e => updateForm('position', e.target.value, form, setForm)}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <em>Position</em>;
                        }

                        return selected;
                    }}
                >

                    {positionList.map((position) => {
                        return (
                            <MenuItem key={position} value={position}>{position}</MenuItem>
                        )
                    })}


                </Select>
                    <FormHelperText>Please choose the position</FormHelperText>
                </FormControl>
                <Button variant="contained" sx={{margin: '12px auto'}} onClick={sendForm}>Send</Button>
            </div>

            <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>

                <Alert onClose={handleClose} severity={severityStatus.status} sx={{width: '100%'}}>
                    {severityStatus.message}
                </Alert>

            </Snackbar>


        </ Container>
    )
}
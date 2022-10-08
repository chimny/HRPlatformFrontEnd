import {FormEvent, useState} from "react"
import {InsertedPersonRes} from "../../../../backend/types/person";
import {useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import './styledForm.css'
import {Spinner} from "../Spinner/Spinner";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import {Alert} from "@mui/material";
import {SeverityStatus} from "./interface/severityStatusInterface";
import {FormInterface, SingleInput} from "./SingleInput";
import {useSelector} from "react-redux";
import {restartForm} from "../../redux/slices/formSlice";
import {AppDispatch} from "../../redux/store/store";
import {validationFunction} from "./functions/validationFunction";
import { NewPersonPosition } from "../../../../backend/types/newPesonPosition";
import {availableLabelsArr} from "./types/availableLabels";

export const AddPerson = () => {


    const reduxFormData: FormInterface[] = useSelector((state: any) => state.addPersonForm);
    const dispatch = useDispatch<AppDispatch>();

    const initialSeverityStatusState: SeverityStatus = {
        status: 'error',
        message: 'unexpected error, please try again later'
    }

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

        //@todo work with types - use typeof
        const newData: NewPersonPosition | {} = {};


        /*
       loop below provides FE validation, converts redux state into new object set to send
        */
        for (const input of reduxFormData) {
          validationFunction(input.label, input.value,dispatch)
            // if(typeof input.label === typeof availableLabels)
            if(availableLabelsArr.includes(input.label)){
                newData[`${input.label}`] = input.value
            }
        }







        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3001/addPerson`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
            const responseMes: InsertedPersonRes = await res.json();

            setSeverityStatus({status: responseMes.status, message: responseMes.message})

            dispatch(restartForm());
        } catch (e) {
            console.error(`unexpected error occured ${e}`);
            setSeverityStatus(initialSeverityStatusState)
        } finally {
            setLoading(false);
            handleClick();
            // setForm(initialState);

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

                {reduxFormData.map(({label, value, error, errorMessage, inputFieldType}) => {
                    return (
                        <SingleInput key={label} label={label} value={value} errorMessage={errorMessage}
                                     inputFieldType={inputFieldType} error={error}/>
                    )
                })}

                <Button variant="contained" sx={{margin: '12px auto'}}
                        onClick={sendForm}

                >Send</Button>
            </form>

            <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>

                <Alert onClose={handleClose} severity={severityStatus.status} sx={{width: '100%'}}>
                    {severityStatus.message}
                </Alert>

            </Snackbar>


        </ Container>
    )
}
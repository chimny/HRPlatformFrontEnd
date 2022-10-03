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
import {AddPersonType} from "./interface/formInterface";
import {FormInterface, SingleInput} from "./SingleInput";
import {useSelector} from "react-redux";
import {submitPerson} from "../../redux/slices/formSlice";
import {AppDispatch} from "../../redux/store/store";


export const AddPerson = () => {



    const reduxValue : FormInterface[] = useSelector((state:any) => state.addPersonForm);


    const initialSeverityStatusState: SeverityStatus = {
        status: 'error',
        message: 'unexpected error, please try again later'
    }

    // const [form, setForm] = useState<AddPersonType>(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [severityStatus, setSeverityStatus] = useState<SeverityStatus>(initialSeverityStatusState)


    const dispatch = useDispatch<AppDispatch>();

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

        const receivedData = reduxValue

        const newData :any = {};

        for (const input of receivedData){
         newData[`${input.label}`] = input.value
        }




        e.preventDefault();
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

                {reduxValue.map(({label,value,error,errorMessage,inputFieldType})=>{
                    return(
                        <SingleInput key={label} label={label} value={value} errorMessage={errorMessage} inputFieldType={inputFieldType} error={error} />
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
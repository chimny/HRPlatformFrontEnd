import {SeverityStatus} from "./interface/severityStatusInterface";
import {FormInterface, SingleInput} from "./SingleInput";
import {UpdateFormStoreInterface, PersonStoreInterface} from "../../redux/store/storeType";
import {useDispatch, useSelector} from "react-redux";
import {Spinner} from "../Spinner/Spinner";
import {AppDispatch} from "../../redux/store/store";
import {validationFunction} from "./functions/validationFunction";
import {Alert, Button, Container, Snackbar} from "@mui/material";
import {FormEvent, useEffect, useState} from "react";
import { InsertedPersonRes } from "../../../../backend/types/person";
// import {restartForm} from "../../redux/slices/updateFormSlice";
import { Link } from "react-router-dom";
import {getPeopleList} from "../../redux/slices/personSlice";
import {useParams} from "react-router";
import {receivePerson} from "../../redux/slices/updateFormSlice";


export const unexpectedSeverityStatusState: SeverityStatus = {
    status: 'error',
    message: 'unexpected error, please try again later'
}

export const frontEndErrValidationSeverityStatusState: SeverityStatus = {
    status: 'error',
    message: 'please correct highlighted fields'
}





export const UpdatePersonForm = () => {
    const dispatch = useDispatch<AppDispatch>();

    let { personID } = useParams();







    useEffect(() => {
        dispatch(receivePerson(personID as string))
    }, [dispatch])


    //@todo review data below
    const receivedData =  useSelector((state: UpdateFormStoreInterface) => state.receivedData.chosenPersonData);

    // const receivedData = reduxValue
    // const newData: any = {};

    // if(receivedData){
    //     for (const record in receivedData) {
    //         // validationFunction(input.label, input.value, dispatch)
    //         // newData[`${input.label}`] = input.value
    //         console.log(Object.keys)
    //     }
    //
    // }



    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [severityStatus, setSeverityStatus] = useState<SeverityStatus>(frontEndErrValidationSeverityStatusState)




    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    //@todo review post form - still error occurs from the backend
    const sendForm = async (e: FormEvent) => {
        e.preventDefault();


        // const newData: any = {};
        //
        // for (const input of receivedData) {
        //     validationFunction(input.label, input.value, dispatch)
        //     newData[`${input.label}`] = input.value
        // }


        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3001/addPerson`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify(newData),
            });


            // if (reduxValue.find(el => el.error)) {
            //     setSeverityStatus(frontEndErrValidationSeverityStatusState);
            //
            //     return
            // }


            const responseMes: InsertedPersonRes = await res.json();

            if (responseMes.status === 'success') {
                setSeverityStatus({status: responseMes.status, message: responseMes.message})
                // dispatch(restartForm());
            }


        } catch (e) {
            console.error(`unexpected error occured ${e}`);
            setSeverityStatus(unexpectedSeverityStatusState)
        } finally {
            setLoading(false);
            handleClick();

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

                {/*@todo below shows input*/}
                {/*{reduxValue.map(({label, value, error, errorMessage, inputFieldType}) => {*/}
                {/*    return (*/}
                {/*        <SingleInput key={label} label={label} value={value} errorMessage={errorMessage}*/}
                {/*                     inputFieldType={inputFieldType} error={error}/>*/}
                {/*    )*/}
                {/*})}*/}

            <Button variant="contained" sx={{margin: '12px auto'}}
                               onClick={sendForm}

           >Send</Button>
                <Link to={`/personList`} >
               <Button variant="contained" sx={{margin: '12px auto'}}


               >Go Back</Button>
                </Link>
            </form>

            <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>

                <Alert onClose={handleClose} severity={severityStatus.status} sx={{width: '100%'}}>
                    {severityStatus.message}
                </Alert>

            </Snackbar>


        </ Container>
    )
}
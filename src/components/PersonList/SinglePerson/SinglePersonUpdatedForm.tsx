// import {FormEvent, useState} from "react"
// import {InsertedPersonRes} from "../../../../backend/types/person";
// import {useDispatch} from "react-redux";
// import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";
// import './styledForm.css'
// import {Spinner} from "../Spinner/Spinner";
// import * as React from "react";
// import Snackbar from "@mui/material/Snackbar";
// import {Alert} from "@mui/material";
// import {SeverityStatus} from "./interface/severityStatusInterface";
// import {FormInterface, SingleInput} from "./SingleInput";
// import {useSelector} from "react-redux";
// import {restartForm} from "../../redux/slices/formSlice";
// import {AppDispatch} from "../../redux/store/store";
// import {validationFunction} from "./functions/validationFunction";
// import {availableLabels} from './functions/validationFunction'
// import {StoreInterface} from "../../redux/store/storeType";
//
//
//
// export const unexpectedSeverityStatusState: SeverityStatus = {
//     status: 'error',
//     message: 'unexpected error, please try again later'
// }
//
// export const frontEndErrValidationSeverityStatusState: SeverityStatus = {
//     status: 'error',
//     message: 'please correct highlighted fields'
// }
//
//
//
// export const SinglePersonUpdatedForm = () => {
//
//
//     const reduxValue: FormInterface[] = useSelector((state: StoreInterface) => state.addPersonForm);
//
//
//
//
//     const [loading, setLoading] = useState<boolean>(false);
//     const [open, setOpen] = useState<boolean>(false);
//     const [severityStatus, setSeverityStatus] = useState<SeverityStatus>(frontEndErrValidationSeverityStatusState)
//
//
//     const dispatch = useDispatch<AppDispatch>();
//
//     const handleClick = () => {
//         setOpen(true);
//     };
//
//     const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         setOpen(false);
//     };
//
//
//     //@todo review post form - still error occurs from the backend
//     const sendForm = async (e: FormEvent) => {
//         e.preventDefault();
//
//         const receivedData = reduxValue
//         const newData: any = {};
//
//         for (const input of receivedData) {
//             validationFunction(input.label, input.value, dispatch)
//             newData[`${input.label}`] = input.value
//         }
//
//
//         setLoading(true);
//         try {
//             const res = await fetch(`http://localhost:3001/addPerson`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(newData),
//             });
//
//
//             if (reduxValue.find(el => el.error)) {
//                 setSeverityStatus(frontEndErrValidationSeverityStatusState);
//
//                 return
//             }
//
//
//             const responseMes: InsertedPersonRes = await res.json();
//
//             if (responseMes.status === 'success') {
//                 setSeverityStatus({status: responseMes.status, message: responseMes.message})
//                 dispatch(restartForm());
//             }
//
//
//         } catch (e) {
//             console.error(`unexpected error occured ${e}`);
//             setSeverityStatus(unexpectedSeverityStatusState)
//         } finally {
//             setLoading(false);
//             handleClick();
//             // setForm(initialState);
//
//         }
//
//     };
//
//
//     if (loading) {
//         return (
//             <Spinner/>
//         )
//     }
//
//
//     return (<Container
//             maxWidth="sm" sx={{padding: '20px'}}
//         >
//             <form className={'styledForm'}>
//
//                 {reduxValue.map(({label, value, error, errorMessage, inputFieldType}) => {
//                     return (
//                         <SingleInput key={label} label={label} value={value} errorMessage={errorMessage}
//                                      inputFieldType={inputFieldType} error={error}/>
//                     )
//                 })}
//
//                 <Button variant="contained" sx={{margin: '12px auto'}}
//                         onClick={sendForm}
//
//                 >Send</Button>
//             </form>
//
//             <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
//
//                 <Alert onClose={handleClose} severity={severityStatus.status} sx={{width: '100%'}}>
//                     {severityStatus.message}
//                 </Alert>
//
//             </Snackbar>
//
//
//         </ Container>
//     )
// }


export{}
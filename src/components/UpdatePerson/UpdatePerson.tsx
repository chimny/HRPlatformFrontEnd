import React, { useEffect,  useState} from "react";
import { useFormik} from "formik";
import {SeverityStatus} from "../Form/interface/severityStatusInterface";
import {Spinner} from "../Spinner/Spinner";
import {validationSchema} from "../Formik/validationSchema";
import {Alert, Button, Container, Snackbar, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import {ErrorComponent} from "../ErrorComponent/ErrorComponent";
import {FormikUpdate} from "./FormikUpdate";

export const UpdatePerson = () => {

    const {personID} = useParams();
    const navigate = useNavigate();
//    @todo otypoawć zgodnie z backednem
let fetchedData = {name: '',
    position: '',
    salary: '',
    surname: ''};

    const [open, setOpen] = useState<boolean>(false);
    const [severityStatus, setSeverityStatus] = useState<SeverityStatus>({
        status: 'success',
        message: ''
    });

    const [loading, setLoading] = useState<boolean>(true);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };



    const fetchData = async () => {

        try {
            const data = await fetch(`http://localhost:3001/personList/chosenPerson/${personID}`);
            const json = await data.json();
            const {chosenPersonData} = json;
            fetchedData = {
                name: chosenPersonData.name,
                position: chosenPersonData.position,
                salary: chosenPersonData.salary,
                surname: chosenPersonData.surName
            }
             // await formik.setValues({...fetchedData});
             setLoading(false);
            return {
                name: chosenPersonData.name,
                position: chosenPersonData.position,
                salary: chosenPersonData.salary,
                surname: chosenPersonData.surName
            }
        } catch (e) {
            // return (<ErrorComponent/>)
            console.log(e)
        }
    }




    useEffect(() => {
            fetchData()
                .catch(console.error);
        }, []
    )


    const formik = useFormik({
        initialValues: fetchedData,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const {name, surname, position, salary} = formik.values


            try {
                await fetch(`http://localhost:3001/personList/updatePerson/${personID}/${name}/${surname}/${position}/${salary}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });


                setSeverityStatus({status: 'success', message: 'data has been sent'})
                // formik.resetForm();


            } catch (e) {
                setSeverityStatus({
                    status: 'error',
                    message: `unexpected error occurred ${e}`
                })
            } finally {

                console.log('done')
                handleClick();
                setLoading(false);
                //@set here new linking!
                // navigate('/')
            }


        },
    });







    if (loading) {return (<Spinner/>) }



    return (
        <Container
            maxWidth="sm" sx={{padding: '20px'}}
        >

            <FormikUpdate formik={formik}/>

            <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>

                <Alert onClose={handleClose} severity={severityStatus.status} sx={{width: '100%'}}>
                    {severityStatus.message}
                </Alert>

            </Snackbar>

        </ Container>
    );


}
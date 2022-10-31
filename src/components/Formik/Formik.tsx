import React, {useState} from 'react';
import {useFormik, Field, FormikProvider} from 'formik';
import * as yup from 'yup';
import {TextField, Button, Alert, Container} from '@mui/material';
import {FormikSelect} from './FormikSelect';

import './FormikField.css'
import {positionObj} from "../../data/positionList";
import Snackbar from "@mui/material/Snackbar";
import {SeverityStatus} from "../Form/interface/severityStatusInterface";
import {Spinner} from "../Spinner/Spinner";


interface FormValues {
    name: string,
    surname: string,
    position: string,
    salary: number | ""
}


const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, 'Name should include at least 3 signs!')
        .max(50, 'Name length is maximum 50')
        .required('name is required'),
    surname: yup
        .string()
        .min(3, 'surname should include at least 3 signs!')
        .max(50, 'surname length is maximum 50')
        .required('surname is required'),
    salary: yup
        .number()
        .min(1, 'salary should be at least 1')
        .max(1000000, 'maximum salary is 1000000')
        .required('salary is required'),
    position: yup
        .string()
        .required('please choose the position!'),
});

export const Formik = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [severityStatus, setSeverityStatus] = useState<SeverityStatus>({
        status: 'success',
        message: ''
    });
    const [loading, setLoading] = useState<boolean>(false);


    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const initialValues: FormValues = {
        name: '',
        surname: '',
        position: '',
        salary: ''
    }


    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {


            setLoading(true);


            try {
                const res = await fetch(`http://localhost:3001/addPerson`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });


                setSeverityStatus({status: 'success', message: 'data has been sent'})
                formik.resetForm();


            } catch (e) {
                setSeverityStatus({
                    status: 'error',
                    message: `unexpected error occurred ${e}`
                })
            } finally {

                console.log('done')
                handleClick();
                setLoading(false);

            }


        },
    });


    if (loading) {
        return (
            <Spinner/>
        )
    }


    return (
        <Container
            maxWidth="sm" sx={{padding: '20px'}}
        >
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <div className='FormikField'><TextField
                        className='FormikField'
                        autoComplete='off'
                        fullWidth
                        id="name"
                        name="name"
                        label="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    /></div>


                    <div className='FormikField'>
                        <TextField
                            autoComplete='off'
                            fullWidth
                            id="surname"
                            name="surname"
                            label="surname"
                            value={formik.values.surname}
                            onChange={formik.handleChange}
                            error={formik.touched.surname && Boolean(formik.errors.surname)}
                            helperText={formik.touched.surname && formik.errors.surname}
                        />
                    </div>

                    <div className='FormikField'>
                        <TextField
                            autoComplete='off'
                            fullWidth
                            id="salary"
                            name="salary"
                            label="salary"
                            type="number"
                            value={formik.values.salary}
                            onChange={formik.handleChange}
                            error={formik.touched.salary && Boolean(formik.errors.salary)}
                            helperText={formik.touched.salary && formik.errors.salary}
                        /></div>

                    <FormikSelect name={'position'} label={'position'} items={positionObj}
                                  error={Boolean(formik.touched.position && Boolean(formik.errors.position))}/>


                    <div className='StyledButton'><Button color="primary" variant="contained" type="submit">
                        Submit
                    </Button></div>

                </form>
            </FormikProvider>

            <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>

                <Alert onClose={handleClose} severity={severityStatus.status} sx={{width: '100%'}}>
                    {severityStatus.message}
                </Alert>

            </Snackbar>

        </ Container>
    );
};



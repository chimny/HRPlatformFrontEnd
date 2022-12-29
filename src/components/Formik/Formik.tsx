import React, {useState} from 'react';

import {useFormik, FormikProvider} from 'formik';
import {FormikSelect} from './FormikSelect';
import {validationSchema} from './validationSchema';

import {TextField, Button, Alert, Container, Snackbar} from '@mui/material';

import {Spinner} from "../Spinner/Spinner";
import {positionObj} from "./positionList";
import {SeverityStatus} from "./interface/severityStatusInterface";
import {formValues} from './interface/formValues';

import './FormikField.css'
import {activeHost} from "../../Utils/activeHost";


export const Formik: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [severityStatus, setSeverityStatus] = useState<SeverityStatus>({
        status: 'success',
        message: ''
    });
    const [loading, setLoading] = useState<boolean>(false);


    const handleClick = (): void => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };


    const initialValues: formValues = {
        name: '',
        surname: '',
        position: '',
        salary: ''
    }


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values): Promise<void> => {
            setLoading(true);

            try {
                await fetch(`${activeHost}/addPerson`, {
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


                    <div className='StyledButton'><Button color="primary" variant="contained" type="submit"
                                                          disabled={!Boolean(formik.dirty)}>
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



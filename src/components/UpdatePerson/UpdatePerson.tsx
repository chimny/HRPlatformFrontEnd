import React, {useCallback, useEffect, useMemo, useState} from "react";
import {positionObj} from "../../data/positionList";
import {FormikProvider, useFormik} from "formik";
import {SeverityStatus} from "../Form/interface/severityStatusInterface";
import {Spinner} from "../Spinner/Spinner";
import {FormikSelect} from "../Formik/FormikSelect";
import {validationSchema} from "../Formik/validationSchema";
import {Alert, Button, Container, Snackbar, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import {ErrorComponent} from "../ErrorComponent/ErrorComponent";
import {Link} from "react-router-dom";

export const UpdatePerson = () => {

    const {personID} = useParams();
    const navigate = useNavigate();
//    @todo otypoawć zgodnie z backednem
let fetchedData : any;

    const [open, setOpen] = useState<boolean>(false);
    const [severityStatus, setSeverityStatus] = useState<SeverityStatus>({
        status: 'success',
        message: ''
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [formUpdated, setFormUpdated] = useState<boolean>(false)

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            position: '',
            salary: ''
        },
        validationSchema: validationSchema,
        enableReinitialize:true,
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
             await formik.setValues({...fetchedData});
            return setLoading(false);
        } catch (e) {
            return (<ErrorComponent/>)
        }
    }


    useEffect(() => {
            fetchData()
                .catch(console.error);
            console.log('render once')
        }, []
    )



    //@todo show data if they're filled, submit button if initial state has changed



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
                                                          disabled={formik.dirty}>
                        Submit
                    </Button>

                        <Link to="/personList"> <Button color="primary" variant="contained">
                            Go back
                        </Button></Link>
                    </div>

                </form>
            </FormikProvider>

            <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>

                <Alert onClose={handleClose} severity={severityStatus.status} sx={{width: '100%'}}>
                    {severityStatus.message}
                </Alert>

            </Snackbar>

        </ Container>
    );


}
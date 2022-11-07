import {FormikProvider, useFormik} from "formik";
import {Button, TextField} from "@mui/material";
import {FormikSelect} from "../Formik/FormikSelect";
import {positionObj} from "../../data/positionList";
import {Link} from "react-router-dom";
import React from "react";
import {validationSchema} from "../Formik/validationSchema";


interface Props {
    initValues:any;
    personID: string;
}

export const FormikUpdate  = (props:Props)=>{
    const {initValues,personID} = props;

    const formik = useFormik({
        initialValues: initValues,
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




            } catch (e) {
              console.error(`unexpected error occured: ${e} `)
            } finally {

                console.log('done')


            }


        },
    });



    return(
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
                    // helperText={formik.touched.name && formik.errors.name}
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
                        // helperText={formik.touched.surname && formik.errors.surname}
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
                        // helperText={formik.touched.salary && formik.errors.salary}
                    /></div>

                <FormikSelect name={'position'} label={'position'} items={positionObj}
                              error={Boolean(formik.touched.position && Boolean(formik.errors.position))}/>


                <div className='StyledButton'><Button color="primary" variant="contained" type="submit"
                                                      disabled={!Boolean(formik.dirty)}>
                    Submit
                </Button>

                    <Link to="/personList"> <Button color="primary" variant="contained">
                        Go back
                    </Button></Link>
                </div>

            </form>
        </FormikProvider>
    )
}
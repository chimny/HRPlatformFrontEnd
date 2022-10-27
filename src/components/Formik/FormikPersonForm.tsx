import React from 'react';
import {Field, Form, useFormik} from 'formik';
import * as yup from 'yup';
import {Button, FormControl, FormHelperText, FormLabel, Select, TextField} from "@mui/material";
import {updateForm} from "../../redux/slices/formSlice";
import {positionList, positionObj} from "../../data/positionList";
import MenuItem from "@mui/material/MenuItem";


const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
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
    //@todo further implementation
    salary: yup
        .string()
        .min(3, 'surname should include at least 3 signs!')
        .max(50, 'surname length is maximum 50')
        .required('salary is required'),
    position: yup
        .string()
        .required('please choose the position!'),
});

export const FormikPersonForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            position: '',
            salary: ''
        },
        validationSchema: validationSchema,
        // funkcja poniżej do wysyłki formularza

        onSubmit: (values) => {
            alert('sent')
        },
    });


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    fullWidth
                    id="surname"
                    name="surname"
                    label="surname"
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                    error={formik.touched.surname && Boolean(formik.errors.surname)}
                    helperText={formik.touched.surname && formik.errors.surname}
                />

                <TextField
                    fullWidth
                    id="salary"
                    name="salary"
                    label="salary"
                    value={formik.values.salary}
                    onChange={formik.handleChange}
                    error={formik.touched.salary && Boolean(formik.errors.salary)}
                    helperText={formik.touched.salary && formik.errors.salary}
                />


                {/*<FormControl className={'styledForm'} fullWidth={true}*/}
                {/*             error={formik.touched.salary && Boolean(formik.errors.salary)}*/}
                {/*>*/}
                {/*    /!*@todo update form postinion*!/*/}
                {/*    <FormLabel id="position-label">position</FormLabel>*/}
                {/*    <Select*/}
                {/*        error={formik.touched.position && Boolean(formik.errors.position)}*/}
                {/*        labelId="position-label"*/}
                {/*        // id="demo-simple-select"*/}
                {/*        id="position"*/}
                {/*        name="position"*/}
                {/*        label="position"*/}
                {/*        value={formik.values.position}*/}

                {/*        onChange={e => formik.handleChange(e.target.value)}*/}
                {/*        renderValue={(selected) => {*/}
                {/*            if (typeof selected === "string" && selected.length === 0) {*/}
                {/*                return <em>Position</em>;*/}
                {/*            }*/}

                {/*            return selected;*/}
                {/*        }}*/}
                {/*    >*/}

                {/*        {positionObj.map(({key,value}) => {*/}
                {/*            return (*/}
                {/*                <MenuItem key={key}  value={value}>{value}</MenuItem>*/}
                {/*            )*/}
                {/*        })}*/}


                {/*    </Select>*/}
                {/*    <FormHelperText>{formik.errors.position}</FormHelperText>*/}
                {/*</FormControl>*/}


                <Button color="primary" variant="contained" fullWidth type="submit" onClick={(e)=>formik.handleSubmit}>
                    Submit
                </Button>

            </form>

        </div>
    );
};



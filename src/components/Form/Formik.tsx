import React from 'react';
import {Field, Form, useFormik} from 'formik';
import * as yup from 'yup';
import {Button, Select, TextField} from "@mui/material";
import {updateForm} from "../../redux/slices/formSlice";


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
        .required('surname is required'),
    position: yup
        .string()
        .min(3, 'surname should include at least 3 signs!')
        .max(50, 'surname length is maximum 50')
        .required('surname is required'),
});

export const Formik = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            surname:'',
            position:'',
            salary:''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
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
                        {/*<label htmlFor="position">Position</label>*/}
                        {/*<Field*/}
                        {/*    component="select"*/}
                        {/*    id="position"*/}
                        {/*    name="position"*/}
                        {/*    multiple={true}*/}
                        {/*>*/}
                        {/*    <option value="NY">New York</option>*/}
                        {/*    <option value="SF">San Francisco</option>*/}
                        {/*    <option value="CH">Chicago</option>*/}
                        {/*    <option value="OTHER">Other</option>*/}
                        {/*</Field>*/}

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

                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Submit
                        </Button>
                    </form>

        </div>
    );
};



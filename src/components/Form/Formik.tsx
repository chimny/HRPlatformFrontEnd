import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {Button, TextField} from "@mui/material";


const validationSchema = yup.object({
    email: yup
        // .string('Enter your email')
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        // .string('Enter your password'
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    name: yup
        // .string('Enter your password'
        .string()
        .min(3, 'Name should include at least 3 signs!')
        .max(50, 'Name length is maximum 50')
        .required('name is required'),
    surname: yup
        // .string('Enter your password'
        .string()
        .min(3, 'surname should include at least 3 signs!')
        .max(50, 'surname length is maximum 50')
        .required('surname is required'),
    //@todo further implementation
    salary: yup
        // .string('Enter your password'
        .string()
        .min(3, 'surname should include at least 3 signs!')
        .max(50, 'surname length is maximum 50')
        .required('surname is required'),
});

export const Formik = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: 'foobar',
            name: '',
            surname:''
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
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
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
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};



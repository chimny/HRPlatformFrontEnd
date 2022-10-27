import React from 'react';
import ReactDOM from 'react-dom';
import {useFormik, Field, FormikProvider} from 'formik';
import * as yup from 'yup';
import {TextField, Button, FormControl, Select, InputLabel, MenuItem} from '@mui/material';
import {FormikSelect, FormikSelectItem} from './FormikSelect';


interface FormValues {
    name: string,
    surname: string,
    position: string,
    salary: number | ""
}

const positionItems: FormikSelectItem[] = [{label:'assistant', value:'assistant' },{label:'junior', value:'junior' },{label:'manager', value:'manager' }
]


const initialValues: FormValues = {
    name: '',
    surname: '',
    position: '',
    salary: ''
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
        .required('surname is required'),
});

export const UpdatedPersonFormik = () => {
    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    autoComplete='off'
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
                />

                {/*start of select component*/}
                <FormikSelect name={'position'} label={'position'} items={positionItems} />


                {/*end of material ui*/}
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
            </FormikProvider>
        </div>
    );
};



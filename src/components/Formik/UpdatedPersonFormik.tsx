import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik,Field } from 'formik';
import * as yup from 'yup';
import {TextField, Button, FormControl, Select, InputLabel, MenuItem} from '@mui/material';








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
        initialValues: {
            name: '',
            surname: '',
            position: '',
            salary: ''
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
                <TextField
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
                {/*below manual select which works*/}
                <select
                    name="position"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                    // onBlur={handleBlur}
                    // style={{ display: "block" }}
                >
                    <option value="" label="Choose the position">
                        Select a color{" "}
                    </option>
                    <option value="red" label="red">
                        {" "}
                        red
                    </option>
                    <option value="blue" label="blue">
                        blue
                    </option>

                    <option value="green" label="green">
                        green
                    </option>
                </select>

                {/*start of material ui*/}




                {/*end of material ui*/}
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};



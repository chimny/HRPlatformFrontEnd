import * as Yup from 'yup';
import {Formik, Form, useFormik} from "formik";
import {FormikControl} from "./FormikControl";
import {Button} from "@mui/material";
import React from "react";
import * as yup from "yup";


export const FormikContainer = () => {

    const validationSchema = Yup.object({
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
            .number()
            .min(1, 'minimum number is 1!')
            .max(100000, 'max number is 100000')
            .required('number is required!'),
        position: yup
            .string()
            .min(3, 'surname should include at least 3 signs!')
            .max(50, 'surname length is maximum 50')
            .required('position is required'),
    });




    const formik = useFormik({
        initialValues: {
            name: '',
            surname:'',
            position:'',
            salary:''
        },
        validationSchema: validationSchema,
        // funkcja poniżej do wysyłki formularza
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });



    const dropdownOption = [{
        key: 'select an option',
        value: ''
    },
        {
            key: 'manager',
            value: 'manager'
        },
        {
            key: 'trainee',
            value: 'trainee'
        }];

    const initialValues = {
        name: '',
        surname: '',
        position: '',
        salary: ''
    };


    const onSubmit = (values: any) => console.log(`form data `, values)

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {
                formik => <Form>
                    <FormikControl control='input' type="text" label="name" name="name" />
                    <FormikControl control='input' type="text" label="surname" name="surname"/>
                    <FormikControl control='input' type="text" label="salary" name="salary"/>
                    <FormikControl control='select' type="select" label="choose the position" name="position" options={dropdownOption}/>
                    <Button color="primary" variant="contained"
                            // fullWidth
                            type="submit">
                        Submit
                    </Button>
                </Form>
            }
        </Formik>
    );
};

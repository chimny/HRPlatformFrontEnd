import {FormikInterface} from "../FormikControl";
import {Field, ErrorMessage} from 'formik'
import {TextError} from "../TextError";
import {TextField} from "@mui/material";
import React from "react";

export const Input = (props: FormikInterface)=>{
const {label, name, ...rest} = props
    return (
        // <div className="form-control">
        //     <label htmlFor={name}>{label}</label>
        //     <Field id={name} name={name} {...rest}/>
        //     <ErrorMessage name={name} component={TextError}/>
        // </div>


    <TextField
        fullWidth
        id={name}
        name={name}
        label={label}
        value={name}
        // error={props.touched.name && Boolean(props.errors.name)}
        // helperText={props.touched.name && props.errors.name}
    />



    )
}
import React, {ReactNode} from "react";
import {Field, ErrorMessage, FieldInputProps} from "formik";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";

import './styles/FormikField.css'

export interface FormikSelectItem {
    label: string;
    value: string;
}

interface FormikSelectProps {
    name: string;
    label: string;
    items: FormikSelectItem[];
    required?: boolean
    error: boolean
}

interface MaterialUISelectFieldProps extends FieldInputProps<string> {
    errorString?: string;
    children: ReactNode;
    label: string;
    required: boolean;
    error: boolean
}

const MaterialUISelectField: React.FC<MaterialUISelectFieldProps> = ({
                                                                         children,
                                                                         label,
                                                                         errorString,
                                                                         value,
                                                                         name,
                                                                         onChange,
                                                                         onBlur,
                                                                         error
                                                                     }) => {

    return (
        <FormControl fullWidth error={error}>
            <InputLabel className="SelectInputLabel" variant="outlined" id='selectLabel' >{label}</InputLabel>
            <Select name={name} onChange={onChange} onBlur={onBlur} value={value}
                    error={error}
                    id='selectLabel'
                    labelId="selectLabel"
            >
                {children}
            </Select>
            <FormHelperText error>{errorString}</FormHelperText>
        </FormControl>
    )
}


export const FormikSelect: React.FC<FormikSelectProps> = ({label, items, name, required = false, error}) => {

    return (
        <div className='FormikField'>
            <Field
                name={name}
                as={MaterialUISelectField}
                label={label}
                errorString={<ErrorMessage name={name}/>}
                error={error}
                required={required}
            >
                {items.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Field>

        </div>
    )
}



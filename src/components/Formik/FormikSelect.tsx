import React, { ReactNode } from "react";
import { Field, ErrorMessage, FieldInputProps } from "formik";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";


export interface FormikSelectItem {
    label: string;
    value: string;
}

interface FormikSelectProps {
    name: string;
    label: string;
    items: FormikSelectItem[];
    required ?:boolean
}

interface MaterialUISelectFieldProps extends FieldInputProps<string>{
    errorString?: string;
    children: ReactNode;
    label: string;
    required: boolean;
}

const MaterialUISelectField: React.FC<MaterialUISelectFieldProps> = ({children, label, errorString,value,name,onChange,onBlur,required}) => {

    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select name={name} onChange={onChange} onBlur={onBlur} value={value}>
                {children}
            </Select>
            <FormHelperText>{errorString}</FormHelperText>
        </FormControl>
    )
}


export const FormikSelect: React.FC<FormikSelectProps> = ({label, items, name,required = false }) => {

    return (
        <div>
            <Field
                name={name}
                as={MaterialUISelectField}
                label={label}
                errorString={<ErrorMessage name={name} />}
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


//my component ends



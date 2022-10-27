import React, {ReactNode} from 'react';
import {Field, ErrorMessage} from 'formik'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

export interface FormikSelectItems {
    label: string;
    value: string;
}

interface FormikSelectProps {
    label: string;
    items: FormikSelectItems[];
}

interface MaterialUISelectFieldProps{
    errorString?:string;
    children: ReactNode;
    label:string;
}

const MaterialUISelectField: React.FC<MaterialUISelectFieldProps> = ({children,label,errorString})=>{

   return(
       <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select>
            {children}
        </Select>
        <FormHelperText>{errorString}</FormHelperText>
    </FormControl>
   )
}


export const FormikSelect: React.FC<FormikSelectProps> = ({label,items}) => {

    return (
        <div>
            {/*<MaterialUISelectField label={label} errorString={"test"}>*/}
            {/*    {items.map(item => {*/}
            {/*        return(*/}
            {/*            <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</MaterialUISelectField>*/}
        </div>
    )
}
import TextField from "@mui/material/TextField";
import {updateForm} from "../../Utils/functions/updateForm";
import * as React from "react";
import {FormControl, FormLabel} from "@mui/material";
import Select from "@mui/material/Select";
import {positionList} from "../../data/positionList";
import MenuItem from "@mui/material/MenuItem";

export interface FormInterface {
    label: string;
    value: string | '' | number;
    error: boolean;
    typeError: string;
    inputFieldType: 'textField' | 'select'
}


export const SingleInput = (props: FormInterface) => {


    const {error, typeError, value, label, inputFieldType} = props


    if (inputFieldType === 'textField') {
        return (
            <TextField error={error} helperText={typeError} id="outlined-basic" label={label} variant="outlined"
                       value={value} sx={{padding: '8px'}}
                // onChange={e => updateForm('name', e.target.value, form, setForm)}
            />
        )
    }

    if (inputFieldType === 'select') {
        <FormControl className={'styledForm'} fullWidth={true}
            // error
        >
            <FormLabel id="position-label">Position</FormLabel>
            <Select
                // error
                labelId="position-label"
                id="demo-simple-select"
                value={value}
                label="Position"
                // onChange={e => updateForm('position', e.target.value, form, setForm)}
                renderValue={(selected) => {
                    // if (selected.length === 0) {
                    //     return <em>Position</em>;
                    // }

                    return selected;
                }}
            >

                {positionList.map((position) => {
                    return (
                        <MenuItem key={position} value={position}>{position}</MenuItem>
                    )
                })}


            </Select>
            {/*<FormHelperText>Please choose the position</FormHelperText>*/}
        </FormControl>
    }


    return (
        <></>
    )


}
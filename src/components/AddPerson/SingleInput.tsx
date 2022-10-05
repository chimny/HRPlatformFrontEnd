import TextField from "@mui/material/TextField";
import * as React from "react";
import {FormControl, FormHelperText, FormLabel} from "@mui/material";
import Select from "@mui/material/Select";
import {positionList} from "../../data/positionList";
import MenuItem from "@mui/material/MenuItem";
import {useDispatch} from "react-redux";
import {updateForm} from "../../redux/slices/formSlice";

export interface FormInterface {
    label: string;
    value: string | '' | number;
    error: boolean;
    errorMessage: string;
    inputFieldType: 'textField' | 'select'
}


export const SingleInput = (props: FormInterface) => {



    const {error, errorMessage, value, label, inputFieldType} = props;

    const dispatch = useDispatch();


    if (inputFieldType === 'textField') {
        return (
            <TextField error={error} helperText={errorMessage} id="outlined-basic" label={label} variant="outlined"
                       value={value} sx={{padding: '8px'}}
                       onChange={e => dispatch(updateForm({label,value: e.target.value}))}
            />
        )
    }

    if (inputFieldType === 'select') {

        return (
            <FormControl className={'styledForm'} fullWidth={true}
                error={error}
            >
                <FormLabel id="position-label">position</FormLabel>
                <Select
                    error={error}
                    labelId="position-label"
                    id="demo-simple-select"
                    value={value}
                    label="position"
                    onChange={e => dispatch(updateForm({label,value: e.target.value}))}
                    renderValue={(selected) => {
                        if (typeof selected === "string" && selected.length === 0) {
                            return <em>Position</em>;
                        }

                        return selected;
                    }}
                >

                    {positionList.map((position) => {
                        return (
                            <MenuItem key={position} value={position}>{position}</MenuItem>
                        )
                    })}


                </Select>
                <FormHelperText>{errorMessage}</FormHelperText>
            </FormControl>
        )
    }


    return (
        <></>
    )


}
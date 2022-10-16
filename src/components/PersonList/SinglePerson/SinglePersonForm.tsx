import {updateForm} from "../../../Utils/functions/updateForm";
import {FormEvent, useEffect, useRef, useState} from "react";
import {InsertedPersonRes, PersonEntity} from "../../../../../backend/types/person";
import {updatePerson} from "../../../redux/slices/personSlice";
import {useDispatch} from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import * as React from "react";
import {NewPersonPosition} from "../../../../../backend/types/newPesonPosition";
import {PositionList} from "../../../../../backend/types/personPosition";
import {Alert, Container, FormControl, FormHelperText, FormLabel} from "@mui/material";
import Select from "@mui/material/Select";
import {positionList} from "../../../data/positionList";
import MenuItem from "@mui/material/MenuItem";
import {SeverityStatus} from "../../AddPerson/interface/severityStatusInterface";
import {frontEndErrValidationSeverityStatusState, unexpectedSeverityStatusState} from "../../AddPerson/AddPerson";
import {restartForm} from "../../../redux/slices/formSlice";
import Snackbar from "@mui/material/Snackbar";


interface Props {
    person: NewPersonPosition;
    modify: () => void;
}

export const SinglePersonForm = (props: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [severityStatus, setSeverityStatus] = useState<SeverityStatus>(frontEndErrValidationSeverityStatusState);


    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const isFirstRender = useRef(true)

    const {name, surName, personId, position, salary} = props.person;
    const dispatch = useDispatch();

    const [form, setForm] = useState<NewPersonPosition>({personId, name, surName, position, salary})
    const [disabledButton, setDisabledButton] = useState<boolean>(true);

    const disabledHandler = () => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return;
        }
        (form.name !== name || form.surName !== surName || form.position !== position || form.salary !== salary) ? setDisabledButton(false) : setDisabledButton(true);
    }


    // useEffect(disabledHandler, [form.surName, form.name, name, surName]);
    useEffect(disabledHandler, [form]);


    const submitData = async (e: FormEvent, personId: string, personName: string, surName: string, position: PositionList, salary: number) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3001/personList/updatePerson/${personId}/${personName}/${surName}/${position}/${String(salary)}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({personId, personName, surName, position, salary}),
            });
            dispatch(updatePerson({id: personId, name: personName, surName, position, salary}));
            setDisabledButton(false);
            props.modify();


            setSeverityStatus(frontEndErrValidationSeverityStatusState);
            const responseMes: InsertedPersonRes = await res.json();


            if (responseMes.status === 'success') {
                setSeverityStatus({status: responseMes.status, message: responseMes.message})
                // dispatch(restartForm());
            }

        } catch (e) {
            console.error(`unexpected error occured ${e}`);
            setSeverityStatus(unexpectedSeverityStatusState)
        }

        finally {
            handleClick();
        }
    };


    const cancelHandler = () => {
        // setForm({name, surName});
        props.modify()
    }

    return (

        <Container
            maxWidth="sm" sx={{padding: '20px'}}>
            <form className={'styledForm'}>
                <TextField id="outlined-basic" label="Name" variant="outlined" value={form.name} sx={{padding: '8px'}}
                           onChange={e => updateForm('name', e.target.value, form, setForm)}/>
                <TextField id="outlined-basic" label="SurName" variant="outlined" value={form.surName}
                           sx={{padding: '8px'}}
                           onChange={e => updateForm('surName', e.target.value, form, setForm)}/>
                <TextField id="outlined-basic" label="salary" variant="outlined" value={form.salary}
                           sx={{padding: '8px'}}
                           onChange={e => updateForm('salary', e.target.value, form, setForm)}/>
                {/*<TextField id="outlined-basic" label="position" variant="outlined" value={form.position}*/}
                {/*           sx={{padding: '8px'}}*/}
                {/*           onChange={e => updateForm('position', e.target.value, form, setForm)}/>*/}


                <FormControl fullWidth={true}
                    // error={error}
                    //  className={'styledForm'}
                >
                    <FormLabel id="position-label">position</FormLabel>
                    <Select
                        // error={error}
                        labelId="position-label"
                        id="demo-simple-select"
                        value={form.position}
                        label="position"
                        onChange={e => updateForm('position', e.target.value, form, setForm)}
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
                    {/*<FormHelperText>{errorMessage}</FormHelperText>*/}
                </FormControl>


                <Box
                    sx={{
                        width: '100%',
                        textAlign: 'center'

                    }}
                >
                    <Button variant="outlined" sx={{margin: '0 5px', padding: '8px'}}
                            onClick={cancelHandler}>Cancel</Button>
                    <Button variant="contained" sx={{margin: '0 5px', padding: '8px'}}
                            disabled={disabledButton}
                            onClick={async (e) => {
                                await submitData(e, personId as string, form.name, form.surName, form.position as PositionList, form.salary)
                            }}>Submit</Button>
                </Box>


            </form>


            <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>

                <Alert onClose={handleClose} severity={severityStatus.status} sx={{width: '100%'}}>
                    {/*{severityStatus.message}*/}
                    testowa wiadomość
                </Alert>

            </Snackbar>

        </Container>

    )
}
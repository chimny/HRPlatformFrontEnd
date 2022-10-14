import {updateForm} from "../../../Utils/functions/updateForm";
import {FormEvent, useEffect, useRef, useState} from "react";
import {PersonEntity} from "../../../../../backend/types/person";
import {updatePerson} from "../../../redux/slices/personSlice";
import {useDispatch} from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import * as React from "react";
import { NewPersonPosition } from "../../../../../backend/types/newPesonPosition";
import { PositionList } from "../../../../../backend/types/personPosition";

interface Props {
    person: NewPersonPosition;
    modify: () => void;
}

export const SinglePersonForm = (props: Props) => {

    const isFirstRender = useRef(true)

    const {name, surName, personId,position,salary} = props.person;
    const dispatch = useDispatch();

    const [form, setForm] = useState<NewPersonPosition>({personId,name,surName,position,salary})
    const [disabledButton, setDisabledButton] = useState<boolean>(true);

    const disabledHandler = () => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return;
        }
        (form.name !== name || form.surName !== surName) ? setDisabledButton(false) : setDisabledButton(true);
    }


    useEffect(disabledHandler, [form.surName, form.name, name, surName]);


    const submitData = async (e: FormEvent, personId: string, personName: string, surName: string,position:PositionList, salary:number) => {
        e.preventDefault();

        try {
            await fetch(`http://localhost:3001/personList/updatePerson/${personId}/${personName}/${surName}/${position}/${String(salary)}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({personId,personName,surName,position,salary}),
            });
            dispatch(updatePerson({id: personId, name: personName, surName}));
            setDisabledButton(false);
            props.modify();
        } catch (e) {
            console.error(`unexpected error occured ${e}`);
        }
    };


    const cancelHandler = () => {
        // setForm({name, surName});
        props.modify()
    }

    return (



        <form className={'styledForm'}>
            <TextField id="outlined-basic" label="Name" variant="outlined" value={form.name} sx={{padding: '8px'}}
                       onChange={e => updateForm('name', e.target.value, form, setForm)}/>
            <TextField id="outlined-basic" label="SurName" variant="outlined" value={form.surName}
                       sx={{padding: '8px'}}
                       onChange={e => updateForm('surName', e.target.value, form, setForm)}/>
            <TextField id="outlined-basic" label="salary" variant="outlined" value={form.salary}
                       sx={{padding: '8px'}}
                       onChange={e => updateForm('salary', e.target.value, form, setForm)}/>
            <TextField id="outlined-basic" label="position" variant="outlined" value={form.position}
                       sx={{padding: '8px'}}
                       onChange={e => updateForm('position', e.target.value, form, setForm)}/>



            <Box
                    sx={{
                        width: '100%',
                        textAlign: 'center'

                    }}
                >
                    <Button variant="outlined" sx={{margin: '0 5px',padding: '8px'}} onClick={cancelHandler}>Cancel</Button>
                    <Button variant="contained" sx={{margin: '0 5px',padding: '8px'}}
                            disabled={disabledButton}
                            onClick={async(e) => {
                             await   submitData(e, personId as string, form.name, form.surName,form.position as PositionList,form.salary)
                            }}>Submit</Button>
                </Box>

        </form>


    )
}
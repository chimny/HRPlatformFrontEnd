import {updateForm} from "../../../Utils/functions/updateForm";
import {FormEvent, useEffect, useRef, useState} from "react";
import {PersonEntity} from "../../../../../backend/types/person";
import {updatePerson} from "../../../redux/slices/personSlice";
import {useDispatch} from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import * as React from "react";

interface Props {
    person: PersonEntity;
    modify: () => void;
}

export const SinglePersonForm = (props: Props) => {

    const isFirstRender = useRef(true)

    const {name, surName, id} = props.person;
    const dispatch = useDispatch();

    const [form, setForm] = useState<PersonEntity>({name, surName})
    const [disabledButton, setDisabledButton] = useState<boolean>(true);

    const disabledHandler = () => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return;
        }
        (form.name !== name || form.surName !== surName) ? setDisabledButton(false) : setDisabledButton(true);
    }


    useEffect(disabledHandler, [form.surName, form.name, name, surName]);


    const submitData = async (e: FormEvent, id: string, name: string, surName: string) => {
        e.preventDefault();

        try {
            await fetch(`http://localhost:3001/persons/updatePerson/${id}/${name}/${surName}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id, name, surName}),
            });
            dispatch(updatePerson({id, name, surName}));
            setDisabledButton(false);
            props.modify();
        } catch (e) {
            console.error(`unexpected error occured ${e}`);
        }
    };


    const cancelHandler = () => {
        setForm({name, surName});
        props.modify()
    }

    return (



        <form className={'styledForm'}>
            <TextField id="outlined-basic" label="Name" variant="outlined" value={form.name} sx={{padding: '8px'}}
                       onChange={e => updateForm('name', e.target.value, form, setForm)}/>
            <TextField id="outlined-basic" label="SurName" variant="outlined" value={form.surName}
                       sx={{padding: '8px'}}
                       onChange={e => updateForm('surName', e.target.value, form, setForm)}/>


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
                             await   submitData(e, id as string, form.name, form.surName)
                            }}>Submit</Button>
                </Box>

        </form>


    )
}
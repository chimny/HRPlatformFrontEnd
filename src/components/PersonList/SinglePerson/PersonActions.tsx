import {PersonEntity} from '../../../../../backend/types/person'
import {useState} from "react";
import {SinglePersonForm} from "./SinglePersonForm";
import {Divider, Button} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import {StyledLi} from "../Styles/StyledLi";

interface Props {
    person: PersonEntity;
    onDelete: (id:string)=> void;
}

export const PersonActions = (props: Props) => {

    const {name, surName, id} = props.person;
    const [modified, setModified] = useState<boolean>(false);


    if (modified) {
        return (<>
                <SinglePersonForm person={{name, surName, id}} modify={() => setModified(false)}/>
            </>
        )
    }

    return (<>
                <Button variant="outlined" sx={{margin: '0 5px',padding: '8px'}} startIcon={<DeleteIcon/>} onClick={() => props.onDelete(id as string)}>Delete</Button>
                <Button variant='outlined' sx={{margin: '0 5px',padding: '8px'}}  onClick={() => setModified(true)}>Modify</Button>
        </>

    )
}
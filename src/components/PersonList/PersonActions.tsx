import * as React from "react";
import {Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom";



interface Props {
    personId: string;
    onDelete: (id: string) => void;
}

export const PersonActions = (props: Props) => {

    const {personId,onDelete} = props;




    return (<>
            <Button variant="outlined" sx={{margin: '0 5px', padding: '8px'}} startIcon={<DeleteIcon/>}
                    onClick={() => onDelete(personId as string)}>Delete</Button>

            <Link to={`/personList/chosenPerson/${personId}`}><Button variant='outlined' sx={{
                margin: '0 5px',
                padding: '8px',
                textDecoration: 'none'
            }}>Modify</Button></Link>
        </>

    )
}
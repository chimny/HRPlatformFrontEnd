import {useState} from "react";
import {SinglePersonForm} from "./SinglePersonForm";
import { Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { NewPersonPosition } from "../../../../../backend/types/newPesonPosition";
import {Link} from "react-router-dom";



interface Props {
    person: NewPersonPosition;
    onDelete: (id:string)=> void;
}

export const PersonActions = (props: Props) => {

    const {personId,name,surName,position,salary } = props.person;
    const [modified, setModified] = useState<boolean>(false);


  const updateForm = personId => {
      Link
  }


    if (modified) {
        return (<>
                <SinglePersonForm person={{name, surName, personId,position,salary}} modify={() => setModified(false)}/>
            </>
        )
    }

    return (<>
                <Button variant="outlined" sx={{margin: '0 5px',padding: '8px'}} startIcon={<DeleteIcon/>} onClick={() => props.onDelete(personId as string)}>Delete</Button>
            <Link to={user.id}><Button variant='outlined' sx={{margin: '0 5px',padding: '8px'}}  onClick={() => setModified(true)}>Modify</Button></Link>
        </>

    )
}
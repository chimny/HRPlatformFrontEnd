import { Typography} from "@mui/material"
import {StyledCenteredDiv} from "../../Utils/Components/StyledCenteredDiv";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export const SuccessComponent = ()=>{
    return(
        <StyledCenteredDiv>
            <CheckCircleIcon sx={{ fontSize: 120, color:'green' }}/>
            <Typography>Data has been saved successfully </Typography>
        </StyledCenteredDiv>
    )
}
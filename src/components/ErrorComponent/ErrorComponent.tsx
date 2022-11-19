import { Typography} from "@mui/material"
import {StyledCenteredDiv} from "../../Utils/Components/StyledCenteredDiv";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import React from "react";


export const ErrorComponent  = ()=>{
    return(
   <StyledCenteredDiv>
       <ErrorOutlineOutlinedIcon sx={{ fontSize: 120 }}/>
       <Typography>unexpected error occurred:(</Typography>
   </StyledCenteredDiv>
    )
}
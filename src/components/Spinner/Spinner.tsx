import {CircularProgress} from "@mui/material";
import { StyledCenteredDiv } from "../../Utils/styles/StyledCenteredDiv";
import React from "react";


export const Spinner = () => {
    return (
        <StyledCenteredDiv><CircularProgress/></StyledCenteredDiv>
    )

}
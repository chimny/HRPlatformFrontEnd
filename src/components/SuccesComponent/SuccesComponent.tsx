import {Button, Typography} from "@mui/material"
import {StyledCenteredDiv} from "../../Utils/styles/StyledCenteredDiv";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {Link} from "react-router-dom";
import React from "react";
import {StyledButtonWrapper} from "./styles/StyledButtonWrapper";
import {useParams} from "react-router";


export const SuccessComponent = () => {

    const {personID} = useParams();


    return (
        <StyledCenteredDiv>
            <CheckCircleIcon sx={{fontSize: 120, color: 'green'}}/>
            <Typography>Data has been saved successfully </Typography>
            <StyledButtonWrapper>


                <Link to={`/personList/chosenPerson/${personID}`}><Button color="secondary" variant='outlined'
                                                                          sx={{}}>Edit again</Button></Link>
                <Link to="/personList"> <Button color="primary" variant="contained">
                    Person list section
                </Button></Link>
            </StyledButtonWrapper>
        </StyledCenteredDiv>
    )
}
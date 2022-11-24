import * as React from 'react';
import styled from '@mui/system/styled';
import Typography from '@mui/material/Typography';
import GroupsIcon from '@mui/icons-material/Groups';
import {StyledCenteredDiv} from "../../Utils/Components/StyledCenteredDiv";
import {StyledHome, StyledHomeChild} from "./StyledHome";
import {StyledButtonWrapper} from "../SuccesComponent/StyledButtonWrapper";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

const DivFlexBox = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '4px',
    textAlign: 'center',
    fontSize: '20px',
    display: 'flex',
    width: '100%',
    height: '80vh',
    justifyContent: 'space-around',
    alignItems: 'center'
}));

const DivFlexBoxChild = styled('div')(({theme}) => ({
    width: '50%'
}));


export const Home = () => {

    return (
        <StyledHome>

            <StyledHomeChild><GroupsIcon sx={{width:'100px'}}/></StyledHomeChild>
            <StyledHomeChild>
                <Typography variant="h4" gutterBottom>
                    Welcome to the HR platform
                </Typography>
                <Typography variant="subtitle2" fontSize={'16px'} gutterBottom>
                    Place where you can track your company employees
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Tired of tracking all the data on paper? Looking for place to gather information about users
                    position and salary?
                    Our website provides this information! Data is stored by independent database so everyone with
                    proper access can reach it!
                    Looking forward to check it?
                    Don't hesitate, try it now!
                    {/*    @todo add redirect to person list button, plus add new employess*/}
                </Typography>
                <StyledButtonWrapper>


                    <Link to={`/personList`}><Button color="secondary" variant='outlined'
                                                                              sx={{}}>Go to person list</Button></Link>
                    <Link to="/addPerson"> <Button color="primary" variant="contained">
                        Add new person
                    </Button></Link>
                </StyledButtonWrapper>
            </StyledHomeChild>
        </StyledHome>
    );

}
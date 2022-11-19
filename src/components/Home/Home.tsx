import * as React from 'react';
import styled from '@mui/system/styled';
import Typography from '@mui/material/Typography';
import Grid from '@mui/system/Unstable_Grid';
import Box from '@mui/system/Box';

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
        <DivFlexBox>
            <div>some cool picture</div>
            <DivFlexBoxChild>
                <Typography variant="h4" gutterBottom>
                    Welcome to the HR platform
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
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
            </DivFlexBoxChild>
        </DivFlexBox>
    );

}
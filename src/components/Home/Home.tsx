import * as React from 'react';
import Typography from '@mui/material/Typography';
import {StyledButtonWrapper} from "../SuccesComponent/styles/StyledButtonWrapper";
import {Link} from "react-router-dom";
import { Button, Container} from '@mui/material';



export const Home = () => {

    return (
        <Container
            maxWidth="md" sx={{padding: '20px 0',margin:'20px auto',height:'80vh', textAlign:'center', display:'flex',justifyContent:'center',flexDirection:'column'}}>
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
                </Typography>
                <StyledButtonWrapper>


                    <Link to={`/personList`}><Button color="primary" variant='contained'
                                                     sx={{}}>Go to person list</Button></Link>
                    <Link to="/addPerson"> <Button color="secondary" variant="outlined">
                        Add new person
                    </Button></Link>
                </StyledButtonWrapper>
        </Container>
    );

}
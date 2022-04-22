
import React, { useContext }  from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Login from './Login';
import { UserContext } from '../shared/UserContext';
import NursePatientActions from './NursePatientActions';
import PatientList from './PatientList';
import MyActions from './MyActions';

const Home = ({showSnackBar}) => {
    const {user, login, logout} = useContext(UserContext);

    console.log('context', user, login, logout)

    const Landing = () => {
        console.log('user', user);
        return (
            <>
                {user.type === 'Nurse' ? <PatientList/> : <MyActions showSnackBar={showSnackBar}/>}
            </>
        );
    }
    return (
        <Container maxWidth='md'>
            <Box sx={{ p: 3 }}>
                { (user && user.auth) ? <Landing/> : <Login/> }
            </Box>
        </Container>
    );
}

export default Home;


import React, { useContext }  from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Login from './Login';
import { UserContext } from '../shared/UserContext';
import NursePatientActions from './NursePatientActions';
import PatientList from './PatientList';

const Home = (props) => {
    const {user, login, logout} = useContext(UserContext);

    console.log('context', user, login, logout)
    const handleLogout = () => {
        console.log('logging out');
        logout();
    }
    return (
        <Container maxWidth='md'>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h5" color="textPrimary">
                    COMP-308 Emerging Technologies - Group1
                </Typography>
                <Button
                    type="button"
                    color="primary"
                    variant="outlined"
                    onClick={(e) => handleLogout()}
                > Logout </Button>
            </Box>
            <Box sx={{ p: 3 }}>
                { (user && user.auth) ? <PatientList/> : <Login></Login> }
            </Box>
        </Container>
    );
}

export default Home;
import React, { useContext, useEffect, useState } from 'react';
import { gql, useMutation} from '@apollo/client';
import { 
    Box, 
    Button,
    Container,
    FormControl,
    TextField,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../shared/UserContext';

const LOGIN = gql`
    mutation SignIn(
        $username: String!,
        $password: String!,
    ) {
    signIn(
        username: $username,
        password: $password,
        ){
            _id,
            type,
            token
        }
    }
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(UserContext);

    const [signIn, { data, error } ] = useMutation(LOGIN, {
        onCompleted: (data) => {
            console.log('data complete', data);
            const details = data.signIn
            login(details._id, details.type, details.token);
        },
        onError: (error) => {
            console.log('error', error);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('creds', username, password)
        signIn({ variables: { 
            username, 
            password 
        }});
    }

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 5, display: 'flex', flexWrap: 'wrap' }}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Username"
                        variant="outlined"
                        color="primary"
                        type="text"
                    />
                </FormControl>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        variant="outlined"
                        color="primary"
                        type="password"
                    />
                </FormControl>
                <br />
                <br />
                <Box sx={{mt: 2}} style={{display: 'flex', flexDirection: 'column', textAlign: 'center', width:'100%'}}>
                    <div>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                        > Login </Button>
                    </div>
                    <Box sx={{mt: 1}}>
                        <NavLink to={`/register`}>
                            <span>Don't have an account?</span>
                        </NavLink>
                    </Box>
                </Box>
                </form>
            </Box>
        </Container>
    );
}

export default Login
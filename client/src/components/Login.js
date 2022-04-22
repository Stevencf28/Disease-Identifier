import React, { useContext, useEffect, useState } from 'react';
import { gql, useMutation} from '@apollo/client';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { 
    Box, 
    Button,
    Container,
    FormControl,
    TextField,
    Typography 
} from '@mui/material';
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
            <Typography variant="h5" color="textPrimary">
                Login
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <FormControl sx={{ m: 1 }} fullWidth>
                    <TextField
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Username"
                        variant="outlined"
                        color="primary"
                        type="text"
                    />
                </FormControl>
                <FormControl sx={{ m: 1 }} fullWidth>
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
                <div style={{display: 'flex', justifyContent:'flex-end', width:'100%'}}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        endIcon={<KeyboardArrowRight />}
                    > Submit </Button>
                </div>
                </form>
            </Box>
        </Container>
    );
}

export default Login
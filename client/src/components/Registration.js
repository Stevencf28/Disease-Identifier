import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography 
} from '@mui/material';
import { gql, useMutation} from '@apollo/client';
import { UserContext } from '../shared/UserContext';

const REGISTER = gql`
    mutation Mutation(
        $username: String!, 
        $password: String!,
        $firstName: String!,
        $lastName: String!,
        $phone: String!,
        $email: String!,
        $type: String!) {
        register(
            username: $username,
            password: $password,
            firstName: $firstName,
            lastName: $lastName,
            phone: $phone,
            email: $email
            type: $type) {
                _id
                username
                firstName
                lastName
                phone
                email
                type
        }
    }
`;

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate();

    const [signIn, { data, error } ] = useMutation(REGISTER, {
        onCompleted: (data) => {
            console.log('data complete', data);
            navigate('/');
        },
        onError: (error) => {
            console.log('error', error);
        }
    });

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('creds', username, password)
        signIn({ variables: { 
            username, 
            password,
            firstName,
            lastName,
            phone,
            email,
            type
        }});
    }

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 5, display: 'flex', flexWrap: 'wrap' }}>
            <form autoComplete="off" noValidate onSubmit={handleRegister}>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Username"
                        variant="outlined"
                        color="primary"
                        type="text"
                        required
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
                        required
                    />
                </FormControl>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        label="Confirm Password"
                        variant="outlined"
                        color="primary"
                        type="password"
                        required
                    />
                </FormControl>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <FormControl sx={{ mr: 1 }} fullWidth>
                        <TextField
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            label="First Name"
                            variant="outlined"
                            color="primary"
                            type="text"
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ ml: 1 }} fullWidth>
                        <TextField
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            label="Last Name"
                            variant="outlined"
                            color="primary"
                            type="text"
                            required
                        />
                    </FormControl>
                </Box>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <FormControl sx={{ mr: 1 }}>
                        <TextField
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            label="Phone"
                            variant="outlined"
                            color="primary"
                            type="text"
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ ml: 1 }}>
                        <TextField
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            variant="outlined"
                            color="primary"
                            type="text"
                            required
                        />
                    </FormControl>
                </Box>
                <FormControl sx={{ mt: 1 }} fullWidth>
                <InputLabel>Type</InputLabel>
                    <Select
                        value={type}
                        label="Type"
                        required
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value={'Patient'}>Patient</MenuItem>
                        <MenuItem value={'Nurse'}>Nurse</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <br />
                <div style={{display: 'flex', justifyContent:'space-around', width:'100%'}}>
                    <Button
                        variant='outlined'
                        type='button'
                        onClick={() => navigate(-1)}
                    > Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                    > Register </Button>
                </div>
                </form>
            </Box>
        </Container>
    );
}

export default Register
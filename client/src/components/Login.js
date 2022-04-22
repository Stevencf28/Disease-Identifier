import React, { Component } from 'react';
import { gql, useMutation} from '@apollo/client';

const LOGIN = gql`
mutation SignIn(
    $userName: String!,
    $password: String!,
    ) {
        signIn(
            username: $userName,
            password: $password,
            ){
                token
            }
        }
        `;
        const SignIn = () => {
            let userName, password, firstName, lastName, phone, email, type;
            const [signIn,{ data, loading, error }] = useMutation(LOGIN); 
            console.log(data);
            if (loading) return 'Submitting...';
            if(error) return 'Submission error! ${error.message}';
            return (
                <div>
                            <form
            onSubmit={e => {    
                e.preventDefault();
                signIn({ variables: { userName: userName.value, password: password.value,
                  } });
            
                  userName.value='';
                  password.value = '';
            }}
        >
            <div class="outer_container">
            <div class="container">
                <label>
                    <b>User Name:</b>
                </label>
                <input type="text" class="fields" name="userName" ref={node => { userName= node; }} 
                placeholder="userName" />
            </div>

            <div class="container">
                <label>
                    <b>Password:</b>
                </label>
                <input type="password" class="fields" name="password" ref={node => {password = node; }} 
                placeholder="Password" />
            </div>

            <div class="container">
                <button type="submit" class="fields"> Sign In</button>

            </div>
            </div>
        </form>
    </div>
    );

        }

export default SignIn
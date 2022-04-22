import React, { Component } from 'react';
import { gql, useMutation} from '@apollo/client';

const ADD_USER = gql`
    mutation Register(
        $userName: String!,
        $password: String!,
        $firstName: String!,
        $lastName: String!,
        $phone: String!, 
        $email: String!,
        $type: String!,
    ) {
    register(
    username: $userName,
    password: $password,
    firstName: $firstName,
    lastName: $lastName,
    phone: $phone,
    email: $email,
    type: $type,
        ){
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

    let userName, password, firstName, lastName, phone, email, type;
    const [register,{ data, loading, error }] = useMutation(ADD_USER); 
   
    if(error) return 'Submission error! ${error.message}';
   if (loading) return 'Submitting...';
   if(!loading && data) return    `Registration Successful` +data?.register?._id;
   console.log(data);
return (
    <div>
        <form
            onSubmit={e => {    
                e.preventDefault();
                register({ variables: { userName: userName.value, password: password.value, firstName: firstName.value, 
                    lastName: lastName.value, phone: phone.value, email: email.value, type:type.value, 
                
                  } });
            
                  userName.value='';
                  password.value = '';
                  firstName.value='';
                  lastName.value='';
                  phone.value='';
                email.value='';
                type.value='';
                
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
                <label>
                    <b>First Name:</b>
                </label>
                <input type="text" class="fields" name="firstName" ref={node => {firstName = node; }} 
                placeholder="First Name" />
            </div>

            <div class="container">
                <label>
                    <b>Last Name:</b>
                </label>
                <input type="text" class="fields" name="lastName" ref={node => {lastName = node; }}
                placeholder="Last Name" />
            </div>


            <div class="container">
                <label>
                    <b>Phone:</b>
                </label>
                <input type="text" class="fields" name="phone" ref={node => {phone = node; }}
                placeholder="Phone:" />
            </div>

            <div class="container">
                <label>
                    <b>Email:</b>
                </label>
                <input type="text" class="fields" name="email" ref={node => {email = node; }}
                placeholder="Email:" />
            </div>
            <div class="container">
                <label>
                    <b>Type:</b>
                </label>
                <input type="text" class="fields" name="type" ref={node => {type = node; }}
                placeholder="Type:" />
            </div>
            <div class="container">
                <button type="submit" class="fields"> Register</button>

            </div>
            </div>
        </form>
    </div>
    );

        }
        
    export default Register
import React from 'react';
import {gql, useMutation} from "@apollo/client"

const CREATE_MOTIVATION = gql`
    mutation CreateMotivation($tip: String!){
        createMotivation(tip: $tip){
            _id
        }
    }
`
import React from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";
import YoutubeMotivation from './YoutubeMotivation';

const GET_RANDOM_MOTIVATION = gql`
{
    randomMotivation{
        _id
        tip
    }
}
`

const DELETE_MOTIVATION = gql`
    mutation DeleteMotivation($_id: String!){
        deleteMotivation(_id: $_id){
            _id
        }
    }
`

function Motivation(props)
{
    return (
        <>
            <h2>Here is where the motivational video will be</h2>
            <YoutubeMotivation />
        </>
    );

}

export default Motivation
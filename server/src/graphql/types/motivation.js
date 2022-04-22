import {
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

const Motivation = new GraphQLObjectType({
    name: 'motivation',
    fields: () => {
        return {
            _id: {
                type: GraphQLString
            },
            content: {
                type: GraphQLString
            },
            type: {
                type: GraphQLString
            },
            patientId: {
                type: GraphQLString
            }
        }
    }
});

export default Motivation;
import {
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

const Motivation = new GraphQLObjectType({
    name: 'motivation',
    fields: () => {
        return {
            _id:{
                type: GraphQLString
            },
            tip:{
                type: GraphQLString
            }
        }
    }
});

export default Motivation;
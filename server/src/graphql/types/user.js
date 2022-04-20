import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'user',
  fields: () => {
    return {
      _id: {
        type: GraphQLString
      },
      username: {
        type: GraphQLString
      },
      firstName: {
        type: GraphQLString
      },
      lastName: {
        type: GraphQLString
      },
      phone: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      type: {
        type: GraphQLString
      },
      password:{
        type: GraphQLString
      },
    }
  }
});

export default UserType;
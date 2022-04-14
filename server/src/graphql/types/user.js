import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export const userType = new GraphQLObjectType({
  name: 'user',
  fields: () => 
  {
    return {
      _id: {
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
      }
    }
  }
})
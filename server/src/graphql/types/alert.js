import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export const emergencyAlert = new GraphQLObjectType({
  name: 'alert',
  fields: () => {
    return {
      _id: {
        type: GraphQLString
      },
      patientUserName: {
        type: GraphQLString
      },
      message: {
        type: GraphQLString
      }
    }
  }
});

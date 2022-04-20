import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { userType } from './user';

export const emergencyAlert = new GraphQLObjectType({
  name: 'alert',
  fields: () => {
    return {
      _id: {
        type: GraphQLString
      },
      patient: {
        type: userType
      },
      message: {
        type: GraphQLString
      }
    }
  }
});

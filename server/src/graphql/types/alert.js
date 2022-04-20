import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import UserType from './user';

const Alert = new GraphQLObjectType({
  name: 'alert',
  fields: () => {
    return {
      _id: {
        type: GraphQLString
      },
      patient: {
        type: UserType
      },
      message: {
        type: GraphQLString
      }
    }
  }
});

export default Alert;

import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { GraphQLDate } from 'graphql-scalars';
import { userType } from './user';


export const vitalsSign = new GraphQLObjectType({
  name: 'vitals',
  fields: () => {
    return {
      _id: {
        type: GraphQLString
      },
      nurse: {
        type: userType
      },
      patient: {
        type: userType
      },
      temperature: {
        type: GraphQLString
      },
      heartRate: {
        type: GraphQLString
      },
      bloodPressure: {
        type: GraphQLString
      },
      respiratoryRate: {
        type: GraphQLString
      },
      visitDate: {
        type: GraphQLDate
      }
    }
  }
});

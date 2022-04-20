import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { GraphQLDate } from 'graphql-scalars';
import UserType from './user';

const VitalSign = new GraphQLObjectType({
  name: 'vitals',
  fields: () => {
    return {
      _id: {
        type: GraphQLString
      },
      nurse: {
        type: UserType
      },
      patient: {
        type: UserType
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

export default VitalSign;
import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { GraphQLDate } from 'graphql-scalars';
import UserType from './user';

const DailyInfo = new GraphQLObjectType({
  name: 'patientDailyInfo',
  fields: () => {
    return {
      _id: {
        type: GraphQLString
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
      weight: {
        type: GraphQLString
      },
      bloodPressure: {
        type: GraphQLString
      },
      respiratoryRate: {
        type: GraphQLString
      },
      measuredDate: {
        type: GraphQLDate
      }
    }
  }
});

export default DailyInfo;

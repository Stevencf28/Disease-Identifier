import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { GraphQLDate } from 'graphql-scalars';
import { userType } from './user';



export const dailyInfo = new GraphQLObjectType({
  name: 'patientDailyInfo',
  fields: () => {
    return {
      _id: {
        type: GraphQLString
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

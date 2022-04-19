import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLDate
} from 'graphql';


export const dailyInfo = new GraphQLObjectType({
  name: 'patientDailyInfo',
  fields: () => {
    return {
      _id: {
        type: GraphQLString
      },
      patientUserName: {
        type: GraphQLString
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

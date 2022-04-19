import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLDate
} from 'graphql';

export const vitalsSign = new GraphQLObjectType({
  name: 'vitals',
  fields: () => {
    return {
      _id: {
        type: GraphQLString
      },
      nurseUserName: {
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

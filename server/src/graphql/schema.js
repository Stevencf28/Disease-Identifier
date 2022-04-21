import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString
} from 'graphql';
import { UserInputError } from 'apollo-server-express';
import { GraphQLDate, GraphQLEmailAddress } from 'graphql-scalars';
import jwt from 'jsonwebtoken'
const jwtKey = secretKey;
import { secretKey } from '../config';

// GraphQLObjectTypes
import UserType from './types/user'; // User Type
import AlertType from './types/alert'; // Alert Type
import VitalsType from './types/vitals'; // Vitals Type

// Models
import User from './models/User'; // User Model
import Alert from './models/Alert'; // Alert Model
import Vitals from './models/Vitals'; // Vitals Model

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      // User queries
      users: {
        type: new GraphQLList(UserType),
        resolve: () => {
          const users = User.find().exec()
          if(!users){
            throw new Error('Cannot find users')
          }
          return users
        }
      },
      user: {
        type: UserType,
        args:{
          username:{
            type: GraphQLString
          }
        },
        resolve: async (root, params) => {
          const user = await User.findOne({username: params.username});
          if(!user)
            throw new UserInputError('User not found');

          return user;
        }
      },
      patient: {
        type: UserType,
        args:{
          id:{
            type: GraphQLString
          }
        },
        resolve: async (root, params) => {
          const user = await User.findOne({_id: params.id});
          if(!user)
            throw new UserInputError('User not found');

          return user;
        }
      },
      patients: {
        type: new GraphQLList(UserType),
        resolve: () => {
          const users = User.find({type: "Patient"}).exec()
          return users
        }
      },
      nurses: {
        type: new GraphQLList(UserType),
        resolve: () => {
          const users = User.find({type: "Nurse"}).exec()
          return users
        }
      },
      // Alert Queries
      alerts: {
        type: new GraphQLList(AlertType),
        resolve: () => {
          const alerts = Alert.find().exec()
          if(!alerts){
            throw new Error('Cannot find alerts')
          }
          return alerts
        }
      },
      alertByPatient: {
        type: new GraphQLList(AlertType),
        args:{
          _id:{
            type: GraphQLString
          }
        },
        resolve: async (root, params) => {
          const alerts = await Alert.find({patient: params._id}).exec();
          return alerts;
        }
      },
      vitals: {
        type: new GraphQLList(VitalsType),
        resolve: () => {
          const vitals = Vitals.find().exec()
          if(!vitals){
            throw new Error("Cannot find Vitals")
          }
          return vitals
        }
      },
      vitalByPatient: {
        type: new GraphQLList(VitalsType),
        args:{
          _id:{
            type: GraphQLString
          }
        },
        resolve: async (root, params) => {
          const vitals = await Vitals.find({patient: params._id}).exec();
          return vitals;
        }
      },
    }
  }
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => {
    return {
      // User Mutations
      register: {
        type: UserType,
        args: {
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          },
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          phone: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLEmailAddress)
          },
          type: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: async (root, params, context) => {
          try {
            const user = new User(params);
            const newUser = user.save();
            if (!newUser){
              throw new Error('Error Creating User');
            }
            return newUser
          } catch (e) {
            console.log(e)
          }
        }
      },
      signIn: {
        type: new GraphQLObjectType({
          name: 'loginResponse',
          fields: () => {
            return {
              token: {
                type: GraphQLString
              }
            }
          }
        }),
        args: {
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: async (root, params, context) => {
          const user = await User.findOne({ username: params.username });
          if (!user){
            throw new UserInputError("Wrong username or password.");
          }

          if (user.authenticate(params.password, user.password)){
            const token = jwt.sign(
              {id: user._id, username: user.username, type: user.type},
              jwtKey,
              {algorithm: 'HS256', expiresIn: 300}
            );
            console.log('token', token)
            return { token }
          } else {
            throw new UserInputError("Wrong username or password.");
          }
        }
      },
      // Alert Mutations
      createAlert: {
        type: AlertType,
        args: {
          patientId: {
            type: new GraphQLNonNull(GraphQLString)
          },
          message: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: async (root, params, context) => {
          const newAlert = new Alert({
            message: params.message,
            patient: params.patientId,
          });

          const alert = Alert.create(newAlert);
          if (!alert)
            throw UserInputError('Error in Create Alert');

          return alert;
        }
      },
      // Vitals Mutations
      createVitals: {
        type: VitalsType,
        args: {
          nurseId: {
            type: new GraphQLNonNull(GraphQLString)
          },
          patientId: {
            type: new GraphQLNonNull(GraphQLString)
          },
          temperature: {
            type: new GraphQLNonNull(GraphQLString)
          },
          heartRate: {
            type: new GraphQLNonNull(GraphQLString)
          },
          bloodPressure: {
            type: new GraphQLNonNull(GraphQLString)
          },
          respiratoryRate: {
            type: new GraphQLNonNull(GraphQLString)
          },
          visitDate: {
            type: new GraphQLNonNull(GraphQLDate)
          }
        },
        resolve: async (root, params, context) => {
          console.log('params', params);
          const newVitals = new Vitals({
            ...params,
            patient: params.patientId,
            nurse: params.nurseId
          });
          console.log('vitals', newVitals);
          const vitals = await Vitals.create(newVitals);
          if (!vitals)
            throw UserInputError('Error in Create Vitals');

          return vitals;
        }
      },
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

export default schema;
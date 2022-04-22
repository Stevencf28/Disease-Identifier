import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLID
} from 'graphql';
import { ObjectId } from 'mongodb';
import { UserInputError } from 'apollo-server-express';
import { GraphQLDate, GraphQLEmailAddress } from 'graphql-scalars';
import random from 'mongoose-simple-random';
import jwt from 'jsonwebtoken'
const jwtKey = secretKey;
import { secretKey } from '../config';

// GraphQLObjectTypes
import UserType from './types/user'; // User Type
import AlertType from './types/alert'; // Alert Type
import VitalsType from './types/vitals'; // Vitals Type
import MotivationType from './types/motivation' // Motivations Type
import LoginType from './types/login'; // Login Type

// Models
import User from './models/User'; // User Model
import Alert from './models/Alert'; // Alert Model
import Vitals from './models/Vitals'; // Vitals Model
import Motivation from './models/Motivation'; // Motivation Model
import { shuffle } from '../utils';

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
          const alerts = await Alert.find({patient: params._id}).populate('patient').exec();
          return alerts;
        }
      },
      vitals: {
        type: new GraphQLList(VitalsType),
        resolve: () => {
          const vitals = Vitals.find().exec()
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
          const vitals = await Vitals.find({patient: params._id}).sort({visitDate: -1}).exec();
          if (!vitals){
            throw new Error("Vital information not found")
          }
          return vitals;
        }
      },
      motivations: {
        type: new GraphQLList(MotivationType),
        resolve: () => {
          const motivations = Motivation.find().exec()
          if (!motivations) {
            throw new Error("Cannot find Motivation Tips")
          }
          return motivations
        }
      },
      motivationsByPatientId: {
        type: new GraphQLList(MotivationType),
        args: {
          patientId:{
            type: GraphQLID
          }
        },
        resolve: async (root, params) => {
          const motivations = await Motivation.find({patientId: params.patientId}).exec();
          shuffle(motivations);
          return motivations;
        }
      }
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
            type: new GraphQLNonNull(GraphQLString)
          },
          type: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: async (root, params, context) => {
          const user = new User(params);
          const newUser = user.save();
          if (!newUser){
            throw new Error('Error Creating User');
          }
          return newUser;
        }
      },
      signIn: {
        type: LoginType,
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
            return { _id: user._id, type: user.type, token: token }
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
          const newVitals = new Vitals({
            ...params,
            patient: params.patientId,
            nurse: params.nurseId
          });
          const vitals = await Vitals.create(newVitals);
          if (!vitals)
            throw UserInputError('Error in Create Vitals');

          return vitals;
        }
      },
      createMotivation: {
        type: MotivationType,
        args: {
          content:{
            type: new GraphQLNonNull(GraphQLString)
          },
          type:{
            type: new GraphQLNonNull(GraphQLString)
          },
          patientId:{
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        resolve: async (root, params, context) => {
          const newMotivation = new Motivation(params);
          const motivation = await Motivation.create(newMotivation);
          if (!motivation){
            throw UserInputError('Error in creating motivation tip');
          }
          return motivation;
        }
      },
      deleteMotivation: {
        type: MotivationType,
        args: {
          _id:{
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: async (root, params, context) => {
          const deleteMotivation = await Motivation.findByIdAndDelete(params._id).exec();
          if(!deleteMotivation){
            throw new Error('Error deleting Motivation');
          }
          return deleteMotivation;
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
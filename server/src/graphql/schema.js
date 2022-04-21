import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString
} from 'graphql';
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

// Models
import User from './models/User'; // User Model
import Alert from './models/Alert'; // Alert Model
import Vitals from './models/Vitals'; // Vitals Model
import Motivation from './models/Motivation'; // Motivation Model

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      // User queries
      users: {
        type: new GraphQLList(UserType),
        resolve: () => {
          try{
            const users = User.find().exec()
            if(!users){
              throw new Error('Cannot find users')
            }
            return users
          } catch(err){
            console.log(err)
          }
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
          try {
            const user = await User.findOne({username: params.username});
            if(!user)
              throw new UserInputError('User not found');
  
            return user;
          } catch(err){
            console.log(err)
          }
        }
      },
      patients: {
        type: new GraphQLList(UserType),
        resolve: () => {
          try{
            const users = User.find({type: "Patient"}).exec()
            return users
          } catch(err){
            console.log(err)
          }
        }
      },
      nurses: {
        type: new GraphQLList(UserType),
        resolve: () => {
          try {
            const users = User.find({type: "Nurse"}).exec()
            return users
          } catch(err){
            console.log(err)
          }
        }
      },
      // Alert Queries
      alerts: {
        type: new GraphQLList(AlertType),
        resolve: () => {
          try{
            const alerts = Alert.find().exec()
            if(!alerts){
              throw new Error('Cannot find alerts')
            }
            return alerts
          } catch(err){
            console.log(err)
          }
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
          try{
            const alerts = await Alert.find({patient: params._id}).exec();
            return alerts;
          } catch(err){
            console.log(err)
          }
        }
      },
      vitals: {
        type: new GraphQLList(VitalsType),
        resolve: () => {
          try {
            const vitals = Vitals.find().exec()
            return vitals
          } catch (err){
            console.log(err);
          }
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
          try{
            const vitals = await Vitals.find({patient: params._id}).exec();
            if (!vitals){
              throw new Error("Vital information not found")
            }
            return vitals;
          } catch(err){
            console.log(err)
          }
        }
      },
      motivations: {
        type: new GraphQLList(MotivationType),
        resolve: () => {
          try{
            const motivations = Motivation.find().exec()
            if (!motivations) {
              throw new Error("Cannot find Motivation Tips")
            }
            return motivations
          } catch(err){
            console.log(err)
          }
        }
      },
      motivation: {
        type: MotivationType,
        args: {
          _id:{
            type: GraphQLString
          }
        },
        resolve: async (root, params) => {
          try{
            const motivation = await Motivation.fnid({_id: params._id}).exec();
            if (!motivation){
              throw new Error("Motivation Tip not found.");
            }
            return motivation;
          } catch(err){
            console.log(err)
          }
        }
      },
      randomMotivation: {
        type: MotivationType,
        resolve: async (root, params) => {
          try{
            Motivation.findOneRandom((fetchError, motivation) => {
              if(!fetchError){
                return motivation;
              } else {
                console.log(fetchError);
              }
            })
          } catch(err){
            console.log(err)
          }
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
          try{
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
          } catch(err){
            console.log(err)
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
          try{
            const newAlert = new Alert({
              message: params.message,
              patient: params.patientId,
            });
  
            const alert = Alert.create(newAlert);
            if (!alert)
              throw UserInputError('Error in Create Alert');
  
            return alert;
          } catch(err){
            console.log(err)
          }
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
          try{
            const newVitals = new Vitals({
              ...params,
              patient: params.patientId,
              nurse: params.nurseId
            });
            const vitals = await Vitals.create(newVitals);
            if (!vitals)
              throw UserInputError('Error in Create Vitals');
  
            return vitals;
          } catch(err){
            console.log(err)
          }
        }
      },
      createMotivation: {
        type: MotivationType,
        args: {
          tip:{
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: async (root, params, context) => {
          try{
            const newMotivation = new Motivation({params});
            const motivation = await Motivation.create(newMotivation);
            if (!motivation){
              throw UserInputError('Error in creating motivation tip');
            }
            return motivation;
          } catch(err){
            console.log(err)
          }
        }
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

export default schema;
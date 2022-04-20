import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString
} from 'graphql';
import { UserInputError } from 'apollo-server-express';
import { ByteResolver, GraphQLDate, GraphQLEmailAddress } from 'graphql-scalars';
import jwt from 'jsonwebtoken'
const jwtKey = secretKey;
import bcrypt from 'bcrypt';
import { secretKey, saltRounds } from '../config';

// GraphQLObjectTypes
import UserType from './types/user'; // User Type
import AlertType from './types/alert'; // Alert Type
import PatientDailyInfoType from './types/patientDailyInfo'; // PatientDailyInfo Type
import VitalsType from './types/vitals'; // Vitals Type

// Models
import User from './models/User'; // User Model
import Alert from './models/Alert'; // Alert Model
import PatientDailyInfo from './models/PatientDailyInfo'; // PatientDailyInfo Model
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
        resolve: (root, params) => {
          return User.findOne({username: params.username}, (err, user) =>{
            if (err) {
              throw new Error("Error")
            }
            if(!user){
              throw new Error("User not found")
            }
            return user
          });
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
      alert: {
        type: AlertType,
        args:{
          _id:{
            type: GraphQLString
          }
        },
        resolve: (root, params) => {
          return Alert.findOne({_id: params._id}, (err, alert) =>{
            if (err) {
              throw new Error("Error")
            }
            if(!alert){
              throw new Error("Alert not found")
            }
            return alert
          });
        }
      },
      // PatientDailyInfo Queries
      patientDailyInfos: {
        type: new GraphQLList(PatientDailyInfoType),
        resolve: () => {
          const patientDailyInfos = PatientDailyInfo.find().exec()
          if(!patientDailyInfos){
            throw new Error("Cannot find Patient's Daily Information")
          }
          return patientDailyInfos
        }
      },
      patientDailyInfo: {
        type: PatientDailyInfoType,
        args:{
          _id:{
            type: GraphQLString
          }
        },
        resolve: (root, params) => {
          return PatientDailyInfo.findOne({_id: params._id}, (err, patientDailyInfo) =>{
            if (err) {
              throw new Error("Error")
            }
            if(!patientDailyInfo){
              throw new Error("Patient's daily info not found")
            }
            return patientDailyInfo
          });
        }
      },
      // Vitals Queries
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
      vital: {
        type: VitalsType,
        args:{
          _id:{
            type: GraphQLString
          }
        },
        resolve: (root, params) => {
          return Vitals.findOne({_id: params._id}, (err, vital) =>{
            if (err) {
              throw new Error("Error")
            }
            if(!vital){
              throw new Error("Patient's vitals not found")
            }
            return vital
          });
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
          console.log('called')
          const newAlert = new Alert({
            message: params.message,
            patient: params.patientId,
          });
          console.log('alert', newAlert)

          const alert = Alert.create(newAlert);
          if (!alert)
            throw UserInputError('Error in Create Alert');

          return alert;
        }
      },
      // PatientDailyInfo Mutations
      createPatientDailyInfo: {
        type: PatientDailyInfoType,
        args: {
          patientId: {
            type: new GraphQLNonNull(GraphQLString)
          },
          temperature: {
            type: new GraphQLNonNull(GraphQLString)
          },
          heartRate: {
            type: new GraphQLNonNull(GraphQLString)
          },
          weight: {
            type: new GraphQLNonNull(GraphQLString)
          },
          bloodPressure: {
            type: new GraphQLNonNull(GraphQLString)
          },
          respiratoryRate: {
            type: new GraphQLNonNull(GraphQLString)
          },
          measuredDate: {
            type: new GraphQLNonNull(GraphQLDate)
          }
        },
        resolve: async (root, params, context) => {
          try {
            const patientDailyInfo = new PatientDailyInfo(params);
            const newPatientDailyInfo = patientDailyInfo.save();
            if (!newPatientDailyInfo){
              throw new Error('Error Creating Patient daily info');
            }
            return newPatientDailyInfo
          } catch (e){
            console.log(e)
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
          try {
            const vitals = new Vitals(params);
            const newVitals = vitals.save();
            if (!newVitals){
              throw new Error('Error Creating Vitals');
            }
            return newVitals
          } catch (e){
            console.log(e)
          }
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
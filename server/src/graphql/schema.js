import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString
} from 'graphql';

import jwt from 'jsonwebtoken'
const jwtKey = secretKey;
import { secretKey } from '../config';

// GraphQLObjectTypes
import userType from './types/user'; // User Type

// Models
import User from './models/User'; // User Model

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      users: {
        type: new GraphQLList(userType),
        resolve: () => {
          const users = User.find().exec()
          if(!users){
            throw new Error('Cannot find users')
          }
          return users
        }
      },
      user: {
        type: userType,
        args:{
          userName:{
            type: GraphQLString
          }
        },
        resolve: (root, params) => {
          return User.findOne({userName: params.userName}, (err, user) =>{
            if (err) {
              throw new Error("Error")
            }
            if(!user){
              throw new Error("User not found")
            }
            return user
          });
        }
      }
    }
  }
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => {
    return {
      register: {
        type: userType,
        args: {
          userName: {
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
        type: userType,
        args: {
          userName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, params, context) => {
          try {
            return User.findOne({userName: params.userName}, (err, user) =>{
              if (!user){
                throw new Error("Wrong username or password.")
              } else {
                if (user.authenticate(params.password)){
                  const token = jwt.sign({id: user._id, userName: user.userName, type: user.type}, jwtKey,
                    {algorithm: 'HS256', expiresIn: 300});
                  return user._id
                } else {
                  throw new Error("Wrong username or password.")
                }
              } 
            })
          } catch (e){
            console.log(e)
          }
        }
      },
      logout: {
        type: GraphQLString,
        resolve: (root, params, context) => {
          return 'Logout should be done by calling the apollo logout function'
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
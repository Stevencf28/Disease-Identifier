import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString
} from 'graphql';
import { userType } from './types/user';

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      tests: {
        type: new GraphQLList(userType),
        resolve: (root, params, context) => {
          const user = {
            _id: 'dummy_id',
            firstName: 'dummy',
            lastName: 'user',
            phone: '1234567890',
            email: 'dummy@email.com',
            type: 'nurse'
          };

          return [user]
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
        type: GraphQLString,
        args: {
          username: {
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
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          },
          confirm: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, params, context) => {
          return 'Register'
        }
      },
      signIn: {
        type: GraphQLString,
        args: {
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, params, context) => {
          return 'Sign In'
        }
      },
      logout: {
        type: GraphQLString,
        resolve: (root, params, context) => {
          return 'Logout'
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
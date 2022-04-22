import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

const Login = new GraphQLObjectType({
  name: 'login',
  fields: () => {
    return {
      _id: {
        type: GraphQLID
      },
      type: {
        type: GraphQLString
      },
      token: {
        type: GraphQLString
      }
    }
  }
});

export default Login;

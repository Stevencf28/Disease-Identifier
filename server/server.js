import { ApolloServer } from 'apollo-server-express';
import debug from 'debug';
import app from './src/app/index';
import { DefaultPort } from './src/config/index';
import schema from './src/graphql/schema';
import { normalizePort } from './src/utils/index';

debug('group1-comp308-project');

const port = normalizePort(process.env.PORT || DefaultPort);
console.log('port', port);
app.set('port', port);
app.listen({ port }, () => {
  console.log(`Server ready at ${port}`);
})

const startServer = async () => {
  const server = new ApolloServer({
    schema: schema
  });

  await server.start();
  server.applyMiddleware({ app, cors: false })
};

startServer();
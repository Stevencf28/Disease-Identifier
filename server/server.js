import debug from 'debug';
import app from './config/app';
import { DefaultPort } from './config/default';
import { normalizePort } from './utils/index';

debug('group1-comp308-project');

const port = normalizePort(process.env.PORT || DefaultPort);
console.log('port', port);
app.set('port', port);
app.listen({ port }, () => {
  console.log(`Server ready at ${port}`);
})
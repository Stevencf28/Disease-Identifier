import createError from 'http-errors';

export const normalizePort = (portEnv) => {
  const port = parseInt(portEnv, 10);
  
  if(isNaN(port)) {
    // named pipe
    return portEnv;
  }

  if(port >= 0) {
    // port number
    return port;
  }

  return false;
}
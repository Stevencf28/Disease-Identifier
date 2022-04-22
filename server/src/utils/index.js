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

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
// Server Port
export const DefaultPort = 8080;

// DB Configurations
const Database = 'db_healthcare';
export const Host = 'cluster0.4tktb.mongodb.net'
export const MongoUri = `mongodb+srv://admin:admin@${Host}/${Database}?retryWrites=true&w=majority`;
export const secretKey = 'group1_secret_key';
export const saltRounds = 10;
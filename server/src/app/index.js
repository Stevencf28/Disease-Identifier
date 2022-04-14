import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import * as Config from '../config';

// App Configuration
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
export default app;

// DB Configuration
mongoose.connect(Config.MongoUri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error'));
db.once('open', () => {
  console.log(`Connected MongoDB at ${Config.Host}`)
})
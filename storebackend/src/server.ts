import * as dotenv from 'dotenv';
dotenv.config()
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { checkDatabaseConnection } from './connection/db';
import authRoutes from './routes/authRoutes'
import appRoutes from './routes/appRoutes'

import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
const port = process.env.PORT || 5000;
// Middleware

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//authRoutes
app.use("/api/auth",authRoutes)
app.use("/api",appRoutes)



// Start the server
app.listen(port, async () => {
   await checkDatabaseConnection()
  console.log(`Server is running on port ${port}`);
});

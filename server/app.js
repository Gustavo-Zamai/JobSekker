import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import userRoute from './routes/userRoute.js';
import appRoute from './routes/applicationRoute.js';
import jobRoute from './routes/jobRoute.js';
import { conn } from './database/connection.js';
import { errorMiddleware } from './middlewares/error.js';

const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.WEB_URL],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use('/api/v1/user', userRoute);
app.use('/api/v1/application', appRoute);
app.use('/api/v1/job', jobRoute);

conn();

app.use(errorMiddleware);


export default app;
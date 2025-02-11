import express from 'express';
import router from './src/routes/index.js'
import dotenv from 'dotenv';
import  connect  from './src/config/database.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URL, 
    credentials: true
})); 

connect();

app.use('/', router)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

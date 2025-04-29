import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// import your routes 



// load enviroment variable
dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use

// health check routes 
app.get('/', (req, res) => {
  res.status(200).json({
  messgae:'welcome to the Carbon neutrality api'
  });
});

// 404 Route handler
app.use((req, res) => {
  res.status(200).json({
    message: 'welcome to the Carbon Neutrality API'
  });
});

export default app;
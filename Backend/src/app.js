import express from 'express';
import authrouter from './routes/auth.routes.js';
import resumerouter from './routes/resumeanalysis.routes.js';
const app = express();
import cookieParser from "cookie-parser";
import cors from 'cors';


app.use(cors({
  origin: 'http://localhost:5173',  // Replace with your frontend URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());



app.use('/api/auth', authrouter);  
app.use('/api/resume', resumerouter) 
app.get('/', (req, res) => {
    res.send('Welcome to the Resume Analyzer run dev API');


}  )                                                                              


export default app;


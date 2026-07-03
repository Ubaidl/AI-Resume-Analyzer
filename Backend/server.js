import  app from './src/app.js';
import dotenv from 'dotenv';
import connectDB from './src/config/databaseconnect.js'



dotenv.config();
connectDB();




const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
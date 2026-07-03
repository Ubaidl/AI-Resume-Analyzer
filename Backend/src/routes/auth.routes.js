import express from "express";
import { registerUser,
     loginUser,
      logoutUser,
     getcurrentUser,
     getallusers
     } from "../controllers/auth.controller.js";
import authenticateToken from "../middleware/auth.middleware.js";
const authrouter = express.Router();




authrouter.post('/register',registerUser)
authrouter.post('/login', loginUser)
authrouter.get('/logout', logoutUser)
authrouter.get('/getuser', authenticateToken, getcurrentUser)
authrouter.get('/getallusers', authenticateToken, getallusers)

    

export default authrouter;

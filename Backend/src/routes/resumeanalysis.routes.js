import express from "express";
import authenticateToken from "../middleware/auth.middleware.js";
const resumerouter = express.Router()
import upload from "../middleware/multerm.middleware.js";
import {Analysisresumeandgetreport,} from "../controllers/resumeanalysis.controller.js"

resumerouter.post('/uploadresume',authenticateToken,upload.single("resume"), Analysisresumeandgetreport)


export default resumerouter

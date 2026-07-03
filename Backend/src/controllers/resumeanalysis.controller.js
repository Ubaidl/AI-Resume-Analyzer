import ResumeAnalysismodel from "../models/resumeanalysis.model.js"
import analysisResumeandgetscoreandinterviewquestion from "../services/ai.service.js"
import { PDFParse } from "pdf-parse";



const Analysisresumeandgetreport = async ( req,res)=>{
    try {
    // Get the uploaded PDF
    const resumeFile = req.file;

    // Get the job description text
    const { jobDescription } = req.body;

    // Extract text from the PDF
    const parser = new PDFParse({ data: resumeFile.buffer });
const result = await parser.getText();
const resumeText = result.text;
     // Call AI service
    const analysisReport = await analysisResumeandgetscoreandinterviewquestion(
      resumeText,
      jobDescription
    );
    console.log("AI Response:", analysisReport);
    
    const interviewReport = await ResumeAnalysismodel.create({
        user : req.user.id,
        resume : resumeText,
        jobDescription,
        ...analysisReport
         
    })
    // console.log(interviewReport) 

    

    res.status(201).json({
        message:"interviewReport generate sucessfully",
        interviewReport,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }


}


export {Analysisresumeandgetreport}




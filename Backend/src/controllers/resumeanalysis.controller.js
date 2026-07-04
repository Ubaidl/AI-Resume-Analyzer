import ResumeAnalysismodel from "../models/ResumeAnalysis.model.js";
import analysisResumeandgetscoreandinterviewquestion from "../services/ai.service.js";
import { PDFParse } from "pdf-parse";

const Analysisresumeandgetreport = async (req, res) => {
  try {
    // Get uploaded resume
    const resumeFile = req.file;

    // Get job description
    const { jobDescription } = req.body;

    // Resume validation
    if (!resumeFile) {
      return res.status(400).json({
        message: "Please upload your resume.",
      });
    }

    // Job description validation
    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        message: "Please enter a job description.",
      });
    }

    // Minimum length validation
    if (jobDescription.trim().length < 100) {
      return res.status(400).json({
        message:
          "Please enter a valid job description (minimum 100 characters).",
      });
    }

    // Minimum word validation
    const words = jobDescription.trim().split(/\s+/);

    if (words.length < 20) {
      return res.status(400).json({
        message: "Please enter a complete job description.",
      });
    }

    // Extract text from PDF
    const parser = new PDFParse({
      data: resumeFile.buffer,
    });

    const result = await parser.getText();
    const resumeText = result.text;

    // Call AI
    const analysisReport =
      await analysisResumeandgetscoreandinterviewquestion(
        resumeText,
        jobDescription
      );

      // Check if AI says the job description is invalid
if (analysisReport.success === false) {
  return res.status(400).json({
    message: analysisReport.message,
  });
}

    const interviewReport = await ResumeAnalysismodel.create({
      user: req.user.id,
      resume: resumeText,
      jobDescription,
      ...analysisReport,
    });

    return res.status(201).json({
      message: "Interview report generated successfully.",
      interviewReport,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { Analysisresumeandgetreport };
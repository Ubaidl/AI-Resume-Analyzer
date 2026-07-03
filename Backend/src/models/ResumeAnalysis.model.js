import mongoose from "mongoose";
import User from "./user.model.js";


const BehavioralQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

  intention: {
    type: String,
    required: true,
  },

  answer: {
    type: String,
    required: true,
  },

}, {
  _id: false
});

const TechnicalQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

  intention: {
    type: String,
    required: true,
  },

  answer: {
    type: String,
    required: true,
  },
}, {
  _id: false
});

const resumeAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    resume: {
      type: String,
      required: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    matchScore: {
      type: Number,

      min: 0,
      max: 100,
    },
    matchSummary: {
      type: String,
    },
    technicalQuestions: [TechnicalQuestionSchema],

    behaviorQuestions: [BehavioralQuestionSchema],


  },
  { timestamps: true }
);
const ResumeAnalysismodel = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);

export default ResumeAnalysismodel

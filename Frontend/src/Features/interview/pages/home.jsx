import "../style/home.scss";
import { useinterview } from "../hooks/useinterview.js";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const { loading, generateReport } = useinterview();

  const [jobDescription, setJobDescription] = useState("");
  const resumeinputref = useRef();

  const navigate = useNavigate();

  const handlegenerateReport = async (e) => {
    e.preventDefault();

    const resume = resumeinputref.current.files[0];

    // Resume validation
    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    // Job description validation
    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    // Minimum character validation
    if (jobDescription.trim().length < 100) {
      alert("Please enter a valid job description (minimum 100 characters).");
      return;
    }

    // Minimum word validation
    const words = jobDescription.trim().split(/\s+/);

    if (words.length < 20) {
      alert("Please enter a complete job description.");
      return;
    }

    try {
      await generateReport({
        resume,
        jobDescription,
      });

      navigate("/report");
    } catch (error) {
      console.error(error);

      if (error?.status === 401) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      alert(error?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__content">
          <h1>
            AI Resume <span>Analyzer</span>
          </h1>

          <p>
            Upload your resume and paste the job description to receive an
            AI-powered resume analysis, match score, and personalized interview
            questions.
          </p>
        </div>
      </section>

      <section className="analysis-form">
        <h2>Analyze Your Resume</h2>

        <form onSubmit={handlegenerateReport}>
          <div className="form-group">
            <label>Upload Resume (PDF)</label>

            <input
              ref={resumeinputref}
              type="file"
              accept=".pdf"
              name="resume"
            />
          </div>

          <div className="form-group">
            <label>Job Description</label>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              name="jobDescription"
              rows="8"
              placeholder="Paste the job description here..."
            ></textarea>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;
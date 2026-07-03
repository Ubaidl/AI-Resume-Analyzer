import "../style/home.scss";
import {useinterview} from "../hooks/useinterview.js" 
import { useState,useRef } from "react";
import { useNavigate } from "react-router";

const Home = () => {

    const {loading,generateReport} = useinterview()
    const [jobDescription,setJobDescription] = useState()
    const resumeinputref = useRef()

    const navigate = useNavigate()

    const handlegenerateReport = async (e)=>{
        e.preventDefault();
           
        const resume = resumeinputref.current.files[0]
        try {

    const data = await generateReport({
        resume,
        jobDescription,
    });

    navigate("/report");

} catch (error) {

    alert("Sorry! You must be logged in.");

    navigate("/login");
}
    }


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

        <form>
          <div className="form-group">
            <label>Upload Resume (PDF)</label>

            <input ref={(resumeinputref)}
              type="file"
              accept=".pdf"
              name="resume"
            />
          </div>

          <div className="form-group">
            <label>Job Description</label>

            <textarea onChange={(e)=>setJobDescription(e.target.value)}
              name="jobDescription"
              rows="8"
              placeholder="Paste the job description here..."
            ></textarea>
          </div>

          <button  onClick={handlegenerateReport}      type="submit">
            Analyze Resume
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;
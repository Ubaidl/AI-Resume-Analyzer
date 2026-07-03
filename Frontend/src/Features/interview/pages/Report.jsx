import { useAuth } from "../../auth/hooks/useAuth";
import { useinterview } from "../hooks/useinterview";
import { useNavigate } from "react-router";
import "../style/Report.scss";

const Report = () => {
    const { report } = useinterview();
    const { handleLogout } = useAuth()
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await handleLogout(); // Calls your backend logout API
            navigate("/");        // Go back to the Home page
        } catch (error) {
            console.log(error);
        }
    };

    if (!report) {
        return (
            <div className="report">
                <h1>No Report Found</h1>
            </div>
        );
    }

    return (
        <div className="report">

            {/* Heading */}
            <div className="heading">

                <h1>AI Resume Analysis</h1>
                <button
                    onClick={logout}
                    style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        padding: "8px 15px",
                        cursor: "pointer",
                        backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
                    }}
                >
                    Logout
                </button>
                <p>
                    Here is your AI-powered interview preparation report based on your
                    resume and the job description.
                </p>
            </div>

            {/* Match Score */}
            <div className="score-card">
                <h2>Match Score</h2>

                <div className="score">
                    {report.matchScore}%
                </div>
            </div>

            {/* Technical Questions */}
            <div className="question-section">
                <h2>Technical Questions</h2>

                {report.technicalQuestions.map((question, index) => (
                    <div className="question-card" key={index}>

                        <h3>
                            Question {index + 1}
                        </h3>

                        <p>
                            <strong>Question:</strong>
                        </p>

                        <p>{question.question}</p>

                        <h4>Why is this asked?</h4>

                        <p>{question.intention}</p>

                        <h4>Suggested Answer</h4>

                        <p>{question.answer}</p>

                    </div>
                ))}
            </div>

            {/* Behavioral Questions */}
            <div className="question-section">
                <h2>Behavioral Questions</h2>

                {report.behaviorQuestions.map((question, index) => (
                    <div className="question-card" key={index}>

                        <h3>
                            Question {index + 1}
                        </h3>

                        <p>
                            <strong>Question:</strong>
                        </p>

                        <p>{question.question}</p>

                        <h4>Why is this asked?</h4>

                        <p>{question.intention}</p>

                        <h4>Suggested Answer</h4>

                        <p>{question.answer}</p>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default Report;
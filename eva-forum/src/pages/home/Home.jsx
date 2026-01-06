// src/pages/Home.jsx
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import api from "../../api/axios";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      // Token is automatically added by axios interceptor
      const response = await api.get("/questions");
      // Sort by newest first
      const sortedQuestions = response.data.sort((a, b) => b.id - a.id);
      setQuestions(sortedQuestions);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching questions:", err);
      console.error("Error response:", err.response?.data);
      setError("Failed to load questions");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleQuestionClick = (questionId) => {
    navigate(`/question/${questionId}`);
  };

  // Get user initials for avatar
  const getInitials = (username) => {
    if (!username) return "?";
    return username.charAt(0).toUpperCase();
  };

  if (loading)
    return <div className={styles.loading}>Loading questions...</div>;

  return (
    <div className={styles.homeContainer}>
      {/* Top header row */}
      <header className={styles.homeHeader}>
        <button
          onClick={() => navigate("/askQuestion")}
          className={styles.askBtn}
        >
          Ask Question
        </button>
        <div>
          <span className={styles.welcomeText}>
            Welcome: <span>{user?.firstName || user?.username}</span>
          </span>
          {/* <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button> */}
        </div>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      {/* Questions section */}
      <div className={styles.questionsSection}>
        <span className={styles.questionsHeader2}>
          <h2 className={styles.questionsHeader}>Questions</h2>
        </span>

        {questions.length === 0 ? (
          <div className={styles.emptyState}>
            No questions yet. Be the first to ask!
          </div>
        ) : (
          <ul className={styles.questionsList}>
            {questions.map((question) => (
              <li
                key={question.id}
                onClick={() => handleQuestionClick(question.id)}
                className={styles.questionItem}
              >
                {/* Rounded avatar with user initial */}
                <div>
                  <span className={styles.avatar}>
                    {getInitials(question.username)}
                  </span>
                  <span className={styles.username}>
                    {question.username || `User ${question.user_id}`}
                  </span>
                </div>

                {/* Question content */}
                <div className={styles.questionContent}>
                  <h5 className={styles.questionTitle}>{question.title}</h5>
                </div>

                {/* Arrow icon */}
                <div className={styles.arrow}>
                  <IoIosArrowForward />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// // src/pages/Home.jsx
// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import api from "../api/axios";
// import ".././Styles/styles.css";

// export default function Home() {
//   const navigate = useNavigate();
//   const { user, logoutUser } = useContext(AuthContext);
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   const fetchQuestions = async () => {
//     try {
//       const response = await api.get("/questions");
//       // Sort by newest first (assuming questions have an id that increments)
//       const sortedQuestions = response.data.sort((a, b) => b.id - a.id);
//       setQuestions(sortedQuestions);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching questions:", err);
//       setError("Failed to load questions");
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     logoutUser();
//     navigate("/login");
//   };

//   const handleQuestionClick = (questionId) => {
//     navigate(`/question/${questionId}`);
//   };

//   if (loading) return <div>Loading questions...</div>;

//   return (
//     <div className="home-container">
//       <header className="home-header">
//         <h1>Welcome: {user?.firstName || user?.username}</h1>
//         <div className="header-actions">
//           <button onClick={() => navigate("/askQuestion")} className="ask-btn">
//             Ask Question
//           </button>
//           <button onClick={handleLogout} className="logout-btn">
//             Logout
//           </button>
//         </div>
//       </header>

//       {error && <p style={{ color: "red", padding: "20px" }}>{error}</p>}

//       <div className="questions-list" style={{ padding: "20px" }}>
//         <h2>Questions</h2>
//         {questions.length === 0 ? (
//           <p>No questions yet. Be the first to ask!</p>
//         ) : (
//           <ul style={{ listStyle: "none", padding: 0 }}>
//             {questions.map((question) => (
//               <li
//                 key={question.id}
//                 onClick={() => handleQuestionClick(question.id)}
//                 style={{
//                   cursor: "pointer",
//                   padding: "15px",
//                   borderBottom: "1px solid #ddd",
//                   transition: "background-color 0.2s",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.backgroundColor = "#f5f5f5")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.backgroundColor = "transparent")
//                 }
//               >
//                 <h3 style={{ margin: "0 0 8px 0", color: "#0066cc" }}>
//                   {question.title}
//                 </h3>
//                 <p style={{ fontSize: "0.9em", color: "#666", margin: 0 }}>
//                   Asked by:{" "}
//                   <strong>
//                     {question.username || `User ${question.user_id}`}
//                   </strong>
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

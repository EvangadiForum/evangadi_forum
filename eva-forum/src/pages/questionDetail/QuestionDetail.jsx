import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext.jsx";
import styles from "./QuestionDetail.module.css";

export default function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchQuestionAndAnswers();
  }, [id]);

  const fetchQuestionAndAnswers = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch question details
      const questionResponse = await api.get(`/questions/${id}`);
      console.log("Question response:", questionResponse.data);
      setQuestion(questionResponse.data.question); // ✅ Access .question property

      // Fetch answers for this question
      const answersResponse = await api.get(`/answers/${id}`);
      console.log("Answers response:", answersResponse.data);
      setAnswers(answersResponse.data.answers || []); // ✅ Access .answers property

      setLoading(false);
    } catch (err) {
      console.error("Error fetching question:", err);
      console.error("Error details:", err.response?.data);
      setError(err.response?.data?.message || "Failed to load question");
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    setError("");

    if (!answerText.trim()) {
      setError("Answer cannot be empty");
      return;
    }

    if (answerText.trim().length < 10) {
      setError("Answer must be at least 10 characters long");
      return;
    }

    try {
      await api.post(`/answers`, {
        question_id: id, // ✅ Changed from questionId to question_id
        answer: answerText,
      });

      // Refresh answers to show the new one
      const answersResponse = await api.get(`/answers/${id}`);
      setAnswers(answersResponse.data.answers || []); // ✅ Access .answers property

      // Clear the textarea
      setAnswerText("");
    } catch (err) {
      console.error("Error posting answer:", err);
      setError(err.response?.data?.message || "Failed to post answer");
    }
  };

  // Get user initials for avatar
  const getInitials = (username) => {
    if (!username) return "?";
    return username.charAt(0).toUpperCase();
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error && !question) return <div className={styles.error}>{error}</div>;
  if (!question)
    return <div className={styles.loading}>Question not found</div>;

  return (
    <div className={styles.questionDetailPage}>
      <button onClick={() => navigate("/home")} className={styles.backBtn}>
        ← Back to Home Page
      </button>

      {/* Question Section */}
      <div className={styles.questionSection}>
        <h2 className={styles.questionHeader}>Question</h2>
        <h5 className={styles.questionTitle}>{question.title}</h5>
        <p className={styles.questionDescription}>{question.description}</p>
        <p className={styles.questionMeta}>
          Asked by:{" "}
          <strong>{question.username || `User ${question.user_id}`}</strong>
        </p>
      </div>

      {/* Answers Section */}
      <div className={styles.answersSection}>
        <h2 className={styles.answersHeader}>
          Answer(s) From The Community ({answers.length})
        </h2>

        {answers.length === 0 ? (
          <p className={styles.noAnswers}>
            No answers yet. Be the first to answer!
          </p>
        ) : (
          <ul className={styles.answersList}>
            {answers.map((answer) => (
              <li key={answer.id} className={styles.answerItem}>
                {/* Avatar Section */}
                <div className={styles.avatarSection}>
                  <div className={styles.avatar}>
                    {getInitials(answer.username)}
                  </div>
                  <div className={styles.answerUsername}>
                    {answer.username || `User ${answer.user_id}`}
                  </div>
                </div>

                {/* Answer Content */}
                <div className={styles.answerContent}>
                  <p className={styles.answerText}>{answer.answer}</p>
                  <p className={styles.answerMeta}>
                    {new Date(answer.created_at).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Answer Form Section */}
      <div className={styles.answerFormSection}>
        <h3>Answer The Top Question</h3>
        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmitAnswer} className={styles.answerForm}>
          <textarea
            rows={6}
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Write your answer here... (minimum 10 characters)"
            required
          />
          <button type="submit" className={styles.submitBtn}>
            Post Answer
          </button>
        </form>
      </div>
    </div>
  );
}

// // src/pages/QuestionDetail.jsx
// import { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../../api/axios";
// import { AuthContext } from "../../context/AuthContext.jsx";
// import styles from "./QuestionDetail.module.css";

// export default function QuestionDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const [question, setQuestion] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [answerText, setAnswerText] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchQuestionAndAnswers();
//   }, [id]);

//   const fetchQuestionAndAnswers = async () => {
//     try {
//       // Fetch question details
//       const questionResponse = await api.get(`/questions/${id}`);
//       setQuestion(questionResponse.data);

//       // Fetch answers for this question
//       const answersResponse = await api.get(`/answers/${id}`);
//       setAnswers(answersResponse.data);

//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching question:", err);
//       setError("Failed to load question");
//       setLoading(false);
//     }
//   };

//   const handleSubmitAnswer = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!answerText.trim()) {
//       setError("Answer cannot be empty");
//       return;
//     }

//     try {
//       await api.post(`/answers`, {
//         questionId: id,
//         answer: answerText,
//       });

//       // Refresh answers to show the new one
//       const answersResponse = await api.get(`/answers/${id}`);
//       setAnswers(answersResponse.data);

//       // Clear the textarea
//       setAnswerText("");
//     } catch (err) {
//       console.error("Error posting answer:", err);
//       setError(err.response?.data?.msg || "Failed to post answer");
//     }
//   };

//   // Get user initials for avatar
//   const getInitials = (username) => {
//     if (!username) return "?";
//     return username.charAt(0).toUpperCase();
//   };

//   if (loading) return <div className={styles.loading}>Loading...</div>;
//   if (!question)
//     return <div className={styles.loading}>Question not found</div>;

//   return (
//     <div className={styles.questionDetailPage}>
//       <button onClick={() => navigate("/home")} className={styles.backBtn}>
//         ← Back to Home Page
//       </button>

//       {/* Question Section */}
//       <div className={styles.questionSection}>
//         <h2 className={styles.questionHeader}>Question</h2>
//         <h5 className={styles.questionTitle}>{question.title}</h5>
//         <p className={styles.questionDescription}>{question.description}</p>
//         {/* <p className={styles.questionMeta}>
//           Asked by:{" "}
//           <strong>{question.username || `User ${question.user_id}`}</strong>
//         </p> */}
//       </div>

//       {/* Answers Section */}
//       <div className={styles.answersSection}>
//         <h2 className={styles.answersHeader}>Answer(s) From The Community</h2>

//         {answers.length === 0 ? (
//           <p className={styles.noAnswers}>
//             No answers yet. Be the first to answer!
//           </p>
//         ) : (
//           <ul className={styles.answersList}>
//             {answers.map((answer) => (
//               <li key={answer.id} className={styles.answerItem}>
//                 {/* Avatar Section */}
//                 <div className={styles.avatarSection}>
//                   <div className={styles.avatar}>
//                     {getInitials(answer.username)}
//                   </div>
//                   <div className={styles.answerUsername}>
//                     {answer.username || `User ${answer.user_id}`}
//                   </div>
//                 </div>

//                 {/* Answer Content */}
//                 <div className={styles.answerContent}>
//                   <p className={styles.answerText}>{answer.answer}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Answer Form Section */}
//       <div className={styles.answerFormSection}>
//         <h3> Answer The Top Question</h3>
//         {error && <div className={styles.error}>{error}</div>}

//         <form onSubmit={handleSubmitAnswer} className={styles.answerForm}>
//           <textarea
//             rows={6}
//             value={answerText}
//             onChange={(e) => setAnswerText(e.target.value)}
//             placeholder="Write your answer here..."
//             required
//           />
//           <button type="submit" className={styles.submitBtn}>
//             Post Answer
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // // src/pages/QuestionDetail.jsx
// // import { useState, useEffect, useContext } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import api from "../api/axios";
// // import { AuthContext } from "../context/AuthContext";

// // export default function QuestionDetail() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const { user } = useContext(AuthContext);

// //   const [question, setQuestion] = useState(null);
// //   const [answers, setAnswers] = useState([]);
// //   const [answerText, setAnswerText] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     fetchQuestionAndAnswers();
// //   }, [id]);

// //   const fetchQuestionAndAnswers = async () => {
// //     try {
// //       // Fetch question details
// //       const questionResponse = await api.get(`/questions/${id}`);
// //       setQuestion(questionResponse.data);

// //       // Fetch answers for this question
// //       const answersResponse = await api.get(`/answers/${id}`);
// //       setAnswers(answersResponse.data);

// //       setLoading(false);
// //     } catch (err) {
// //       console.error("Error fetching question:", err);
// //       setError("Failed to load question");
// //       setLoading(false);
// //     }
// //   };

// //   const handleSubmitAnswer = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     if (!answerText.trim()) {
// //       setError("Answer cannot be empty");
// //       return;
// //     }

// //     try {
// //       const response = await api.post(`/answers`, {
// //         questionId: id,
// //         answer: answerText,
// //       });

// //       // Refresh answers to show the new one
// //       const answersResponse = await api.get(`/answers/${id}`);
// //       setAnswers(answersResponse.data);

// //       // Clear the textarea
// //       setAnswerText("");
// //     } catch (err) {
// //       console.error("Error posting answer:", err);
// //       setError(err.response?.data?.msg || "Failed to post answer");
// //     }
// //   };

// //   if (loading) return <div>Loading...</div>;
// //   if (!question) return <div>Question not found</div>;

// //   return (
// //     <div className="question-detail-page">
// //       <button onClick={() => navigate("/")} className="back-btn">
// //         ← Back to Questions
// //       </button>

// //       <div className="question-section">
// //         <h1>Question</h1>
// //         {/* <h2>{question.title}</h2> */}
// //         <p className="question-description">{question.description}</p>
// //         {/* <p className="question-meta">
// //           Asked by:{" "}
// //           <strong>{question.username || `User ${question.user_id}`}</strong>
// //         </p> */}
// //       </div>

// //       <hr />

// //       <div className="answers-section">
// //         <h3>Answers ({answers.length})</h3>

// //         {answers.length === 0 ? (
// //           <p>No answers yet. Be the first to answer!</p>
// //         ) : (
// //           <ul className="answers-list">
// //             {answers.map((answer) => (
// //               <li key={answer.id} className="answer-item">
// //                 <p>{answer.answer}</p>
// //                 <p className="answer-meta">
// //                   Answered by:{" "}
// //                   <strong>{answer.username || `User ${answer.user_id}`}</strong>
// //                 </p>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </div>

// //       <hr />

// //       <div className="answer-form-section">
// //         <h3> Answer The Top Questions</h3>
// //         {error && (
// //           <p className="error" style={{ color: "red" }}>
// //             {error}
// //           </p>
// //         )}

// //         <form onSubmit={handleSubmitAnswer}>
// //           <textarea
// //             rows={6}
// //             value={answerText}
// //             onChange={(e) => setAnswerText(e.target.value)}
// //             placeholder="Write your answer here..."
// //             required
// //           />
// //           <button type="submit">Post Answer</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

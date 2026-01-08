import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext.jsx";
import styles from "./AskQuestion.module.css";

export default function AskQuestion() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Title and description cannot be empty");
      return;
    }

    try {
      await api.post("/questions", {
        title,
        description,
      });

      // After posting, redirect to home page
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Failed to post question");
    }
  };

  return (
    <div className={styles.askQuestionPage}>
      <button onClick={() => navigate("/home")} className={styles.backBtn}>
        ← Back to Home
      </button>

      {/* <h2 className={styles.pageTitle}>Ask a Question</h2> */}

      <div className={styles.instructions}>
        <h3>Steps to write a good question</h3>
        <ul>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.questionForm}>
        <div className={styles.formGroup}>
          <h3 className={styles.sectionTitle}>Ask a Public Question</h3>
          <input
            type="text"
            placeholder="Title"
            maxLength={200}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <textarea
            placeholder="Question Description..."
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Post Question
        </button>
      </form>
    </div>
  );
}

// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";
// import { AuthContext } from "../../context/AuthContext";

// export default function AskQuestion() {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!title.trim() || !description.trim()) {
//       setError("Title and description cannot be empty");
//       return;
//     }

//     try {
//       await api.post("/questions", {
//         title,
//         description,
//       });

//       // After posting, redirect to home page
//       navigate("/home");
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.msg || "Failed to post question");
//     }
//   };

//   return (
//     <div
//       className="ask-question-page"
//       style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
//     >
//       <button
//         onClick={() => navigate("/home")}
//         style={{ marginBottom: "20px", padding: "8px 16px", cursor: "pointer" }}
//       >
//         ← Back to Home
//       </button>

//       <h2>Ask a Question</h2>

//       <div
//         className="instructions"
//         style={{
//           backgroundColor: "#f5f5f5",
//           padding: "15px",
//           marginBottom: "20px",
//           borderRadius: "5px",
//         }}
//       >
//         <h3>Steps to write a good question</h3>
//         <ul>
//           <li>Summarize your problem in a one-line title.</li>
//           <li>Describe your problem in more detail.</li>
//           <li>Describe what you tried and what you expected to happen.</li>
//           <li>Review your question and post it to the site.</li>
//         </ul>
//       </div>

//       {error && (
//         <p className="error" style={{ color: "red" }}>
//           {error}
//         </p>
//       )}

//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: "15px" }}>
//           <h3>Ask a Public Question</h3>
//           <label
//             style={{
//               display: "block",
//               marginBottom: "5px",
//               fontWeight: "bold",
//             }}
//           >
//             {/* Title (max 200 chars) */}
//           </label>
//           <input
//             type="text"
//             placeholder="Title"
//             maxLength={200}
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "10px",
//               fontSize: "16px",
//               borderRadius: "5px",
//               border: "1px solid #ddd",
//             }}
//             required
//           />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label
//             style={{
//               display: "block",
//               marginBottom: "5px",
//               fontWeight: "bold",
//             }}
//           >
//             {/* Description */}
//           </label>
//           <textarea
//             placeholder="Question Description"
//             rows={8}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "10px",
//               fontSize: "16px",
//               borderRadius: "5px",
//               border: "1px solid #ddd",
//             }}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           style={{
//             padding: "12px 30px",
//             backgroundColor: "#0066cc",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             fontSize: "16px",
//           }}
//         >
//           Post Question
//         </button>
//       </form>
//     </div>
//   );
// }

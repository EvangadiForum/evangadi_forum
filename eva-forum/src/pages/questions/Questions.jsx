import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./questions/Questions.css";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  console.log("Questions Componet rendered Here!"); //Questions Componet rendered Here!
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get("/questions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(data);
      } catch (err) {
        console.error("Fetch questions error:", err.response?.data || err);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      {questions.map((q) => (
        <div key={q.id}>
          <h3>{q.title}</h3>
          <p>{q.description}</p>
        </div>
      ))}
    </div>
  );
}

// src/pages/Documentation.jsx
import { useNavigate } from "react-router-dom";
import styles from "./Documentation.module.css";

export default function Documentation() {
  const navigate = useNavigate();

  return (
    <div className={styles.documentationPage}>
      <div className={styles.container}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          ← Back
        </button>

        <h1 className={styles.title}>How It Works</h1>
        <p className={styles.subtitle}>
          Learn how to use the EvaFor Q&A platform effectively
        </p>

        <section className={styles.section}>
          <h2>Getting Started</h2>
          <p>
            Welcome to EvaFor Q&A! This platform is designed to help you ask
            programming-related questions and get answers from the community.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Creating an Account</h2>
          <ol>
            <li>Click on "Sign In" in the header</li>
            <li>Select "Create account" if you're a new user</li>
            <li>
              Fill in your first name, last name, username, email, and password
            </li>
            <li>Click "Create Account" to register</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>Asking a Question</h2>
          <ol>
            <li>Log in to your account</li>
            <li>Click the "Ask Question" button on the home page</li>
            <li>Write a clear, descriptive title (max 200 characters)</li>
            <li>Provide detailed description of your problem</li>
            <li>Include what you've tried and what you expect to happen</li>
            <li>Click "Post Question" to submit</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>Answering Questions</h2>
          <ol>
            <li>Browse questions on the home page</li>
            <li>Click on a question title to view details</li>
            <li>Read the question carefully</li>
            <li>Write your answer in the "Your Answer" section</li>
            <li>Click "Post Answer" to help the community</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>Best Practices</h2>
          <ul>
            <li>Search for existing questions before posting</li>
            <li>Be clear and specific in your questions</li>
            <li>Include relevant code snippets when applicable</li>
            <li>Be respectful and constructive in your answers</li>
            <li>Vote on helpful questions and answers</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Need Help?</h2>
          <p>
            If you have any questions or need assistance, please contact our
            support team or ask in the community forum.
          </p>
        </section>
      </div>
    </div>
  );
}

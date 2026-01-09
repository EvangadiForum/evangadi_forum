// HowItWorks.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./HowItWorks.css";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Create Your Account",
      description:
        "Sign up in seconds with just your email and basic information. Join our growing community of knowledge seekers and sharers.",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      number: "2",
      title: "Ask Questions",
      description:
        "Post your questions on any topic. Our community is here to help you find answers quickly and accurately.",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
    {
      number: "3",
      title: "Share Knowledge",
      description:
        "Answer questions from others and share your expertise. Help build a collaborative learning environment.",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      number: "4",
      title: "Engage & Learn",
      description:
        "Upvote helpful answers, bookmark important questions, and build your reputation in the community.",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
  ];

  const features = [
    {
      title: "Real-Time Notifications",
      description:
        "Get instantly notified when someone answers your question or engages with your content.",
      icon: "🔔",
    },
    {
      title: "Topic Categories",
      description:
        "Browse questions by categories to find exactly what you're looking for or contribute where you excel.",
      icon: "📚",
    },
    {
      title: "Reputation System",
      description:
        "Earn points and badges as you help others, showcasing your expertise and contributions.",
      icon: "⭐",
    },
    {
      title: "Search & Filter",
      description:
        "Powerful search tools help you find existing answers or discover trending discussions.",
      icon: "🔍",
    },
  ];

  return (
    <div className="howItWorksPage">
      {/* Hero Section */}
      <section className="heroSection">
        <div className="heroContent">
          <h1>How EvaFor Q&A Works</h1>
          <p className="heroSubtitle">
            Join thousands of users sharing knowledge and finding answers to
            their questions
          </p>
          <Link to="/signup" className="ctaButton">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Steps Section */}
      <section className="stepsSection">
        <div className="sectionHeader">
          <h2>Get Started in 4 Simple Steps</h2>
          <p>
            It's easy to join our community and start asking or answering
            questions
          </p>
        </div>

        <div className="stepsGrid">
          {steps.map((step, index) => (
            <div key={index} className="stepCard">
              <div className="stepNumber">{step.number}</div>
              <div className="stepIcon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="featuresSection">
        <div className="sectionHeader">
          <h2>Powerful Features</h2>
          <p>Everything you need for a great Q&A experience</p>
        </div>

        <div className="featuresGrid">
          {features.map((feature, index) => (
            <div key={index} className="featureCard">
              <div className="featureIcon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefitsSection">
        <div className="benefitsContent">
          <div className="benefitsText">
            <h2>Why Choose EvaFor Q&A?</h2>
            <ul className="benefitsList">
              <li>
                <span className="checkmark">✓</span>
                <div>
                  <strong>Fast Responses:</strong> Get answers to your questions
                  within minutes from knowledgeable community members
                </div>
              </li>
              <li>
                <span className="checkmark">✓</span>
                <div>
                  <strong>Quality Content:</strong> Our voting system ensures
                  the best answers rise to the top
                </div>
              </li>
              <li>
                <span className="checkmark">✓</span>
                <div>
                  <strong>Diverse Topics:</strong> From technology to cooking,
                  find experts in every field
                </div>
              </li>
              <li>
                <span className="checkmark">✓</span>
                <div>
                  <strong>Build Your Network:</strong> Connect with like-minded
                  individuals and grow your professional network
                </div>
              </li>
              <li>
                <span className="checkmark">✓</span>
                <div>
                  <strong>Free Forever:</strong> Access all features without any
                  subscription fees
                </div>
              </li>
            </ul>
          </div>
          <div className="benefitsImage">
            <div className="imagePlaceholder">
              <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none">
                <rect width="400" height="300" fill="#f0f0f0" rx="8" />
                <circle cx="200" cy="150" r="60" fill="#667eea" opacity="0.2" />
                <path
                  d="M170 150 L190 170 L230 130"
                  stroke="#667eea"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ctaSection">
        <div className="ctaContent">
          <h2>Ready to Get Started?</h2>
          <p>Join our community today and start sharing knowledge</p>
          <div className="ctaButtons">
            <Link to="/signup" className="ctaButtonPrimary">
              Sign Up Free
            </Link>
            <Link to="/login" className="ctaButtonSecondary">
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/singnup/Signup";
import Home from "./pages/home/Home";
import AskQuestion from "./pages/askQuestions/AskQuestion";
import QuestionDetail from "./pages/questionDetail/QuestionDetail";
import ProtectedRoute from "./comopnents/ProtectedRoute";
import HowItWorks from "./pages/howitworks/HowItWorks";
import Header from "./comopnents/Header";
import { AuthProvider } from "./context/AuthProvider";
import "./styles/bg.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        {/* <Banner /> */}
        <Routes>
          {/* Root redirects to home (ProtectedRoute will handle auth) */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/askQuestion"
            element={
              <ProtectedRoute>
                <AskQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question/:id"
            element={
              <ProtectedRoute>
                <QuestionDetail />
              </ProtectedRoute>
            }
          />
          {/* SIn your routes: */}
          <Route path="/how-it-works" element={<HowItWorks />} />;
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import Header from "../components/Header";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthProvider"; // Correct import
// import ProtectedRoute from "./routes/ProtectedRoute";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Questions from "./pages/Questions";
// import AskQuestion from "./pages/AskQuestion";
// import QuestionDetail from "./pages/QuestionDetail";

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />

//           {/* Protected Routes */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/" element={<Questions />} />
//             <Route path="/ask" element={<AskQuestion />} />
//             <Route path="/questions/:id" element={<QuestionDetail />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

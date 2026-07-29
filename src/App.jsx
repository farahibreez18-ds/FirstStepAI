import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import CoverLetter from "./pages/CoverLetter";
import MockInterview from "./pages/MockInterview";
import JobTracker from "./pages/JobTracker";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/resume" element={
        <ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>
      } />
      <Route path="/cover-letter" element={
        <ProtectedRoute><CoverLetter /></ProtectedRoute>
      } />
      <Route path="/interview" element={
        <ProtectedRoute><MockInterview /></ProtectedRoute>
      } />
      <Route path="/jobs" element={
        <ProtectedRoute><JobTracker /></ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
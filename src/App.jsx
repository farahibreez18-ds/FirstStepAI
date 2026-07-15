import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import CareerCoach from "./pages/CareerCoach";
import MockInterview from "./pages/MockInterview";
import SkillRoadmap from "./pages/SkillRoadmap";
import JobTracker from "./pages/JobTracker";
import LearningHub from "./pages/LearningHub";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/resume" element={<ResumeAnalyzer />} />
      <Route path="/coach" element={<CareerCoach />} />
      <Route path="/interview" element={<MockInterview />} />
      <Route path="/roadmap" element={<SkillRoadmap />} />
      <Route path="/jobs" element={<JobTracker />} />
      <Route path="/learning" element={<LearningHub />} />
    </Routes>
  );
}

export default App;
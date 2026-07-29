import Logo from "../components/Logo";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Eye, EyeOff, Mail, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const score = 0.87;
  const radius = 24;
  const circumference = 2 * Math.PI * radius;

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ general: 'Incorrect email or password.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-[#0B1120] overflow-hidden">

      {/* Left: brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center px-14 border-r border-[#232D42] overflow-hidden">

        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#4C6FFF]/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[#F2B84B]/10 rounded-full blur-[100px]"></div>

        <div className="relative z-10 max-w-md">
          <Link
  to="/"
  className="flex items-center gap-4 mb-10 select-none"
>
  <Logo size={56} />

  <div className="flex flex-col">
   <h1 className="text-[26px] font-extrabold leading-none tracking-tight">
  <span className="text-white">FirstStep</span>
  <span className="text-[#4C6FFF]">AI</span>
</h1>

<p className="text-[9px] uppercase tracking-[0.32em] text-[#6B7280] mt-1">
  YOUR FIRST STEP TO YOUR DREAM CAREER
</p>
  </div>
</Link>
          <h1 className="font-display font-extrabold text-3xl text-[#F5F7FA] leading-tight">
            Every career starts with a <span className="text-[#4C6FFF]">first step.</span>
          </h1>
          <p className="text-[#8A93A6] text-sm mt-3 leading-relaxed">
            Resume analysis, mock interviews, and a personalized roadmap — pick up right where you left off.
          </p>

          {/* Floating resume score card */}
          <div className="mt-7 bg-[#121A2E]/90 backdrop-blur border border-[#232D42] rounded-2xl p-5 w-64 shadow-2xl shadow-black/40 -rotate-1 hover:rotate-0 transition-transform">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-[10px] font-data text-[#8A93A6] tracking-wide">RESUME SCORE</span>
              <span className="text-[10px] bg-[#4C6FFF]/10 text-[#4C6FFF] px-2 py-0.5 rounded-full font-data">ATS</span>
            </div>
            <div className="flex items-center gap-3.5 mb-4">
              <svg width="52" height="52" viewBox="0 0 60 60" className="shrink-0">
                <circle cx="30" cy="30" r={radius} fill="none" stroke="#232D42" strokeWidth="5" />
                <circle
                  cx="30" cy="30" r={radius} fill="none"
                  stroke="#4C6FFF" strokeWidth="5"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - score)}
                  strokeLinecap="round"
                  transform="rotate(-90 30 30)"
                />
              </svg>
              <div>
                <div className="font-display font-bold text-lg text-[#F5F7FA] leading-none">87<span className="text-xs text-[#8A93A6]">/100</span></div>
                <div className="text-xs text-[#8A93A6] mt-1">Strong match</div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-[#F5F7FA]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4C6FFF] shrink-0" /> Keyword match
              </div>
              <div className="flex items-center gap-2 text-xs text-[#8A93A6]">
                <AlertCircle className="w-3.5 h-3.5 text-[#F2B84B] shrink-0" /> Missing: certifications
              </div>
            </div>
          </div>

          {/* Journey path */}
          <div className="mt-7">
            <svg viewBox="0 0 400 75" className="w-full h-auto">
              <line x1="25" y1="38" x2="375" y2="38" stroke="#232D42" strokeWidth="2" />
              {[
                { x: 25, label: "Resume" },
                { x: 141, label: "Interview" },
                { x: 258, label: "Roadmap" },
                { x: 375, label: "Job" },
              ].map((node) => (
                <g key={node.label}>
                  <circle cx={node.x} cy="38" r="6" fill="#0B1120" stroke="#4C6FFF" strokeWidth="2" />
                  <text x={node.x} y="60" textAnchor="middle" className="font-data" fill="#8A93A6" fontSize="10">
                    {node.label}
                  </text>
                </g>
              ))}
              <circle r="4" fill="#F2B84B">
                <animateMotion dur="4s" repeatCount="indefinite" path="M25,38 L375,38" />
              </circle>
            </svg>
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-8 overflow-y-auto">
        <div className="w-full max-w-sm">
<Link
  to="/"
  className="flex lg:hidden items-center gap-4 mb-8 justify-center"
>
  <Logo size={48} />

  <div className="flex flex-col">
    <h1 className="text-2xl font-extrabold leading-none">
      <span className="text-white">FirstStep</span>
      <span className="text-[#4C6FFF]">AI</span>
    </h1>

    <p className="text-[9px] uppercase tracking-[0.3em] text-[#6B7280]">
      YOUR FIRST STEP
    </p>
  </div>
</Link>
          <h2 className="font-display font-bold text-2xl text-[#F5F7FA]">Welcome back</h2>
          <p className="text-[#8A93A6] text-sm mt-1 mb-7">Sign in to continue your career journey.</p>

          {errors.general && (
            <div className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-sm text-[#8A93A6] mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A93A6]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full bg-[#121A2E] border ${errors.email ? 'border-red-500' : 'border-[#232D42]'} text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4C6FFF] transition`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm text-[#8A93A6] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A93A6]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full bg-[#121A2E] border ${errors.password ? 'border-red-500' : 'border-[#232D42]'} text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4C6FFF] transition`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A93A6] hover:text-[#F5F7FA]">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-[#4C6FFF] hover:text-[#3D5AE0]">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4C6FFF] hover:bg-[#3D5AE0] disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-[#8A93A6] mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#4C6FFF] hover:text-[#3D5AE0] font-medium">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
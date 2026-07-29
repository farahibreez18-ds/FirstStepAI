import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Mail, ArrowLeft } from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err) {
      setError("Couldn't send reset email. Please check the address and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1120] px-4">
      <div className="w-full max-w-sm">
        <div className="bg-[#121A2E] border border-[#232D42] rounded-2xl shadow-2xl shadow-black/40 p-8">
          <h2 className="font-display font-bold text-2xl text-[#F5F7FA]">Reset your password</h2>
          <p className="text-[#8A93A6] text-sm mt-1 mb-6">
            Enter your email and we'll send you a link to reset your password.
          </p>

         {sent ? (
            <div className="text-sm text-green-400 bg-green-950/30 border border-green-900 rounded-lg px-4 py-3">
              Check your inbox — we've sent a password reset link to {email}.
              <span className="block text-green-400/70 text-xs mt-1.5">
                Don't see it? Check your spam or junk folder too.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm text-[#8A93A6] mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A93A6]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-[#0B1120] border border-[#232D42] text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4C6FFF] transition"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4C6FFF] hover:bg-[#3D5AE0] disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}

          <Link to="/login" className="flex items-center gap-1.5 justify-center text-sm text-[#4C6FFF] hover:text-[#3D5AE0] mt-6">
            <ArrowLeft className="w-4 h-4" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
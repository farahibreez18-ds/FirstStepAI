import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#232D42] bg-[#0B1120]/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link to={currentUser ? "/dashboard" : "/"} className="flex items-center gap-2.5 select-none">
          <Logo size={32} />
          <span className="font-display font-bold text-lg leading-none">
            <span className="text-[#F5F7FA]">FirstStep</span>
            <span className="text-[#4C6FFF]">AI</span>
          </span>
        </Link>

        {currentUser ? (
          <div className="flex items-center gap-6">
            <span className="text-sm text-[#8A93A6]">
              {currentUser.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-[#F5F7FA] border border-[#232D42] hover:border-[#4C6FFF] px-4 py-2 rounded-lg transition-colors"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-8">
            <a href="#features" className="text-sm text-[#8A93A6] hover:text-[#F5F7FA] transition-colors">
              Features
            </a>
            <a href="#about" className="text-sm text-[#8A93A6] hover:text-[#F5F7FA] transition-colors">
              About
            </a>
            <Link to="/login" className="text-sm text-[#F5F7FA] hover:text-[#4C6FFF] transition-colors">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-[#4C6FFF] hover:bg-[#3D5AE0] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>
        )}

      </nav>
    </header>
  );
}

export default Navbar;
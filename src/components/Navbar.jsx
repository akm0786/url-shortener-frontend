import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Link as LinkIcon, LogOut, User as UserIcon, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-blue-200">
              <LinkIcon className="text-white" size={20} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              Short<span className="text-blue-600">ly</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {/* Dashboard Link - Hidden on tiny screens */}
                <Link 
                  to="/dashboard" 
                  className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                {/* User Avatar & Logout */}
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <div className="flex flex-col items-end hidden sm:flex">
                    <p className="text-sm font-semibold text-gray-900 leading-none">
                      {user?.fullName || "User"}
                    </p>
                    <span className="text-xs text-green-500 font-medium">Online</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-100 transition-all border border-red-100"
                  >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login" 
                  className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-4 py-2"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all shadow-md active:scale-95"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
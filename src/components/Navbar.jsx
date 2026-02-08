import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Link as LinkIcon, LogOut, User, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo - always visible */}
          <Link to="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
            <div className="bg-blue-600 p-2 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-blue-200">
              <LinkIcon className="text-white" size={20} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              Short<span className="text-blue-600">ly</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <div className="flex items-center gap-5">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                <div className="flex items-center gap-4 pl-5 border-l border-gray-200">
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-semibold text-gray-900 leading-none">
                      {user?.fullName || "User"}
                    </p>
                    <span className="text-xs text-green-600 font-medium">Online</span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-100 transition-all border border-red-100 active:scale-95"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-4 py-2 transition-colors"
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

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Slide down */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? "max-h-96 py-4" : "max-h-0"}
          bg-white border-b border-gray-100 shadow-sm
        `}
      >
        <div className="px-4 flex flex-col gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-50 text-gray-800 font-medium"
                onClick={closeMobileMenu}
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>

              <div className="flex items-center justify-between py-2.5 px-3 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                    <User size={18} className="text-blue-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {user?.fullName || "User"}
                    </p>
                    <p className="text-xs text-green-600">Online</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-red-50 text-red-700 py-3 px-4 rounded-xl font-semibold hover:bg-red-100 border border-red-100 mt-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 rounded-lg"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="py-3 px-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 text-center shadow-sm"
                onClick={closeMobileMenu}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
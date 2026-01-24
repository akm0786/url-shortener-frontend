import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { clearAuthError, loginUser } from "../features/auth/authSlice";
import { Mail, Lock, LogIn, AlertCircle, Loader2 } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [searchParams] = useSearchParams();
  const pendingUrl = searchParams.get("pendingUrl"); // Capture the intent

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      // Scenario 2 Handler: If user came from a "pending" action, send them back to home with the data
      if (pendingUrl) {
        navigate(`/?url=${encodeURIComponent(pendingUrl)}`);
      } else {
        navigate("/dashboard");
      }
    }
    return () => dispatch(clearAuthError());
  }, [navigate, isAuthenticated, dispatch, pendingUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl shadow-blue-50/50 border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto h-12 w-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-200">
            <LogIn size={24} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
          {pendingUrl && (
            <p className="mt-2 text-sm text-blue-600 bg-blue-50 py-2 rounded-lg font-semibold">
              Log in to finish shortening your link!
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="email"
            type="email"
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all"
            placeholder="Email Address"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            name="password"
            type="password"
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all"
            placeholder="Password"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />

          {error && (
            <div className="flex items-center gap-3 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm border border-red-100">
              <AlertCircle size={18} />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account? <Link to="/register" className="text-blue-600 font-bold">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
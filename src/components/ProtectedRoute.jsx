import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useSelector(state => state.auth);
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500 font-medium animate-pulse">Verifying session...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        // state={{ from: location }} allows us to send the user back 
        // to the dashboard after they successfully log in
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
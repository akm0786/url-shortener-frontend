import { Link } from "react-router-dom";
import { Home, AlertCircle, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Animated Icon Container */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-blue-100 rounded-full scale-150 blur-2xl opacity-50 animate-pulse"></div>
          <div className="relative bg-white p-6 rounded-full shadow-2xl border border-blue-50">
            <AlertCircle size={64} className="text-blue-600" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-9xl font-black text-gray-200 leading-none mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Lost in Space?
        </h2>
        <p className="text-gray-500 mb-8 text-lg leading-relaxed">
          The link you're looking for doesn't exist or has been moved. 
          Don't worry, even the best travelers get lost sometimes.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
          >
            <Home size={20} />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-gray-50 text-gray-700 px-8 py-3.5 rounded-2xl font-bold border border-gray-200 hover:bg-gray-100 active:scale-95 transition-all"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
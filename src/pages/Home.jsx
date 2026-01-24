import { useSelector } from "react-redux";
import CreateUrlForm from "../components/CreateUrlForm";
import { Zap, Shield, BarChart3, MousePointer2 } from "lucide-react";

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-50/50 blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Fast • Secure • Reliable
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
            Optimize Your <span className="text-blue-600">Digital Reach</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 mb-10 leading-relaxed">
            {isAuthenticated 
              ? `Welcome back, ${user?.fullName}! Ready to create another powerful short link?`
              : "Shortly is the modern URL shortener built for speed and security. Transform long, clunky links into clean, trackable assets in seconds."}
          </p>

          {/* The Core Action: Your Form Component */}
          <div className="w-full max-w-xl mx-auto mb-16">
             <CreateUrlForm />
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-10 border-t border-gray-100">
            <FeatureItem icon={<MousePointer2 size={20}/>} label="One-Click Shortening" />
            <FeatureItem icon={<Shield size={20}/>} label="Encrypted Links" />
            <FeatureItem icon={<BarChart3 size={20}/>} label="Real-time Analytics" />
            <FeatureItem icon={<Zap size={20}/>} label="Lightning Fast" />
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper component for features
const FeatureItem = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="p-3 bg-gray-50 rounded-2xl text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600">
      {icon}
    </div>
    <span className="text-xs font-semibold text-gray-500">{label}</span>
  </div>
);

export default Home;
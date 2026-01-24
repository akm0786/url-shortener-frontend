import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUrls } from "../features/url/urlSlice";
import CreateUrlForm from "../components/CreateUrlForm";
import UrlList from "../components/UrlList";
import { LayoutDashboard, Link as LinkIcon, MousePointer2, TrendingUp } from "lucide-react";
import AnalyticsChart from "../components/AnalyticsChart";  

const Dashboard = () => {
  const dispatch = useDispatch();
  const { urls, loading } = useSelector((state) => state.url);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUrls());
  }, [dispatch]);

  // Derived state for quick stats
  const totalClicks = urls.reduce((acc, curr) => acc + (curr.clicks || 0), 0);
  const avgClicks = urls.length > 0 ? (totalClicks / urls.length).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-100 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <LayoutDashboard className="text-blue-600" size={28} />
                Dashboard
              </h1>
              <p className="text-gray-500 mt-1">
                Welcome back, <span className="font-semibold text-gray-700">{user?.fullName || "User"}</span>. Here is your link performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard 
            label="Total Links" 
            value={urls.length} 
            icon={<LinkIcon size={20} />} 
            color="bg-blue-600" 
          />
          <StatCard 
            label="Total Clicks" 
            value={totalClicks} 
            icon={<MousePointer2 size={20} />} 
            color="bg-purple-600" 
          />
          <StatCard 
            label="Avg. Performance" 
            value={`${avgClicks} per link`} 
            icon={<TrendingUp size={20} />} 
            color="bg-emerald-600" 
          />
        </div>

        {/* Chart Column */}
          <div className="lg:col-span-2">
            <AnalyticsChart urls={urls} />
          </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Column: Create Form */}
          <div className="lg:col-span-1 sticky top-24">
            <CreateUrlForm />
          </div>

          {/* Right Column: URL List */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-800 mb-4 px-1">Your Recent Links</h3>
            {loading && urls.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Fetching your data...</p>
              </div>
            ) : (
              <UrlList urls={urls} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal StatCard component for clean code
const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5 transition-transform hover:scale-[1.02]">
    <div className={`${color} p-4 rounded-2xl text-white shadow-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default Dashboard;
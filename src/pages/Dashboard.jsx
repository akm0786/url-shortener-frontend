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

  // Derived stats
  const totalClicks = urls.reduce((acc, curr) => acc + (curr.clicks || 0), 0);
  const avgClicks = urls.length > 0 ? (totalClicks / urls.length).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-10 md:pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="text-blue-600" size={28} />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <p className="text-gray-600">
              Welcome back, <span className="font-semibold text-gray-800">{user?.fullName || "User"}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Stats - responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-8 md:mb-10">
          <StatCard label="Total Links" value={urls.length} icon={<LinkIcon size={20} />} color="bg-blue-600" />
          <StatCard label="Total Clicks" value={totalClicks} icon={<MousePointer2 size={20} />} color="bg-purple-600" />
          <StatCard
            label="Avg. per Link"
            value={`${avgClicks}`}
            icon={<TrendingUp size={20} />}
            color="bg-emerald-600"
          />
        </div>

        {/* Chart - full width on mobile, better height control */}
        <div className="mb-8 md:mb-10">
          <AnalyticsChart urls={urls} />
        </div>

        {/* Main content - stack on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">
          {/* Create Form - takes full width on mobile, ~1/3 on desktop */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-4 md:top-6 lg:top-24 z-10 bg-gray-50/80 backdrop-blur-sm pb-4 lg:pb-0">
              <CreateUrlForm />
            </div>
          </div>

          {/* URL List - takes full width on mobile, ~2/3 on desktop */}
          <div className="lg:col-span-7 xl:col-span-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-5 px-1">
              Your Recent Links
            </h3>

            {loading && urls.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 md:py-20 bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Loading your links...</p>
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

// StatCard (slightly adjusted padding & text sizes)
const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 md:gap-5 transition-transform hover:scale-[1.02] active:scale-[0.99]">
    <div className={`${color} p-3.5 md:p-4 rounded-2xl text-white shadow-md`}>
      {icon}
    </div>
    <div>
      <p className="text-xs md:text-sm font-medium text-gray-500">{label}</p>
      <p className="text-xl md:text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default Dashboard;
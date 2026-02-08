import { useDispatch } from "react-redux";
import { deleteUrl } from "../features/url/urlSlice";
import { Trash2, Copy, ExternalLink } from "lucide-react"; // Nice icons
import toast from "react-hot-toast"; // Recommended for modern alerts

const redirectBaseUrl = import.meta.env.VITE_REDIRECT_BASE_URL;

const UrlList = ({ urls }) => {
  const dispatch = useDispatch();

  // Fix: Added return for empty state
  if (urls.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500">No URLs found. Create your first link Now!</p>
      </div>
    );
  }

  const handleCopy = (code) => {
    const fullUrl = `${redirectBaseUrl}/${code}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("Link copied!"); // Using toast instead of annoying window.alert
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Original Destination</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Short Link</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Clicks</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {urls.map((url) => (
              <tr key={url._id} className="hover:bg-gray-50/80 transition-colors group">
                {/* Original URL with truncate logic */}
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-500 truncate max-w-[200px] lg:max-w-xs" title={url.originalUrl}>
                    {url.originalUrl}
                  </p>
                </td>

                {/* Short URL with Copy Action */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <a
                      href={`${redirectBaseUrl}/${url.shortCode}`}
                      target="_blank"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      /{url.shortCode} <ExternalLink size={14} />
                    </a>
                    <button
                      onClick={() => handleCopy(url.shortCode)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all"
                      title="Copy Link"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </td>

                {/* Click Badge */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 w-max">
                    {url.clicks} clicks
                  </span>
                </td>

                {/* Delete Action */}
                <td className="px-4 sm:px-6 py-4 text-right">
                  <button
                    onClick={() => dispatch(deleteUrl(url._id))}
                    className={`
                        p-2 rounded-lg transition-all
                        sm:opacity-0 sm:group-hover:opacity-100
                        text-gray-400 hover:text-red-600 hover:bg-red-50
                        active:text-red-600 active:bg-red-50
                        sm:invisible sm:group-hover:visible
                      `}
                    title="Delete this link"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlList;
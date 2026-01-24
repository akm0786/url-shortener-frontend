import { useDispatch } from "react-redux"
import { deleteUrl } from "../features/url/urlSlice"
const redirectBaseUrl = import.meta.env.VITE_REDIRECT_BASE_URL;

const UrlList = ({ urls }) => {

    const dispatch = useDispatch()

    if (urls.length === 0) {
        <p>No URLs found</p>
    }

return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Original</th>
            <th className="p-2 border">Short</th>
            <th className="p-2 border">Clicks</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id} className="text-center">
              <td className="p-2 border truncate max-w-xs">
                {url.originalUrl}
              </td>
              <td className="p-2 border text-blue-600">
                <a href={`${redirectBaseUrl}/${url.shortCode}`} target="_blank" rel="noopener noreferrer"> {redirectBaseUrl}/{url.shortCode} </a>
                {/* adding a copy button with alert message */}
                <button onClick={() => navigator.clipboard.writeText(`${redirectBaseUrl}/${url.shortCode}`).then(() => alert("Copied to clipboard")) } className="ml-2 text-blue-600 hover:underline">(Click to Copy)</button>
                
              </td>
              <td className="p-2 border">{url.clicks}</td>
              <td className="p-2 border">
                <button
                  onClick={() => dispatch(deleteUrl(url._id))}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UrlList
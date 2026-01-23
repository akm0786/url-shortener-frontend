import { useDispatch } from "react-redux"
import { deleteUrl } from "../features/url/urlSlice"

const UrlList = ({ urls }) => {

    const dispatch = useDispatch()

    if (urls.length === 0) {
        <p>No URLs found</p>
    }

    return (
        <ul>
            {urls.map((url) => (
                <li key={url._id}>
                    <p>Original : {url.originalUrl}</p>
                    <p>Short Code : {url.shortCode}</p>
                    <p>Clicks : {url.clicks}</p>
                    <button onClick={() => dispatch(deleteUrl(url._id))}>Delete</button>
                </li>
            ))
            }
        </ul >
    )
}

export default UrlList
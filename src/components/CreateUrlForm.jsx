import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createShortUrl } from '../features/url/urlSlice';
const CreateUrlForm = () => {

    const [originalUrl, setOriginalUrl] = useState('');
    const [customAlias, setCustomAlias] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.auth)

    const handleForm = (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        // console.log(originalUrl, customAlias)
        dispatch(createShortUrl({ originalUrl, customAlias: customAlias || undefined }));

        setCustomAlias('');
        setOriginalUrl('');

    }

    return (
       <form
  onSubmit={handleForm}
  className="bg-white p-4 rounded shadow flex flex-col gap-3"
>
  <input
    className="border p-2 rounded"
    placeholder="Enter long URL"
    value={originalUrl}
    onChange={(e) => setOriginalUrl(e.target.value)}
    required
  />

  <input
    className="border p-2 rounded"
    placeholder="Custom alias (optional)"
    value={customAlias}
    onChange={(e) => setCustomAlias(e.target.value)}
  />

  <button
    className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
    type="submit"
  >
    Shorten URL
  </button>
</form>
    )
}

export default CreateUrlForm
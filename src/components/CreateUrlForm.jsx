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
        <form onSubmit={handleForm}>
            <input
                type="text"
                name="originalUrl"
                placeholder='Enter Long Url'
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
            />
            <input
                type="text"
                name="customAlias"
                placeholder='Custom Alias (optional)'
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
            />
            <button type="submit">Shorten</button>


        </form>
    )
}

export default CreateUrlForm
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { createShortUrl, clearUrlError } from '../features/url/urlSlice';
import { Link2, Zap, Fingerprint, AlertCircle, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';

const CreateUrlForm = () => {
  const [searchParams] = useSearchParams();
  const urlFromQuery = searchParams.get("url"); // Get the preserved URL after login

  const [originalUrl, setOriginalUrl] = useState(urlFromQuery || '');
  const [customAlias, setCustomAlias] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated } = useSelector(state => state.auth);
  const { loading, error } = useSelector(state => state.url);

  // Sync state if URL comes from query string (after login)
  useEffect(() => {
    if (urlFromQuery) setOriginalUrl(urlFromQuery);
  }, [urlFromQuery]);

  const handleForm = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      // Scenario 2: Save intent and redirect
      const encodedUrl = encodeURIComponent(originalUrl);
      navigate(`/login?pendingUrl=${encodedUrl}`);
      return;
    }

    const result = await dispatch(createShortUrl({ 
      originalUrl, 
      customAlias: customAlias.trim() || undefined 
    }));
    
    if (createShortUrl.fulfilled.match(result)) {
      // Scenario 1: Show success state ONLY on Home page
      if (location.pathname === '/') {
        setShowSuccess(true);
      }
      setOriginalUrl('');
      setCustomAlias('');
    }
  };

  const handleInputChange = (setter, value) => {
    setter(value);
    if (error) dispatch(clearUrlError());
  };

  // SUCCESS STATE UI (Scenario 1)
  if (showSuccess) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 text-center animate-in zoom-in-95 duration-300 max-w-md mx-auto">
        <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Link Created!</h3>
        <p className="text-gray-500 mb-6 text-sm">
          Your short link is ready. Visit your dashboard to track clicks and manage all your links.
        </p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            Go to Dashboard <ArrowRight size={18} />
          </button>
          <button 
            onClick={() => setShowSuccess(false)}
            className="text-sm text-gray-400 hover:text-gray-600 font-semibold mt-2"
          >
            Create Another Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleForm} className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-blue-50/50 border border-gray-100 flex flex-col gap-5">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Zap className="text-blue-600 fill-blue-600" size={20} />
          Shorten a Link
        </h2>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-blue-600 transition-colors">
          <Link2 size={18} />
        </div>
        <input
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all"
          placeholder="Paste your long URL..."
          value={originalUrl}
          onChange={(e) => handleInputChange(setOriginalUrl, e.target.value)}
          required
        />
      </div>

      {isAuthenticated && (
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-blue-600 transition-colors">
            <Fingerprint size={18} />
          </div>
          <input
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all"
            placeholder="Custom alias (optional)"
            value={customAlias}
            onChange={(e) => handleInputChange(setCustomAlias, e.target.value)}
          />
        </div>
      )}

      {/* Logic to show guest warning (Scenario 2) */}
      {!isAuthenticated && originalUrl && (
        <div className="flex items-start gap-2 text-amber-600 bg-amber-50 p-3 rounded-xl text-xs font-medium border border-amber-100">
          <AlertCircle size={16} className="shrink-0" />
          <p>Login or Register to save and track this link in your personal dashboard.</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm border border-red-100">
          <AlertCircle size={18} className="shrink-0" />
          <p className="font-medium text-left">{error}</p>
        </div>
      )}

      <button
        disabled={loading || !originalUrl}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-95"
        type="submit"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>{isAuthenticated ? "Shorten URL" : "Login & Shorten"}</>
        )}
      </button>
    </form>
  );
};

export default CreateUrlForm;
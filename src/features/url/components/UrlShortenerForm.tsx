import React, { useState } from 'react';
import { Link2, Loader2 } from 'lucide-react';

interface UrlShortenerFormProps {
  loading: boolean;
  error: string | null;
  onSubmit: (url: string) => void;
}

export const UrlShortenerForm: React.FC<UrlShortenerFormProps> = ({ 
  loading, 
  error, 
  onSubmit 
}) => {
  const [url, setUrl] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!url.trim()) {
      setValidationError('Please enter a URL');
      return;
    }

    try {
      // Simple native URL validation as requested
      new URL(url);
      onSubmit(url);
    } catch (err) {
      setValidationError('Please enter a valid URL (e.g., https://google.com)');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Link2 className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL here..."
          disabled={loading}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out disabled:opacity-50"
        />
      </div>

      {(validationError || error) && (
        <p className="text-sm text-red-600 font-medium">
          {validationError || error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
            Shortening...
          </>
        ) : (
          'Shorten URL'
        )}
      </button>
    </form>
  );
};

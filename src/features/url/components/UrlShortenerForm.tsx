import React, { useState } from 'react';
import { Link2, Loader2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      setValidationError('Please enter a destination URL');
      return;
    }

    try {
      new URL(url);
      onSubmit(url);
    } catch (err) {
      setValidationError('Please enter a valid URL (e.g., https://example.com)');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest ml-1">Destination URL</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Link2 className="h-5 w-5 text-gray-500 group-focus-within:text-brand-cyan transition-colors" />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-long-link.com/very-long-path"
            disabled={loading}
            className="glow-input block w-full pl-11 pr-4 py-4 rounded-2xl text-white placeholder-gray-600 sm:text-base outline-none"
          />
        </div>
      </div>

      <AnimatePresence>
        {(validationError || error) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium"
          >
            {validationError || error}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={loading}
        className="relative w-full group overflow-hidden rounded-2xl p-[1px] focus:outline-none transition-all duration-300 active:scale-[0.98]"
      >
        <div className="absolute inset-0 premium-gradient opacity-90 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex items-center justify-center gap-2 bg-dark-bg/20 backdrop-blur-xl group-hover:bg-transparent py-4 rounded-[15px] text-white font-bold transition-all duration-300">
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin text-white" />
          ) : (
            <>
              <span>Shorten Link</span>
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </>
          )}
        </div>
      </button>
    </form>
  );
};

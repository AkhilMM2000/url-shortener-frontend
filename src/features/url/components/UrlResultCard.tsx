import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UrlResultCardProps {
  shortUrl: string;
  originalUrl: string;
}

export const UrlResultCard: React.FC<UrlResultCardProps> = ({ shortUrl, originalUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 p-8 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <LinkIcon className="w-24 h-24 text-white" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
            Generated Short Link
          </h3>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-grow w-full group">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="block w-full pr-12 py-4 bg-dark-bg/50 border border-white/10 rounded-2xl text-brand-cyan font-semibold text-lg sm:text-xl focus:outline-none focus:border-brand-cyan/30 transition-all"
            />
            <a 
              href={shortUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-brand-cyan transition-colors"
              title="Open link"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>

          <button
            onClick={handleCopy}
            className={`w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 relative overflow-hidden ${
              copied 
                ? 'bg-emerald-500 text-white' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <Check className="h-5 w-5" />
                  <span>Copied</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-5 w-5" />
                  <span>Copy Link</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        <div className="mt-6 flex items-start gap-2 max-w-full">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-0.5 shrink-0">Original:</span>
          <p className="text-sm text-gray-400 truncate opacity-60 hover:opacity-100 transition-opacity">
            {originalUrl}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

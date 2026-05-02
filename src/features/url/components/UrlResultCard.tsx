import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

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
    <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-xl">
      <h3 className="text-sm font-semibold text-blue-900 mb-3 uppercase tracking-wider">
        Your Short URL
      </h3>
      
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-grow w-full">
          <input
            type="text"
            readOnly
            value={shortUrl}
            className="block w-full pr-10 py-3 bg-white border border-blue-200 rounded-lg text-blue-700 font-medium text-sm sm:text-base focus:outline-none"
          />
          <a 
            href={shortUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-600 transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <button
          onClick={handleCopy}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            copied 
              ? 'bg-green-600 text-white' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span>Copied ✓</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <p className="mt-4 text-xs text-blue-600 truncate">
        <span className="font-semibold">Original:</span> {originalUrl}
      </p>
    </div>
  );
};

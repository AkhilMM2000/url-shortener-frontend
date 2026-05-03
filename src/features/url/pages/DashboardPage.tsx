import { useState } from 'react';
import { useAuth } from '../../../shared/context/AuthContext';
import { UrlShortenerForm } from '../components/UrlShortenerForm';
import { UrlResultCard } from '../components/UrlResultCard';
import { urlService, type CreateShortUrlResponse } from '../../../shared/api/url.service';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User as UserIcon, Zap, LayoutDashboard } from 'lucide-react';

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [result, setResult] = useState<CreateShortUrlResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShorten = async (originalUrl: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await urlService.createShortUrl(originalUrl);
      setResult(data);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to shorten URL. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-dark-bg overflow-x-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 ambient-mesh opacity-30 fixed" />
      
      {/* Minimal Navbar */}
      <nav className="relative z-20 border-b border-white/5 bg-dark-bg/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center shadow-lg shadow-brand-cyan/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white hidden sm:block">SnapLink</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <UserIcon className="w-4 h-4 text-brand-cyan" />
              <span className="text-sm font-medium text-gray-300">{user?.email}</span>
            </div>
            <button 
              onClick={logout}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold group"
            >
              <span className="hidden sm:inline">Sign Out</span>
              <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16 sm:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
         
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Simplify Your Links.
          </h1>
         
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card overflow-hidden"
        >
          <div className="p-8 sm:p-12">
            <UrlShortenerForm 
              loading={loading} 
              error={error} 
              onSubmit={handleShorten} 
            />

            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <UrlResultCard 
                    shortUrl={result.shortUrl} 
                    originalUrl={result.originalUrl} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Minimal Footer Info */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-gray-500 text-sm"
        >
          Securely managed by SnapLink Cloud Encryption
        </motion.p>
      </main>
    </div>
  );
};

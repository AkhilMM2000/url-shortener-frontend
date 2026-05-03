import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../shared/context/AuthContext';
import { Mail, Lock, LogIn, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { authService } from '../../../shared/api/auth.service';

export const LoginPage = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login({ email, password });
      login(response);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-dark-bg">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 ambient-mesh opacity-50" />
      
      {/* Floating Decorative Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-cyan/10 blur-[120px] rounded-full" 
      />
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-violet/10 blur-[120px] rounded-full" 
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="text-center mb-10">
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 mb-6"
          >
            <Sparkles className="w-8 h-8 text-brand-cyan" />
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl font-bold tracking-tight text-white mb-2">
            Welcome Back
          </motion.h1>
          <motion.p variants={itemVariants} className="text-gray-400">
            Sign in to manage your premium links
          </motion.p>
        </div>

        <motion.div variants={itemVariants} className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence>
              {(error || location.state?.message) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-3 rounded-lg border text-sm text-center ${
                    error 
                      ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                      : 'bg-green-500/10 border-green-500/20 text-green-400'
                  }`}
                >
                  {error || location.state?.message}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-brand-cyan transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glow-input block w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 sm:text-sm"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                <Link to="#" className="text-xs text-brand-cyan/80 hover:text-brand-cyan transition-colors">Forgot?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-brand-cyan transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glow-input block w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-600 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full group overflow-hidden rounded-xl p-[1px] focus:outline-none transition-all duration-300"
            >
              <div className="absolute inset-0 premium-gradient opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-center gap-2 bg-dark-bg/40 backdrop-blur-xl group-hover:bg-transparent py-3.5 rounded-[11px] text-white font-semibold transition-all duration-300">
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-400 text-sm">
              New here?{' '}
              <Link to="/register" className="text-brand-cyan font-semibold hover:underline decoration-brand-cyan/30 underline-offset-4">
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

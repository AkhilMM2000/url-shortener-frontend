import { useState } from 'react';
import { useAuth } from '../../../shared/context/AuthContext';
import { Button } from '../../../shared/ui/Button';
import { UrlShortenerForm } from '../components/UrlShortenerForm';
import { UrlResultCard } from '../components/UrlResultCard';
import { urlService, type CreateShortUrlResponse } from '../../../shared/api/url.service';

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  
  // Refined Simple State for Dashboard as per best practices
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
      // Handle API or Network errors specifically
      const message = err.response?.data?.message || 'Failed to shorten URL. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Logged in as {user?.email}</p>
          </div>
          <Button variant="outline" onClick={logout}>
            Sign Out
          </Button>
        </div>
        
        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Shorten a long URL
            </h2>
            <p className="text-gray-500 mt-2">
              Paste your long link below and get a short, shareable one in seconds.
            </p>
          </div>

          <UrlShortenerForm 
            loading={loading} 
            error={error} 
            onSubmit={handleShorten} 
          />

          {result ? (
            <UrlResultCard 
              shortUrl={result.shortUrl} 
              originalUrl={result.originalUrl} 
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

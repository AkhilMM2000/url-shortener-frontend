import React from 'react';
import { useAuth } from '../../../shared/context/AuthContext';
import { Button } from '../../../shared/ui/Button';

export const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Button variant="outline" onClick={logout}>
            Sign Out
          </Button>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Welcome back!
          </h2>
          <p className="text-gray-600">
            You are successfully logged in. Your User ID is: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{user?.id}</span>
          </p>
          <div className="mt-8 border-t border-gray-100 pt-8">
            <p className="text-sm text-gray-500 italic">
              (URL Shortener feature coming soon...)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

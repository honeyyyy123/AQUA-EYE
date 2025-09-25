import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Dashboard from '@/components/dashboard/Dashboard';
import AuthCard from '@/components/auth/AuthCard';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Mock user data - in real implementation this would come from auth context
  const mockUser = {
    name: 'Rajesh Kumar',
    role: 'citizen' as const,
    avatar: undefined
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-wave flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AuthCard />
          {/* Temporary bypass for demo */}
          <div className="mt-4 text-center">
            <button 
              onClick={() => setIsAuthenticated(true)}
              className="text-sm text-primary hover:underline"
            >
              Skip to Dashboard (Demo)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} alertCount={3} />
      <Dashboard />
    </div>
  );
};

export default Index;

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Background from './components/Background';
import Navigation from './components/Navigation';
import AuthPage from './components/auth/AuthPage';
import Dashboard from './components/dashboard/Dashboard';
import JobsPage from './components/jobs/JobsPage';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!user) {
    return (
      <>
        <Background />
        <AuthPage />
      </>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'jobs':
        return <JobsPage />;
      case 'players':
        return (
          <div className="text-center py-20">
            <h2 className="text-3xl font-space font-bold text-white mb-4">Player Directory</h2>
            <p className="text-gray-400">Player directory coming soon...</p>
          </div>
        );
      case 'feed':
        return (
          <div className="text-center py-20">
            <h2 className="text-3xl font-space font-bold text-white mb-4">Community Feed</h2>
            <p className="text-gray-400">Social feed coming soon...</p>
          </div>
        );
      case 'profile':
        return (
          <div className="text-center py-20">
            <h2 className="text-3xl font-space font-bold text-white mb-4">Profile</h2>
            <p className="text-gray-400">Profile page coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-20">
            <h2 className="text-3xl font-space font-bold text-white mb-4">Settings</h2>
            <p className="text-gray-400">Settings page coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Background />
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { AuthPage } from "@/components/AuthPage";
import { EnhancedDashboard } from "@/components/EnhancedDashboard";

type ViewMode = 'landing' | 'login' | 'register' | 'dashboard';

const Index = () => {
  const [view, setView] = useState<ViewMode>('landing');
  const [user, setUser] = useState<string | null>(null);

  const handleNavigateToAuth = (mode: 'login' | 'register') => {
    setView(mode);
  };

  const handleLogin = (name: string) => {
    setUser(name);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  const handleBack = () => {
    setView('landing');
  };

  const handleSwitchMode = (mode: 'login' | 'register') => {
    setView(mode);
  };

  if (view === 'dashboard' && user) {
    return <EnhancedDashboard userName={user} onLogout={handleLogout} />;
  }

  if (view === 'login' || view === 'register') {
    return (
      <AuthPage 
        mode={view}
        onLogin={handleLogin}
        onBack={handleBack}
        onSwitchMode={handleSwitchMode}
      />
    );
  }

  return <LandingPage onNavigateToAuth={handleNavigateToAuth} />;
};

export default Index;

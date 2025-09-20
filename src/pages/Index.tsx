import { useState } from "react";
import { WelcomePage } from "@/components/WelcomePage";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (name: string) => {
    setUser(name);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    return <Dashboard userName={user} onLogout={handleLogout} />;
  }

  return <WelcomePage onLogin={handleLogin} />;
};

export default Index;

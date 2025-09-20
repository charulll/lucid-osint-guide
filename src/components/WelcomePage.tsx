import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { LogIn, UserPlus } from "lucide-react";

interface WelcomePageProps {
  onLogin: (name: string) => void;
}

export function WelcomePage({ onLogin }: WelcomePageProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">
          <Logo size="lg" className="justify-center" />
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground">
              Welcome to <span className="gradient-text">LUCID</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your Friendly OSINT Assistant
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Analyze images with professional intelligence tools in a friendly, guided experience. 
              Extract information, detect text, find matches, and uncover digital forensics with ease.
            </p>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <div className="card-tech p-4 text-center">
              <div className="text-primary text-2xl mb-2">🔍</div>
              <h3 className="font-semibold">Image Analysis</h3>
              <p className="text-sm text-muted-foreground">Advanced OSINT capabilities</p>
            </div>
            <div className="card-tech p-4 text-center">
              <div className="text-primary text-2xl mb-2">🧠</div>
              <h3 className="font-semibold">Smart Detection</h3>
              <p className="text-sm text-muted-foreground">OCR, forensics, and more</p>
            </div>
            <div className="card-tech p-4 text-center">
              <div className="text-primary text-2xl mb-2">📊</div>
              <h3 className="font-semibold">Professional Reports</h3>
              <p className="text-sm text-muted-foreground">Downloadable PDF results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Auth */}
      <div className="w-96 bg-card border-l border-border p-8 flex flex-col justify-center animate-slide-in-right">
        <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">
                {isLoginMode ? "Welcome Back" : "Get Started"}
              </h2>
              <p className="text-muted-foreground mt-2">
                {isLoginMode ? "Sign in to continue your analysis" : "Create your account to begin"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>

              <Button type="submit" variant="hero" className="w-full">
                {isLoginMode ? (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-primary hover:text-primary/80"
              >
                {isLoginMode 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
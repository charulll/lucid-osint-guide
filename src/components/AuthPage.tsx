import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { LogIn, UserPlus, ArrowLeft, Eye, EyeOff } from "lucide-react";

interface AuthPageProps {
  mode: 'login' | 'register';
  onLogin: (name: string) => void;
  onBack: () => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
}

export function AuthPage({ mode, onLogin, onBack, onSwitchMode }: AuthPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim() && formData.password.trim()) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLogin(formData.name.trim());
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary/5 to-secondary/5 p-12 items-center justify-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="floating-orb w-32 h-32 top-20 left-20" style={{ animationDelay: '0s' }} />
        <div className="floating-orb w-24 h-24 bottom-32 right-20" style={{ animationDelay: '3s' }} />
        
        <div className="max-w-md text-center space-y-6 animate-fade-in">
          <Logo size="lg" className="justify-center" />
          <h2 className="text-3xl font-bold logo-font">
            Professional OSINT Made <span className="gradient-text">Simple</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Join thousands of professionals using LUCID for advanced image analysis, 
            digital forensics, and intelligence gathering.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50k+</div>
              <div className="text-sm text-muted-foreground">Images Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 lg:max-w-md xl:max-w-lg p-8 flex flex-col justify-center animate-slide-in-right">
        <div className="w-full max-w-sm mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="p-2 hover:bg-muted/50 -ml-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            
            <div className="lg:hidden flex justify-center">
              <Logo size="md" />
            </div>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold logo-font">
                {mode === 'login' ? 'Welcome Back' : 'Get Started'}
              </h1>
              <p className="text-muted-foreground mt-2">
                {mode === 'login' 
                  ? 'Sign in to continue your OSINT analysis' 
                  : 'Create your account to begin analyzing images'}
              </p>
            </div>
          </div>

          {/* Form */}
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="bg-input/50 border-border/50 focus:border-primary/50 transition-colors"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="bg-input/50 border-border/50 focus:border-primary/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    className="bg-input/50 border-border/50 focus:border-primary/50 transition-colors pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                className="w-full button-glow"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : mode === 'login' ? (
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

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={() => onSwitchMode(mode === 'login' ? 'register' : 'login')}
                className="text-primary hover:text-primary/80 hover:bg-primary/5"
              >
                {mode === 'login' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
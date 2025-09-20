import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { LogIn, UserPlus, Search, Shield, FileText, MapPin, BarChart3, Zap } from "lucide-react";

interface LandingPageProps {
  onNavigateToAuth: (mode: 'login' | 'register') => void;
}

export function LandingPage({ onNavigateToAuth }: LandingPageProps) {
  return (
    <div className="hero-section relative overflow-hidden">
      {/* Floating background orbs */}
      <div className="floating-orb w-64 h-64 top-20 left-20" style={{ animationDelay: '0s' }} />
      <div className="floating-orb w-32 h-32 top-1/2 right-32" style={{ animationDelay: '2s' }} />
      <div className="floating-orb w-48 h-48 bottom-32 left-1/3" style={{ animationDelay: '4s' }} />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo size="md" className="animate-fade-in" />
          
          <div className="flex gap-3 animate-slide-in-right">
            <Button 
              variant="ghost" 
              onClick={() => onNavigateToAuth('login')}
              className="button-glow hover:bg-primary/10"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Button>
            <Button 
              variant="hero" 
              onClick={() => onNavigateToAuth('register')}
              className="button-glow"
            >
              <UserPlus className="w-4 h-4" />
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen p-8">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-6 animate-slide-up">
            <div className="flex justify-center mb-8">
              <Logo size="lg" className="animate-scale-in" />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold logo-font">
              Welcome to <span className="gradient-text">LUCID</span>
            </h1>
            
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
              Your Friendly OSINT Assistant
            </p>
            
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Analyze images with professional intelligence tools in a friendly, guided experience. 
              Extract information, detect text, find matches, and uncover digital forensics with ease.
            </p>

            <div className="flex justify-center gap-4 pt-6">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => onNavigateToAuth('register')}
                className="button-glow px-8 py-6 text-lg hover-lift"
              >
                <Zap className="w-5 h-5" />
                Start Analyzing
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigateToAuth('login')}
                className="hover-lift px-8 py-6 text-lg"
              >
                <LogIn className="w-5 h-5" />
                Sign In
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {[
              {
                icon: Search,
                title: "Image Analysis",
                description: "Advanced OSINT capabilities for comprehensive image investigation"
              },
              {
                icon: FileText,
                title: "Smart Detection",
                description: "OCR, metadata extraction, and intelligent text recognition"
              },
              {
                icon: Shield,
                title: "Digital Forensics",
                description: "ELA analysis and tampering detection with professional accuracy"
              },
              {
                icon: MapPin,
                title: "Location Intelligence",
                description: "GPS extraction and landmark identification capabilities"
              },
              {
                icon: BarChart3,
                title: "Confidence Scoring",
                description: "Reliability assessment and professional reporting tools"
              },
              {
                icon: FileText,
                title: "Professional Reports",
                description: "Downloadable PDF results with detailed analysis breakdown"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="feature-card hover-lift group"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-left logo-font">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground text-left leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
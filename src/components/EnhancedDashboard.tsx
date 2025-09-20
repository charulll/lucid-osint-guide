import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { Upload, Camera, FileText, Search, Shield, MapPin, BarChart3, Download, LogOut, CheckCircle2, Circle } from "lucide-react";

interface EnhancedDashboardProps {
  userName: string;
  onLogout: () => void;
}

interface AnalysisFeature {
  id: string;
  name: string;
  description: string;
  icon: any;
  enabled: boolean;
}

export function EnhancedDashboard({ userName, onLogout }: EnhancedDashboardProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [features, setFeatures] = useState<AnalysisFeature[]>([
    {
      id: "info",
      name: "Image Information",
      description: "Extract metadata, dimensions, format details",
      icon: FileText,
      enabled: true,
    },
    {
      id: "ocr",
      name: "Detect Text in Image (OCR)",
      description: "Optical character recognition to extract text",
      icon: FileText,
      enabled: true,
    },
    {
      id: "reverse",
      name: "Image Matches (Reverse Search)",
      description: "Find similar images across the web",
      icon: Search,
      enabled: true,
    },
    {
      id: "forensics",
      name: "Edited or Altered Sections (ELA)",
      description: "Error level analysis for tampering detection",
      icon: Shield,
      enabled: true,
    },
    {
      id: "location",
      name: "Locate the Image (GPS/Landmarks)",
      description: "Identify geographical clues and locations",
      icon: MapPin,
      enabled: true,
    },
    {
      id: "confidence",
      name: "Confidence Score",
      description: "Overall reliability assessment of analysis",
      icon: BarChart3,
      enabled: true,
    },
  ]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setSelectedImage(file);
    }
  };

  const handleFeatureToggle = (featureId: string) => {
    setFeatures(features.map(f => 
      f.id === featureId ? { ...f, enabled: !f.enabled } : f
    ));
  };

  const handleAnalyze = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 3000);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <Logo size="md" />
            <Button variant="outline" onClick={onLogout} className="hover-lift">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          <div className="space-y-8">
            <div className="text-center animate-slide-up">
              <h1 className="text-4xl font-bold mb-4 logo-font">Analysis Complete</h1>
              <p className="text-xl text-muted-foreground">Your OSINT analysis has been completed successfully.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.filter(f => f.enabled).map((feature, index) => (
                <Card 
                  key={feature.id} 
                  className="card-tech hover-lift animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg tech-glow">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2 logo-font">{feature.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                      <div className="bg-muted/30 p-3 rounded-lg text-sm border-l-4 border-primary/30">
                        <p className="flex items-center gap-2 text-primary">
                          <CheckCircle2 className="w-4 h-4" />
                          Analysis completed successfully
                        </p>
                        <p className="text-muted-foreground mt-1">Results would appear here in a real implementation</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Button variant="hero" className="gap-2 button-glow hover-lift px-8">
                <Download className="w-4 h-4" />
                Download PDF Report
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowResults(false);
                  setSelectedImage(null);
                }}
                className="hover-lift px-8"
              >
                Analyze Another Image
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-8 animate-scale-in">
          <div className="relative">
            <div className="w-24 h-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
              <Search className="w-12 h-12 text-primary animate-spin" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold logo-font">Processing your image...</h2>
            <p className="text-muted-foreground text-lg">Running OSINT analysis with selected features</p>
          </div>
          
          <div className="w-80 mx-auto">
            <div className="bg-muted/30 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary-glow h-3 rounded-full animate-pulse w-3/4 transition-all duration-1000"></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Analyzing selected features...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <Logo size="md" />
          <Button variant="outline" onClick={onLogout} className="hover-lift">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold mb-4 logo-font">
            Welcome back, <span className="gradient-text">{userName}</span>!
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready to analyze an image? Upload one to get started with your OSINT investigation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <Card className="card-tech animate-scale-in">
            <h2 className="text-2xl font-semibold mb-6 logo-font">Upload Image</h2>
            
            {selectedImage ? (
              <div className="space-y-6">
                <div className="border border-dashed border-primary/30 rounded-xl p-6 text-center bg-primary/5">
                  <img 
                    src={URL.createObjectURL(selectedImage)} 
                    alt="Selected" 
                    className="max-h-64 mx-auto rounded-lg shadow-lg"
                  />
                  <p className="mt-4 text-sm text-muted-foreground font-medium">{selectedImage.name}</p>
                  <div className="flex items-center justify-center gap-2 mt-2 text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                    Ready for analysis
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedImage(null)}
                  className="w-full hover-lift"
                >
                  Choose Different Image
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-all duration-300 hover:bg-primary/5">
                  <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-6 text-lg">Upload PNG or JPG files only</p>
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button variant="hero" className="cursor-pointer button-glow">
                      <Upload className="w-4 h-4" />
                      Choose File
                    </Button>
                  </label>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">or</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full hover-lift" disabled>
                  <Camera className="w-4 h-4" />
                  Take Photo (Coming Soon)
                </Button>
              </div>
            )}
          </Card>

          {/* Feature Selection */}
          <Card className="card-tech animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-semibold mb-4 logo-font">Analysis Features</h2>
            <p className="text-muted-foreground mb-8">Select which features to run on your image:</p>
            
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div 
                  key={feature.id} 
                  className={`feature-card ${feature.enabled ? 'selected' : ''}`}
                  onClick={() => handleFeatureToggle(feature.id)}
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {feature.enabled ? (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm logo-font">{feature.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <feature.icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Analyze Button */}
        {selectedImage && (
          <div className="mt-12 text-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <Button 
              variant="hero" 
              size="lg" 
              onClick={handleAnalyze}
              className="px-12 py-6 text-lg button-glow hover-lift"
            >
              <Search className="w-6 h-6" />
              Start OSINT Analysis
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
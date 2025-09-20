import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/Logo";
import { Upload, Camera, FileText, Search, Shield, MapPin, BarChart3, Download, LogOut } from "lucide-react";

interface DashboardProps {
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

export function Dashboard({ userName, onLogout }: DashboardProps) {
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
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 3000);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Logo size="md" />
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Analysis Complete</h1>
              <p className="text-muted-foreground">Your OSINT analysis has been completed successfully.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.filter(f => f.enabled).map((feature) => (
                <Card key={feature.id} className="card-tech">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{feature.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                      <div className="bg-muted/30 p-3 rounded-lg text-sm">
                        <p>✓ Analysis completed successfully</p>
                        <p className="text-muted-foreground">Results would appear here in a real implementation</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="hero" className="gap-2">
                <Download className="w-4 h-4" />
                Download PDF Report
              </Button>
              <Button variant="outline" onClick={() => {
                setShowResults(false);
                setSelectedImage(null);
              }}>
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
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto animate-pulse-glow rounded-full bg-primary/20 flex items-center justify-center">
            <Search className="w-8 h-8 text-primary animate-spin" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Processing your image...</h2>
            <p className="text-muted-foreground">Running OSINT analysis with selected features</p>
          </div>
          <div className="w-64 mx-auto bg-muted/30 rounded-full h-2">
            <div className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Logo size="md" />
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Welcome back, <span className="gradient-text">{userName}</span>!
          </h1>
          <p className="text-lg text-muted-foreground">
            Ready to analyze an image? Upload or capture one to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <Card className="card-tech">
            <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
            
            {selectedImage ? (
              <div className="space-y-4">
                <div className="border border-dashed border-primary/30 rounded-lg p-4 text-center">
                  <img 
                    src={URL.createObjectURL(selectedImage)} 
                    alt="Selected" 
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <p className="mt-2 text-sm text-muted-foreground">{selectedImage.name}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedImage(null)}
                  className="w-full"
                >
                  Choose Different Image
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Upload PNG or JPG files only</p>
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button variant="tech" className="cursor-pointer">
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

                <Button variant="outline" className="w-full" disabled>
                  <Camera className="w-4 h-4" />
                  Take Photo (Coming Soon)
                </Button>
              </div>
            )}
          </Card>

          {/* Feature Selection */}
          <Card className="card-tech">
            <h2 className="text-xl font-semibold mb-4">Analysis Features</h2>
            <p className="text-muted-foreground mb-6">Select which features to run on your image:</p>
            
            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/20 transition-colors">
                  <Checkbox
                    id={feature.id}
                    checked={feature.enabled}
                    onCheckedChange={() => handleFeatureToggle(feature.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label 
                      htmlFor={feature.id} 
                      className="text-sm font-medium cursor-pointer"
                    >
                      {feature.name}
                    </label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {feature.description}
                    </p>
                  </div>
                  <feature.icon className="w-5 h-5 text-primary mt-1" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Analyze Button */}
        {selectedImage && (
          <div className="mt-8 text-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={handleAnalyze}
              className="px-8"
            >
              <Search className="w-5 h-5" />
              Start OSINT Analysis
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
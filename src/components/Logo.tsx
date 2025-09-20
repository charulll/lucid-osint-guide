import lucidLogo from "@/assets/lucid-logo.jpg";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} rounded-lg overflow-hidden tech-glow`}>
        <img 
          src={lucidLogo} 
          alt="LUCID Logo" 
          className="w-full h-full object-cover"
        />
      </div>
      {showText && (
        <span className={`font-bold gradient-text ${textSizeClasses[size]}`}>
          LUCID
        </span>
      )}
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { Play, Info, Volume2 } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-start">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBanner}
          alt="Featured Content"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-2xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          FEATURED CONTENT
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          The Future of
          <span className="block bg-gradient-text bg-clip-text text-transparent">
            Streaming
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
          Experience cinema like never before with adaptive streaming, real-time enhancements, 
          and crystal-clear quality that adapts to your connection.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button 
            size="lg" 
            className="bg-gradient-hero hover:shadow-glow transition-all duration-300 text-lg px-8 py-6"
          >
            <Play className="w-6 h-6 mr-2" />
            Watch Now
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-secondary/30 backdrop-blur-sm border-border hover:bg-secondary/50 text-lg px-8 py-6"
          >
            <Info className="w-6 h-6 mr-2" />
            More Info
          </Button>
        </div>

        {/* Features */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            Dolby Atmos
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border border-primary rounded text-primary text-xs flex items-center justify-center font-bold">
              4K
            </span>
            Ultra HD
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-primary rounded text-primary-foreground text-xs flex items-center justify-center font-bold">
              HDR
            </span>
            HDR10+
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
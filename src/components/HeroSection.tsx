import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Globe } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-hero relative overflow-hidden">
      {/* Professional particle background */}
      <ParticleBackground />
      
      {/* Subtle animated elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-primary opacity-10 rounded-full blur-2xl animate-particle-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-gradient-premium opacity-8 rounded-full blur-2xl animate-particle-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-16 h-16 bg-primary opacity-12 rounded-full blur-xl animate-particle-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8 animate-fade-in-up">
            <span className="font-cinematic">HOME</span>
            <span>&gt;</span>
            <span className="text-primary font-medium font-cinematic">VIDEO EDITOR</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-cinematic mb-8 leading-tight tracking-tight animate-slide-in-left">
            <span className="bg-gradient-text bg-clip-text text-transparent animate-gradient-shift">
              CINEMATIC VIDEO EDITOR
            </span>
          </h1>

          {/* Subtitle */}
          <div className="animate-slide-in-right">
            <p className="text-2xl md:text-3xl text-foreground mb-4 font-medium">
              Transform videos with AI precision.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 font-inter">
              Professional-grade editing tools. Zero downloads required.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <Button 
              size="lg" 
              className="bg-gradient-hero hover:shadow-glow transition-all duration-500 text-xl px-12 py-8 rounded-2xl font-cinematic font-bold group"
            >
              <Zap className="w-6 h-6 mr-3 group-hover:animate-spin transition-transform duration-300" />
              Start Creating
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary/50 text-primary hover:bg-primary/10 text-lg px-10 py-8 rounded-2xl font-medium backdrop-blur-sm"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <p className="text-sm text-muted-foreground mb-6 font-cinematic tracking-wider">
              TRUSTED BY PROFESSIONALS
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-lg font-medium text-foreground hover:text-primary transition-colors cursor-pointer">Adobe</div>
              <div className="text-lg font-medium text-foreground hover:text-primary transition-colors cursor-pointer">Canva</div>
              <div className="text-lg font-medium text-foreground hover:text-primary transition-colors cursor-pointer">Final Cut</div>
              <div className="text-lg font-medium text-foreground hover:text-primary transition-colors cursor-pointer">DaVinci</div>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-16 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 hover:shadow-glow transition-all duration-300">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 hover:shadow-glow transition-all duration-300">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 hover:shadow-glow transition-all duration-300">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Global CDN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center opacity-70">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
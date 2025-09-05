import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
            <span>HOME</span>
            <span>&gt;</span>
            <span className="text-foreground font-medium">VIDEO EDITOR</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            ONLINE VIDEO EDITOR
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-foreground mb-4">
            Edit videos for free.
          </p>
          <p className="text-lg text-muted-foreground mb-12">
            No downloads required.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-hero hover:shadow-glow transition-all duration-300 text-lg px-8 py-6 rounded-full"
            >
              Edit Video
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              variant="link" 
              className="text-muted-foreground hover:text-foreground underline"
            >
              or, try a sample
            </Button>
          </div>

          {/* Trust Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-muted-foreground">Spotify</div>
            <div className="text-2xl font-bold text-muted-foreground">Google</div>
            <div className="text-2xl font-bold text-muted-foreground">Facebook</div>
            <div className="text-2xl font-bold text-muted-foreground">Harvard</div>
            <div className="text-2xl font-bold text-muted-foreground">NYU</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Play, ChevronDown, Sparkles } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-background/95 backdrop-blur-xl shadow-red-intense border-b border-primary/20' : 'bg-gradient-hero/20 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center animate-fade-in-up">
            <div className="relative">
              <h1 className="text-3xl font-bold font-cinematic bg-gradient-text bg-clip-text text-transparent animate-gradient-shift">
                StreamVizion
              </h1>
              <div className="absolute -inset-1 bg-gradient-primary opacity-20 blur-sm rounded-lg animate-red-pulse"></div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 animate-slide-in-left">
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105"
            >
              About
            </button>
            <button 
              onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105"
            >
              Upload
            </button>
            <button 
              onClick={() => document.getElementById('live-streams')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105"
            >
              Live Streams
            </button>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4 animate-slide-in-right">
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-primary/20 animate-fade-in-up">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                About
              </button>
              <button 
                onClick={() => {
                  document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Upload
              </button>
              <button 
                onClick={() => {
                  document.getElementById('live-streams')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Live Streams
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
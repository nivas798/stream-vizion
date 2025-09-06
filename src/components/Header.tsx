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
                EduVision
              </h1>
              <div className="absolute -inset-1 bg-gradient-primary opacity-20 blur-sm rounded-lg animate-red-pulse"></div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 animate-slide-in-left">
            <div className="relative group">
              <button className="flex items-center text-muted-foreground hover:text-primary transition-all duration-300 font-medium">
                Study Tools
                <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-full left-0 mt-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300">
                <div className="bg-card/95 backdrop-blur-xl border border-primary/20 rounded-xl p-4 min-w-[200px] shadow-red-intense">
                  <div className="space-y-2">
                    <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Video Editor</a>
                    <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Presentation Maker</a>
                    <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Assignment Helper</a>
                    <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Project Templates</a>
                  </div>
                </div>
              </div>
            </div>
            <button className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105">
              Tutorials
            </button>
            <button className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105">
              Projects
            </button>
            <button className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105">
              Resources
            </button>
            <button className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105">
              Help
            </button>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4 animate-slide-in-right">
            <Button variant="ghost" className="hidden lg:inline-flex text-muted-foreground hover:text-primary font-medium">
              Join Study Group
            </Button>
            <Button variant="ghost" className="hidden md:inline-flex text-muted-foreground hover:text-primary font-medium">
              Student Login
            </Button>
            <Button className="bg-gradient-hero hover:shadow-glow transition-all duration-500 font-cinematic font-bold group">
              <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin transition-transform duration-300" />
              Start Project
            </Button>
            
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
              <button className="text-left text-muted-foreground hover:text-primary transition-colors font-medium">Study Tools</button>
              <button className="text-left text-muted-foreground hover:text-primary transition-colors font-medium">Tutorials</button>
              <button className="text-left text-muted-foreground hover:text-primary transition-colors font-medium">Projects</button>
              <button className="text-left text-muted-foreground hover:text-primary transition-colors font-medium">Resources</button>
              <button className="text-left text-muted-foreground hover:text-primary transition-colors font-medium">Help</button>
              <div className="pt-4 border-t border-primary/20">
                <Button variant="ghost" className="justify-start w-full mb-2">Join Study Group</Button>
                <Button variant="ghost" className="justify-start w-full mb-4">Student Login</Button>
                <Button className="bg-gradient-hero w-full font-cinematic">Start Project</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
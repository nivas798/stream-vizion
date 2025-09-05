import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Play, ChevronDown } from "lucide-react";

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
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-premium border-b border-border' : 'bg-background'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-foreground">
              StreamVizion
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                Tools
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              AI
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              Solutions
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              Learn
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </button>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:inline-flex text-muted-foreground hover:text-foreground">
              Request a Demo
            </Button>
            <Button variant="ghost" className="hidden md:inline-flex text-muted-foreground hover:text-foreground">
              Sign In
            </Button>
            <Button className="bg-gradient-hero hover:shadow-glow transition-all duration-300">
              Try StreamVizion Free
            </Button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-3">
              <button className="text-left text-muted-foreground hover:text-foreground transition-colors">Tools</button>
              <button className="text-left text-muted-foreground hover:text-foreground transition-colors">AI</button>
              <button className="text-left text-muted-foreground hover:text-foreground transition-colors">Solutions</button>
              <button className="text-left text-muted-foreground hover:text-foreground transition-colors">Learn</button>
              <button className="text-left text-muted-foreground hover:text-foreground transition-colors">Pricing</button>
              <Button variant="ghost" className="justify-start">Request a Demo</Button>
              <Button variant="ghost" className="justify-start">Sign In</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
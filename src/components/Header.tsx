import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, User, Upload, Play } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold font-display bg-gradient-text bg-clip-text text-transparent tracking-wide">
            StreamVizion
          </h1>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Home
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Movies
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Live
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              My List
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              About
            </Button>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search movies, shows..."
              className="pl-10 w-64 bg-secondary/50 border-border"
            />
          </div>

          {/* Action buttons */}
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="w-4 h-4" />
            Upload
          </Button>
          
          <Button variant="default" size="sm" className="gap-2 bg-gradient-hero">
            <Play className="w-4 h-4" />
            Watch Live
          </Button>

          {/* User actions */}
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
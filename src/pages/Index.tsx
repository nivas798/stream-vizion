import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VideoUpload from "@/components/VideoUpload";
import VideoPreview from "@/components/VideoPreview";
import VideoDownload from "@/components/VideoDownload";
import AboutWebsite from "@/components/AboutWebsite";
import LiveStreams from "@/components/YouTubeLiveStreams";
import { Badge } from "@/components/ui/badge";
import { Play, Zap, Shield, Globe, Users } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface QualitySettings {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
}

const Index = () => {
  const [currentVideo, setCurrentVideo] = useState<UploadedFile | null>(null);
  const [qualitySettings, setQualitySettings] = useState<QualitySettings>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0
  });

  const handleVideoUploaded = (file: UploadedFile) => {
    setCurrentVideo(file);
  };

  const handleQualityChange = (settings: QualitySettings) => {
    setQualitySettings(settings);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutWebsite />

      {/* Video Editor Interface Preview */}
      <section className="py-20 bg-gradient-elegant relative overflow-hidden animate-fade-in-up" style={{animationDelay: '0.2s'}}>
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-primary opacity-10 rounded-full blur-3xl animate-floating"></div>
          <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-accent opacity-8 rounded-full blur-3xl animate-floating" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="bg-gradient-card backdrop-blur-xl border border-primary/20 rounded-3xl shadow-elegant p-12 max-w-7xl mx-auto">
            <div className="mb-8">
              <Badge className="bg-gradient-primary text-white px-6 py-2 font-cinematic font-bold mb-4">
                PROFESSIONAL INTERFACE
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold font-cinematic mb-4 text-foreground">
                Industry-Standard Video Editor
              </h3>
              <p className="text-muted-foreground font-inter max-w-2xl mx-auto">
                Experience the power of professional video editing with our intuitive interface designed for creators of all levels.
              </p>
            </div>
            
            {/* Mock interface preview */}
            <div className="bg-card/50 border border-primary/30 rounded-2xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-12 gap-4 h-64">
                {/* Timeline */}
                <div className="col-span-12 bg-gradient-primary/20 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Play className="w-4 h-4 text-primary" />
                    <span className="text-sm font-cinematic text-primary">Timeline Editor</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-primary/60 rounded-full w-3/4 animate-pulse"></div>
                    <div className="h-2 bg-accent/40 rounded-full w-1/2 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="h-2 bg-primary/30 rounded-full w-2/3 animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 bg-card/30 rounded-xl border border-primary/20 hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold font-cinematic mb-2">Real-time Processing</h4>
                <p className="text-sm text-muted-foreground">Instant preview with GPU acceleration</p>
              </div>
              <div className="text-center p-6 bg-card/30 rounded-xl border border-primary/20 hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold font-cinematic mb-2">Enterprise Security</h4>
                <p className="text-sm text-muted-foreground">Bank-level encryption and privacy</p>
              </div>
              <div className="text-center p-6 bg-card/30 rounded-xl border border-primary/20 hover:shadow-glow transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold font-cinematic mb-2">Global CDN</h4>
                <p className="text-sm text-muted-foreground">Lightning-fast worldwide delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio-quality videos 10x faster section */}
      <section className="py-24 bg-gradient-hero relative animate-fade-in-up" style={{animationDelay: '0.4s'}}>
        <div className="absolute inset-0 bg-gradient-overlay opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <Badge className="bg-card/20 text-primary border border-primary/30 px-6 py-2 font-cinematic mb-6 animate-red-pulse">
              REVOLUTIONARY TECHNOLOGY
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold font-cinematic mb-8 animate-slide-in-left">
              <em className="text-muted-foreground font-light">Studio-quality videos</em>{" "}
              <span className="bg-gradient-text bg-clip-text text-transparent">10x faster</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-inter animate-slide-in-right">
              StreamVizion's AI-powered Video Editor revolutionizes content creation with tools designed for professionals, 
              creators, and businesses of every scale.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="text-4xl font-bold font-cinematic text-primary mb-2">10M+</div>
              <div className="text-sm text-muted-foreground font-inter">Videos Processed</div>
            </div>
            <div className="text-center animate-fade-in-up" style={{animationDelay: '0.7s'}}>
              <div className="text-4xl font-bold font-cinematic text-primary mb-2">50K+</div>
              <div className="text-sm text-muted-foreground font-inter">Active Creators</div>
            </div>
            <div className="text-center animate-fade-in-up" style={{animationDelay: '0.8s'}}>
              <div className="text-4xl font-bold font-cinematic text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground font-inter">Uptime Guarantee</div>
            </div>
            <div className="text-center animate-fade-in-up" style={{animationDelay: '0.9s'}}>
              <div className="text-4xl font-bold font-cinematic text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground font-inter">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 space-y-16">
        
        {/* Video Upload Section */}
        <section id="upload" className="py-20 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="text-center mb-16">
            <Badge className="bg-gradient-primary/20 text-primary border border-primary/30 px-6 py-2 font-cinematic mb-6">
              UPLOAD & CREATE
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-cinematic mb-6 animate-slide-in-left">
              Save hours with{" "}
              <span className="bg-gradient-text bg-clip-text text-transparent">
                streamlined video editing
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-5xl mx-auto leading-relaxed font-inter animate-slide-in-right">
              StreamVizion is a browser-based Video Editor designed for professionals, content creators, and businesses. 
              Our AI-powered tools make complex video editing tasks simple and intuitive, enabling you to create 
              stunning content in minutes, not hours.
            </p>
            
            {/* Additional features */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-card/30 rounded-xl border border-primary/20 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <div className="text-2xl mb-3">🚀</div>
                <h4 className="font-bold font-cinematic mb-2">Instant Upload</h4>
                <p className="text-sm text-muted-foreground">Drag & drop files up to 10GB. Support for 100+ formats.</p>
              </div>
              <div className="text-center p-6 bg-card/30 rounded-xl border border-primary/20 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <div className="text-2xl mb-3">🎬</div>
                <h4 className="font-bold font-cinematic mb-2">Smart AI Tools</h4>
                <p className="text-sm text-muted-foreground">Auto-enhance, smart crop, and intelligent color grading.</p>
              </div>
              <div className="text-center p-6 bg-card/30 rounded-xl border border-primary/20 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                <div className="text-2xl mb-3">⚡</div>
                <h4 className="font-bold font-cinematic mb-2">Real-time Preview</h4>
                <p className="text-sm text-muted-foreground">See changes instantly with our GPU-accelerated engine.</p>
              </div>
            </div>
          </div>
          
          <VideoUpload onVideoUploaded={handleVideoUploaded} />
        </section>

        {/* Video Preview & Quality Editor Section */}
        {currentVideo && (
          <>
            <section id="preview" className="border-t border-border pt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Preview & Edit{" "}
                  <span className="bg-gradient-text bg-clip-text text-transparent">
                    Quality
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Adjust your video settings in real-time and see the changes instantly in the preview player.
                </p>
              </div>
              
              <VideoPreview
                videoUrl={currentVideo.url}
                fileName={currentVideo.name}
                onQualityChange={handleQualityChange}
              />
            </section>

            {/* Download Section */}
            <section id="download" className="border-t border-border pt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Export & Download{" "}
                  <span className="bg-gradient-text bg-clip-text text-transparent">
                    Enhanced Video
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Process your enhanced video and download it in your preferred quality and format.
                </p>
              </div>
              
              <VideoDownload
                fileName={currentVideo.name}
                qualitySettings={qualitySettings}
                videoUrl={currentVideo.url}
              />
            </section>
          </>
        )}

        {/* Live Streams Section - Under video editing columns */}
        <LiveStreams />

        {/* Features Overview */}
        <section className="py-24 bg-gradient-card rounded-3xl border border-primary/20 shadow-elegant animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="container mx-auto px-8">
            <div className="text-center mb-20">
              <Badge className="bg-gradient-primary/20 text-primary border border-primary/30 px-6 py-2 font-cinematic mb-6">
                POWERFUL FEATURES
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold font-cinematic mb-6 animate-slide-in-left">
                Professional Video{" "}
                <span className="bg-gradient-text bg-clip-text text-transparent">
                  Enhancement Suite
                </span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto font-inter animate-slide-in-right">
                Industry-leading video editing capabilities powered by advanced AI and cutting-edge technology. 
                Create, enhance, and deliver professional content at lightning speed.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gradient-elegant backdrop-blur-sm rounded-2xl border border-primary/20 hover:shadow-glow transition-all duration-500 group">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-xl font-bold font-cinematic mb-4 group-hover:bg-gradient-text group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  AI-Powered Enhancement
                </h3>
                <p className="text-muted-foreground leading-relaxed font-inter mb-4">
                  Revolutionary AI algorithms automatically enhance video quality, remove noise, stabilize footage, and optimize colors in real-time.
                </p>
                <div className="text-sm text-primary font-medium">
                  • Auto-stabilization • Noise reduction • Smart color grading
                </div>
              </div>

              <div className="text-center p-8 bg-gradient-elegant backdrop-blur-sm rounded-2xl border border-primary/20 hover:shadow-glow transition-all duration-500 group">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">8K</span>
                </div>
                <h3 className="text-xl font-bold font-cinematic mb-4 group-hover:bg-gradient-text group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Ultra-HD Export Engine
                </h3>
                <p className="text-muted-foreground leading-relaxed font-inter mb-4">
                  Export videos in resolutions up to 8K with support for HDR, multiple codecs, and custom bitrates. Professional quality guaranteed.
                </p>
                <div className="text-sm text-primary font-medium">
                  • 8K/4K/HD export • HDR support • 50+ format options
                </div>
              </div>

              <div className="text-center p-8 bg-gradient-elegant backdrop-blur-sm rounded-2xl border border-primary/20 hover:shadow-glow transition-all duration-500 group">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold font-cinematic mb-4 group-hover:bg-gradient-text group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Lightning Processing
                </h3>
                <p className="text-muted-foreground leading-relaxed font-inter mb-4">
                  GPU-accelerated processing with cloud computing power. Render 4K videos 10x faster than traditional desktop software.
                </p>
                <div className="text-sm text-primary font-medium">
                  • GPU acceleration • Cloud processing • Batch operations
                </div>
              </div>
            </div>

            {/* Additional feature grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              <div className="text-center p-6 bg-card/30 rounded-xl border border-primary/20 hover:shadow-glow transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold font-cinematic text-sm mb-2">Enterprise Security</h4>
                <p className="text-xs text-muted-foreground">SOC 2 compliant with end-to-end encryption</p>
              </div>
              <div className="text-center p-6 bg-card/30 rounded-xl border border-primary/20 hover:shadow-glow transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
                <Globe className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold font-cinematic text-sm mb-2">Global CDN</h4>
                <p className="text-xs text-muted-foreground">150+ edge locations worldwide</p>
              </div>
              <div className="text-center p-6 bg-card/30 rounded-xl border border-primary/20 hover:shadow-glow transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
                <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold font-cinematic text-sm mb-2">API Integration</h4>
                <p className="text-xs text-muted-foreground">RESTful API with comprehensive docs</p>
              </div>
              <div className="text-center p-6 bg-card/30 rounded-xl border border-primary/20 hover:shadow-glow transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-bold font-cinematic text-sm mb-2">Team Collaboration</h4>
                <p className="text-xs text-muted-foreground">Real-time editing with team members</p>
              </div>
            </div>
          </div>
        </section>
      </main>


      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                StreamVizion
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Professional video enhancement and quality editing platform for creators everywhere.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Features</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="hover:text-foreground transition-colors cursor-pointer">Video Upload</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Real-time Preview</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Quality Enhancement</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Multi-format Export</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Export Options</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="hover:text-foreground transition-colors cursor-pointer">4K Ultra HD</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">1080p Full HD</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">720p HD</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Multiple Formats</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Support</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="hover:text-foreground transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Video Tutorials</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Format Support</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Contact Us</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 StreamVizion. Built with ❤️ by Nivas, Swathi & Krishna Priya.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
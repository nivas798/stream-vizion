import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VideoUpload from "@/components/VideoUpload";
import VideoPreview from "@/components/VideoPreview";
import VideoDownload from "@/components/VideoDownload";
import AboutSection from "@/components/AboutSection";
import { Badge } from "@/components/ui/badge";

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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 space-y-16">
        
        {/* Video Upload Section */}
        <section id="upload" className="py-20 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="text-center mb-16">
            <Badge className="bg-gradient-primary/20 text-primary border border-primary/30 px-6 py-2 font-cinematic mb-6">
              PERCEPTION-AWARE ENHANCEMENT
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-cinematic mb-6 animate-slide-in-left">
              Upload & Enhance to{" "}
              <span className="bg-gradient-text bg-clip-text text-transparent">
                4K/8K Quality
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-5xl mx-auto leading-relaxed font-inter animate-slide-in-right">
              Our AI-powered perception-aware engine intelligently detects faces, text, and motion, applying maximum quality enhancement to important areas while optimizing backgrounds for efficient streaming.
            </p>
          </div>
          
          <VideoUpload onVideoUploaded={handleVideoUploaded} />
        </section>

        {/* Video Preview & Quality Editor Section */}
        {currentVideo && (
          <>
            <section id="preview" className="border-t border-border pt-16">
              <div className="text-center mb-12">
                <Badge className="bg-gradient-primary/20 text-primary border border-primary/30 px-6 py-2 font-cinematic mb-6">
                  AI ENHANCEMENT ENGINE
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Live Quality{" "}
                  <span className="bg-gradient-text bg-clip-text text-transparent">
                    Comparison
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  See the dramatic quality improvement with side-by-side comparison. Our AI detects and enhances faces, text, and moving objects.
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
                  Export Enhanced{" "}
                  <span className="bg-gradient-text bg-clip-text text-transparent">
                    4K/8K Video
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Download your perception-aware enhanced video in up to 8K resolution.
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

        {/* Features Overview */}
        <section className="py-24 bg-gradient-card rounded-3xl border border-primary/20 shadow-elegant animate-fade-in-up">
          <div className="container mx-auto px-8">
            <div className="text-center mb-20">
              <Badge className="bg-gradient-primary/20 text-primary border border-primary/30 px-6 py-2 font-cinematic mb-6">
                ADVANCED TECHNOLOGY
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold font-cinematic mb-6">
                Perception-Aware{" "}
                <span className="bg-gradient-text bg-clip-text text-transparent">
                  AI Engine
                </span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto font-inter">
                Revolutionary AI technology that intelligently allocates quality where it matters most - faces, text, and motion - while efficiently compressing backgrounds.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gradient-elegant backdrop-blur-sm rounded-2xl border border-primary/20 hover:shadow-glow transition-all duration-500 group">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold font-cinematic mb-4 group-hover:bg-gradient-text group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Smart Region Detection
                </h3>
                <p className="text-muted-foreground leading-relaxed font-inter mb-4">
                  AI-powered detection of faces, text, and moving objects. Automatically prioritizes quality for important visual elements.
                </p>
                <div className="text-sm text-primary font-medium">
                  • Face recognition • Text detection • Motion tracking
                </div>
              </div>

              <div className="text-center p-8 bg-gradient-elegant backdrop-blur-sm rounded-2xl border border-primary/20 hover:shadow-glow transition-all duration-500 group">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">8K</span>
                </div>
                <h3 className="text-xl font-bold font-cinematic mb-4 group-hover:bg-gradient-text group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  4K/8K Upscaling
                </h3>
                <p className="text-muted-foreground leading-relaxed font-inter mb-4">
                  Advanced upscaling algorithms with detail recovery, noise reduction, and sharpening. Export in resolutions up to 8K.
                </p>
                <div className="text-sm text-primary font-medium">
                  • AI upscaling • Detail enhancement • Noise reduction
                </div>
              </div>

              <div className="text-center p-8 bg-gradient-elegant backdrop-blur-sm rounded-2xl border border-primary/20 hover:shadow-glow transition-all duration-500 group">
                <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold font-cinematic mb-4 group-hover:bg-gradient-text group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Efficient Compression
                </h3>
                <p className="text-muted-foreground leading-relaxed font-inter mb-4">
                  Perception-aware compression allocates high bitrate to important areas, low bitrate to backgrounds. Optimal quality-to-size ratio.
                </p>
                <div className="text-sm text-primary font-medium">
                  • Selective compression • Optimized streaming • Reduced file size
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Developer Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 mt-24">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 StreamVizion. Perception-aware AI video enhancement technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

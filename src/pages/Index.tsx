import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VideoUpload from "@/components/VideoUpload";
import VideoPreview from "@/components/VideoPreview";
import VideoDownload from "@/components/VideoDownload";
import AboutSection from "@/components/AboutSection";
import LiveStreams from "@/components/YouTubeLiveStreams";

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
        <section id="upload">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-display mb-4">
              Upload Your{" "}
              <span className="bg-gradient-text bg-clip-text text-transparent">
                Videos
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start by uploading your video files. We support all major formats including MP4, MOV, AVI, and more.
            </p>
          </div>
          
          <VideoUpload onVideoUploaded={handleVideoUploaded} />
        </section>

        {/* Video Preview & Quality Editor Section */}
        {currentVideo && (
          <>
            <section id="preview" className="border-t border-border/50 pt-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold font-display mb-4">
                  Preview & Edit{" "}
                  <span className="bg-gradient-text bg-clip-text text-transparent">
                    Quality
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
            <section id="download" className="border-t border-border/50 pt-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold font-display mb-4">
                  Export & Download{" "}
                  <span className="bg-gradient-text bg-clip-text text-transparent">
                    Enhanced Video
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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

        {/* Live Streams Section */}
        <LiveStreams />

        {/* Features Overview */}
        <section className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">
              Powerful Video{" "}
              <span className="bg-gradient-text bg-clip-text text-transparent">
                Enhancement Tools
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional-grade video editing capabilities right in your browser.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-card/30 rounded-2xl border border-border/50">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">✨</span>
              </div>
              <h3 className="text-xl font-bold font-display mb-2">Real-time Preview</h3>
              <p className="text-muted-foreground">
                See your adjustments instantly with our real-time video preview system.
              </p>
            </div>

            <div className="text-center p-8 bg-card/30 rounded-2xl border border-border/50">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4K</span>
              </div>
              <h3 className="text-xl font-bold font-display mb-2">Multi-Quality Export</h3>
              <p className="text-muted-foreground">
                Export your videos in multiple resolutions from 360p to 4K Ultra HD.
              </p>
            </div>

            <div className="text-center p-8 bg-card/30 rounded-2xl border border-border/50">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">⚡</span>
              </div>
              <h3 className="text-xl font-bold font-display mb-2">Fast Processing</h3>
              <p className="text-muted-foreground">
                Advanced algorithms ensure quick processing without compromising quality.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* About Section */}
      <AboutSection />

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold font-display mb-4 bg-gradient-text bg-clip-text text-transparent">
                StreamVizion
              </h3>
              <p className="text-muted-foreground">
                Professional video enhancement and quality editing platform for creators.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Video Upload</li>
                <li>Real-time Preview</li>
                <li>Quality Enhancement</li>
                <li>Multi-format Export</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Export Options</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>4K Ultra HD</li>
                <li>1080p Full HD</li>
                <li>720p HD</li>
                <li>Multiple Formats</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Help Center</li>
                <li>Video Tutorials</li>
                <li>Format Support</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 StreamVizion. Built with ❤️ by Nivas, Swathi & Krishna Priya.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
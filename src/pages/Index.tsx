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

      {/* Video Editor Interface Preview */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-card rounded-2xl shadow-elegant p-8 max-w-6xl mx-auto">
            <img 
              src="https://cdn-useast1.kapwing.com/static/video-editor-interface-placeholder.webp" 
              alt="Video Editor Interface" 
              className="w-full rounded-lg shadow-premium"
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23f3f4f6'/%3E%3Ctext x='400' y='200' text-anchor='middle' font-family='Arial' font-size='20' fill='%236b7280'%3EVideo Editor Interface%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        </div>
      </section>

      {/* Studio-quality videos 10x faster section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <em className="text-muted-foreground">Studio-quality videos</em> 10x faster
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              StreamVizion's online Video Editor has tools for every experience level
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 space-y-16">
        
        {/* Video Upload Section */}
        <section id="upload" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Save hours with{" "}
              <span className="bg-gradient-text bg-clip-text text-transparent">
                streamlined video editing
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              StreamVizion is a browser-based Video Editor designed for anyone looking to edit, convert, and export content with ease. Our intuitive tools make tasks like trimming clips and adding overlays straightforward, even for those with no prior editing experience.
            </p>
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
        <section className="py-16 bg-muted/20 rounded-3xl">
          <div className="container mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful Video{" "}
                <span className="bg-gradient-text bg-clip-text text-transparent">
                  Enhancement Tools
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Professional-grade video editing capabilities right in your browser.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-card rounded-2xl border border-border hover:shadow-premium transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Real-time Preview</h3>
                <p className="text-muted-foreground leading-relaxed">
                  See your adjustments instantly with our real-time video preview system.
                </p>
              </div>

              <div className="text-center p-8 bg-card rounded-2xl border border-border hover:shadow-premium transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold text-white">4K</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Multi-Quality Export</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Export your videos in multiple resolutions from 360p to 4K Ultra HD.
                </p>
              </div>

              <div className="text-center p-8 bg-card rounded-2xl border border-border hover:shadow-premium transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Fast Processing</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced algorithms ensure quick processing without compromising quality.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* About Section */}
      <AboutSection />

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
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MovieRow from "@/components/MovieRow";
import AboutSection from "@/components/AboutSection";
import movie1 from "@/assets/movie1.jpg";
import movie2 from "@/assets/movie2.jpg";
import movie3 from "@/assets/movie3.jpg";
import movie4 from "@/assets/movie4.jpg";

// Sample movie data
const featuredMovies = [
  {
    id: "1",
    title: "Cyber Genesis",
    image: movie1,
    genre: "Sci-Fi Action",
    duration: "2h 15m",
    rating: "8.4",
    description: "In a futuristic metropolis, a hacker discovers a conspiracy that threatens humanity's digital existence."
  },
  {
    id: "2",
    title: "Mystic Realms",
    image: movie2,
    genre: "Fantasy Adventure",
    duration: "2h 30m",
    rating: "9.1",
    description: "A young mage embarks on an epic quest through enchanted forests to save her kingdom from ancient darkness."
  },
  {
    id: "3",
    title: "Night Shadows",
    image: movie3,
    genre: "Thriller Drama",
    duration: "1h 55m",
    rating: "8.7",
    description: "A detective unravels a web of corruption in the city's underbelly while confronting his own demons."
  },
  {
    id: "4",
    title: "Golden Hearts",
    image: movie4,
    genre: "Romance Comedy",
    duration: "1h 45m",
    rating: "7.9",
    description: "Two unlikely souls find love in the most unexpected places during a cross-country adventure."
  }
];

const liveStreams = [
  {
    id: "live1",
    title: "Live Concert: Electric Nights",
    image: movie1,
    genre: "Music Live",
    duration: "LIVE",
    rating: "🔴 LIVE",
    description: "Experience an electrifying live concert with stunning visuals and crystal-clear audio."
  },
  {
    id: "live2",
    title: "Sports Arena Championship",
    image: movie3,
    genre: "Sports Live",
    duration: "LIVE",
    rating: "🔴 LIVE",
    description: "Watch the championship finals with multi-angle views and real-time statistics."
  }
];

const trendingMovies = [
  {
    id: "trend1",
    title: "Digital Dreams",
    image: movie2,
    genre: "Drama Sci-Fi",
    duration: "2h 8m",
    rating: "8.9",
    description: "A thought-provoking exploration of consciousness in the age of artificial intelligence."
  },
  {
    id: "trend2",
    title: "Urban Legends",
    image: movie4,
    genre: "Horror Mystery",
    duration: "1h 52m",
    rating: "8.2",
    description: "Modern urban legends come to life in this spine-chilling supernatural thriller."
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Content Sections */}
      <main className="container mx-auto px-4 py-16 space-y-16">
        {/* Featured Content */}
        <MovieRow title="Featured Movies" movies={featuredMovies} />

        {/* Live Streams */}
        <MovieRow title="🔴 Live Streams" movies={liveStreams} />

        {/* Trending */}
        <MovieRow title="📈 Trending Now" movies={trendingMovies} />

        {/* User Uploads Section */}
        <div className="text-center bg-gradient-card rounded-2xl p-12 border border-border/50">
          <h2 className="text-3xl font-bold mb-4">
            Share Your{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">
              Creative Vision
            </span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload your own videos and reach millions of viewers. Our platform supports 
            high-quality streaming with automatic optimization and enhancement features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-hero hover:shadow-glow transition-all duration-300 text-white px-8 py-4 rounded-lg font-semibold">
              Start Uploading
            </button>
            <button className="border border-border bg-secondary/30 backdrop-blur-sm hover:bg-secondary/50 px-8 py-4 rounded-lg font-semibold transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Technical Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-card/30 rounded-2xl border border-border/50">
            <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">ABR</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Adaptive Bitrate</h3>
            <p className="text-muted-foreground">
              Automatically adjusts quality based on your connection for seamless streaming.
            </p>
          </div>

          <div className="text-center p-8 bg-card/30 rounded-2xl border border-border/50">
            <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">4K</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Ultra HD Quality</h3>
            <p className="text-muted-foreground">
              Experience cinema-quality video with support for 4K, HDR, and Dolby Atmos.
            </p>
          </div>

          <div className="text-center p-8 bg-card/30 rounded-2xl border border-border/50">
            <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">AI</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Enhancement</h3>
            <p className="text-muted-foreground">
              AI-powered video enhancement for brightness, contrast, and visual quality.
            </p>
          </div>
        </div>
      </main>

      {/* About Section */}
      <AboutSection />

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-text bg-clip-text text-transparent">
                StreamVizion
              </h3>
              <p className="text-muted-foreground">
                The future of streaming technology with adaptive quality and real-time enhancements.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Live Streaming</li>
                <li>Video on Demand</li>
                <li>Upload Center</li>
                <li>Analytics Dashboard</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Adaptive Bitrate</li>
                <li>Video Enhancement</li>
                <li>4K Ultra HD</li>
                <li>Multi-device Support</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Help Center</li>
                <li>API Documentation</li>
                <li>Developer Tools</li>
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
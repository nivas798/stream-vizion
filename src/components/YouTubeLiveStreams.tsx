import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";
import { Play, Eye, Clock, Users } from "lucide-react";

const LiveStreams = () => {
  const streamVideos = [
    {
      id: "hovezwINQMo",
      title: "Epic 4K Nature Documentary - Wildlife Paradise",
      url: "https://www.youtube.com/embed/hovezwINQMo?autoplay=1&mute=1&loop=1&playlist=hovezwINQMo",
      viewers: "2.4M",
      duration: "LIVE",
      category: "Documentary"
    },
    {
      id: "TPYg7NBo4yY",
      title: "Cinematic Wildlife Experience - African Safari",
      url: "https://www.youtube.com/embed/TPYg7NBo4yY?autoplay=1&mute=1&loop=1&playlist=TPYg7NBo4yY",
      viewers: "1.8M",
      duration: "LIVE",
      category: "Adventure"
    },
    {
      id: "8f5MGY0r9aA",
      title: "Deep Ocean 4K Exploration - Marine Life",
      url: "https://www.youtube.com/embed/8f5MGY0r9aA?autoplay=1&mute=1&loop=1&playlist=8f5MGY0r9aA",
      viewers: "3.1M",
      duration: "LIVE",
      category: "Science"
    },
    {
      id: "dqzcQF2Bz7o",
      title: "Majestic Mountain Landscapes - Aerial Journey",
      url: "https://www.youtube.com/embed/dqzcQF2Bz7o?autoplay=1&mute=1&loop=1&playlist=dqzcQF2Bz7o",
      viewers: "1.6M",
      duration: "LIVE",
      category: "Travel"
    },
    {
      id: "CU1tFtk_NFY",
      title: "Tropical Paradise 4K - Crystal Clear Waters",
      url: "https://www.youtube.com/embed/CU1tFtk_NFY?autoplay=1&mute=1&loop=1&playlist=CU1tFtk_NFY",
      viewers: "2.9M",
      duration: "LIVE",
      category: "Travel"
    }
  ];

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleVideoIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const video = entry.target as HTMLVideoElement;
      if (entry.isIntersecting) {
        video.play().catch(() => {
          // Auto-play might be blocked
        });
      } else {
        video.pause();
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleVideoIntersection, {
      threshold: 0.5,
      rootMargin: '0px'
    });

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-elegant relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 bg-card/30 backdrop-blur-xl border border-primary/20 rounded-full px-8 py-3 mb-8">
            <div className="w-3 h-3 bg-gradient-primary rounded-full animate-red-pulse"></div>
            <span className="text-sm font-bold text-primary font-cinematic tracking-wider">PREMIUM 4K COLLECTION</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-cinematic mb-8">
            Ultra HD{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent animate-gradient-shift">
              Live Streaming
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-inter">
            Experience cinematic quality with our curated collection of 4K ultra-high definition live streams.
          </p>
        </div>

        <div className="relative animate-fade-in-up">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-8 pb-6" style={{ width: 'max-content' }}>
              {streamVideos.map((video, index) => (
                <Card key={video.id} className="flex-shrink-0 w-96 overflow-hidden bg-gradient-card backdrop-blur-xl border border-primary/20 hover:shadow-red-intense transition-all duration-700 group animate-floating">
                  <div className="relative">
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                      <Badge className="bg-gradient-primary text-white border-none shadow-elegant font-cinematic">
                        <Play className="w-3 h-3 mr-2" />
                        4K ULTRA HD
                      </Badge>
                    </div>
                    
                    <div className="absolute top-4 right-4 z-20">
                      <Badge className="bg-gradient-to-r from-red-600 to-red-500 text-white border-none animate-red-pulse shadow-red-intense font-bold">
                        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                        {video.duration}
                      </Badge>
                    </div>

                    <div className="aspect-video bg-gradient-hero relative overflow-hidden">
                      <iframe
                        ref={(el) => {
                          if (el) videoRefs.current[index] = el as unknown as HTMLVideoElement;
                        }}
                        src={video.url}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-card">
                    <h3 className="font-bold font-cinematic mb-4 text-xl group-hover:bg-gradient-text group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 line-clamp-2 leading-tight">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">{video.viewers}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span className="font-medium">Live</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-6 text-sm text-muted-foreground bg-card/40 backdrop-blur-xl border border-primary/20 rounded-full px-8 py-4 shadow-elegant">
              <span className="flex items-center gap-3 font-cinematic">
                Scroll horizontally to explore premium content
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStreams;
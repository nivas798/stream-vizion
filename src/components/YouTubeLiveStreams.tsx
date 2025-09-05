import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useRef } from "react";

const LiveStreams = () => {
  const streamVideos = [
    {
      id: "hovezwINQMo",
      title: "4K Ultra HD Nature Documentary",
      url: "https://www.youtube.com/embed/hovezwINQMo?autoplay=1&mute=1&loop=1&playlist=hovezwINQMo"
    },
    {
      id: "TPYg7NBo4yY",
      title: "Cinematic 4K Wildlife Experience",
      url: "https://www.youtube.com/embed/TPYg7NBo4yY?autoplay=1&mute=1&loop=1&playlist=TPYg7NBo4yY"
    },
    {
      id: "8f5MGY0r9aA",
      title: "4K Ocean Life Exploration",
      url: "https://www.youtube.com/embed/8f5MGY0r9aA?autoplay=1&mute=1&loop=1&playlist=8f5MGY0r9aA"
    },
    {
      id: "dqzcQF2Bz7o",
      title: "Ultra HD Mountain Landscapes",
      url: "https://www.youtube.com/embed/dqzcQF2Bz7o?autoplay=1&mute=1&loop=1&playlist=dqzcQF2Bz7o"
    },
    {
      id: "CU1tFtk_NFY",
      title: "4K Tropical Paradise Stream",
      url: "https://www.youtube.com/embed/CU1tFtk_NFY?autoplay=1&mute=1&loop=1&playlist=CU1tFtk_NFY"
    },
    {
      id: "_f8dMFzYRCE",
      title: "Professional 4K City Views",
      url: "https://www.youtube.com/embed/_f8dMFzYRCE?autoplay=1&mute=1&loop=1&playlist=_f8dMFzYRCE"
    },
    {
      id: "FLvxuM1_rDk",
      title: "4K Sunset Time-lapse",
      url: "https://www.youtube.com/embed/FLvxuM1_rDk?autoplay=1&mute=1&loop=1&playlist=FLvxuM1_rDk"
    },
    {
      id: "GTCwRMuIjzA",
      title: "Ultra HD Forest Adventure",
      url: "https://www.youtube.com/embed/GTCwRMuIjzA?autoplay=1&mute=1&loop=1&playlist=GTCwRMuIjzA"
    },
    {
      id: "eFkXKxvkn6Y",
      title: "4K Coastal Waves Experience",
      url: "https://www.youtube.com/embed/eFkXKxvkn6Y?autoplay=1&mute=1&loop=1&playlist=eFkXKxvkn6Y"
    },
    {
      id: "D4sTViBfjVE",
      title: "Premium 4K Space Documentary",
      url: "https://www.youtube.com/embed/D4sTViBfjVE?autoplay=1&mute=1&loop=1&playlist=D4sTViBfjVE"
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-gradient-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-muted-foreground">Premium 4K Collection</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ultra HD{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">
              4K Streaming
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience cinematic quality with our curated collection of 4K ultra-high definition content
          </p>
        </div>

        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
              {streamVideos.map((video, index) => (
                <Card key={video.id} className="flex-shrink-0 w-80 overflow-hidden bg-card border border-border hover:shadow-card-hover hover:border-primary/20 transition-all duration-500 group">
                  <div className="relative">
                    <div className="absolute top-3 left-3 z-20 flex gap-2">
                      <Badge className="bg-gradient-primary text-white border-none shadow-premium">
                        <svg className="w-3 h-3 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        4K ULTRA HD
                      </Badge>
                    </div>
                    
                    <div className="absolute top-3 right-3 z-20">
                      <Badge variant="outline" className="bg-red-500 text-white border-red-400/50 animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse"></div>
                        LIVE
                      </Badge>
                    </div>

                    <div className="aspect-video bg-muted relative overflow-hidden rounded-t-lg">
                      <iframe
                        ref={(el) => {
                          if (el) videoRefs.current[index] = el as unknown as HTMLVideoElement;
                        }}
                        src={video.url}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold mb-3 text-lg group-hover:bg-gradient-text group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-gradient-primary rounded-full mr-2 animate-pulse"></div>
                        <span className="font-medium">Streaming Now</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-gradient-elegant text-primary px-3 py-1 rounded-full font-semibold">
                          4K Quality
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Scroll indicators */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground bg-muted/30 rounded-full px-6 py-2">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 12L9 8v8l4-4z"/>
                  <path d="M15 12L11 8v8l4-4z"/>
                </svg>
                Scroll horizontally to explore
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStreams;
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useRef } from "react";

const LiveStreams = () => {
  const streamVideos = [
    {
      id: "zEYNxqiuP9Eo5yC4",
      title: "Live Stream 1",
      url: "https://watch.wave.video/zEYNxqiuP9Eo5yC4"
    },
    {
      id: "R0Ve64SRrruOAm9s", 
      title: "Live Stream 2",
      url: "https://watch.wave.video/R0Ve64SRrruOAm9s"
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
    <section className="py-16 bg-background/50">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold font-display mb-4">
          Live{" "}
          <span className="bg-gradient-text bg-clip-text text-transparent">
            Streams
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Scroll through our featured live content with automatic playback
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {streamVideos.map((video, index) => (
              <CarouselItem key={video.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden bg-card/30 border border-border/50 hover:shadow-elegant transition-all duration-500 group">
                  <div className="relative">
                    <div className="absolute top-2 left-2 z-10">
                      <Badge variant="secondary" className="bg-purple-600/90 text-white border-none backdrop-blur-sm">
                        <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        STREAM
                      </Badge>
                    </div>
                    
                    <div className="absolute top-2 right-2 z-10">
                      <Badge variant="outline" className="bg-red-500/90 text-white border-red-500 animate-pulse backdrop-blur-sm">
                        🔴 LIVE
                      </Badge>
                    </div>

                    <div className="aspect-video bg-muted/20 relative overflow-hidden rounded-t-lg">
                      <iframe
                        ref={(el) => {
                          if (el) videoRefs.current[index] = el as unknown as HTMLVideoElement;
                        }}
                        src={video.url}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold font-display mb-2 group-hover:text-primary transition-colors duration-300">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                        Now Streaming
                      </span>
                      <span className="text-xs bg-muted/50 px-2 py-1 rounded transition-colors duration-300">
                        HD Quality
                      </span>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-300" />
          <CarouselNext className="right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-300" />
        </Carousel>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Swipe or use arrow keys to navigate • Videos auto-play when in view
        </p>
      </div>
    </section>
  );
};

export default LiveStreams;
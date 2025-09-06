import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";
import { Play, Eye, Clock, Users } from "lucide-react";

const LiveStreams = () => {
  const streamVideos = [
    {
      id: "hovezwINQMo",
      title: "African Safari 4K - The Big Five in Ultra HD",
      url: "https://www.youtube.com/embed/hovezwINQMo?autoplay=1&mute=1&loop=1&playlist=hovezwINQMo",
      viewers: "2.4M",
      duration: "1:59:57",
      category: "Nature",
      originalUrl: "https://youtu.be/hovezwINQMo?si=233s9ZJ4fTnIyHs1"
    },
    {
      id: "TPYg7NBo4yY",
      title: "African Wildlife in 4K - Scenic Relaxation Film",
      url: "https://www.youtube.com/embed/TPYg7NBo4yY?autoplay=1&mute=1&loop=1&playlist=TPYg7NBo4yY",
      viewers: "1.8M",
      duration: "3:01:04",
      category: "Wildlife",
      originalUrl: "https://youtu.be/TPYg7NBo4yY?si=y8UNd6LKgJr5H1kW"
    },
    {
      id: "8f5MGY0r9aA",
      title: "Deep Sea 4K - Exploring Ocean Mysteries",
      url: "https://www.youtube.com/embed/8f5MGY0r9aA?autoplay=1&mute=1&loop=1&playlist=8f5MGY0r9aA",
      viewers: "3.1M",
      duration: "1:10:52",
      category: "Ocean",
      originalUrl: "https://youtu.be/8f5MGY0r9aA?si=ikIFRBhB2VLnWKDI"
    },
    {
      id: "dqzcQF2Bz7o",
      title: "Mountain Views 4K - Scenic Nature Relaxation",
      url: "https://www.youtube.com/embed/dqzcQF2Bz7o?autoplay=1&mute=1&loop=1&playlist=dqzcQF2Bz7o",
      viewers: "1.6M",
      duration: "2:58:43",
      category: "Mountains",
      originalUrl: "https://youtu.be/dqzcQF2Bz7o?si=Ll-vlLywlOnGMIe9"
    },
    {
      id: "CU1tFtk_NFY",
      title: "Tropical Paradise 4K - Crystal Waters & Beaches",
      url: "https://www.youtube.com/embed/CU1tFtk_NFY?autoplay=1&mute=1&loop=1&playlist=CU1tFtk_NFY",
      viewers: "2.9M",
      duration: "3:00:29",
      category: "Tropical",
      originalUrl: "https://youtu.be/CU1tFtk_NFY?si=p4hblJCPTRnke2rU"
    },
    {
      id: "_f8dMFzYRCE",
      title: "Forest 4K - Peaceful Nature Sounds",
      url: "https://www.youtube.com/embed/_f8dMFzYRCE?autoplay=1&mute=1&loop=1&playlist=_f8dMFzYRCE",
      viewers: "1.2M",
      duration: "2:01:15",
      category: "Forest",
      originalUrl: "https://youtu.be/_f8dMFzYRCE?si=n-bTz00kWpsL_LLT"
    },
    {
      id: "FLvxuM1_rDk",
      title: "Northern Lights 4K - Aurora Borealis Beauty",
      url: "https://www.youtube.com/embed/FLvxuM1_rDk?autoplay=1&mute=1&loop=1&playlist=FLvxuM1_rDk",
      viewers: "980K",
      duration: "1:30:22",
      category: "Aurora",
      originalUrl: "https://youtu.be/FLvxuM1_rDk?si=oN6SZMyEkXd5QPsi"
    },
    {
      id: "GTCwRMuIjzA",
      title: "Rainforest 4K - Tropical Jungle Ambience",
      url: "https://www.youtube.com/embed/GTCwRMuIjzA?autoplay=1&mute=1&loop=1&playlist=GTCwRMuIjzA",
      viewers: "755K",
      duration: "2:15:45",
      category: "Rainforest",
      originalUrl: "https://youtu.be/GTCwRMuIjzA?si=a7t46coFpWftNZpn"
    },
    {
      id: "eFkXKxvkn6Y",
      title: "Desert 4K - Vast Landscapes & Sand Dunes",
      url: "https://www.youtube.com/embed/eFkXKxvkn6Y?autoplay=1&mute=1&loop=1&playlist=eFkXKxvkn6Y",
      viewers: "644K",
      duration: "1:45:18",
      category: "Desert",
      originalUrl: "https://youtu.be/eFkXKxvkn6Y?si=VSaW-bt5CQfbC_FY"
    },
    {
      id: "D4sTViBfjVE",
      title: "Underwater 4K - Marine Life Documentary",
      url: "https://www.youtube.com/embed/D4sTViBfjVE?autoplay=1&mute=1&loop=1&playlist=D4sTViBfjVE",
      viewers: "890K",
      duration: "1:22:33",
      category: "Marine",
      originalUrl: "https://youtu.be/D4sTViBfjVE?si=df1uVz7GVVwTW5dz"
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
    <section id="live-streams" className="py-24 bg-gradient-elegant relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 bg-card/30 backdrop-blur-xl border border-primary/20 rounded-full px-8 py-3 mb-8">
            <div className="w-3 h-3 bg-gradient-primary rounded-full animate-red-pulse"></div>
            <span className="text-sm font-bold text-primary font-cinematic tracking-wider">PREMIUM 4K COLLECTION</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-cinematic mb-8">
            Ultra HD{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent animate-gradient-shift">
              Nature Documentaries
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-inter">
            Experience cinematic quality with our curated collection of 4K nature documentaries and scenic content.
          </p>
        </div>

        <div className="relative animate-fade-in-up">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-8 pb-6" style={{ width: 'max-content' }}>
              {streamVideos.map((video, index) => (
                <Card key={video.id} className="flex-shrink-0 w-96 overflow-hidden bg-gradient-card backdrop-blur-xl border border-primary/20 hover:shadow-glow transition-all duration-700 group">
                  <div className="relative">
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                      <Badge className="bg-gradient-primary text-white border-none shadow-elegant font-cinematic">
                        <Play className="w-3 h-3 mr-2" />
                        4K ULTRA HD
                      </Badge>
                    </div>
                    
                    <div className="absolute top-4 right-4 z-20">
                      <Badge className="bg-gradient-to-r from-blue-600 to-blue-500 text-white border-none shadow-blue-subtle font-bold">
                        <Clock className="w-3 h-3 mr-2" />
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
                          <span className="font-medium">{video.category}</span>
                        </div>
                      </div>
                      <a
                        href={video.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium text-xs transition-colors"
                      >
                        Watch Original
                      </a>
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
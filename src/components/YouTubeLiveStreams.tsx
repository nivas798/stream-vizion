import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";
import { Play, Eye, Clock, Users } from "lucide-react";

const LiveStreams = () => {
  const streamVideos = [
    {
      id: "hovezwINQMo",
      title: "Student Project Showcase - Creative Presentations",
      url: "https://www.youtube.com/embed/hovezwINQMo?autoplay=1&mute=1&loop=1&playlist=hovezwINQMo",
      viewers: "2.4K",
      duration: "LIVE",
      category: "Academic"
    },
    {
      id: "TPYg7NBo4yY",
      title: "Study Group Session - Computer Science Projects",
      url: "https://www.youtube.com/embed/TPYg7NBo4yY?autoplay=1&mute=1&loop=1&playlist=TPYg7NBo4yY",
      viewers: "1.8K",
      duration: "LIVE",
      category: "Study Group"
    },
    {
      id: "8f5MGY0r9aA",
      title: "Final Year Project Defense - Engineering Solutions",
      url: "https://www.youtube.com/embed/8f5MGY0r9aA?autoplay=1&mute=1&loop=1&playlist=8f5MGY0r9aA",
      viewers: "3.1K",
      duration: "LIVE",
      category: "Engineering"
    },
    {
      id: "dqzcQF2Bz7o",
      title: "Student Film Festival - Creative Submissions",
      url: "https://www.youtube.com/embed/dqzcQF2Bz7o?autoplay=1&mute=1&loop=1&playlist=dqzcQF2Bz7o",
      viewers: "1.6K",
      duration: "LIVE",
      category: "Film"
    },
    {
      id: "CU1tFtk_NFY",
      title: "Assignment Help Session - Video Editing Basics",
      url: "https://www.youtube.com/embed/CU1tFtk_NFY?autoplay=1&mute=1&loop=1&playlist=CU1tFtk_NFY",
      viewers: "2.9K",
      duration: "LIVE",
      category: "Tutorial"
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
            <span className="text-sm font-bold text-primary font-cinematic tracking-wider">STUDENT PROJECT COLLECTION</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-cinematic mb-8">
            Student{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent animate-gradient-shift">
              Live Sessions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-inter">
            Join live study sessions and project showcases from students around the world.
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
                        STUDENT PROJECT
                      </Badge>
                    </div>
                    
                    <div className="absolute top-4 right-4 z-20">
                      <Badge className="bg-gradient-to-r from-red-600 to-red-500 text-white border-none shadow-red-subtle font-bold">
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
                Scroll horizontally to explore student projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStreams;
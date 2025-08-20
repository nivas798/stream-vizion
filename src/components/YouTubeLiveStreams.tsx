import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const YouTubeLiveStreams = () => {
  const youtubeVideos = [
    {
      id: "hovezwINQMo",
      title: "Live Stream 1"
    },
    {
      id: "1BfsSmaN7Kw", 
      title: "Live Stream 2"
    },
    {
      id: "F3hHTG7l1mM",
      title: "Live Stream 3"
    },
    {
      id: "NUTnud5ZAMo",
      title: "Live Stream 4"
    },
    {
      id: "YpViW3V734g",
      title: "Live Stream 5"
    }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold font-display mb-4">
          YouTube Live{" "}
          <span className="bg-gradient-text bg-clip-text text-transparent">
            Streams
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Watch our featured YouTube content live. Click on any video to start streaming.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {youtubeVideos.map((video, index) => (
          <Card key={video.id} className="overflow-hidden bg-card/30 border border-border/50 hover:shadow-elegant transition-all duration-300 group">
            <div className="relative">
              <div className="absolute top-2 left-2 z-10">
                <Badge variant="secondary" className="bg-red-600 text-white border-none">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </Badge>
              </div>
              
              <div className="absolute top-2 right-2 z-10">
                <Badge variant="outline" className="bg-red-500 text-white border-red-500 animate-pulse">
                  🔴 LIVE
                </Badge>
              </div>

              <div className="aspect-video bg-muted/20 relative overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold font-display mb-2 group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  Now Playing
                </span>
                <span className="text-xs bg-muted/50 px-2 py-1 rounded">
                  HD Quality
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          All videos are streamed directly from YouTube • Click to watch in full quality
        </p>
      </div>
    </section>
  );
};

export default YouTubeLiveStreams;
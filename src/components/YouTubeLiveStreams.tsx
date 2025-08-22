import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LiveStreams = () => {
  const streamVideos = [
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
          Live{" "}
          <span className="bg-gradient-text bg-clip-text text-transparent">
            Streams
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Watch our featured live content. Click on any video to start streaming.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {streamVideos.map((video, index) => (
          <Card key={video.id} className="overflow-hidden bg-card/30 border border-border/50 hover:shadow-elegant transition-all duration-300 group">
            <div className="relative">
              <div className="absolute top-2 left-2 z-10">
                <Badge variant="secondary" className="bg-purple-600 text-white border-none">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  STREAM
                </Badge>
              </div>
              
              <div className="absolute top-2 right-2 z-10">
                <Badge variant="outline" className="bg-red-500 text-white border-red-500 animate-pulse">
                  🔴 LIVE
                </Badge>
              </div>

              <div className="aspect-video bg-muted/20 relative overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1&showinfo=0&fs=1&iv_load_policy=3&cc_load_policy=0&disablekb=1`}
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
          All videos are streamed in high quality • Click to watch fullscreen
        </p>
      </div>
    </section>
  );
};

export default LiveStreams;
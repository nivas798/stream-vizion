import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  duration: number;
  resolution: string;
  fps: number;
}

interface VideoPreviewPanelProps {
  project: Project | null;
}

export const VideoPreviewPanel = ({ project }: VideoPreviewPanelProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const duration = project?.duration || 0;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleSeek = (values: number[]) => {
    const newTime = (values[0] / 100) * duration;
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime / 1000; // Convert ms to seconds
    }
  };

  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0]);
    if (videoRef.current) {
      videoRef.current.volume = values[0] / 100;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="relative w-full max-w-4xl aspect-video bg-black/90 border-border overflow-hidden group">
          {/* Video Player Placeholder */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/20 to-background/40">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto">
                <Play className="w-6 h-6 text-primary ml-1" />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-lg">No video loaded</h3>
                <p className="text-sm text-muted-foreground">
                  Upload a video to start editing
                </p>
              </div>
            </div>
          </div>

          {/* Video Element (Hidden until video is loaded) */}
          <video
            ref={videoRef}
            className="w-full h-full object-contain hidden"
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime * 1000)}
            onLoadedMetadata={(e) => {
              // Update project duration when video loads
            }}
          />

          {/* Overlay Controls */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              size="lg"
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-full bg-black/50 border border-white/20 hover:bg-black/70"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="secondary" className="bg-black/50 border-white/20">
              <Settings className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary" className="bg-black/50 border-white/20">
              <Maximize className="w-4 h-4" />
            </Button>
          </div>

          {/* AI Enhancement Indicator */}
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-primary/30">
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-xs text-white">AI Ready</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Controls Bar */}
      <div className="border-t border-border bg-card/50 backdrop-blur p-4">
        <div className="space-y-3">
          {/* Timeline Scrubber */}
          <div className="space-y-2">
            <Slider
              value={[progress]}
              onValueChange={handleSeek}
              max={100}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost">
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="default" onClick={handlePlayPause}>
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
              <Button size="sm" variant="ghost">
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={toggleMute}>
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="w-20"
                />
              </div>

              {/* Quality Indicator */}
              {project && (
                <div className="text-xs text-muted-foreground">
                  {project.resolution} • {project.fps}fps
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from "lucide-react";

interface VideoPreviewProps {
  videoUrl: string;
  fileName: string;
  onQualityChange?: (settings: QualitySettings) => void;
}

interface QualitySettings {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
}

const VideoPreview = ({ videoUrl, fileName, onQualityChange }: VideoPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  
  const [qualitySettings, setQualitySettings] = useState<QualitySettings>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const { brightness, contrast, saturation, hue } = qualitySettings;
      videoRef.current.style.filter = `
        brightness(${brightness}%) 
        contrast(${contrast}%) 
        saturate(${saturation}%) 
        hue-rotate(${hue}deg)
      `;
    }
    onQualityChange?.(qualitySettings);
  }, [qualitySettings, onQualityChange]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleQualityChange = (setting: keyof QualitySettings, value: number[]) => {
    setQualitySettings(prev => ({
      ...prev,
      [setting]: value[0]
    }));
  };

  const resetQuality = () => {
    setQualitySettings({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0
    });
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border border-border/50 overflow-hidden">
        <CardContent className="p-0">
          {/* Video Player */}
          <div className="relative bg-black">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-auto max-h-96 object-contain"
              onClick={togglePlay}
            />
            
            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress Bar */}
              <div className="mb-3">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={1}
                  onValueChange={handleSeek}
                  className="w-full"
                />
              </div>
              
              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  
                  <div className="w-20">
                    <Slider
                      value={[volume]}
                      max={1}
                      step={0.1}
                      onValueChange={handleVolumeChange}
                      className="w-full"
                    />
                  </div>
                  
                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quality Controls */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold font-display">Video Quality Settings</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={resetQuality}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Brightness */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="font-medium">Brightness</label>
                <span className="text-sm text-muted-foreground">{qualitySettings.brightness}%</span>
              </div>
              <Slider
                value={[qualitySettings.brightness]}
                min={0}
                max={200}
                step={1}
                onValueChange={(value) => handleQualityChange('brightness', value)}
                className="w-full"
              />
            </div>

            {/* Contrast */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="font-medium">Contrast</label>
                <span className="text-sm text-muted-foreground">{qualitySettings.contrast}%</span>
              </div>
              <Slider
                value={[qualitySettings.contrast]}
                min={0}
                max={200}
                step={1}
                onValueChange={(value) => handleQualityChange('contrast', value)}
                className="w-full"
              />
            </div>

            {/* Saturation */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="font-medium">Saturation</label>
                <span className="text-sm text-muted-foreground">{qualitySettings.saturation}%</span>
              </div>
              <Slider
                value={[qualitySettings.saturation]}
                min={0}
                max={200}
                step={1}
                onValueChange={(value) => handleQualityChange('saturation', value)}
                className="w-full"
              />
            </div>

            {/* Hue */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="font-medium">Hue</label>
                <span className="text-sm text-muted-foreground">{qualitySettings.hue}°</span>
              </div>
              <Slider
                value={[qualitySettings.hue]}
                min={-180}
                max={180}
                step={1}
                onValueChange={(value) => handleQualityChange('hue', value)}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoPreview;
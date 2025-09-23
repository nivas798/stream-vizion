import { useState, useRef, useEffect, useCallback } from "react";
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
  // Basic settings
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
}

interface PerceptionSettings {
  revertCompression: number;
  recoverDetails: number;
  sharpen: number;
  reduceNoise: number;
  dehalo: number;
  antialiasDeblur: number;
  outputSize: string;
  scalePercentage: number;
  enablePerceptionAware: boolean;
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

  const [perceptionSettings, setPerceptionSettings] = useState<PerceptionSettings>({
    revertCompression: 100,
    recoverDetails: 75,
    sharpen: 20,
    reduceNoise: 70,
    dehalo: 0,
    antialiasDeblur: 75,
    outputSize: "4K",
    scalePercentage: 200,
    enablePerceptionAware: true
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

  const handlePerceptionChange = useCallback((setting: keyof PerceptionSettings, value: number | string | boolean) => {
    setPerceptionSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  }, []);

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

  const outputSizeOptions = [
    { value: "4K", label: "4K (3840x2160)", scale: 200 },
    { value: "8K", label: "8K (7680x4320)", scale: 400 },
    { value: "2K", label: "2K (2560x1440)", scale: 133 },
    { value: "1080p", label: "1080p (1920x1080)", scale: 100 }
  ];

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

      {/* Perception-Aware AI Enhancement */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-display">Perception-Aware Enhancement</h3>
                <p className="text-sm text-muted-foreground">Intelligent 4K/8K upscaling with selective compression</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Enable AI</span>
              <input
                type="checkbox"
                checked={perceptionSettings.enablePerceptionAware}
                onChange={(e) => handlePerceptionChange('enablePerceptionAware', e.target.checked)}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
              />
            </div>
          </div>

          {perceptionSettings.enablePerceptionAware && (
            <div className="space-y-6">
              {/* AI Enhancement Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revert Compression */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="font-medium text-sm">Revert Compression</label>
                    <span className="text-sm text-muted-foreground">{perceptionSettings.revertCompression}</span>
                  </div>
                  <Slider
                    value={[perceptionSettings.revertCompression]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handlePerceptionChange('revertCompression', value[0])}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Removes compression artifacts from source video</p>
                </div>

                {/* Recover Details */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="font-medium text-sm">Recover Details</label>
                    <span className="text-sm text-muted-foreground">{perceptionSettings.recoverDetails}</span>
                  </div>
                  <Slider
                    value={[perceptionSettings.recoverDetails]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handlePerceptionChange('recoverDetails', value[0])}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Enhances fine details in faces and important objects</p>
                </div>

                {/* Sharpen */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="font-medium text-sm">Sharpen</label>
                    <span className="text-sm text-muted-foreground">{perceptionSettings.sharpen}</span>
                  </div>
                  <Slider
                    value={[perceptionSettings.sharpen]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handlePerceptionChange('sharpen', value[0])}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Selective sharpening for text and edges</p>
                </div>

                {/* Reduce Noise */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="font-medium text-sm">Reduce Noise</label>
                    <span className="text-sm text-muted-foreground">{perceptionSettings.reduceNoise}</span>
                  </div>
                  <Slider
                    value={[perceptionSettings.reduceNoise]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handlePerceptionChange('reduceNoise', value[0])}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">AI-powered noise reduction preserving important details</p>
                </div>

                {/* Dehalo */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="font-medium text-sm">Dehalo</label>
                    <span className="text-sm text-muted-foreground">{perceptionSettings.dehalo}</span>
                  </div>
                  <Slider
                    value={[perceptionSettings.dehalo]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handlePerceptionChange('dehalo', value[0])}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Removes halo artifacts around objects</p>
                </div>

                {/* Antialias/DeBlur */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="font-medium text-sm">Antialias / DeBlur</label>
                    <span className="text-sm text-muted-foreground">{perceptionSettings.antialiasDeblur}</span>
                  </div>
                  <Slider
                    value={[perceptionSettings.antialiasDeblur]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handlePerceptionChange('antialiasDeblur', value[0])}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Reduces blur and aliasing in motion</p>
                </div>
              </div>

              {/* Output Size Selection */}
              <div className="border-t border-border/50 pt-6">
                <h4 className="font-medium mb-4">Output Resolution</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="font-medium text-sm">Target Resolution</label>
                    <select
                      value={perceptionSettings.outputSize}
                      onChange={(e) => {
                        const selectedOption = outputSizeOptions.find(opt => opt.value === e.target.value);
                        handlePerceptionChange('outputSize', e.target.value);
                        if (selectedOption) {
                          handlePerceptionChange('scalePercentage', selectedOption.scale);
                        }
                      }}
                      className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md"
                    >
                      {outputSizeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="font-medium text-sm">Scale</label>
                      <span className="text-sm text-muted-foreground">{perceptionSettings.scalePercentage}%</span>
                    </div>
                    <Slider
                      value={[perceptionSettings.scalePercentage]}
                      min={100}
                      max={800}
                      step={25}
                      onValueChange={(value) => handlePerceptionChange('scalePercentage', value[0])}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="mt-4 p-4 bg-secondary/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Perception-Aware Technology:</strong> Our AI analyzes each frame to identify faces, moving objects, and text, 
                    applying full quality enhancement to these important areas while using efficient compression for static backgrounds. 
                    This results in superior visual quality with optimized file sizes.
                  </p>
                </div>
              </div>

              {/* Processing Preview */}
              <div className="border-t border-border/50 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">AI Processing Preview</h4>
                  <Button size="sm" className="bg-gradient-hero">
                    Start Processing
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">🎯</div>
                    <div className="text-sm font-medium">Face Detection</div>
                    <div className="text-xs text-muted-foreground">High Quality</div>
                  </div>
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">🏃</div>
                    <div className="text-sm font-medium">Motion Analysis</div>
                    <div className="text-xs text-muted-foreground">Enhanced Details</div>
                  </div>
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">📝</div>
                    <div className="text-sm font-medium">Text Recognition</div>
                    <div className="text-xs text-muted-foreground">Sharp & Clear</div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
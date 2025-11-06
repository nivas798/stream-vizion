import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles } from "lucide-react";
import { processVideoFrame, DetectedRegion } from "@/lib/videoProcessing";
import type { EnhancementSettings as LibEnhancementSettings, QualitySettings as LibQualitySettings } from "@/lib/videoProcessing";

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

interface AIEnhancementSettings {
  // Resolution & Detail
  resolution: string; // "1080p" | "2K" | "4K" | "8K"
  superResolution: number; // 0-100 AI upscaling strength
  
  // Color & Tone
  colorMode: string; // "soft" | "natural" | "vibrant"
  colorBoost: number; // 0-100
  
  // Clarity & Smoothness
  denoise: number; // 0-100 Smart denoise
  faceRestore: number; // 0-100 Face enhancement
  detailBoost: number; // 0-100
  
  // Advanced
  dehaze: number; // 0-100 Light balance
  motionSmoothing: number; // 0-100 Frame interpolation
  stabilization: number; // 0-100
  audioEnhance: boolean;
  
  enableAI: boolean;
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

  const [aiSettings, setAISettings] = useState<AIEnhancementSettings>({
    resolution: "4K",
    superResolution: 80,
    colorMode: "natural",
    colorBoost: 60,
    denoise: 70,
    faceRestore: 75,
    detailBoost: 65,
    dehaze: 50,
    motionSmoothing: 40,
    stabilization: 60,
    audioEnhance: true,
    enableAI: true
  });

  const [processingMessage, setProcessingMessage] = useState("");
  const [showSparkles, setShowSparkles] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedRegions, setDetectedRegions] = useState<DetectedRegion[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const processedCanvasRef = useRef<HTMLCanvasElement>(null);
  const previousFrameRef = useRef<ImageData | null>(null);

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

  const handleAIChange = useCallback((setting: keyof AIEnhancementSettings, value: number | string | boolean) => {
    setAISettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    // Show loveable feedback
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 1000);
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

  const resolutionOptions = [
    { value: "1080p", label: "1080p Full HD", icon: "📺" },
    { value: "2K", label: "2K Quad HD", icon: "🎬" },
    { value: "4K", label: "4K Ultra HD", icon: "✨" },
    { value: "8K", label: "8K Cinema", icon: "🌟" }
  ];

  const colorModes = [
    { value: "soft", label: "Soft", desc: "Gentle & warm" },
    { value: "natural", label: "Natural", desc: "True to life" },
    { value: "vibrant", label: "Vibrant", desc: "Bold & cinematic" }
  ];

  const processCurrentFrame = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsProcessing(true);
    setProcessingMessage("Enhancing with love ❤️");
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      setIsProcessing(false);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      // Map AI settings to processing settings
      const libSettings: LibEnhancementSettings = {
        revertCompression: 100,
        recoverDetails: aiSettings.detailBoost,
        sharpen: aiSettings.superResolution / 5,
        reduceNoise: aiSettings.denoise,
        dehalo: aiSettings.dehaze,
        antialiasDeblur: aiSettings.faceRestore,
        outputSize: aiSettings.resolution,
        scalePercentage: aiSettings.resolution === "8K" ? 400 : aiSettings.resolution === "4K" ? 200 : aiSettings.resolution === "2K" ? 133 : 100,
        enablePerceptionAware: aiSettings.enableAI
      };

      const libQualitySettings: LibQualitySettings = {
        ...qualitySettings,
        saturation: qualitySettings.saturation * (1 + aiSettings.colorBoost / 200)
      };

      setProcessingMessage("Polishing your video for perfection ✨");

      const { processedCanvas, regions } = await processVideoFrame(
        canvas,
        libSettings,
        libQualitySettings,
        previousFrameRef.current || undefined
      );

      setDetectedRegions(regions);
      previousFrameRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);

      processedCanvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setProcessedVideoUrl(url);
          setShowComparison(true);
          setProcessingMessage("Your moments deserve the best light ✨");
          setShowSparkles(true);
          
          // Play a success animation
          setTimeout(() => {
            setShowSparkles(false);
            setProcessingMessage("");
          }, 2000);
        }
      }, 'image/jpeg', 0.95);

    } catch (error) {
      console.error('Processing error:', error);
      setProcessingMessage("Oops! Let's try again 💫");
      setTimeout(() => setProcessingMessage(""), 2000);
    } finally {
      setIsProcessing(false);
    }
  }, [aiSettings, qualitySettings]);

  useEffect(() => {
    if (showComparison && aiSettings.enableAI) {
      const debounceTimer = setTimeout(() => {
        processCurrentFrame();
      }, 500);
      return () => clearTimeout(debounceTimer);
    }
  }, [aiSettings, showComparison, processCurrentFrame]);

  return (
    <div className="space-y-6">
      {/* Canvas elements (hidden) */}
      <canvas ref={canvasRef} className="hidden" />
      <canvas ref={processedCanvasRef} className="hidden" />

      {/* Comparison View */}
      {showComparison ? (
        <Card className="bg-gradient-card border border-primary/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0 border-b border-border/50">
              {/* Original */}
              <div className="relative bg-black border-r border-border/50">
                <div className="absolute top-2 left-2 z-10 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                  Original
                </div>
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="w-full h-auto max-h-96 object-contain"
                  onClick={togglePlay}
                />
              </div>

              {/* Enhanced */}
              <div className="relative bg-black">
                <div className="absolute top-2 left-2 z-10 bg-gradient-primary px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  Enhanced {aiSettings.resolution}
                </div>
                {processedVideoUrl && (
                  <img
                    src={processedVideoUrl}
                    alt="Enhanced preview"
                    className="w-full h-auto max-h-96 object-contain"
                  />
                )}
                
                {/* Detected Regions Overlay */}
                {detectedRegions.length > 0 && (
                  <div className="absolute bottom-2 left-2 right-2 bg-background/90 backdrop-blur-sm p-2 rounded-lg text-xs space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {detectedRegions.filter(r => r.type === 'face').length > 0 && (
                        <span className="flex items-center gap-1 bg-primary/20 px-2 py-1 rounded">
                          🎯 {detectedRegions.filter(r => r.type === 'face').length} Face(s)
                        </span>
                      )}
                      {detectedRegions.filter(r => r.type === 'text').length > 0 && (
                        <span className="flex items-center gap-1 bg-accent/20 px-2 py-1 rounded">
                          📝 {detectedRegions.filter(r => r.type === 'text').length} Text Region(s)
                        </span>
                      )}
                      {detectedRegions.filter(r => r.type === 'motion').length > 0 && (
                        <span className="flex items-center gap-1 bg-secondary/20 px-2 py-1 rounded">
                          🏃 {detectedRegions.filter(r => r.type === 'motion').length} Motion
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Video Controls */}
            <div className="bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="mb-3">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={1}
                  onValueChange={handleSeek}
                  className="w-full"
                />
              </div>
              
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
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowComparison(false)}
                    className="text-white hover:bg-white/20"
                  >
                    Exit Comparison
                  </Button>
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
      ) : (
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
      )}

      {/* AI Enhancement Panel with Loveable UX */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 relative overflow-hidden">
        {showSparkles && (
          <div className="absolute inset-0 pointer-events-none">
            <Sparkles className="absolute top-4 right-4 w-6 h-6 text-primary animate-pulse" />
            <Sparkles className="absolute bottom-4 left-4 w-4 h-4 text-accent animate-bounce" />
            <Sparkles className="absolute top-1/2 left-1/2 w-5 h-5 text-primary/50 animate-ping" />
          </div>
        )}
        
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center animate-red-pulse">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display flex items-center gap-2">
                  AI Video Enhancement
                  {processingMessage && <span className="text-sm font-normal text-primary animate-pulse">✨</span>}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {processingMessage || "Professional AI-powered video enhancement"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Enable AI</span>
              <input
                type="checkbox"
                checked={aiSettings.enableAI}
                onChange={(e) => handleAIChange('enableAI', e.target.checked)}
                className="w-5 h-5 text-primary bg-background border-2 border-primary rounded focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          {aiSettings.enableAI && (
            <div className="space-y-8">
              {/* Resolution Selection - Featured */}
              <div className="bg-gradient-card p-6 rounded-xl border border-primary/10">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  🎬 AI Super Resolution
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {resolutionOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAIChange('resolution', option.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        aiSettings.resolution === option.value
                          ? 'border-primary bg-primary/10 shadow-glow'
                          : 'border-border/50 hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <div className="text-sm font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Super Resolution Strength</label>
                    <span className="text-sm text-primary font-semibold">{aiSettings.superResolution}%</span>
                  </div>
                  <Slider
                    value={[aiSettings.superResolution]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => handleAIChange('superResolution', value[0])}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">✨ Sharper edges, more defined details, cinema-quality upscaling</p>
                </div>
              </div>

              {/* Color Enhancement */}
              <div className="bg-gradient-card p-6 rounded-xl border border-primary/10">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  🌈 Vivid Color Boost
                </h4>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {colorModes.map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => handleAIChange('colorMode', mode.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        aiSettings.colorMode === mode.value
                          ? 'border-accent bg-accent/10'
                          : 'border-border/50 hover:border-accent/50'
                      }`}
                    >
                      <div className="text-sm font-medium">{mode.label}</div>
                      <div className="text-xs text-muted-foreground">{mode.desc}</div>
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Color Intensity</label>
                    <span className="text-sm text-accent font-semibold">{aiSettings.colorBoost}%</span>
                  </div>
                  <Slider
                    value={[aiSettings.colorBoost]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => handleAIChange('colorBoost', value[0])}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">🎨 Natural skin tones, richer colors, cinematic look</p>
                </div>
              </div>

              {/* Clarity & Smoothness */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Smart Denoise */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">🌤 Smart Denoise AI</label>
                    <span className="text-sm text-muted-foreground">{aiSettings.denoise}%</span>
                  </div>
                  <Slider
                    value={[aiSettings.denoise]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => handleAIChange('denoise', value[0])}
                  />
                  <p className="text-xs text-muted-foreground">Removes grain & pixel noise</p>
                </div>

                {/* Face Restore */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">💎 AI Face Restore</label>
                    <span className="text-sm text-muted-foreground">{aiSettings.faceRestore}%</span>
                  </div>
                  <Slider
                    value={[aiSettings.faceRestore]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => handleAIChange('faceRestore', value[0])}
                  />
                  <p className="text-xs text-muted-foreground">Natural face clarity</p>
                </div>

                {/* Detail Boost */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">✨ Detail Boost</label>
                    <span className="text-sm text-muted-foreground">{aiSettings.detailBoost}%</span>
                  </div>
                  <Slider
                    value={[aiSettings.detailBoost]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => handleAIChange('detailBoost', value[0])}
                  />
                  <p className="text-xs text-muted-foreground">Enhance fine textures</p>
                </div>

                {/* Dehaze */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">🌫️ AI Light Balance</label>
                    <span className="text-sm text-muted-foreground">{aiSettings.dehaze}%</span>
                  </div>
                  <Slider
                    value={[aiSettings.dehaze]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => handleAIChange('dehaze', value[0])}
                  />
                  <p className="text-xs text-muted-foreground">Fix haze & lighting</p>
                </div>
              </div>

              {/* Advanced Features */}
              <div className="border-t border-border/50 pt-6 space-y-6">
                <h4 className="font-semibold">Advanced Features</h4>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Motion Smoothing */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">🔁 Fluid Motion+</label>
                      <span className="text-sm text-muted-foreground">{aiSettings.motionSmoothing}%</span>
                    </div>
                    <Slider
                      value={[aiSettings.motionSmoothing]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) => handleAIChange('motionSmoothing', value[0])}
                    />
                    <p className="text-xs text-muted-foreground">Frame interpolation for smooth playback</p>
                  </div>

                  {/* Stabilization */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">💖 Steady Vision AI</label>
                      <span className="text-sm text-muted-foreground">{aiSettings.stabilization}%</span>
                    </div>
                    <Slider
                      value={[aiSettings.stabilization]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) => handleAIChange('stabilization', value[0])}
                    />
                    <p className="text-xs text-muted-foreground">Reduce camera shake</p>
                  </div>
                </div>

                {/* Audio Enhancement */}
                <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                  <div>
                    <label className="text-sm font-medium flex items-center gap-2">
                      💬 Crystal Clear Audio AI
                    </label>
                    <p className="text-xs text-muted-foreground">Remove background noise & enhance voice clarity</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={aiSettings.audioEnhance}
                    onChange={(e) => handleAIChange('audioEnhance', e.target.checked)}
                    className="w-5 h-5 text-primary bg-background border-2 border-primary rounded focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* AI Processing Button */}
              <div className="border-t border-border/50 pt-6">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-primary text-white font-semibold shadow-glow hover:shadow-card-hover transition-all"
                  onClick={processCurrentFrame}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {processingMessage}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      I've polished your video for perfection!
                    </span>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  ✨ Your moments deserve the best light
                </p>
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
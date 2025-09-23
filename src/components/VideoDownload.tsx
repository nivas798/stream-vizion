import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, Settings, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QualitySettings {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
}

interface VideoDownloadProps {
  fileName: string;
  qualitySettings: QualitySettings;
  videoUrl: string;
}

interface PerceptionAwareOptions {
  enablePerceptionAware: boolean;
  targetResolution: string;
  compressionMode: string;
  faceEnhancement: boolean;
  motionPreservation: boolean;
  textSharpening: boolean;
  backgroundCompression: number;
  qualityBalance: number;
}

interface RenderJob {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  quality: string;
  format: string;
  progress?: number;
}

const VideoDownload = ({ fileName, qualitySettings, videoUrl }: VideoDownloadProps) => {
  const [selectedQuality, setSelectedQuality] = useState("1080p");
  const [selectedFormat, setSelectedFormat] = useState("mp4");
  const [renderJobs, setRenderJobs] = useState<RenderJob[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [perceptionAware, setPerceptionAware] = useState<PerceptionAwareOptions>({
    enablePerceptionAware: true,
    targetResolution: "4K",
    compressionMode: "intelligent",
    faceEnhancement: true,
    motionPreservation: true,
    textSharpening: true,
    backgroundCompression: 70,
    qualityBalance: 85
  });

  const { toast } = useToast();

  const qualityOptions = [
    { value: "4k", label: "4K (3840x2160)", bitrate: "20 Mbps" },
    { value: "1080p", label: "1080p (1920x1080)", bitrate: "8 Mbps" },
    { value: "720p", label: "720p (1280x720)", bitrate: "5 Mbps" },
    { value: "480p", label: "480p (854x480)", bitrate: "2.5 Mbps" },
    { value: "360p", label: "360p (640x360)", bitrate: "1 Mbps" }
  ];

  const formatOptions = [
    { value: "mp4", label: "MP4", description: "Most compatible" },
    { value: "webm", label: "WebM", description: "Web optimized" },
    { value: "mov", label: "MOV", description: "High quality" },
    { value: "avi", label: "AVI", description: "Legacy support" }
  ];

  const compressionModes = [
    { value: "intelligent", label: "Intelligent Compression", description: "AI-powered selective quality" },
    { value: "uniform", label: "Uniform Quality", description: "Consistent quality throughout" },
    { value: "adaptive", label: "Adaptive Bitrate", description: "Dynamic quality adjustment" }
  ];

  const processVideo = async () => {
    setIsProcessing(true);
    
    // Create new render job
    const newJob: RenderJob = {
      id: Math.random().toString(36).substr(2, 9),
      status: 'processing',
      quality: selectedQuality,
      format: selectedFormat,
      progress: 0
    };
    
    setRenderJobs(prev => [newJob, ...prev]);

    // Simulate processing with progress updates
    const updateProgress = async () => {
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setRenderJobs(prev => 
          prev.map(job => 
            job.id === newJob.id 
              ? { ...job, progress }
              : job
          )
        );
      }
      
      // Mark as completed
      setRenderJobs(prev => 
        prev.map(job => 
          job.id === newJob.id 
            ? { ...job, status: 'completed', progress: 100 }
            : job
        )
      );
      
      toast({
        title: "Video processed successfully!",
        description: `Your ${selectedQuality} ${selectedFormat.toUpperCase()} video is ready for download.`,
      });
    };

    await updateProgress();
    setIsProcessing(false);
  };

  const downloadVideo = (job: RenderJob) => {
    // In a real implementation, this would download the processed video
    // For now, we'll simulate download of the original video
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `${fileName.split('.')[0]}_${job.quality}.${job.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download started",
      description: `Downloading ${job.quality} ${job.format.toUpperCase()} video...`,
    });
  };

  const getQualityInfo = (quality: string) => {
    return qualityOptions.find(opt => opt.value === quality);
  };

  const getFormatInfo = (format: string) => {
    return formatOptions.find(opt => opt.value === format);
  };

  return (
    <div className="space-y-6">
      {/* Export Settings */}
      {/* Perception-Aware Compression Settings */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">4K</span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-display">Perception-Aware 4K/8K Compression</h3>
                <p className="text-sm text-muted-foreground">Intelligent compression for optimal quality and file size</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Enable</span>
              <input
                type="checkbox"
                checked={perceptionAware.enablePerceptionAware}
                onChange={(e) => setPerceptionAware(prev => ({ ...prev, enablePerceptionAware: e.target.checked }))}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
              />
            </div>
          </div>

          {perceptionAware.enablePerceptionAware && (
            <div className="space-y-6">
              {/* Target Resolution and Compression Mode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="font-medium">Target Resolution</label>
                  <select
                    value={perceptionAware.targetResolution}
                    onChange={(e) => setPerceptionAware(prev => ({ ...prev, targetResolution: e.target.value }))}
                    className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md"
                  >
                    <option value="8K">8K Ultra HD (7680x4320)</option>
                    <option value="4K">4K Ultra HD (3840x2160)</option>
                    <option value="2K">2K QHD (2560x1440)</option>
                    <option value="1080p">1080p Full HD (1920x1080)</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="font-medium">Compression Mode</label>
                  <select
                    value={perceptionAware.compressionMode}
                    onChange={(e) => setPerceptionAware(prev => ({ ...prev, compressionMode: e.target.value }))}
                    className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md"
                  >
                    {compressionModes.map((mode) => (
                      <option key={mode.value} value={mode.value}>
                        {mode.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Enhancement Options */}
              <div className="space-y-4">
                <h4 className="font-medium">Selective Enhancement</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-secondary/20 rounded-lg">
                    <input
                      type="checkbox"
                      checked={perceptionAware.faceEnhancement}
                      onChange={(e) => setPerceptionAware(prev => ({ ...prev, faceEnhancement: e.target.checked }))}
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                    />
                    <div>
                      <div className="font-medium text-sm">Face Enhancement</div>
                      <div className="text-xs text-muted-foreground">High quality for faces</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-secondary/20 rounded-lg">
                    <input
                      type="checkbox"
                      checked={perceptionAware.motionPreservation}
                      onChange={(e) => setPerceptionAware(prev => ({ ...prev, motionPreservation: e.target.checked }))}
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                    />
                    <div>
                      <div className="font-medium text-sm">Motion Preservation</div>
                      <div className="text-xs text-muted-foreground">Sharp moving objects</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-secondary/20 rounded-lg">
                    <input
                      type="checkbox"
                      checked={perceptionAware.textSharpening}
                      onChange={(e) => setPerceptionAware(prev => ({ ...prev, textSharpening: e.target.checked }))}
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                    />
                    <div>
                      <div className="font-medium text-sm">Text Sharpening</div>
                      <div className="text-xs text-muted-foreground">Crystal clear text</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compression Balance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="font-medium text-sm">Background Compression</label>
                    <span className="text-sm text-muted-foreground">{perceptionAware.backgroundCompression}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="90"
                    value={perceptionAware.backgroundCompression}
                    onChange={(e) => setPerceptionAware(prev => ({ ...prev, backgroundCompression: Number(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">Higher values = more compression for static backgrounds</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="font-medium text-sm">Quality Balance</label>
                    <span className="text-sm text-muted-foreground">{perceptionAware.qualityBalance}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={perceptionAware.qualityBalance}
                    onChange={(e) => setPerceptionAware(prev => ({ ...prev, qualityBalance: Number(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">Balance between quality and file size</p>
                </div>
              </div>

              {/* Processing Preview */}
              <div className="bg-secondary/10 rounded-lg p-4">
                <h4 className="font-medium mb-3">Processing Preview</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-background/50 rounded-lg">
                    <div className="text-lg font-bold text-green-500 mb-1">✓</div>
                    <div className="text-xs font-medium">Face Detection</div>
                    <div className="text-xs text-muted-foreground">Ready</div>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg">
                    <div className="text-lg font-bold text-blue-500 mb-1">🎯</div>
                    <div className="text-xs font-medium">Motion Analysis</div>
                    <div className="text-xs text-muted-foreground">Active</div>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg">
                    <div className="text-lg font-bold text-purple-500 mb-1">📝</div>
                    <div className="text-xs font-medium">Text Recognition</div>
                    <div className="text-xs text-muted-foreground">Enabled</div>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg">
                    <div className="text-lg font-bold text-orange-500 mb-1">🎨</div>
                    <div className="text-xs font-medium">Background Opt.</div>
                    <div className="text-xs text-muted-foreground">{perceptionAware.backgroundCompression}%</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border border-border/50">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Export Settings
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Quality Selection */}
            <div className="space-y-3">
              <label className="font-medium">Output Quality</label>
              <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {qualityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex flex-col">
                        <span>{option.label}</span>
                        <span className="text-xs text-muted-foreground">{option.bitrate}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Format Selection */}
            <div className="space-y-3">
              <label className="font-medium">Output Format</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {formatOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex flex-col">
                        <span>{option.label}</span>
                        <span className="text-xs text-muted-foreground">{option.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Applied Quality Settings Preview */}
          <div className="bg-secondary/30 rounded-lg p-4 mb-6">
            <h4 className="font-medium mb-3">Applied Enhancements</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Brightness:</span>
                <span className="ml-2 font-medium">{qualitySettings.brightness}%</span>
              </div>
              <div>
                <span className="text-muted-foreground">Contrast:</span>
                <span className="ml-2 font-medium">{qualitySettings.contrast}%</span>
              </div>
              <div>
                <span className="text-muted-foreground">Saturation:</span>
                <span className="ml-2 font-medium">{qualitySettings.saturation}%</span>
              </div>
              <div>
                <span className="text-muted-foreground">Hue:</span>
                <span className="ml-2 font-medium">{qualitySettings.hue}°</span>
              </div>
            </div>
          </div>

          {/* Process Button */}
          <Button
            onClick={processVideo}
            disabled={isProcessing}
            className="w-full bg-gradient-hero hover:shadow-glow transition-all duration-300 text-lg py-6"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing with AI Enhancement...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                {perceptionAware.enablePerceptionAware ? 
                  `Process with AI ${perceptionAware.targetResolution} Enhancement` : 
                  "Process & Prepare Download"
                }
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Render Jobs */}
      {renderJobs.length > 0 && (
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <h4 className="font-bold font-display mb-4">Processed Videos</h4>
            
            <div className="space-y-4">
              {renderJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {job.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <Clock className="w-6 h-6 text-yellow-500" />
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">
                          {fileName.split('.')[0]}_{job.quality}.{job.format}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {getQualityInfo(job.quality)?.label}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getFormatInfo(job.format)?.label}
                        </Badge>
                      </div>
                      
                      {job.status === 'processing' && job.progress !== undefined && (
                        <div className="text-sm text-muted-foreground">
                          Processing... {job.progress}%
                        </div>
                      )}
                      
                      {job.status === 'completed' && (
                        <div className="text-sm text-green-600">
                          Ready for download
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {job.status === 'completed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadVideo(job)}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideoDownload;
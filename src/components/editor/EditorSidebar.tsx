import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  MousePointer2, 
  Scissors, 
  Move, 
  Type, 
  Image, 
  Volume2,
  Sparkles,
  Filter,
  Layers,
  Zap,
  Upload,
  Library,
  Sliders,
  Video,
  Timer,
  Gauge,
  Eye,
  Wind,
  Wand2,
  Focus,
  Sun,
  Palette,
  AudioLines,
  Settings2,
  Clapperboard,
  Maximize,
  Minimize,
  RotateCcw,
  Vibrate,
  Waves,
  FileVideo,
  Film,
  PlayCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorSidebarProps {
  selectedTool: string;
  onToolSelect: (tool: string) => void;
}

const tools = [
  { id: "select", label: "Select", icon: MousePointer2 },
  { id: "cut", label: "Cut", icon: Scissors },
  { id: "move", label: "Move", icon: Move },
  { id: "text", label: "Text", icon: Type },
  { id: "image", label: "Media", icon: Image },
  { id: "audio", label: "Audio", icon: Volume2 },
];

const videoTools = [
  { id: "color-grade", label: "Color Grade", icon: Sliders },
  { id: "video-effects", label: "Video FX", icon: Video },
  { id: "speed", label: "Speed", icon: Timer },
  { id: "stabilize", label: "Stabilize", icon: Vibrate },
];

const effects = [
  { id: "filters", label: "Filters", icon: Filter },
  { id: "transitions", label: "Transitions", icon: Layers },
  { id: "luts", label: "LUTs", icon: Palette },
  { id: "overlays", label: "Overlays", icon: Film },
  { id: "motion", label: "Motion", icon: PlayCircle },
  { id: "ai", label: "AI Enhance", icon: Sparkles, isPro: true },
];

const professionalEffects = [
  { id: "chromakey", label: "Chroma Key", icon: Eye, description: "Green screen removal" },
  { id: "masking", label: "Masking", icon: Focus, description: "Selective editing" },
  { id: "tracking", label: "Motion Track", icon: Move, description: "Track objects" },
  { id: "keyframes", label: "Keyframes", icon: Settings2, description: "Animation control" },
  { id: "multicam", label: "Multi-cam", icon: Clapperboard, description: "Sync cameras" },
  { id: "compositing", label: "Compositing", icon: Layers, description: "Layer blending" },
];

const aiFeatures = [
  { id: "upscale", label: "AI Upscale", description: "720p → 8K", icon: Maximize },
  { id: "deblur", label: "AI Deblur", description: "Fix blurry videos", icon: Eye },
  { id: "denoise", label: "AI Denoise", description: "Remove grain/noise", icon: Wind },
  { id: "color", label: "Auto Color", description: "Perfect colors", icon: Palette },
  { id: "restore", label: "AI Restore", description: "Restore old videos", icon: Sparkles },
  { id: "enhance", label: "Smart Enhance", description: "Auto improvements", icon: Wand2 },
  { id: "slowmo", label: "AI Slow Motion", description: "Generate frames", icon: Timer },
  { id: "portrait", label: "Portrait Mode", description: "Blur background", icon: Focus },
  { id: "relight", label: "AI Relight", description: "Perfect lighting", icon: Sun },
  { id: "audio-enhance", label: "Audio AI", description: "Clean audio", icon: AudioLines },
];

export const EditorSidebar = ({ selectedTool, onToolSelect }: EditorSidebarProps) => {
  return (
    <div className="w-64 border-r border-border bg-card/30 backdrop-blur flex flex-col">
      {/* Tools Section */}
      <div className="p-4">
        <h3 className="font-medium text-sm text-muted-foreground mb-3">TOOLS</h3>
        <div className="grid grid-cols-2 gap-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Button
                key={tool.id}
                variant={selectedTool === tool.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onToolSelect(tool.id)}
                className={cn(
                  "h-10 flex-col gap-1 text-xs",
                  selectedTool === tool.id && "bg-primary text-primary-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {tool.label}
              </Button>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Media Upload */}
      <div className="p-4">
        <h3 className="font-medium text-sm text-muted-foreground mb-3">MEDIA</h3>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Video
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start gap-2"
          >
            <Library className="w-4 h-4" />
            Media Library
          </Button>
        </div>
      </div>

      <Separator />

      {/* Video Tools Section */}
      <div className="p-4">
        <h3 className="font-medium text-sm text-muted-foreground mb-3">VIDEO TOOLS</h3>
        <div className="grid grid-cols-2 gap-2">
          {videoTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Button
                key={tool.id}
                variant={selectedTool === tool.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onToolSelect(tool.id)}
                className={cn(
                  "h-10 flex-col gap-1 text-xs",
                  selectedTool === tool.id && "bg-primary text-primary-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {tool.label}
              </Button>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Effects Section */}
      <div className="p-4">
        <h3 className="font-medium text-sm text-muted-foreground mb-3">EFFECTS</h3>
        <div className="space-y-2">
          {effects.map((effect) => {
            const Icon = effect.icon;
            return (
              <Button
                key={effect.id}
                variant={selectedTool === effect.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onToolSelect(effect.id)}
                className="w-full justify-start gap-2"
              >
                <Icon className="w-4 h-4" />
                {effect.label}
                {effect.isPro && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    PRO
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Professional Tools */}
      <div className="p-4">
        <h3 className="font-medium text-sm text-muted-foreground mb-3">PRO TOOLS</h3>
        <div className="space-y-2">
          {professionalEffects.map((effect) => {
            const Icon = effect.icon;
            return (
              <div
                key={effect.id}
                className="p-2 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 cursor-pointer transition-colors group"
                onClick={() => onToolSelect(effect.id)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-3 h-3 text-primary" />
                  <h4 className="font-medium text-xs group-hover:text-primary transition-colors">
                    {effect.label}
                  </h4>
                  <Badge variant="outline" className="ml-auto text-xs">PRO</Badge>
                </div>
                <p className="text-xs text-muted-foreground pl-5">
                  {effect.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* AI Features */}
      <div className="p-4 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-primary" />
          <h3 className="font-medium text-sm text-muted-foreground">AI ENHANCE</h3>
        </div>
        <div className="space-y-2">
          {aiFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="p-2 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted/70 cursor-pointer transition-colors group"
                onClick={() => onToolSelect(feature.id)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-3 h-3 text-primary" />
                  <h4 className="font-medium text-xs group-hover:text-primary transition-colors">
                    {feature.label}
                  </h4>
                  <Sparkles className="w-2 h-2 text-primary opacity-60 group-hover:opacity-100 transition-opacity ml-auto" />
                </div>
                <p className="text-xs text-muted-foreground pl-5">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upgrade Banner */}
      <div className="p-4 border-t border-border">
        <div className="p-3 rounded-lg bg-gradient-hero text-white text-center">
          <Sparkles className="w-5 h-5 mx-auto mb-2" />
          <h4 className="font-medium text-sm mb-1">Unlock AI Features</h4>
          <p className="text-xs opacity-90 mb-3">
            Get unlimited AI processing and 4K exports
          </p>
          <Button size="sm" variant="secondary" className="w-full">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
};
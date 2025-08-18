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
  Library
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

const effects = [
  { id: "filters", label: "Filters", icon: Filter },
  { id: "transitions", label: "Transitions", icon: Layers },
  { id: "ai", label: "AI Enhance", icon: Sparkles, isPro: true },
];

const aiFeatures = [
  { id: "upscale", label: "AI Upscale", description: "720p → 4K" },
  { id: "deblur", label: "AI Deblur", description: "Fix blurry videos" },
  { id: "denoise", label: "AI Denoise", description: "Remove grain/noise" },
  { id: "color", label: "Auto Color", description: "Perfect colors" },
  { id: "restore", label: "Restoration", description: "Restore old videos" },
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

      {/* AI Features */}
      <div className="p-4 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-primary" />
          <h3 className="font-medium text-sm text-muted-foreground">AI ENHANCE</h3>
        </div>
        <div className="space-y-3">
          {aiFeatures.map((feature) => (
            <div
              key={feature.id}
              className="p-3 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted/70 cursor-pointer transition-colors group"
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                  {feature.label}
                </h4>
                <Sparkles className="w-3 h-3 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
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
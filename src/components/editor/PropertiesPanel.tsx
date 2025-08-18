import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Palette, 
  Type, 
  Move, 
  Sparkles,
  RotateCw,
  FlipHorizontal,
  Crop,
  Filter,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertiesPanelProps {
  selectedTool: string;
}

export const PropertiesPanel = ({ selectedTool }: PropertiesPanelProps) => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [hue, setHue] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(100);

  const renderBasicControls = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Basic Properties
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Position */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Position</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="x" className="text-xs">X</Label>
              <Input
                id="x"
                type="number"
                value={position.x}
                onChange={(e) => setPosition({ ...position, x: Number(e.target.value) })}
                className="h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="y" className="text-xs">Y</Label>
              <Input
                id="y"
                type="number"
                value={position.y}
                onChange={(e) => setPosition({ ...position, y: Number(e.target.value) })}
                className="h-7 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Scale */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Scale</Label>
            <span className="text-xs text-muted-foreground">{scale}%</span>
          </div>
          <Slider
            value={[scale]}
            onValueChange={(value) => setScale(value[0])}
            min={10}
            max={200}
            step={1}
            className="w-full"
          />
        </div>

        {/* Rotation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Rotation</Label>
            <span className="text-xs text-muted-foreground">{rotation}°</span>
          </div>
          <Slider
            value={[rotation]}
            onValueChange={(value) => setRotation(value[0])}
            min={-180}
            max={180}
            step={1}
            className="w-full"
          />
        </div>

        {/* Transform Controls */}
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <RotateCw className="w-3 h-3 mr-1" />
            90°
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <FlipHorizontal className="w-3 h-3 mr-1" />
            Flip H
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Crop className="w-3 h-3 mr-1" />
            Crop
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderColorControls = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Color & Effects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Brightness */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Brightness</Label>
            <span className="text-xs text-muted-foreground">{brightness}%</span>
          </div>
          <Slider
            value={[brightness]}
            onValueChange={(value) => setBrightness(value[0])}
            min={0}
            max={200}
            step={1}
            className="w-full"
          />
        </div>

        {/* Contrast */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Contrast</Label>
            <span className="text-xs text-muted-foreground">{contrast}%</span>
          </div>
          <Slider
            value={[contrast]}
            onValueChange={(value) => setContrast(value[0])}
            min={0}
            max={200}
            step={1}
            className="w-full"
          />
        </div>

        {/* Saturation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Saturation</Label>
            <span className="text-xs text-muted-foreground">{saturation}%</span>
          </div>
          <Slider
            value={[saturation]}
            onValueChange={(value) => setSaturation(value[0])}
            min={0}
            max={200}
            step={1}
            className="w-full"
          />
        </div>

        {/* Hue */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Hue</Label>
            <span className="text-xs text-muted-foreground">{hue}°</span>
          </div>
          <Slider
            value={[hue]}
            onValueChange={(value) => setHue(value[0])}
            min={-180}
            max={180}
            step={1}
            className="w-full"
          />
        </div>

        {/* Preset Filters */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Quick Filters</Label>
          <div className="grid grid-cols-2 gap-2">
            {['Vintage', 'B&W', 'Warm', 'Cool', 'Vibrant', 'Fade'].map((filter) => (
              <Button key={filter} size="sm" variant="outline" className="text-xs">
                <Filter className="w-3 h-3 mr-1" />
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAIEnhancement = () => (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          AI Enhancement
          <Badge variant="secondary" className="ml-auto text-xs">PRO</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {[
            { id: 'upscale', label: 'AI Upscale', desc: '720p → 4K' },
            { id: 'deblur', label: 'AI Deblur', desc: 'Fix blurry footage' },
            { id: 'denoise', label: 'AI Denoise', desc: 'Remove grain/noise' },
            { id: 'color', label: 'Auto Color', desc: 'Perfect colors' },
            { id: 'stabilize', label: 'Stabilization', desc: 'Fix shaky video' }
          ].map((enhancement) => (
            <div key={enhancement.id} className="p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                  {enhancement.label}
                </h4>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Zap className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">{enhancement.desc}</p>
            </div>
          ))}
        </div>

        <Separator />

        <Button className="w-full" size="sm">
          <Sparkles className="w-3 h-3 mr-2" />
          Apply AI Enhancements
        </Button>
      </CardContent>
    </Card>
  );

  const renderTextControls = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Type className="w-4 h-4" />
          Text Properties
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text-content" className="text-xs text-muted-foreground">Content</Label>
          <Input
            id="text-content"
            placeholder="Enter your text..."
            className="h-7 text-xs"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label htmlFor="font-size" className="text-xs">Size</Label>
            <Input
              id="font-size"
              type="number"
              defaultValue="24"
              className="h-7 text-xs"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="font-weight" className="text-xs">Weight</Label>
            <select className="w-full h-7 text-xs bg-background border border-input rounded-md px-2">
              <option value="400">Normal</option>
              <option value="600">Semibold</option>
              <option value="700">Bold</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Text Color</Label>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded border-2 border-white bg-white cursor-pointer" />
            <div className="w-8 h-8 rounded border-2 border-transparent bg-black cursor-pointer" />
            <div className="w-8 h-8 rounded border-2 border-transparent bg-red-500 cursor-pointer" />
            <div className="w-8 h-8 rounded border-2 border-transparent bg-blue-500 cursor-pointer" />
            <div className="w-8 h-8 rounded border-2 border-transparent bg-green-500 cursor-pointer" />
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 text-xs">
            Bold
          </Button>
          <Button size="sm" variant="outline" className="flex-1 text-xs">
            Italic
          </Button>
          <Button size="sm" variant="outline" className="flex-1 text-xs">
            Shadow
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-80 border-l border-border bg-card/30 backdrop-blur flex flex-col">
      <div className="h-12 border-b border-border bg-muted/30 flex items-center px-4">
        <h3 className="font-medium text-sm">Properties</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {selectedTool === 'select' && (
          <div className="text-center py-8">
            <Move className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Select an element to edit its properties
            </p>
          </div>
        )}

        {(selectedTool === 'cut' || selectedTool === 'move') && renderBasicControls()}
        
        {selectedTool === 'text' && renderTextControls()}
        
        {(selectedTool === 'image' || selectedTool === 'cut' || selectedTool === 'move') && renderColorControls()}
        
        {selectedTool === 'ai' && renderAIEnhancement()}

        {/* Always show color controls for video/image tools */}
        {(selectedTool === 'image' || selectedTool === 'filters') && (
          <>
            {renderColorControls()}
            {renderAIEnhancement()}
          </>
        )}
      </div>
    </div>
  );
};
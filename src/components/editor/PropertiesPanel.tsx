import { useState, useCallback } from "react";
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
  Zap,
  Volume2,
  Timer,
  Gauge,
  Eye,
  Sun,
  Contrast,
  Droplets,
  Wind,
  Focus,
  Vibrate,
  Wand2,
  Sliders,
  Video,
  AudioLines,
  Waves,
  Maximize,
  Minimize
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertiesPanelProps {
  selectedTool: string;
}

export const PropertiesPanel = ({ selectedTool }: PropertiesPanelProps) => {
  // Basic Properties
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [hue, setHue] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(100);

  // Advanced Color Grading
  const [shadows, setShadows] = useState(0);
  const [highlights, setHighlights] = useState(0);
  const [blacks, setBlacks] = useState(0);
  const [whites, setWhites] = useState(0);
  const [exposure, setExposure] = useState(0);
  const [gamma, setGamma] = useState(100);
  const [vibrance, setVibrance] = useState(0);
  const [clarity, setClarity] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [tint, setTint] = useState(0);
  
  // Video Effects
  const [sharpness, setSharpness] = useState(100);
  const [blur, setBlur] = useState(0);
  const [noise, setNoise] = useState(0);
  const [vignette, setVignette] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [opacity, setOpacity] = useState(100);
  
  // Audio Properties
  const [volume, setVolume] = useState(100);
  const [bass, setBass] = useState(0);
  const [treble, setTreble] = useState(0);
  const [pitch, setPitch] = useState(0);
  
  // Perception-Aware Settings
  const [perceptionAware, setPerceptionAware] = useState({
    enabled: true,
    faceDetection: true,
    motionTracking: true,
    textRecognition: true,
    backgroundCompression: 75,
    qualityPreservation: 90,
    adaptiveBitrate: true,
    realTimeProcessing: false
  });
  const [audioDelay, setAudioDelay] = useState(0);

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
            {['Vintage', 'B&W', 'Warm', 'Cool', 'Vibrant', 'Fade', 'Sepia', 'Retro', 'Neon', 'Film', 'HDR', 'Soft'].map((filter) => (
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

  const renderAdvancedColorGrading = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Sliders className="w-4 h-4" />
          Advanced Color Grading
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Exposure & Gamma */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Exposure</Label>
              <span className="text-xs text-muted-foreground">{exposure > 0 ? '+' : ''}{exposure}</span>
            </div>
            <Slider
              value={[exposure]}
              onValueChange={(value) => setExposure(value[0])}
              min={-100}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Gamma</Label>
              <span className="text-xs text-muted-foreground">{gamma}%</span>
            </div>
            <Slider
              value={[gamma]}
              onValueChange={(value) => setGamma(value[0])}
              min={50}
              max={200}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Shadows & Highlights */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Shadows</Label>
              <span className="text-xs text-muted-foreground">{shadows > 0 ? '+' : ''}{shadows}</span>
            </div>
            <Slider
              value={[shadows]}
              onValueChange={(value) => setShadows(value[0])}
              min={-100}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Highlights</Label>
              <span className="text-xs text-muted-foreground">{highlights > 0 ? '+' : ''}{highlights}</span>
            </div>
            <Slider
              value={[highlights]}
              onValueChange={(value) => setHighlights(value[0])}
              min={-100}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Blacks & Whites */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Blacks</Label>
              <span className="text-xs text-muted-foreground">{blacks > 0 ? '+' : ''}{blacks}</span>
            </div>
            <Slider
              value={[blacks]}
              onValueChange={(value) => setBlacks(value[0])}
              min={-100}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Whites</Label>
              <span className="text-xs text-muted-foreground">{whites > 0 ? '+' : ''}{whites}</span>
            </div>
            <Slider
              value={[whites]}
              onValueChange={(value) => setWhites(value[0])}
              min={-100}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Temperature & Tint */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Temperature</Label>
              <span className="text-xs text-muted-foreground">{temperature > 0 ? '+' : ''}{temperature}</span>
            </div>
            <Slider
              value={[temperature]}
              onValueChange={(value) => setTemperature(value[0])}
              min={-100}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Tint</Label>
              <span className="text-xs text-muted-foreground">{tint > 0 ? '+' : ''}{tint}</span>
            </div>
            <Slider
              value={[tint]}
              onValueChange={(value) => setTint(value[0])}
              min={-100}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Vibrance & Clarity */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Vibrance</Label>
              <span className="text-xs text-muted-foreground">{vibrance > 0 ? '+' : ''}{vibrance}</span>
            </div>
            <Slider
              value={[vibrance]}
              onValueChange={(value) => setVibrance(value[0])}
              min={-100}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Clarity</Label>
              <span className="text-xs text-muted-foreground">{clarity > 0 ? '+' : ''}{clarity}</span>
            </div>
            <Slider
              value={[clarity]}
              onValueChange={(value) => setClarity(value[0])}
              min={-100}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderVideoEffects = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Video className="w-4 h-4" />
          Video Effects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sharpness & Blur */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Sharpness</Label>
              <span className="text-xs text-muted-foreground">{sharpness}%</span>
            </div>
            <Slider
              value={[sharpness]}
              onValueChange={(value) => setSharpness(value[0])}
              min={0}
              max={200}
              step={1}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Blur</Label>
              <span className="text-xs text-muted-foreground">{blur}px</span>
            </div>
            <Slider
              value={[blur]}
              onValueChange={(value) => setBlur(value[0])}
              min={0}
              max={20}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        {/* Speed & Opacity */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Speed</Label>
              <span className="text-xs text-muted-foreground">{speed}%</span>
            </div>
            <Slider
              value={[speed]}
              onValueChange={(value) => setSpeed(value[0])}
              min={25}
              max={400}
              step={5}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Opacity</Label>
              <span className="text-xs text-muted-foreground">{opacity}%</span>
            </div>
            <Slider
              value={[opacity]}
              onValueChange={(value) => setOpacity(value[0])}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Noise & Vignette */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Noise</Label>
              <span className="text-xs text-muted-foreground">{noise}%</span>
            </div>
            <Slider
              value={[noise]}
              onValueChange={(value) => setNoise(value[0])}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Vignette</Label>
              <span className="text-xs text-muted-foreground">{vignette}%</span>
            </div>
            <Slider
              value={[vignette]}
              onValueChange={(value) => setVignette(value[0])}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Quick Effects */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Quick Effects</Label>
          <div className="grid grid-cols-2 gap-2">
            {['Stabilize', 'Zoom', 'Pan', 'Shake', 'Glitch', 'Freeze'].map((effect) => (
              <Button key={effect} size="sm" variant="outline" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                {effect}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAudioEnhancement = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Volume2 className="w-4 h-4" />
          Audio Enhancement
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Volume & Pitch */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Volume</Label>
              <span className="text-xs text-muted-foreground">{volume}%</span>
            </div>
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              min={0}
              max={200}
              step={1}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Pitch</Label>
              <span className="text-xs text-muted-foreground">{pitch > 0 ? '+' : ''}{pitch}</span>
            </div>
            <Slider
              value={[pitch]}
              onValueChange={(value) => setPitch(value[0])}
              min={-12}
              max={12}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        {/* Bass & Treble */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Bass</Label>
              <span className="text-xs text-muted-foreground">{bass > 0 ? '+' : ''}{bass}dB</span>
            </div>
            <Slider
              value={[bass]}
              onValueChange={(value) => setBass(value[0])}
              min={-20}
              max={20}
              step={0.5}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Treble</Label>
              <span className="text-xs text-muted-foreground">{treble > 0 ? '+' : ''}{treble}dB</span>
            </div>
            <Slider
              value={[treble]}
              onValueChange={(value) => setTreble(value[0])}
              min={-20}
              max={20}
              step={0.5}
              className="w-full"
            />
          </div>
        </div>

        {/* Audio Delay */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Audio Delay</Label>
            <span className="text-xs text-muted-foreground">{audioDelay}ms</span>
          </div>
          <Slider
            value={[audioDelay]}
            onValueChange={(value) => setAudioDelay(value[0])}
            min={-1000}
            max={1000}
            step={10}
            className="w-full"
          />
        </div>

        {/* Audio Effects */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Audio Effects</Label>
          <div className="grid grid-cols-2 gap-2">
            {['Normalize', 'Denoise', 'Echo', 'Reverb', 'Compressor', 'Limiter'].map((effect) => (
              <Button key={effect} size="sm" variant="outline" className="text-xs">
                <AudioLines className="w-3 h-3 mr-1" />
                {effect}
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
            { id: 'upscale', label: 'AI Upscale', desc: '720p → 8K', icon: Maximize },
            { id: 'deblur', label: 'AI Deblur', desc: 'Fix blurry footage', icon: Eye },
            { id: 'stabilize', label: 'AI Stabilize', desc: 'Fix shaky video', icon: Vibrate },
            { id: 'denoise', label: 'AI Denoise', desc: 'Remove grain/noise', icon: Wind },
            { id: 'color', label: 'Auto Color', desc: 'Perfect colors', icon: Palette },
            { id: 'restore', label: 'AI Restore', desc: 'Restore old videos', icon: Sparkles },
            { id: 'enhance', label: 'Smart Enhance', desc: 'Auto improvements', icon: Wand2 },
            { id: 'slowmo', label: 'AI Slow Motion', desc: 'Generate frames', icon: Timer },
            { id: 'portrait', label: 'Portrait Mode', desc: 'Blur background', icon: Focus },
            { id: 'relight', label: 'AI Relight', desc: 'Perfect lighting', icon: Sun }
          ].map((enhancement) => {
            const Icon = enhancement.icon;
            return (
              <div key={enhancement.id} className="p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3 h-3 text-primary" />
                    <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                      {enhancement.label}
                    </h4>
                  </div>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Zap className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">{enhancement.desc}</p>
              </div>
            );
          })}
        </div>

        <Separator />

        <Button className="w-full" size="sm">
          <Sparkles className="w-3 h-3 mr-2" />
          Apply AI Enhancements
        </Button>
      </CardContent>
    </Card>
  );

  const renderPerceptionAwareControls = () => (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-primary rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
          Perception-Aware 4K/8K
          <Badge variant="secondary" className="ml-auto text-xs">PRO</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
          <div>
            <h4 className="font-medium text-sm">Enable AI Enhancement</h4>
            <p className="text-xs text-muted-foreground">Intelligent compression for 4K/8K output</p>
          </div>
          <input
            type="checkbox"
            checked={perceptionAware.enabled}
            onChange={(e) => setPerceptionAware(prev => ({ ...prev, enabled: e.target.checked }))}
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
          />
        </div>

        {perceptionAware.enabled && (
          <>
            {/* Detection Features */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Smart Detection</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-secondary/10 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🎯</span>
                    <span className="text-sm">Face Detection</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={perceptionAware.faceDetection}
                    onChange={(e) => setPerceptionAware(prev => ({ ...prev, faceDetection: e.target.checked }))}
                    className="w-3 h-3 text-primary"
                  />
                </div>
                <div className="flex items-center justify-between p-2 bg-secondary/10 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🏃</span>
                    <span className="text-sm">Motion Tracking</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={perceptionAware.motionTracking}
                    onChange={(e) => setPerceptionAware(prev => ({ ...prev, motionTracking: e.target.checked }))}
                    className="w-3 h-3 text-primary"
                  />
                </div>
                <div className="flex items-center justify-between p-2 bg-secondary/10 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">📝</span>
                    <span className="text-sm">Text Recognition</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={perceptionAware.textRecognition}
                    onChange={(e) => setPerceptionAware(prev => ({ ...prev, textRecognition: e.target.checked }))}
                    className="w-3 h-3 text-primary"
                  />
                </div>
              </div>
            </div>

            {/* Compression Settings */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Compression Balance</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Label className="text-xs">Background Compression</Label>
                    <span className="text-xs text-muted-foreground">{perceptionAware.backgroundCompression}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="90"
                    value={perceptionAware.backgroundCompression}
                    onChange={(e) => setPerceptionAware(prev => ({ ...prev, backgroundCompression: Number(e.target.value) }))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Higher = more background compression</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Label className="text-xs">Quality Preservation</Label>
                    <span className="text-xs text-muted-foreground">{perceptionAware.qualityPreservation}%</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="100"
                    value={perceptionAware.qualityPreservation}
                    onChange={(e) => setPerceptionAware(prev => ({ ...prev, qualityPreservation: Number(e.target.value) }))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Quality for important areas</p>
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Advanced Options</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-secondary/10 rounded">
                  <div>
                    <span className="text-sm">Adaptive Bitrate</span>
                    <p className="text-xs text-muted-foreground">Dynamic quality adjustment</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={perceptionAware.adaptiveBitrate}
                    onChange={(e) => setPerceptionAware(prev => ({ ...prev, adaptiveBitrate: e.target.checked }))}
                    className="w-3 h-3 text-primary"
                  />
                </div>
                <div className="flex items-center justify-between p-2 bg-secondary/10 rounded">
                  <div>
                    <span className="text-sm">Real-time Processing</span>
                    <p className="text-xs text-muted-foreground">Live preview (GPU intensive)</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={perceptionAware.realTimeProcessing}
                    onChange={(e) => setPerceptionAware(prev => ({ ...prev, realTimeProcessing: e.target.checked }))}
                    className="w-3 h-3 text-primary"
                  />
                </div>
              </div>
            </div>

            {/* Processing Status */}
            <div className="p-3 bg-gradient-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">AI Status</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Detection: Active</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Processing: Ready</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>4K/8K: Enabled</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Compression: Smart</span>
                </div>
              </div>
            </div>
          </>
        )}
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
        
        {(selectedTool === 'color-grade') && (
          <>
            {renderColorControls()}
            {renderAdvancedColorGrading()}
          </>
        )}
        
        {selectedTool === 'video-effects' && renderVideoEffects()}
        
        {selectedTool === 'audio' && renderAudioEnhancement()}
        
        {selectedTool === 'ai' && renderAIEnhancement()}

        {/* Always show color controls for video/image tools */}
        {selectedTool === 'ai' && renderPerceptionAwareControls()}
        
        {(selectedTool === 'image' || selectedTool === 'filters') && (
          <>
            {renderColorControls()}
            {renderAdvancedColorGrading()}
            {renderVideoEffects()}
            {renderAIEnhancement()}
          </>
        )}
      </div>
    </div>
  );
};
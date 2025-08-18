import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Layers, 
  Volume2,
  VolumeX, 
  Lock,
  Eye,
  EyeOff,
  MoreHorizontal,
  Scissors,
  Copy,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  thumbnail_url?: string;
  duration: number;
  resolution: string;
  fps: number;
  status: string;
  project_data: any;
  created_at: string;
  updated_at: string;
}

interface TimelineEditorProps {
  project: Project | null;
  onProjectUpdate: (project: Project) => void;
}

interface TimelineTrack {
  id: string;
  type: 'video' | 'audio' | 'text' | 'image';
  name: string;
  clips: TimelineClip[];
  visible: boolean;
  locked: boolean;
  volume?: number;
  muted?: boolean;
}

interface TimelineClip {
  id: string;
  name: string;
  startTime: number;
  endTime: number;
  duration: number;
  color: string;
  type: 'video' | 'audio' | 'text' | 'image';
}

const defaultTracks: TimelineTrack[] = [
  {
    id: 'video-1',
    type: 'video',
    name: 'Video Track 1',
    clips: [],
    visible: true,
    locked: false,
  },
  {
    id: 'audio-1',
    type: 'audio',
    name: 'Audio Track 1',
    clips: [],
    visible: true,
    locked: false,
    volume: 100,
    muted: false,
  }
];

export const TimelineEditor = ({ project, onProjectUpdate }: TimelineEditorProps) => {
  const [tracks, setTracks] = useState<TimelineTrack[]>(defaultTracks);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [playheadPosition, setPlayheadPosition] = useState(0);
  const [selectedClips, setSelectedClips] = useState<string[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  const duration = project?.duration || 30000; // 30 seconds default
  const pixelsPerSecond = (zoomLevel / 100) * 20; // Base 20px per second at 100% zoom

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleTrackToggle = (trackId: string, property: 'visible' | 'locked' | 'muted') => {
    setTracks(tracks.map(track => 
      track.id === trackId 
        ? { ...track, [property]: !track[property] }
        : track
    ));
  };

  const handleVolumeChange = (trackId: string, volume: number[]) => {
    setTracks(tracks.map(track => 
      track.id === trackId 
        ? { ...track, volume: volume[0] }
        : track
    ));
  };

  const addTrack = (type: 'video' | 'audio' | 'text') => {
    const newTrack: TimelineTrack = {
      id: `${type}-${Date.now()}`,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Track ${tracks.filter(t => t.type === type).length + 1}`,
      clips: [],
      visible: true,
      locked: false,
      ...(type === 'audio' && { volume: 100, muted: false })
    };
    setTracks([...tracks, newTrack]);
  };

  const getClipWidth = (clip: TimelineClip) => {
    return (clip.duration / 1000) * pixelsPerSecond;
  };

  const getClipLeft = (clip: TimelineClip) => {
    return (clip.startTime / 1000) * pixelsPerSecond;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-500/80';
      case 'audio': return 'bg-green-500/80';
      case 'text': return 'bg-purple-500/80';
      case 'image': return 'bg-orange-500/80';
      default: return 'bg-gray-500/80';
    }
  };

  return (
    <div className="h-80 border-t border-border bg-card/30 backdrop-blur flex flex-col">
      {/* Timeline Header */}
      <div className="h-12 border-b border-border bg-muted/30 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-sm">Timeline</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => addTrack('video')}>
            <Plus className="w-3 h-3 mr-1" />
            Video
          </Button>
          <Button size="sm" variant="ghost" onClick={() => addTrack('audio')}>
            <Plus className="w-3 h-3 mr-1" />
            Audio
          </Button>
          <Button size="sm" variant="ghost" onClick={() => addTrack('text')}>
            <Plus className="w-3 h-3 mr-1" />
            Text
          </Button>
          
          <div className="w-px h-6 bg-border mx-2" />
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Zoom:</span>
            <Slider
              value={[zoomLevel]}
              onValueChange={(value) => setZoomLevel(value[0])}
              min={25}
              max={400}
              step={25}
              className="w-20"
            />
            <span className="text-xs text-muted-foreground w-8">
              {zoomLevel}%
            </span>
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 flex">
        {/* Track Headers */}
        <div className="w-48 border-r border-border bg-muted/20">
          {tracks.map((track) => (
            <div key={track.id} className="h-16 border-b border-border/50 flex items-center px-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <Badge 
                    variant="secondary" 
                    className={cn("text-xs px-1.5", getTypeColor(track.type))}
                  >
                    {track.type.toUpperCase()}
                  </Badge>
                  <span className="text-sm font-medium truncate">
                    {track.name}
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleTrackToggle(track.id, 'visible')}
                    className="h-6 w-6 p-0"
                  >
                    {track.visible ? (
                      <Eye className="w-3 h-3" />
                    ) : (
                      <EyeOff className="w-3 h-3 text-muted-foreground" />
                    )}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleTrackToggle(track.id, 'locked')}
                    className="h-6 w-6 p-0"
                  >
                    <Lock className={cn(
                      "w-3 h-3",
                      track.locked ? "text-primary" : "text-muted-foreground"
                    )} />
                  </Button>

                  {track.type === 'audio' && (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleTrackToggle(track.id, 'muted')}
                        className="h-6 w-6 p-0"
                      >
                        {track.muted ? (
                          <VolumeX className="w-3 h-3 text-muted-foreground" />
                        ) : (
                          <Volume2 className="w-3 h-3" />
                        )}
                      </Button>
                      <div className="w-12">
                        <Slider
                          value={[track.volume || 100]}
                          onValueChange={(value) => handleVolumeChange(track.id, value)}
                          max={100}
                          step={1}
                          className="h-1"
                        />
                      </div>
                    </>
                  )}
                  
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0 ml-auto">
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Tracks */}
        <div className="flex-1 relative overflow-x-auto" ref={timelineRef}>
          {/* Time Ruler */}
          <div className="h-8 border-b border-border bg-muted/30 relative">
            {Array.from({ length: Math.ceil(duration / 5000) }, (_, i) => (
              <div
                key={i}
                className="absolute top-0 h-full flex items-end"
                style={{ left: (i * 5 * pixelsPerSecond) }}
              >
                <div className="w-px h-2 bg-border" />
                <span className="text-xs text-muted-foreground ml-1 mb-1">
                  {formatTime(i * 5000)}
                </span>
              </div>
            ))}
          </div>

          {/* Playhead */}
          <div
            className="absolute top-8 bottom-0 w-px bg-primary z-10 pointer-events-none"
            style={{ left: (playheadPosition / 1000) * pixelsPerSecond }}
          >
            <div className="w-3 h-3 bg-primary -translate-x-1/2 -translate-y-1/2" 
                 style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </div>

          {/* Track Content */}
          <div className="relative">
            {tracks.map((track) => (
              <div key={track.id} className="h-16 border-b border-border/50 relative bg-background/20">
                {track.clips.map((clip) => (
                  <div
                    key={clip.id}
                    className={cn(
                      "absolute top-2 bottom-2 rounded border border-white/20 flex items-center px-2 text-white text-xs font-medium cursor-pointer hover:brightness-110 transition-all",
                      getTypeColor(clip.type),
                      selectedClips.includes(clip.id) && "ring-2 ring-primary ring-inset"
                    )}
                    style={{
                      left: getClipLeft(clip),
                      width: Math.max(getClipWidth(clip), 40)
                    }}
                    onClick={() => {
                      if (selectedClips.includes(clip.id)) {
                        setSelectedClips(selectedClips.filter(id => id !== clip.id));
                      } else {
                        setSelectedClips([...selectedClips, clip.id]);
                      }
                    }}
                  >
                    <span className="truncate">{clip.name}</span>
                  </div>
                ))}
                
                {/* Drop Zone */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-full h-full border-2 border-dashed border-primary/30 rounded flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">
                      Drop media here
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Footer */}
      <div className="h-10 border-t border-border bg-muted/30 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">
            Duration: {formatTime(duration)}
          </span>
          {selectedClips.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {selectedClips.length} selected
              </span>
              <Button size="sm" variant="ghost" className="h-6 px-2">
                <Scissors className="w-3 h-3 mr-1" />
                Cut
              </Button>
              <Button size="sm" variant="ghost" className="h-6 px-2">
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </Button>
              <Button size="sm" variant="ghost" className="h-6 px-2 text-destructive">
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </Button>
            </div>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground">
          Playhead: {formatTime(playheadPosition)}
        </div>
      </div>
    </div>
  );
};
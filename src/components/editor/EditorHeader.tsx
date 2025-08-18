import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  Save, 
  Download, 
  Settings, 
  User, 
  LogOut, 
  Crown,
  Play,
  Pause
} from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface Project {
  id: string;
  title: string;
  status: string;
}

interface EditorHeaderProps {
  user: SupabaseUser | null;
  project: Project | null;
  onSignOut: () => void;
  onSaveProject: () => void;
  onExportProject: () => void;
}

export const EditorHeader = ({ 
  user, 
  project, 
  onSignOut, 
  onSaveProject, 
  onExportProject 
}: EditorHeaderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [projectTitle, setProjectTitle] = useState(project?.title || "Untitled Project");

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement video playback control
  };

  return (
    <header className="h-14 border-b border-border bg-card/50 backdrop-blur flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Video className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg bg-gradient-text bg-clip-text text-transparent">
            StreamVizion
          </span>
        </div>
        
        <div className="h-6 w-px bg-border" />
        
        <div className="flex items-center gap-3">
          <Input
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="h-8 w-48 text-sm border-none bg-transparent focus:bg-muted/50"
            placeholder="Project name..."
          />
          {project?.status && (
            <Badge variant="secondary" className="text-xs">
              {project.status}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handlePlayPause}
          className="gap-2"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        
        <div className="h-6 w-px bg-border" />
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onSaveProject}
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          Save
        </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          onClick={onExportProject}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Export
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden md:inline">
                {user?.user_metadata?.full_name || user?.email || "User"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Pro
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut} className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { EditorHeader } from "@/components/editor/EditorHeader";
import { EditorSidebar } from "@/components/editor/EditorSidebar";
import { VideoPreviewPanel } from "@/components/editor/VideoPreviewPanel";
import { TimelineEditor } from "@/components/editor/TimelineEditor";
import { PropertiesPanel } from "@/components/editor/PropertiesPanel";
import { Loader2 } from "lucide-react";

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

const VideoEditor = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [selectedTool, setSelectedTool] = useState("select");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/auth");
          return;
        }
        
        setUser(session.user);
        await loadOrCreateProject(session.user.id);
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadOrCreateProject = async (userId: string) => {
    try {
      // Try to load the most recent project
      const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      if (projects && projects.length > 0) {
        setCurrentProject(projects[0]);
      } else {
        // Create a new project
        const { data: newProject, error: createError } = await supabase
          .from('projects')
          .insert({
            user_id: userId,
            title: "Untitled Project",
            description: "New video editing project",
            resolution: "1080p",
            fps: 30,
            project_data: {
              tracks: [],
              effects: [],
              transitions: []
            }
          })
          .select()
          .single();

        if (createError) throw createError;
        setCurrentProject(newProject);
      }
    } catch (error: any) {
      console.error("Error loading project:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load project. Please try again.",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading editor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <EditorHeader 
        user={user}
        project={currentProject}
        onSignOut={handleSignOut}
        onSaveProject={() => {}}
        onExportProject={() => {}}
      />
      
      <div className="flex-1 flex">
        <EditorSidebar 
          selectedTool={selectedTool}
          onToolSelect={setSelectedTool}
        />
        
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex">
            <VideoPreviewPanel 
              project={currentProject}
            />
            <PropertiesPanel 
              selectedTool={selectedTool}
            />
          </div>
          
          <TimelineEditor 
            project={currentProject}
            onProjectUpdate={setCurrentProject}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoEditor;
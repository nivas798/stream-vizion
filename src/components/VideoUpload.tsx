import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, File, X, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface VideoUploadProps {
  onVideoUploaded: (file: UploadedFile) => void;
}

const VideoUpload = ({ onVideoUploaded }: VideoUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    
    if (videoFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload video files only",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    // Simulate upload process - in real implementation, this would upload to Supabase storage
    for (const file of videoFiles) {
      try {
        // Create object URL for preview
        const url = URL.createObjectURL(file);
        
        const uploadedFile: UploadedFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          url: url
        };

        setUploadedFiles(prev => [...prev, uploadedFile]);
        onVideoUploaded(uploadedFile);

        toast({
          title: "Upload successful",
          description: `${file.name} has been uploaded`,
        });
      } catch (error) {
        toast({
          title: "Upload failed",
          description: `Failed to upload ${file.name}`,
          variant: "destructive"
        });
      }
    }

    setUploading(false);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="bg-gradient-card border-2 border-dashed border-border/50 transition-all duration-300 hover:border-primary/50">
        <CardContent className="p-8">
          <div
            className={`relative min-h-64 flex flex-col items-center justify-center text-center transition-all duration-300 ${
              dragActive ? 'scale-105 border-primary' : ''
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold font-display mb-2">Upload Your Videos</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Drag and drop your video files here, or click to browse. 
              Supports MP4, MOV, AVI, and more formats.
            </p>

            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-hero hover:shadow-glow transition-all duration-300"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Choose Files"}
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="video/*"
              onChange={handleFileInput}
              className="hidden"
            />

            {dragActive && (
              <div className="absolute inset-0 bg-primary/10 border-2 border-primary border-dashed rounded-lg flex items-center justify-center">
                <p className="text-primary font-semibold">Drop files here</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <h4 className="font-bold font-display mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Uploaded Files ({uploadedFiles.length})
            </h4>
            
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <File className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(file.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideoUpload;
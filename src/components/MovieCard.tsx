import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";

interface MovieCardProps {
  title: string;
  image: string;
  genre?: string;
  duration?: string;
  rating?: string;
  description?: string;
}

const MovieCard = ({ title, image, genre, duration, rating, description }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer transition-all duration-300 transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card Image */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-card">
        <img 
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" className="bg-background/20 backdrop-blur-sm hover:bg-primary/80 w-16 h-16 rounded-full">
            <Play className="w-8 h-8 text-foreground" />
          </Button>
        </div>

        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold">
            {rating}
          </div>
        )}
      </div>

      {/* Hover Info Panel */}
      {isHovered && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-lg p-4 shadow-netflix z-50 transform opacity-100 animate-in slide-in-from-top-2 duration-200">
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          
          {/* Metadata */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            {duration && <span>{duration}</span>}
            {genre && (
              <>
                <span>•</span>
                <span>{genre}</span>
              </>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {description}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline" className="rounded-full w-8 h-8">
                <Play className="w-4 h-4" />
              </Button>
              
              <Button size="icon" variant="outline" className="rounded-full w-8 h-8">
                <Plus className="w-4 h-4" />
              </Button>
              
              <Button size="icon" variant="outline" className="rounded-full w-8 h-8">
                <ThumbsUp className="w-4 h-4" />
              </Button>
            </div>

            <Button size="icon" variant="outline" className="rounded-full w-8 h-8">
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Code, Palette, Database } from "lucide-react";

const developers = [
  {
    name: "Nivas",
    role: "Full Stack Developer",
    specialty: "Backend Architecture & Video Processing",
    description: "Expert in Node.js, FFmpeg, and streaming technologies. Passionate about building scalable video platforms.",
    skills: ["Node.js", "FFmpeg", "MongoDB", "Docker", "AWS"],
    icon: <Code className="w-6 h-6" />,
    gradient: "from-blue-500 to-purple-600",
    links: {
      github: "https://github.com/nivas798",
      linkedin: "https://www.linkedin.com/in/nivas-alugubelli-94bb9a325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "nivasalugubelli6@gmail.com"
    }
  },
  {
    name: "Swathi",
    role: "Frontend Developer",
    specialty: "UI/UX & Interactive Design",
    description: "Specializes in React, modern CSS, and creating beautiful user experiences with attention to detail.",
    skills: ["React", "TypeScript", "Tailwind", "Figma", "Animation"],
    icon: <Palette className="w-6 h-6" />,
    gradient: "from-pink-500 to-orange-500",
    links: {
      github: "https://github.com/Swathi1056/Swathi",
      linkedin: "https://www.linkedin.com/in/swathi-p-0ab828307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "swathi1052006@gmail.com"
    }
  },
  {
    name: "Krishna Priya",
    role: "DevOps Engineer",
    specialty: "Infrastructure & Performance",
    description: "Focuses on deployment automation, performance optimization, and ensuring platform reliability.",
    skills: ["Docker", "Kubernetes", "CI/CD", "Monitoring", "Cloud"],
    icon: <Database className="w-6 h-6" />,
    gradient: "from-green-500 to-teal-600",
    links: {
      github: "https://github.com/Krishnaps-05",
      linkedin: "https://www.linkedin.com/in/krishna-priya-p-s-0a9217321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "krishpspriya@gmail.com"
    }
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Meet Our{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">
              Development Team
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three passionate developers dedicated to revolutionizing the streaming experience 
            with cutting-edge technology and beautiful design.
          </p>
        </div>

        {/* Developer Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {developers.map((dev, index) => (
            <Card key={dev.name} className="group hover:shadow-netflix transition-all duration-500 transform hover:-translate-y-2 bg-gradient-card border-border/50">
              <CardContent className="p-8">
                {/* Avatar & Icon */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${dev.gradient} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    {dev.icon}
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-foreground">{dev.name}</h3>
                    <p className="text-primary font-medium">{dev.role}</p>
                  </div>
                </div>

                {/* Specialty */}
                <div className="text-center mb-4">
                  <Badge variant="secondary" className="text-sm">
                    {dev.specialty}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-center mb-6 leading-relaxed">
                  {dev.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {dev.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <a 
                    href={dev.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 flex items-center justify-center"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a 
                    href={dev.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 flex items-center justify-center"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a 
                    href={`mailto:${dev.links.email}`}
                    className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 flex items-center justify-center"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">3+</div>
            <div className="text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Platform Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">∞</div>
            <div className="text-muted-foreground">Streaming Quality</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
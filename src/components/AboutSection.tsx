import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Code, Palette, Database } from "lucide-react";

const developers = [
  {
    name: "Nivas",
    role: "Computer Science Student",
    specialty: "Full Stack Development & Video Processing",
    description: "Third-year CS student passionate about web development and multimedia technologies. Loves building innovative solutions for academic projects.",
    skills: ["React", "Node.js", "MongoDB", "Python", "JavaScript"],
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
    role: "Design & Frontend Student",
    specialty: "UI/UX Design & Interactive Media",
    description: "Creative student specializing in modern web design and user experience. Enjoys creating beautiful interfaces for student projects.",
    skills: ["React", "CSS", "Figma", "UI Design", "Animation"],
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
    role: "Technology Student",
    specialty: "System Administration & Cloud Computing",
    description: "Dedicated student focused on cloud technologies and system optimization. Passionate about making technology accessible to fellow students.",
    skills: ["Cloud Computing", "Linux", "Git", "Database", "Networking"],
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
              Student Team
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three passionate students collaborating to create an amazing video editing platform 
            for their final year project, combining creativity with cutting-edge technology.
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
            <div className="text-3xl font-bold text-primary mb-2">2+</div>
            <div className="text-muted-foreground">Years Learning</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <div className="text-muted-foreground">Assignments Done</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">A+</div>
            <div className="text-muted-foreground">Target Grade</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Dedication</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
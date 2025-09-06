import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Zap, Shield, Globe, Upload, Download, Edit3 } from "lucide-react";

const AboutWebsite = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-primary/20 text-primary border border-primary/30 px-6 py-2 font-cinematic mb-6">
            ABOUT STREAMVIZION
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold font-cinematic mb-8">
            Professional{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">
              Video Editor
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-inter">
            StreamVizion is a cutting-edge, browser-based video editing platform designed to revolutionize 
            how content creators, professionals, and businesses approach video production.
          </p>
        </div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="bg-gradient-card backdrop-blur-xl border border-primary/20 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-cinematic">Our Mission</h3>
                  <p className="text-sm text-muted-foreground">Democratizing Video Creation</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We believe that powerful video editing tools should be accessible to everyone, 
                regardless of their technical expertise or budget. Our AI-powered platform 
                eliminates the complexity of traditional video editing software while 
                maintaining professional-grade quality.
              </p>
            </div>

            <div className="bg-gradient-card backdrop-blur-xl border border-primary/20 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-cinematic">Key Features</h3>
                  <p className="text-sm text-muted-foreground">What Makes Us Different</p>
                </div>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  AI-powered video enhancement and quality optimization
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Real-time preview with GPU-accelerated processing
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Support for 100+ video formats and resolutions up to 8K
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Enterprise-grade security with end-to-end encryption
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-card backdrop-blur-xl border border-primary/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold font-cinematic mb-6">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Upload className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">1. Upload Your Video</h4>
                    <p className="text-sm text-muted-foreground">
                      Simply drag and drop your video files. We support files up to 10GB 
                      and over 100 different formats.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Edit3 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">2. Edit & Enhance</h4>
                    <p className="text-sm text-muted-foreground">
                      Use our AI-powered tools to enhance quality, adjust colors, 
                      and apply professional effects in real-time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Download className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">3. Export & Share</h4>
                    <p className="text-sm text-muted-foreground">
                      Download your enhanced video in your preferred format and quality, 
                      from HD to 8K ultra-high definition.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-card backdrop-blur-xl border border-primary/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold font-cinematic mb-6">Technology Stack</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-medium mb-1">Security</h4>
                  <p className="text-xs text-muted-foreground">SOC 2 Compliant</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-medium mb-1">Global CDN</h4>
                  <p className="text-xs text-muted-foreground">Worldwide Access</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10M+</div>
            <div className="text-muted-foreground">Videos Processed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
            <div className="text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-muted-foreground">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWebsite;
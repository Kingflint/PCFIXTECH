import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Shield, Clock, Award } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useRef, useCallback, useEffect } from "react";

const HERO_VIDEOS = [
  { src: "/videos/phone-repair.mp4", label: "Phone Repair" },
  { src: "/videos/cellphone-repair.mp4", label: "Screen Fix" },
  { src: "/videos/soldering-repair.mp4", label: "Soldering" },
];

interface HeroProps {
  onBookRepair: () => void;
  onLearnMore: () => void;
  enableVideo?: boolean;
  logoUrl?: string;
}

export function Hero({ onBookRepair, onLearnMore, enableVideo = false, logoUrl }: HeroProps) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = useCallback(() => {
    setCurrentVideo((prev) => (prev + 1) % HERO_VIDEOS.length);
  }, []);

  useEffect(() => {
    if (enableVideo && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentVideo, enableVideo]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background: video or default gradient */}
      {enableVideo ? (
        <>
          <div className="absolute inset-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVideo}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <video
                  ref={videoRef}
                  src={HERO_VIDEOS[currentVideo].src}
                  muted
                  autoPlay
                  playsInline
                  onEnded={handleVideoEnd}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Video indicator dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
            {HERO_VIDEOS.map((v, i) => (
              <button
                key={i}
                onClick={() => setCurrentVideo(i)}
                className={`flex items-center gap-1.5 transition-all ${
                  i === currentVideo ? "opacity-100" : "opacity-50 hover:opacity-75"
                }`}
              >
                <span className={`block h-1.5 rounded-full transition-all ${
                  i === currentVideo ? "w-6 bg-white" : "w-2 bg-white/70"
                }`} />
                {i === currentVideo && (
                  <span className="text-xs text-white font-medium">{v.label}</span>
                )}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-background to-blue-100/50 dark:from-blue-950/30 dark:via-background dark:to-blue-900/20" />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${
              enableVideo ? "bg-white/10 text-white backdrop-blur-sm" : "bg-primary/10 text-primary"
            }`}>
              <Shield className="w-4 h-4" />
              Certified Apple Device Repair
            </div>

            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${
              enableVideo ? "text-white" : "text-foreground"
            }`}>
              Expert Apple
              <br />
              <span className="text-primary">Device Repair</span>
              <br />
              You Can Trust
            </h1>

            <p className={`text-lg mb-8 max-w-lg ${
              enableVideo ? "text-white/70" : "text-muted-foreground"
            }`}>
              Professional repair services for MacBook, iPhone, iPad, Apple Watch & more.
              Fast turnaround, quality parts, and a warranty on every repair.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button size="lg" onClick={onBookRepair} className="text-base px-8 py-3 h-auto rounded-xl">
                Book a Repair
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={onLearnMore} className="text-base px-8 py-3 h-auto rounded-xl">
                How It Works
              </Button>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className={`text-sm ${enableVideo ? "text-white/70" : "text-muted-foreground"}`}>Fast Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className={`text-sm ${enableVideo ? "text-white/70" : "text-muted-foreground"}`}>30-Day Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span className={`text-sm ${enableVideo ? "text-white/70" : "text-muted-foreground"}`}>Certified Techs</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Device showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="w-full aspect-square max-w-lg mx-auto relative">
                <div className={`absolute inset-8 rounded-3xl flex items-center justify-center shadow-2xl ${
                  enableVideo
                    ? "bg-white/10 backdrop-blur-sm border border-white/20"
                    : "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-border"
                }`}>
                  <div className="text-center">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center overflow-hidden ${
                      enableVideo ? "bg-white/10" : "bg-primary/10"
                    }`}>
                      {logoUrl ? (
                        <img src={logoUrl} alt="Logo" className="w-14 h-14 object-contain" />
                      ) : (
                        <svg className={`w-10 h-10 ${enableVideo ? "text-white" : "text-foreground"}`} viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                      )}
                    </div>
                    <p className={`text-lg font-semibold ${enableVideo ? "text-white" : "text-foreground"}`}>iFixit</p>
                    <p className={`text-sm ${enableVideo ? "text-white/70" : "text-muted-foreground"}`}>Repair Specialists</p>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-4 right-0 bg-background rounded-xl shadow-lg p-3 border"
                >
                  <p className="text-2xl font-bold text-primary">500+</p>
                  <p className="text-xs text-muted-foreground">Devices Fixed</p>
                </motion.div>

                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute bottom-4 left-0 bg-background rounded-xl shadow-lg p-3 border"
                >
                  <p className="text-2xl font-bold text-green-600">98%</p>
                  <p className="text-xs text-muted-foreground">Satisfaction Rate</p>
                </motion.div>

                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-20 right-0 bg-background rounded-xl shadow-lg p-3 border"
                >
                  <p className="text-2xl font-bold text-orange-500">24h</p>
                  <p className="text-xs text-muted-foreground">Avg. Turnaround</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

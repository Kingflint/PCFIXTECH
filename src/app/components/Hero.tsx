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

  const AI_SLIDES = [
    {
      image: "/seniorsoftwareEngineer.png",
      alt: "Senior software engineer integrating AI into device repair",
      caption: "Integrating AI to accelerate device repair speed",
    },
    {
      image: "/seniorsoftwareEngineer.png",
      alt: "Senior software engineer integrating AI into device repair",
      caption: "Integrated Artificial Intelligent agents that bring speed and efficiency to a whole new level. Our team is continuously integrating efficient products into our services to help us better improve the experiences of our customers.",
    },
    {
      image: "/graphicsdesigner.png",
      alt: "Taking our clients through the repair process with a guided UI",
      caption: "Taking our clients through the process. Integrating AI into our repair designs, automating software installation with a UI interface that shows our clients the process.",
    },
  ];
  const [aiSlide, setAiSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setAiSlide((prev) => (prev + 1) % AI_SLIDES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

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
              Certified Device Repair
            </div>

            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${
              enableVideo ? "text-white" : "text-foreground"
            }`}>
              Expert windows/mac os
              <br />
              <span className="text-primary">Device Repair</span>
              <br />
              You Can Trust
            </h1>

            <p className={`text-lg mb-8 max-w-lg ${
              enableVideo ? "text-white/70" : "text-muted-foreground"
            }`}>
              Professional repair services for Super Computers(Custom), MacBook, Windows, iPhone, iPad, Apple Watch & more.
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="absolute inset-8 rounded-3xl overflow-hidden shadow-2xl border border-border bg-gray-200 dark:bg-gray-900"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={AI_SLIDES[aiSlide].image}
                      src={AI_SLIDES[aiSlide].image}
                      alt={AI_SLIDES[aiSlide].alt}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={aiSlide}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.6 }}
                        className="text-white text-sm sm:text-base font-medium leading-snug drop-shadow"
                      >
                        {AI_SLIDES[aiSlide].caption}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </motion.div>

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

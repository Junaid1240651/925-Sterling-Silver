import { memo, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Award, Truck } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

// Best Seller images that auto-rotate
const bestSellerImages = [
  {
    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    name: "Silver Necklace",
  },
  {
    src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    name: "Diamond Ring",
  },
  {
    src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    name: "Pearl Pendant",
  },
  {
    src: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&h=400&fit=crop",
    name: "Drop Earrings",
  },
  {
    src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    name: "Silver Bracelet",
  },
];

// Scroll-to-Launch Rocket Component
const ScrollRocket = memo(function ScrollRocket() {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  const rocketY = useTransform(scrollY, [0, 400], [0, -600]);
  const rocketScale = useTransform(scrollY, [0, 400], [1, 0.3]);
  const rocketOpacity = useTransform(scrollY, [0, 250, 400], [1, 1, 0]);
  const rocketRotate = useTransform(scrollY, [0, 400], [0, -25]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center mt-2 sm:mt-4 md:mt-6 relative z-50">
      <motion.div
        className="relative z-50"
        style={{
          y: rocketY,
          scale: rocketScale,
          opacity: rocketOpacity,
          rotate: rocketRotate,
        }}
      >
        <motion.div
          animate={!hasScrolled ? { y: [0, -6, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="28"
            height="38"
            viewBox="0 0 48 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md sm:w-9 sm:h-12"
          >
            <defs>
              <linearGradient id="scrollSilver" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0f0f0" />
                <stop offset="30%" stopColor="#c0c0c0" />
                <stop offset="70%" stopColor="#d8d8d8" />
                <stop offset="100%" stopColor="#a8a8a8" />
              </linearGradient>
              <linearGradient id="scrollFlame" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#b8860b" />
                <stop offset="50%" stopColor="#d4a84b" />
                <stop offset="100%" stopColor="#ff6b35" />
              </linearGradient>
            </defs>
            <ellipse cx="24" cy="24" rx="10" ry="22" fill="url(#scrollSilver)" />
            <path d="M24 0 L32 16 Q24 13 16 16 Z" fill="#9a9a9a" />
            <circle cx="24" cy="18" r="5" fill="#1a1a1a" stroke="#d0d0d0" strokeWidth="1" />
            <circle cx="24" cy="18" r="3" fill="#3a5a7a" opacity="0.8" />
            <circle cx="22" cy="16" r="1" fill="white" opacity="0.6" />
            <rect x="15" y="32" width="18" height="1.5" fill="#a0a0a0" rx="0.5" />
            <path d="M14 38 L4 52 L14 48 Z" fill="url(#scrollSilver)" />
            <path d="M34 38 L44 52 L34 48 Z" fill="url(#scrollSilver)" />
            <ellipse cx="24" cy="46" rx="6" ry="2" fill="#707070" />
            <motion.g
              animate={{ scaleY: [1, 1.3, 0.9, 1.2, 1], opacity: [0.9, 1, 0.8, 1, 0.9] }}
              transition={{ duration: 0.25, repeat: Infinity }}
            >
              <path d="M19 48 Q24 68 29 48" fill="url(#scrollFlame)" />
              <path d="M21 48 Q24 60 27 48" fill="#ffd700" opacity="0.8" />
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-1 sm:mt-2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ delay: 1 }}
      >
        <span
          className="text-[8px] sm:text-[10px] md:text-xs tracking-widest uppercase mb-0.5 sm:mb-1"
          style={{ color: "var(--color-text-muted)" }}
        >
          Scroll to launch
        </span>
        <motion.div
          className="w-3 h-5 sm:w-4 sm:h-6 md:w-5 md:h-7 rounded-full border sm:border-2 flex justify-center pt-0.5 sm:pt-1"
          style={{ borderColor: "var(--color-primary)" }}
        >
          <motion.div
            className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full"
            style={{ backgroundColor: "var(--color-accent)" }}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
});

// Jewelry Showcase Component with auto-changing Best Seller
const JewelryShowcase = memo(function JewelryShowcase() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % bestSellerImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center overflow-visible">
      {/* Main showcase area with positioned elements */}
      <div className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[400px] flex items-center justify-center overflow-visible">
        
        {/* Central decorative ring - dashed circle */}
        <motion.div
          className="absolute w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 
                     rounded-full border sm:border-2 border-dashed"
          style={{ borderColor: "var(--color-primary)", opacity: 0.3 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* Glowing center */}
        <motion.div
          className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 
                     rounded-full blur-3xl"
          style={{ backgroundColor: "var(--color-primary-light)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main featured jewelry image */}
        <motion.div
          className="relative z-10 overflow-visible"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="relative"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 
                         rounded-full overflow-hidden shadow-2xl border-2 sm:border-4 relative"
              style={{ borderColor: "var(--color-accent)" }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={bestSellerImages[currentImageIndex].src}
                  alt={bestSellerImages[currentImageIndex].name}
                  className="w-full h-full object-cover absolute inset-0"
                  initial={{ opacity: 0, scale: 1.1, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>
            
            {/* Best Seller Badge */}
            <motion.div
              className="absolute -bottom-0.5 sm:-bottom-1 left-1/2 -translate-x-1/2 
                         px-2 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-1.5 
                         rounded-full text-[8px] sm:text-[10px] md:text-xs font-semibold whitespace-nowrap"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-text-light)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              ✨ Best Seller
            </motion.div>

            {/* Image indicator dots */}
            <div className="absolute -bottom-4 sm:-bottom-5 md:-bottom-6 left-1/2 -translate-x-1/2 flex gap-0.5 sm:gap-1 md:gap-1.5">
              {bestSellerImages.map((_, index) => (
                <motion.div
                  key={index}
                  className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full cursor-pointer"
                  style={{
                    backgroundColor:
                      index === currentImageIndex
                        ? "var(--color-accent)"
                        : "var(--color-primary)",
                  }}
                  animate={{ scale: index === currentImageIndex ? 1.3 : 1 }}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ===== 3 SMALL IMAGES - POSITIONED CLOSE TO CIRCLE ===== */}
        
        {/* Item 1 - Top right of circle */}
        <motion.div
          className="absolute rounded-full overflow-hidden shadow-lg cursor-pointer
                     w-9 h-9 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-18 lg:h-18
                     top-[5%] sm:top-[8%] md:top-[10%]
                     right-[15%] sm:right-[18%] md:right-[15%] lg:right-[18%]"
          style={{ border: "2px solid var(--color-bg-white)" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.1, zIndex: 20 }}
        >
          <motion.div
            className="w-full h-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop"
              alt="Silver Ring"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Item 2 - Middle right of circle */}
        <motion.div
          className="absolute rounded-full overflow-hidden shadow-lg cursor-pointer
                     w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16
                     top-[38%] sm:top-[40%] md:top-[38%]
                     right-[5%] sm:right-[8%] md:right-[5%] lg:right-[8%]"
          style={{ border: "2px solid var(--color-bg-white)" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          whileHover={{ scale: 1.1, zIndex: 20 }}
        >
          <motion.div
            className="w-full h-full"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop"
              alt="Pendant"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Item 3 - Bottom right of circle */}
        <motion.div
          className="absolute rounded-full overflow-hidden shadow-lg cursor-pointer
                     w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 lg:w-14 lg:h-14
                     bottom-[15%] sm:bottom-[18%] md:bottom-[15%]
                     right-[18%] sm:right-[20%] md:right-[18%] lg:right-[20%]"
          style={{ border: "2px solid var(--color-bg-white)" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          whileHover={{ scale: 1.1, zIndex: 20 }}
        >
          <motion.div
            className="w-full h-full"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="https://images.unsplash.com/photo-1630019852942-f89202989a59?w=300&h=300&fit=crop"
              alt="Earrings"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Floating sparkles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${25 + i * 20}%`,
              top: `${20 + (i % 2) * 35}%`,
            }}
            animate={{
              y: [0, -8, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          >
            <Sparkles
              size={8 + i * 2}
              className="sm:w-3 sm:h-3 md:w-4 md:h-4"
              style={{ color: i % 2 === 0 ? "var(--color-accent)" : "var(--color-primary)" }}
            />
          </motion.div>
        ))}
      </div>

      {/* Scroll Rocket */}
      <ScrollRocket />
    </div>
  );
});

function HeroComponent() {
  const titleWords = ["Elegance", "in", "Every", "Detail"];

  return (
    <section
      className="relative min-h-screen lg:min-h-[90vh] flex items-center py-4 sm:py-6 md:py-8 lg:py-0"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background - contained separately */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-primary) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rounded-full"
            style={{
              backgroundColor: i % 2 === 0 ? "var(--color-primary)" : "var(--color-accent)",
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{
              duration: 4 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
          {/* Left content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full mb-3 sm:mb-4 md:mb-6 cursor-pointer"
              style={{
                backgroundColor: "var(--color-bg-white)",
                boxShadow: "var(--shadow-sm)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Sparkles
                size={12}
                className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                style={{ color: "var(--color-accent)" }}
              />
              <span
                className="text-[10px] sm:text-xs md:text-sm font-medium tracking-wide"
                style={{ color: "var(--color-text-secondary)" }}
              >
                New Collection 2025
              </span>
            </motion.div>

            {/* Main title */}
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-3 sm:mb-4 md:mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {titleWords.map((word, index) => (
                <motion.span
                  key={word}
                  className="inline-block mr-1.5 sm:mr-2 md:mr-3"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  {word === "Every" ? (
                    <span className="italic" style={{ color: "var(--color-accent)" }}>
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              className="text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-5 md:mb-6 lg:mb-8 max-w-lg mx-auto lg:mx-0"
              style={{ color: "var(--color-text-secondary)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Discover our handcrafted BIS hallmarked 925 sterling silver jewelry. 
              Timeless pieces designed for the modern Indian soul.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Button variant="primary" size="lg" rightIcon={<ArrowRight size={16} />}>
                Shop Collection
              </Button>
              <Button variant="secondary" size="lg">
                Our Story
              </Button>
            </motion.div>

            {/* Trust badges - VISIBLE ON ALL SCREENS */}
            <motion.div
              className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-5 mt-5 sm:mt-6 md:mt-8 lg:mt-10 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
                <Truck size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ color: "var(--color-accent)" }} />
                <div className="text-left">
                  <div className="text-[10px] sm:text-xs md:text-sm font-semibold leading-tight" style={{ color: "var(--color-text-primary)" }}>
                    Free Shipping
                  </div>
                  <div className="text-[8px] sm:text-[10px] md:text-xs leading-tight" style={{ color: "var(--color-text-muted)" }}>
                    Above ₹2,000
                  </div>
                </div>
              </div>
              
              <div className="w-px h-6 sm:h-7 md:h-8" style={{ backgroundColor: "var(--color-border-light)" }} />
              
              <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
                <Shield size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ color: "var(--color-accent)" }} />
                <div className="text-left">
                  <div className="text-[10px] sm:text-xs md:text-sm font-semibold leading-tight" style={{ color: "var(--color-text-primary)" }}>
                    2 Year Warranty
                  </div>
                  <div className="text-[8px] sm:text-[10px] md:text-xs leading-tight" style={{ color: "var(--color-text-muted)" }}>
                    Quality Assured
                  </div>
                </div>
              </div>
              
              <div className="w-px h-6 sm:h-7 md:h-8" style={{ backgroundColor: "var(--color-border-light)" }} />
              
              <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
                <Award size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ color: "var(--color-accent)" }} />
                <div className="text-left">
                  <div className="text-[10px] sm:text-xs md:text-sm font-semibold leading-tight" style={{ color: "var(--color-text-primary)" }}>
                    BIS Hallmark
                  </div>
                  <div className="text-[8px] sm:text-[10px] md:text-xs leading-tight" style={{ color: "var(--color-text-muted)" }}>
                    925 Pure Silver
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Jewelry Showcase */}
          <motion.div
            className="relative mt-2 sm:mt-4 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <JewelryShowcase />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export const Hero = memo(HeroComponent);

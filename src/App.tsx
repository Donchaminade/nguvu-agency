/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Cpu, Sparkles, Globe, Zap, Menu, X, Plus, ChevronLeft, ChevronRight, Quote, ChevronUp, Instagram, Facebook, Linkedin, Phone, Mail, Youtube, Music as Tiktok } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "motion/react";

const FadeInView = ({ children, delay = 0, y = 30 }: { children: React.ReactNode, delay?: number, y?: number, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const AnimatedIcon = ({ icon: Icon, className = "" }: { icon: any, className?: string }) => (
  <motion.div
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
    className={className}
  >
    <Icon className="w-full h-full" />
  </motion.div>
);

const TestimonialCarousel = () => {
  const testimonials = [
    {
      text: "Un partenaire stratégique visionnaire. NGUVU a su transformer notre présence digitale avec une agilité déconcertante et un impact réel.",
      name: "Marc Eyono",
      title: "Directeur Innovation, TechAfrica"
    },
    {
      text: "L'IA au service de l'humain n'est plus un concept marketing, c'est une réalité avec NGUVU. Notre taux d'engagement a doublé en six mois.",
      name: "Sarah Lobe",
      title: "CEO, Creative Hub Douala"
    },
    {
      text: "Une force créative unique au Cameroun. Leur approche technique est d'une pureté rare, alliant performance et esthétique minimale.",
      name: "Jean-Luc Kwaté",
      title: "Digital Manager, Global Vision"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <section className="py-24 lg:py-40 bg-white text-black relative z-10 overflow-hidden border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs uppercase tracking-[0.5em] font-bold text-black/40">TÉMOIGNAGES</span>
            <h2 className="text-5xl lg:text-7xl font-display font-black tracking-tighter uppercase leading-[0.8] mb-8">
              L'énergie<br /><span className="text-black/10">du succès.</span>
            </h2>
            <div className="flex gap-4">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="w-14 h-14 border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all group"
              >
                <ChevronLeft className="w-5 h-5 group-active:-translate-x-1 transition-transform" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="w-14 h-14 border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all group"
              >
                <ChevronRight className="w-5 h-5 group-active:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>

          <div className="lg:col-span-8 relative min-h-[400px] flex flex-col justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 }
                }}
                whileHover={{ 
                  scale: 1.01,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
                  backgroundColor: "rgba(255,255,255,0.8)"
                }}
                className="space-y-12 p-8 md:p-12 border border-transparent hover:border-black/5 transition-colors cursor-default"
              >
                <Quote className="w-12 h-12 text-black/10" />
                <p className="text-3xl md:text-5xl font-display font-black leading-[1.1] tracking-tight">
                  {testimonials[currentIndex].text}
                </p>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold uppercase tracking-widest">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm font-bold text-black/40 uppercase tracking-widest italic">{testimonials[currentIndex].title}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Progress dots */}
            <div className="absolute bottom-0 left-0 flex gap-2">
              {testimonials.map((_, i) => (
                <div 
                  key={i}
                  className={`h-1 transition-all duration-500 ${i === currentIndex ? "w-12 bg-black" : "w-4 bg-black/10"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroSlideshow = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-white">
      {/* Base Grid Layer */}
      <div className="absolute inset-0 bg-grid-premium opacity-100" />
      
      {/* Accent Dots Layer */}
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-dots-accent" 
      />
      
      {/* Gradient Vignette Mask */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white via-white/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white pointer-events-none" />
      
      {/* Technical Detail: Crosshair Corners */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-black/10 hidden sm:block" />
      <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-black/10 hidden sm:block" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-black/10 hidden sm:block" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-black/10 hidden sm:block" />
    </div>
  );
};

const TypewriterHero = () => {
  const messages = [
    "Là où l'idée naît,",
    "Là où le contenu se diffuse",
    "Là où la marque vit",
    "Partout où tu crées"
  ];
  
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isFinished) return;

    const timeout = setTimeout(() => {
      const fullText = messages[currentMessageIndex];
      
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        
        if (currentText === fullText) {
          // If it's the last message, stop here
          if (currentMessageIndex === messages.length - 1) {
            setIsFinished(true);
            return;
          }
          
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentMessageIndex, isFinished]);

  return (
    <h1 className="text-3xl sm:text-6xl lg:text-[100px] leading-[1.1] font-display font-black tracking-tighter uppercase mb-12 sm:mb-20 text-center lg:text-left text-black max-w-6xl">
      <span className="opacity-40">Nous sommes </span> <br className="hidden lg:block" />
      <span className="relative">
        {currentText}
        {!isFinished && (
          <motion.span 
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-1.5 sm:w-4 h-10 sm:h-24 bg-black ml-2 align-middle"
          />
        )}
      </span>
    </h1>
  );
};

const ServiceModal = ({ 
  service, 
  isOpen, 
  onClose 
}: { 
  service: any, 
  isOpen: boolean, 
  onClose: () => void 
}) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-6xl bg-zinc-900 border border-white/10 overflow-hidden rounded-3xl shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="lg:w-1/2 relative h-64 lg:h-auto">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
            </div>

            <div className="lg:w-1/2 p-8 md:p-16 overflow-y-auto custom-scrollbar">
              <div className="space-y-8">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.5em] font-black text-white/30">{service.category}</span>
                  <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-tight text-white">
                    {service.title}
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-xl text-white/80 font-light leading-relaxed text-justify hyphens-auto">
                    {service.longDesc}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-4">MÉTHODOLOGIE</h4>
                      <ul className="space-y-3 text-sm text-white/60">
                        {service.features.map((f: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 italic">
                            <span className="text-white">+</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-4">LIVRABLES</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.deliverables.map((d: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] uppercase tracking-wider font-bold text-white/40">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full py-5 bg-white text-black font-black uppercase text-xs tracking-[0.3em] mt-12 hover:bg-white/90 transition-all"
                >
                  Fermer les détails
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ScrollToTopButton = ({ show }: { show: boolean }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
          whileHover={{ scale: 1.1, backgroundColor: "#ffffff", color: "#000000" }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[60] w-14 h-14 bg-black/40 backdrop-blur-xl text-white rounded-full flex items-center justify-center shadow-2xl border border-white/10 group transition-colors"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const AINetworkBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#grid)" />
      {[...Array(6)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 100}
          cy={Math.random() * 100}
          r="0.2"
          fill="white"
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {[...Array(3)].map((_, i) => (
        <motion.path
          key={i}
          d={`M ${Math.random() * 100} ${Math.random() * 100} L ${Math.random() * 100} ${Math.random() * 100}`}
          stroke="white"
          strokeWidth="0.05"
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </svg>
  </div>
);

const PartnersSection = () => {
  const partners = [
    { name: "TECHAFRICA", type: "Innovation Hub" },
    { name: "GLOBAL VISION", type: "Digital Media" },
    { name: "CREATIVE HUB", type: "Creative Studio" },
    { name: "DATA CORE", type: "AI Research" },
    { name: "FUTURE CORP", type: "Venture Capital" },
    { name: "ZINC MEDIA", type: "Production" }
  ];

  return (
    <section className="py-24 lg:py-40 bg-[#050505] border-t border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <FadeInView>
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.5em] font-black text-white/30">COLLABORATIONS</span>
              <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tighter uppercase leading-none text-white">
                Ils façonnent le futur <br /><span className="text-white/20 italic">avec nous.</span>
              </h2>
            </div>
          </FadeInView>
          <FadeInView delay={0.2}>
            <p className="text-sm uppercase tracking-widest font-bold text-white/40 max-w-[300px] leading-relaxed">
              Des leaders d'industrie aux startups visionnaires, nous amplifions l'énergie de ceux qui osent créer.
            </p>
          </FadeInView>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/10 border border-white/10">
          {partners.map((partner, i) => (
            <FadeInView key={i} delay={i * 0.05}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                className="bg-[#050505] aspect-square flex flex-col items-center justify-center p-8 transition-colors group cursor-default"
              >
                <div className="relative">
                  <div className="font-display font-black text-2xl lg:text-3xl text-white/20 group-hover:text-white group-hover:scale-110 transition-all duration-700 tracking-tighter italic">
                    {partner.name}
                  </div>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    className="absolute -bottom-2 left-0 h-[1px] bg-white/40"
                  />
                </div>
                <div className="mt-4 text-[8px] uppercase tracking-[0.3em] font-black text-white/0 group-hover:text-white/30 transition-all">
                  {partner.type}
                </div>
              </motion.div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
};

const WordTicker = () => {
  const words = [
    "FORCE", "ÉNERGIE", "CRÉATION", "INNOVATION", "DIGITAL", 
    "CAMEROUN", "AFRIQUE", "IMPACT", "AUTHENTICITÉ", "AGILITÉ", 
    "VISION", "IA", "GEO", "HUMAN-FIRST", "NGUVU"
  ];
  
  return (
    <div className="w-full overflow-hidden bg-black py-4 border-y border-white/10 relative z-20">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-8"
      >
        {[...words, ...words, ...words].map((word, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="text-xs md:text-sm font-black tracking-[0.4em] text-white/80">{word}</span>
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white/30 rotate-45" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function App() {
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
      tag: "Agence de Communication Digitale — Cameroun, Afrique",
      title: "PARTOUT OÙ",
      subtitle: "TU CRÉES."
    },
    {
      image: "https://images.unsplash.com/photo-1523800503107-5bc3bd2a6f81?q=80&w=1600&auto=format&fit=crop",
      tag: "Human-First · IA · Digital · Afrique",
      title: "FORCE —",
      subtitle: "ÉNERGIE."
    },
    {
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1600&auto=format&fit=crop",
      tag: "Performance · Impact · Résultat",
      title: "LE FUTUR",
      subtitle: "EST ICI."
    }
  ];

  const services = [
    { 
      num: "01", 
      category: "Brand Architecture", 
      title: "Stratégie de Marque", 
      desc: "Nous forgeons des identités uniques et puissantes. Du naming au design sensoriel, nous créons l'ADN qui rend votre marque inoubliable au Cameroun et au-delà.",
      longDesc: "Une marque forte est le fondement de toute croissance. Nous ne nous contentons pas de dessiner des logos ; nous créons des systèmes d'identité complets qui résonnent avec votre audience. Notre approche combine analyse culturelle locale et standards esthétiques internationaux pour positionner votre entreprise comme une référence incontournable.",
      features: ["Analyse de positionnement", "Architecture de marque", "Identité visuelle 360°", "Brand Book & Guidelines"],
      deliverables: ["Logotype", "Typographies", "Palette Chromatique", "Iconographie"],
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
      icon: <Cpu /> 
    },
    { 
      num: "02", 
      category: "Digital Presence", 
      title: "Marketing & Influence", 
      desc: "Amplifiez votre voix. Nous combinons social media management, publicité programmatique et marketing d'influence pour une visibilité qui génère des résultats.",
      longDesc: "Dans un océan de bruit numérique, nous faisons émerger votre message. NGUVU déploie des stratégies de contenu narratives et des campagnes d'acquisition basées sur les données. Nous connectons votre marque aux influenceurs qui partagent vos valeurs pour un impact authentique et mesurable.",
      features: ["Social Media Management", "Publicité (Ads)", "Marketing d'Influence", "Copywriting Stratégique"],
      deliverables: ["Planning Editorial", "Rapports d'engagement", "Contenus Viraux", "Campagnes Leads"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      icon: <Zap /> 
    },
    { 
      num: "03", 
      category: "Product Engine", 
      title: "Développement Digital", 
      desc: "Des solutions techniques agiles. Sites web imersifs, applications mobiles robustes et plateformes e-commerce pensées pour la conversion.",
      longDesc: "La technologie doit servir l'expérience. Nous développons des plateformes rapides, sécurisées et intuitives. Que ce soit pour un site vitrine haut de gamme ou une application métier complexe, notre équipe technique utilise les frameworks les plus modernes pour garantir performance et évolutivité.",
      features: ["UI/UX Design Immersif", "Développement Full-Stack", "E-commerce & Paiements", "Maintenance Evolutive"],
      deliverables: ["Prototypage Figma", "Site Web Responsive", "App Mobile", "Tableaux de bord"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
      icon: <Plus /> 
    },
    { 
      num: "04", 
      category: "Adaptive AI", 
      title: "IA & Automation", 
      desc: "Le futur de l'efficacité. Intégration d'agents intelligents, GEO (Generative Engine Optimization) et automatisation de vos processus métiers.",
      longDesc: "Ne subissez pas la révolution AI, menez-la. Nous intégrons l'intelligence artificielle générative pour automatiser vos tâches répétitives et améliorer votre service client via des agents conversationnels intelligents. Nous optimisons également votre présence pour les nouveaux moteurs de recherche IA (GEO).",
      features: ["Custom AI Agents", "Workflows Automation", "GEO & Semantic SEO", "Analyse Prédictive"],
      deliverables: ["Agents GPT", "Zaps & Webhooks", "Stratégie GEO", "Processus automatisés"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
      icon: <Globe /> 
    },
    { 
      num: "05", 
      category: "Visual Storytelling", 
      title: "Production Médias", 
      desc: "Raconter l'histoire derrière le produit. Photo, vidéo, motion design et podcasts produits avec un standard de qualité internationale.",
      longDesc: "L'image est le premier point de contact. Nous produisons des contenus visuels qui captent l'attention en moins de 3 secondes. De la direction artistique sur plateau au montage rythmé, nous créons des assets qui valorisent l'excellence de votre savoir-faire.",
      features: ["Shooting Photo Pro", "Video Clipping & Reels", "Motion Design 2D/3D", "Production Podcast"],
      deliverables: ["Rushs & Montages", "Templates Sociaux", "Bumper Ads", "Episodes Audio"],
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
      icon: <Cpu /> 
    },
    { 
      num: "06", 
      category: "Growth Intelligence", 
      title: "Consulting & Data", 
      desc: "Décidez avec précision. Analyse de données, veille stratégique et accompagnement pour transformer vos insights en opportunités de croissance.",
      longDesc: "La donnée brute est inutile sans interprétation. Nous analysons vos performances et celles de vos concurrents pour identifier des leviers de croissance inexploités. Notre consulting vous offre une vision claire pour vos investissements marketing futurs.",
      features: ["Audit Performance", "Business Intelligence", "Growth Hacking", "Coaching Stratégique"],
      deliverables: ["Dashboard Data", "Audit SEO/Ads", "Plan de Croissance", "Veille Concurrentielle"],
      image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?q=80&w=1200&auto=format&fit=crop",
      icon: <Sparkles /> 
    }
  ];

  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const { scrollYProgress } = useScroll();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError("Veuillez entrer une adresse email valide.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Veuillez entrer une adresse email valide.");
      return;
    }
    // Handle successful submission
    alert("Merci pour votre message. Nous vous recontacterons bientôt.");
    setEmail("");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const heroSection = document.getElementById('hero');
      const footerSection = document.getElementById('agence');
      
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const footerTop = footerSection ? footerSection.getBoundingClientRect().top : Infinity;
        
        setShowScrollTop(heroBottom < 0 && footerTop > window.innerHeight);
      }

      const sections = ["hero", "propos", "services", "valeurs", "ia", "contact"];
      let current = "hero";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* Background Decorative Waves */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05]">
        <svg className="absolute bottom-0 w-[200%] h-full animate-wave" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0,1000 C300,800 400,950 700,850 C1000,750 1200,900 1500,900 L1500,1000 L0,1000 Z" fill="white" />
        </svg>
      </div>

      {/* Navigation */}
      <ScrollToTopButton show={showScrollTop} />
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrolled ? "bg-black/95 backdrop-blur-2xl text-white shadow-2xl" : "bg-white/80 backdrop-blur-md text-black"
        } border-b border-white/5`}
      >
        {/* Top Info Bar */}
        <div className={`w-full border-b transition-colors duration-700 ${scrolled ? "border-white/5 bg-black/80" : "border-black/5 bg-white/40"} backdrop-blur-md py-2 sm:py-3 px-6 md:px-16`}>
          <div className={`max-w-[1400px] mx-auto flex justify-center sm:justify-between items-center text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-black ${scrolled ? "text-white" : "text-black"}`}>
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="tel:+237600000000" className={`flex items-center gap-2 transition-all px-2 sm:px-3 py-1 rounded-full ${scrolled ? "hover:bg-white/10 hover:text-white" : "hover:bg-black/10 hover:text-black"}`}>
                <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>+237 600 00 00 00</span>
              </a>
              <a href="mailto:contact@nguvu.cm" className={`flex items-center gap-2 transition-all hidden sm:flex px-3 py-1 rounded-full ${scrolled ? "hover:bg-white/10 hover:text-white" : "hover:bg-black/10 hover:text-black"}`}>
                <Mail className="w-3 h-3" />
                <span>contact@nguvu.cm</span>
              </a>
            </div>
          </div>
        </div>

        <div className={`max-w-[1400px] mx-auto px-6 md:px-16 flex justify-between items-center py-4 lg:py-6 transition-all duration-700 ${scrolled ? "lg:py-4" : "lg:py-8"}`}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-start gap-1 group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <img 
                src="https://media.base44.com/images/public/69df796b893674d35217f353/9af52c2df_logo.png" 
                alt="NGUVU Logo" 
                className={`h-8 md:h-10 transition-all group-hover:scale-105 ${scrolled ? "invert" : ""}`}
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-14">
            {[
              { id: "propos", label: "À propos" },
              { id: "services", label: "Services" },
              { id: "valeurs", label: "Valeurs" },
              { id: "ia", label: "IA" },
              { id: "contact", label: "Contact" }
            ].map((item) => (
              <motion.a 
                key={item.id} 
                href={`#${item.id}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`text-xs uppercase tracking-[0.2em] font-bold transition-all relative group ${
                  activeSection === item.id ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
              >
                {item.label}
                <motion.div 
                  initial={false}
                  animate={{ width: activeSection === item.id ? "100%" : "0%" }}
                  className={`absolute -bottom-1 left-0 h-[1.5px] ${scrolled ? "bg-white" : "bg-black"}`}
                />
              </motion.a>
            ))}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className={`px-8 py-3 text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                scrolled ? "bg-white text-black hover:bg-white/80" : "bg-black text-white hover:bg-black/80"
              }`}
              id="cta-nav"
            >
              Contact
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className={`md:hidden p-2 transition-colors ${scrolled ? "text-white" : "text-black"}`} onClick={() => setIsMenuOpen(!isMenuOpen)} id="mobile-menu-btn">
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <motion.div 
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : "100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed inset-0 bg-black z-40 md:hidden flex flex-col items-center justify-center gap-12 p-10 transition-all ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          {[
            { id: "propos", label: "À propos" },
            { id: "services", label: "Services" },
            { id: "valeurs", label: "Valeurs" },
            { id: "ia", label: "IA" },
            { id: "contact", label: "Contact" }
          ].map((item) => (
            <motion.a 
              key={item.id} 
              href={`#${item.id}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-display font-black uppercase tracking-tighter hover:text-white/60 transition-all"
            >
              {item.label}
            </motion.a>
          ))}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-12 py-5 bg-white text-black font-black uppercase text-sm tracking-widest"
            onClick={() => setIsMenuOpen(false)}
          >
            Contactez-nous
          </motion.button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-32 overflow-hidden bg-white">
        <HeroSlideshow />
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full relative z-10 flex flex-col flex-grow justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="flex flex-col gap-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={heroIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-black/50 font-bold"
                  >
                    AGENCE DE COMMUNICATION DIGITALE
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            
            <TypewriterHero />

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 lg:gap-12">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "black", color: "white" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 lg:px-12 py-4 lg:py-5 border-2 border-black text-black font-black uppercase text-[10px] sm:text-xs tracking-widest hover:border-black transition-all flex items-center justify-center gap-4 bg-white/40 backdrop-blur-md"
              >
                Nos Services <Cpu className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 lg:px-12 py-4 lg:py-5 bg-black text-white font-black uppercase text-[10px] sm:text-xs tracking-widest hover:bg-black/90 transition-all flex items-center justify-center gap-4 shadow-xl shadow-black/20"
              >
                Démarrer un projet <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30 italic text-black">Défiler</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-12 bg-gradient-to-b from-black/40 to-transparent"
          />
        </motion.div>

        {/* Floating Shapes */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-10 pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -50, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="600" height="600" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="0.1" fill="none" />
              <circle cx="50" cy="50" r="35" stroke="white" strokeWidth="0.1" fill="none" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.05" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.05" />
            </svg>
          </motion.div>
        </div>
      </section>

      <WordTicker />

      {/* À propos Section (Notre Histoire) */}
      <section id="propos" className="py-20 sm:py-24 lg:py-40 bg-white relative z-10 border-y border-black/5 overflow-hidden">
        {/* Transparent Text Watermark */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] flex items-center justify-center select-none overflow-hidden">
          <span className="text-[25vw] font-display font-black tracking-tighter uppercase transform -rotate-12 whitespace-nowrap text-black">
            NGUVU
          </span>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-24">
            <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-10">
              <FadeInView>
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-[0.5em] font-bold text-black/40">NOTRE HISTOIRE</span>
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter uppercase leading-[0.95] sm:leading-[0.9] text-black">
                    Plus qu'une <br /><span className="text-stroke-dark">agence —</span><br /> un mouvement.
                  </h2>
                </div>
              </FadeInView>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 sm:gap-8 mt-4">
                {[
                  { tag: "IA", label: "Intégration agentique" },
                  { tag: "4A", label: "Anticipation · Authenticité Impact · Agilité" },
                  { tag: "CMR", label: "Ancrage camerounais ouverture mondiale" }
                ].map((badge, i) => (
                  <FadeInView key={i} delay={0.2 + i * 0.1}>
                    <div className="flex items-center gap-4 sm:gap-6 group">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 border border-black/10 rounded-full flex-shrink-0 flex items-center justify-center font-display font-black text-sm sm:text-xl text-black group-hover:bg-black group-hover:text-white transition-all">
                        {badge.tag}
                      </div>
                      <p className="text-[9px] sm:text-xs uppercase tracking-[0.2em] font-bold text-black/40 leading-relaxed max-w-[200px]">
                        {badge.label}
                      </p>
                    </div>
                  </FadeInView>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-7 flex flex-col gap-8 sm:gap-12 lg:pt-24">
              {[
                "Dans le paysage en pleine effervescence du Cameroun, où l'innovation digitale rencontre une richesse culturelle inégalée, NGUVU émerge comme le catalyseur de la transformation.",
                "Nous croyons que chaque marque, chaque entrepreneur, chaque talent possède une histoire unique — une énergie intrinsèque qui ne demande qu'à être révélée et amplifiée dans l'univers digital.",
                "Nous sommes les architectes de votre présence en ligne, les amplificateurs de votre voix, les bâtisseurs de ponts entre votre vision et votre audience."
              ].map((text, i) => (
                <FadeInView key={i} delay={0.1 * i}>
                  <div className="flex gap-4 sm:gap-8 group">
                    <span className="font-display font-black text-xl sm:text-2xl text-black/10 group-hover:text-black transition-colors">0{i+1}</span>
                    <p className="text-lg sm:text-2xl font-light text-black/80 leading-relaxed text-justify hyphens-auto">
                      {text}
                    </p>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WordTicker />

      {/* Quote Section */}
      <section className="py-32 lg:py-52 bg-white text-black relative z-10 text-center overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-8">
          <FadeInView>
             <h2 className="text-3xl sm:text-6xl font-display font-black tracking-tighter uppercase leading-tight mb-16">
               « Transformer votre énergie en influence, votre potentiel en performance, vos idées en succès. »
             </h2>
          </FadeInView>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 text-left">
            <FadeInView delay={0.2}>
              <p className="text-lg font-medium leading-relaxed opacity-80 text-justify hyphens-auto">
                NGUVU est plus qu'une agence — c'est un partenaire stratégique qui comprend les nuances du marché camerounais et les exigences du monde digital global.
              </p>
            </FadeInView>
            <FadeInView delay={0.3}>
              <p className="text-lg font-medium leading-relaxed opacity-80 text-justify hyphens-auto">
                Ancrés dans les valeurs d'Anticipation, d'Authenticité, d'Impact et d'Agilité, nous anticipons les tendances de demain pour vous positionner en leader aujourd'hui.
              </p>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section id="services" className="py-24 lg:py-40 bg-[#050505] text-white relative z-10 overflow-hidden border-t border-white/5 text-center lg:text-left">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
          <FadeInView>
            <div className="flex flex-col gap-10 mb-16 lg:mb-32 items-center lg:items-start text-center lg:text-left">
              <span className="text-xs uppercase tracking-[0.5em] font-bold text-white/60">02 — SERVICES</span>
              <h2 className="text-4xl sm:text-7xl lg:text-9xl font-display font-black tracking-tighter uppercase leading-[0.9] sm:leading-[0.8] mb-0">
                Digital<br /><span className="text-white/20 italic">Force.</span>
              </h2>
            </div>
          </FadeInView>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
            {services.map((service, idx) => (
              <FadeInView key={idx} delay={idx * 0.1}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedService(service)}
                  className="group flex flex-col bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-700 h-full overflow-hidden cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60" />
                    <div className="absolute top-6 right-8 font-display font-black text-6xl text-white/10 italic">
                      {service.num}
                    </div>
                  </div>
                  
                  <div className="p-10 flex flex-col flex-grow gap-6 bg-gradient-to-b from-white/[0.02] to-transparent">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">{service.category}</span>
                      <h3 className="text-2xl font-display font-black uppercase tracking-tight leading-none text-white">{service.title}</h3>
                    </div>
                    
                    <p className="text-white/60 text-sm font-medium leading-relaxed text-justify hyphens-auto italic line-clamp-3">
                      {service.desc}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          animate={{ 
                            y: [0, -3, 0],
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:border-white/40 group-hover:text-white group-hover:bg-white/5 transition-all"
                        >
                          <motion.div
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {service.icon}
                          </motion.div>
                        </motion.div>
                        <span className="text-[9px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">Découvrir plus</span>
                      </div>
                      <Plus className="w-4 h-4 text-white/20 group-hover:text-white transition-all group-hover:rotate-90" />
                    </div>
                  </div>
                </motion.div>
              </FadeInView>
            ))}
          </div>
        </div>
        <ServiceModal 
          service={selectedService} 
          isOpen={!!selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      </section>

      <WordTicker />

      {/* Valeurs Section */}
      <section id="valeurs" className="py-20 sm:py-24 lg:py-40 bg-[#050505] relative z-10 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <FadeInView>
            <div className="flex flex-col gap-6 mb-16 sm:mb-24 items-center lg:items-start text-center lg:text-left">
              <span className="text-xs uppercase tracking-[0.5em] font-bold text-white/60">CE QUI NOUS GUIDE</span>
              <h2 className="text-4xl sm:text-7xl lg:text-9xl font-display font-black tracking-tighter uppercase leading-[0.9] sm:leading-[0.8]">
                Nos valeurs,<br /><span className="text-white/20 italic">notre boussole.</span>
              </h2>
            </div>
          </FadeInView>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
            {[
              { id: "A", title: "Anticipation", sub: "Toujours en avance.", desc: "Constamment en veille sur les dernières technologies — IA, agents, Web3. Nous vous positionnons en leader de demain, dès aujourd'hui." },
              { id: "A", title: "Authenticité", sub: "Toujours vrai.", desc: "L'humain au cœur de la technologie. Sincérité, transparence, connexions réelles dans un monde qui tend à les effacer." },
              { id: "I", title: "Impact", sub: "Toujours concret.", desc: "Notre succès se mesure à votre croissance. Pas en vanity metrics, mais en valeur réelle et mesurable pour votre marque." },
              { id: "A", title: "Agilité", sub: "Toujours en mouvement.", desc: "Structure légère, réactivité maximale. Nous nous adaptons aux évolutions du marché avec la vitesse qu'exige le digital." }
            ].map((valeur, i) => (
              <FadeInView key={i} delay={i * 0.1}>
                <div className="flex flex-col gap-6 sm:gap-8 group">
                  <div className="text-[80px] sm:text-[120px] font-display font-black text-white/5 leading-none transition-all group-hover:text-white/10 group-hover:-translate-y-4">
                    {valeur.id}
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-white">{valeur.title}</h3>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 italic">{valeur.sub}</p>
                    </div>
                    <p className="text-sm text-white/60 font-medium leading-relaxed text-justify hyphens-auto">
                      {valeur.desc}
                    </p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialCarousel />

      {/* IA Section */}
      <section id="ia" className="py-24 lg:py-52 bg-zinc-950 relative z-10 border-t border-white/5 overflow-hidden">
        <AINetworkBackground />
        
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
          <div className="flex flex-col gap-24 lg:gap-32">
            
            {/* IA Header Gateway */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end">
              <div className="lg:col-span-8">
                <FadeInView>
                  <div className="space-y-8">
                    <span className="text-xs uppercase tracking-[0.5em] font-black text-white/40">INTELLIGENCE ARTIFICIELLE & AUTOMATION</span>
                    <h2 className="text-4xl sm:text-7xl lg:text-[100px] font-display font-black tracking-tighter uppercase leading-[0.9] text-white">
                      2026 —<br />
                      <span className="text-stroke">L'Année</span><br />
                      <span className="relative">
                        Agentique.
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="absolute -bottom-2 left-0 h-1 bg-white hidden lg:block"
                        />
                      </span>
                    </h2>
                  </div>
                </FadeInView>
              </div>
              <div className="lg:col-span-4 pb-4">
                <FadeInView delay={0.3}>
                  <p className="text-xl lg:text-2xl text-white/50 font-light leading-relaxed italic border-l-2 border-white/10 pl-8">
                    « L'intelligence artificielle n'est plus une option, c'est l'infrastructure même de la nouvelle ère digitale. »
                  </p>
                </FadeInView>
              </div>
            </div>

            {/* IA Integrated Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                { 
                  tag: "GEO", 
                  title: "Generative Engine Optimization", 
                  desc: "Positionnement stratégique dans les réponses des LLM comme ChatGPT, Gemini et Perplexity pour capturer l'audience de demain.",
                  details: ["SEO Sémantique", "Analyse de LLM", "Autorité de Source"]
                },
                { 
                  tag: "AGT", 
                  title: "Agents IA Autonomes", 
                  desc: "Conception d'agents intelligents capables d'interagir, de raisonner et d'automatiser des processus complexes 24/7.",
                  details: ["RAG (Retrieval)", "Custom GPTs", "Lead Nurturing"]
                },
                { 
                  tag: "AUT", 
                  title: "Workflows Agentiques", 
                  desc: "Automatisation profonde de vos opérations marketing et commerciales par des orchestrations de multiples modèles d'IA.",
                  details: ["Chain of Thought", "Connecteurs API", "Automatisation 360"]
                },
                { 
                  tag: "ANA", 
                  title: "Intelligence de Données", 
                  desc: "Transformation de vos données brutes en insights actionnables grâce à l'analyse prédictive et au deep learning.",
                  details: ["Scoring Client", "Veille IA", "Prévision Trend"]
                },
                { 
                  tag: "CRE", 
                  title: "Créative AI Engine", 
                  desc: "Amplification de la créativité humaine par des outils de génération de contenus haut de gamme (Image, Vidéo, Audio).",
                  details: ["Direction Artistique", "LORA Training", "Multi-modal"]
                },
                { 
                  tag: "CUS", 
                  title: "Expériences Sur-Mesure", 
                  desc: "Hyper-personnalisation massive de l'expérience utilisateur par l'adaptation dynamique des interfaces via l'IA.",
                  details: ["UI Dynamique", "Recommandation", "Context Engine"]
                }
              ].map((item, i) => (
                <FadeInView key={i} delay={i * 0.1}>
                  <motion.div 
                    whileHover={{ y: -10, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    className="p-10 border border-white/10 bg-white/[0.02] flex flex-col gap-10 group transition-all duration-500 h-full relative overflow-hidden rounded-3xl"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-[0.01] rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="flex justify-between items-start">
                      <div className="text-4xl font-display font-black text-white/40 group-hover:text-white transition-colors tracking-tighter">
                        {item.tag}
                      </div>
                      <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/20 group-hover:border-white/40 group-hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-display font-black uppercase tracking-tight text-white leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors leading-relaxed line-clamp-3 italic">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-auto grid grid-cols-1 gap-2 pt-6 border-t border-white/5">
                      {item.details.map((detail, j) => (
                        <div key={j} className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-black text-white/30 group-hover:text-white/50">
                          <div className="w-1 h-1 bg-white/20 rounded-full" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </FadeInView>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.02]">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path d="M0,0 L1000,1000 M1000,0 L0,1000 M500,0 L500,1000 M0,500 L1000,500" stroke="white" strokeWidth="1" fill="none" />
          </svg>
        </div>
      </section>

      <WordTicker />

      <PartnersSection />

      {/* Contact Section */}
      <section id="contact" className="py-24 lg:py-40 bg-white text-black relative z-10 text-center lg:text-left">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-12 lg:space-y-16 items-center lg:items-start">
              <FadeInView>
                <div className="space-y-6">
                  <span className="text-xs uppercase tracking-[0.5em] font-bold text-black/40">COMMENÇONS</span>
                  <h2 className="text-5xl sm:text-8xl font-display font-black tracking-tighter uppercase leading-none">
                    Parlons.
                  </h2>
                </div>
              </FadeInView>

              <FadeInView delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-10 text-center lg:text-left">
                  <div className="space-y-4">
                    <p className="text-xl sm:text-2xl font-display font-bold opacity-80 leading-relaxed mb-6">
                      Rejoignez NGUVU, et créons ensemble l'avenir de votre marque — partout où votre créativité vous mène.
                    </p>
                    <h4 className="text-[10px] uppercase tracking-widest font-black opacity-30">Email</h4>
                    <p className="text-xl sm:text-3xl font-display font-bold underline decoration-1 underline-offset-8">contact@nguvu.cm</p>
                  </div>
                  <div className="space-y-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <h4 className="text-[10px] uppercase tracking-widest font-black opacity-30">Localisation</h4>
                    <p className="text-xl sm:text-2xl font-bold italic opacity-60">
                      Cameroun — Afrique
                    </p>
                  </div>
                </div>
              </FadeInView>
            </div>

            <FadeInView delay={0.4}>
              <form onSubmit={handleSubmit} className="bg-[#050505] p-8 lg:p-16 text-white space-y-8 lg:space-y-10 text-left">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40">Votre Nom</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-all text-lg lg:text-xl font-light"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40">Email Professionnel</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className={`w-full bg-transparent border-b ${emailError ? 'border-red-500' : 'border-white/10'} py-4 outline-none focus:border-white transition-all text-lg lg:text-xl font-light`}
                    placeholder="jean@entreprise.com"
                  />
                  {emailError && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] uppercase tracking-widest font-bold text-red-500 mt-2"
                    >
                      {emailError}
                    </motion.p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40">Message</label>
                  <textarea 
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-all text-lg lg:text-xl font-light resize-none"
                    placeholder="Comment pouvons-nous vous aider ?"
                  />
                </div>
                <motion.button 
                  whileHover={{ x: 10, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full lg:w-auto px-12 py-5 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-white/90 transition-all flex items-center justify-center gap-4"
                >
                  Envoyer <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Footer Branding Section */}
      <section id="agence" className="py-40 bg-[#050505] border-t border-white/5 relative z-10">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <div className="flex flex-col items-center text-center gap-16">
            <FadeInView>
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-[0.5em] font-bold text-white/40 italic">Partout où tu crées.</span>
                <h2 className="text-6xl sm:text-9xl font-display font-black tracking-tighter uppercase leading-none max-w-5xl text-white">
                  L'ÈRE DU <span className="text-stroke italic">MONOCHROME.</span>
                </h2>
              </div>
            </FadeInView>
            
            <FadeInView delay={0.4}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-16 py-8 bg-white text-black text-base font-black uppercase tracking-[0.3em] hover:bg-white/90 transition-all relative group overflow-hidden"
              >
                <span className="relative z-10">Parlons de votre projet</span>
                <motion.div 
                  className="absolute inset-0 bg-black/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                />
              </motion.button>
            </FadeInView>
          </div>

          <div className="mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 border-t border-white/10 pt-20">
            {[
              (
                <div className="space-y-8">
                  <span className="font-display text-4xl font-black uppercase italic tracking-tighter text-white">NGUVU.</span>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/50 leading-loose max-w-[280px]">
                    Agence de Communication Digitale de référence au Cameroun. Spécialisée dans l'amplification de la créativité des marques à travers des stratégies digitales innovantes, l'IA et le contenu Human-First.
                  </p>
                </div>
              ),
              (
                <div className="space-y-10">
                  <h4 className="text-xs uppercase tracking-[0.3em] font-black text-white/60">Réseaux</h4>
                  <div className="flex flex-col gap-6">
                    {[
                      { name: "LinkedIn", icon: Linkedin },
                      { name: "Instagram", icon: Instagram },
                      { name: "TikTok", icon: Tiktok },
                      { name: "YouTube", icon: Youtube },
                      { name: "Facebook", icon: Facebook }
                    ].map(s => (
                      <motion.a 
                        key={s.name} 
                        href="#" 
                        whileHover={{ x: 5, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 text-[11px] uppercase font-bold tracking-widest text-white/70 hover:text-white transition-all group"
                      >
                        <s.icon className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                        <span className="underline decoration-white/10 underline-offset-4">{s.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              ),
              (
                <div className="space-y-10">
                  <h4 className="text-xs uppercase tracking-[0.3em] font-black text-white/60">Navigation</h4>
                  <div className="flex flex-col gap-4">
                    {["À propos", "Services", "Valeurs", "IA", "Contact"].map(s => (
                      <motion.a 
                        key={s} 
                        href={`#${s === "À propos" ? "propos" : s.toLowerCase()}`}
                        whileHover={{ x: 5, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-[11px] uppercase font-bold tracking-widest text-white/70 hover:text-white transition-all underline decoration-white/10 underline-offset-4 inline-block w-fit"
                      >
                        {s}
                      </motion.a>
                    ))}
                  </div>
                </div>
              ),
              (
                <div className="space-y-10">
                  <h4 className="text-xs uppercase tracking-[0.3em] font-black text-white/60">Copyright</h4>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-black uppercase tracking-widest text-white">© 2025 NGUVU.</span>
                    <span className="text-xs uppercase tracking-widest text-white/50 font-bold italic">Force · Énergie · Création · Impact</span>
                  </div>
                </div>
              )
            ].map((footerItem, idx) => (
              <FadeInView key={idx} delay={0.2 + idx * 0.1}>
                {footerItem}
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}

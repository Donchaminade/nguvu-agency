/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Cpu, Sparkles, Globe, Zap, Menu, X, Plus, ChevronLeft, ChevronRight, Quote, ChevronUp, Instagram, Facebook, Linkedin, Phone, Mail, Youtube, Music as Tiktok } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import logo from "./assets/logo.png";
import consultingImg from "./assets/consulting-data.png";

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
    <h1 className="text-5xl sm:text-6xl lg:text-[100px] leading-[1.0] font-display font-black tracking-tighter uppercase mb-12 sm:mb-20 text-center lg:text-left text-black max-w-6xl">
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

const ServiceDetail = ({
  service,
  isOpen,
  onClose,
  onContact
}: {
  service: any,
  isOpen: boolean,
  onClose: () => void,
  onContact: (label: string) => void
}) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-[#050505] overflow-y-auto"
        >
          {/* Hero Image */}
          <div className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#050505]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 to-transparent" />

            {/* Bouton Retour */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={onClose}
              className="absolute top-8 left-8 flex items-center gap-3 text-white group"
            >
              <div className="w-12 h-12 border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-black opacity-60 group-hover:opacity-100 transition-opacity">Retour</span>
            </motion.button>

            {/* Catégorie + Titre sur l'image */}
            <div className="absolute bottom-10 left-8 md:left-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[10px] uppercase tracking-[0.5em] font-black text-white/50 block mb-3"
              >
                {service.category}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none text-white"
              >
                {service.title}
              </motion.h2>
            </div>
          </div>

          {/* Contenu */}
          <div className="max-w-[1100px] mx-auto px-8 md:px-16 py-20 text-white">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl font-light text-white/70 leading-relaxed mb-20 text-justify hyphens-auto max-w-3xl"
            >
              {service.longDesc}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-white/10 pt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-8">MÉTHODOLOGIE</h4>
                <ul className="space-y-5">
                  {service.features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <span className="text-white/20 font-black text-sm mt-0.5 group-hover:text-white transition-colors">0{i + 1}</span>
                      <span className="text-base text-white/60 group-hover:text-white/90 transition-colors">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h4 className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-8">LIVRABLES</h4>
                <div className="flex flex-wrap gap-3">
                  {service.deliverables.map((d: string, i: number) => (
                    <span key={i} className="px-4 py-2 border border-white/20 text-[10px] uppercase tracking-widest font-bold text-white/50 hover:border-white hover:text-white transition-all">
                      {d}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-20 flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => {
                  onClose();
                  onContact(service?.title || "");
                }}
                className="flex-1 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.3em] hover:bg-white/90 transition-all flex items-center justify-center gap-3"
              >
                Démarrer ce projet <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="sm:w-48 py-6 border border-white/20 text-white font-black uppercase text-xs tracking-[0.3em] hover:border-white transition-all"
              >
                ← Retour
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Composant WhatsApp Form ────────────────────────────────────────────────
const WhatsAppForm = ({
  isOpen,
  onClose,
  serviceLabel = ""
}: {
  isOpen: boolean;
  onClose: () => void;
  serviceLabel?: string;
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(serviceLabel);
  const [message, setMessage] = useState("");

  // Sync serviceLabel when it changes
  React.useEffect(() => { setService(serviceLabel); }, [serviceLabel]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const num = "237657966906";
    const text = encodeURIComponent(
      `*Nouvelle demande NGUVU*\n\n` +
      `👤 *Nom :* ${name}\n` +
      `📞 *Téléphone :* ${phone}\n` +
      `📧 *Email :* ${email}\n` +
      `🎯 *Service souhaité :* ${service || "Non précisé"}\n` +
      `💬 *Message :*\n${message}`
    );
    window.open(`https://wa.me/${num}?text=${text}`, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-[300] md:hidden"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-[300] hidden md:block"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed bottom-0 left-0 right-0 md:right-auto md:left-1/2 md:-translate-x-1/2 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-[301] bg-[#050505] border border-white/10 md:w-[560px] md:max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-8 border-b border-white/5">
              <div>
                <p className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30">Demande de devis</p>
                <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-white mt-1">Parlons-en</h3>
              </div>
              <button onClick={onClose} className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSend} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-black text-white/30">Votre nom *</label>
                  <input required value={name} onChange={e => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-white transition-all text-sm font-light text-white placeholder:text-white/20"
                    placeholder="Jean Dupont" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-black text-white/30">Téléphone *</label>
                  <input required value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-white transition-all text-sm font-light text-white placeholder:text-white/20"
                    placeholder="+237 6XX XXX XXX" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.3em] font-black text-white/30">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-white transition-all text-sm font-light text-white placeholder:text-white/20"
                  placeholder="vous@entreprise.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.3em] font-black text-white/30">Service souhaité</label>
                <select value={service} onChange={e => setService(e.target.value)}
                  className="w-full bg-[#050505] border-b border-white/10 py-3 outline-none focus:border-white transition-all text-sm font-light text-white">
                  <option value="">Choisir un service...</option>
                  <option>Branding & Identité Visuelle</option>
                  <option>Marketing Digital & Social Media</option>
                  <option>Développement Digital</option>
                  <option>IA & Automation</option>
                  <option>Production Médias</option>
                  <option>Consulting & Data</option>
                  <option>GEO — Generative Engine Optimization</option>
                  <option>Agents IA Autonomes</option>
                  <option>Workflows Agentiques</option>
                  <option>Intelligence de Données</option>
                  <option>Créative AI Engine</option>
                  <option>Expériences Sur-Mesure</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.3em] font-black text-white/30">Votre message *</label>
                <textarea required rows={3} value={message} onChange={e => setMessage(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-white transition-all text-sm font-light text-white placeholder:text-white/20 resize-none"
                  placeholder="Décrivez votre projet, vos besoins, vos objectifs..." />
              </div>
              <button type="submit"
                className="w-full py-5 bg-[#25D366] text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#22c05e] transition-all flex items-center justify-center gap-3 mt-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Envoyer via WhatsApp
              </button>
              <p className="text-[8px] text-white/20 text-center uppercase tracking-widest">Vous serez redirigé vers WhatsApp pour confirmer l'envoi</p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── Page de Détail IA ───────────────────────────────────────────────────────
const IADetailPage = ({
  item,
  isOpen,
  onClose,
  onContact
}: {
  item: any;
  isOpen: boolean;
  onClose: () => void;
  onContact: (label: string) => void;
}) => {
  if (!item) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-[#050505] overflow-y-auto"
        >
          {/* Header */}
          <div className="border-b border-white/5 px-8 md:px-16 py-8 flex items-center justify-between">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={onClose}
              className="flex items-center gap-3 text-white group"
            >
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 group-hover:text-white transition-colors">Retour</span>
            </motion.button>
            <span className="text-5xl font-display font-black text-white/5 italic">{item.tag}</span>
          </div>

          {/* Content */}
          <div className="max-w-[900px] mx-auto px-8 md:px-16 py-20 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <span className="text-[9px] uppercase tracking-[0.5em] font-black text-white/30 block mb-4">{item.category}</span>
              <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none text-white">{item.title}</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-invert max-w-none mb-16"
            >
              {item.content}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12 mb-16"
            >
              <div>
                <h4 className="text-[9px] uppercase tracking-widest font-black text-white/30 mb-6">Avantages Clés</h4>
                <ul className="space-y-4">
                  {item.avantages.map((a: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-white font-black text-sm mt-0.5">+</span>
                      <span className="text-sm text-white/70 leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[9px] uppercase tracking-widest font-black text-white/30 mb-6">Technologies & Méthodes</h4>
                <div className="flex flex-wrap gap-2">
                  {item.details.map((d: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 border border-white/20 text-[9px] uppercase tracking-widest font-bold text-white/50 hover:border-white hover:text-white transition-all">{d}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => { onClose(); onContact(item.title); }}
                className="flex-1 py-6 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white/90 transition-all flex items-center justify-center gap-3"
              >
                Démarrer ce projet <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={onClose} className="sm:w-48 py-6 border border-white/20 text-white font-black uppercase text-[10px] tracking-[0.3em] hover:border-white transition-all">
                ← Retour
              </button>
            </motion.div>
          </div>
        </motion.div>
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
          className="fixed bottom-8 right-8 z-[60] w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl border border-white/10 group transition-colors"
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
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1" />
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
      image: consultingImg,
      icon: <Sparkles />
    }
  ];

  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedIA, setSelectedIA] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [emailError, setEmailError] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formServiceLabel, setFormServiceLabel] = useState("");

  const openForm = (label = "") => { setFormServiceLabel(label); setIsFormOpen(true); };

  const { scrollYProgress } = useScroll();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && !validateEmail(value)) {
      setEmailError("Veuillez entrer une adresse email valide.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openForm();
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
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-black text-white shadow-2xl" : "bg-white text-black"
          } border-b border-white/5`}
      >
        {/* Top Info Bar */}
        <div className={`w-full border-b transition-colors duration-700 ${scrolled ? "border-white/5 bg-black" : "border-black/5 bg-white"} py-2 sm:py-3 px-6 md:px-16`}>
          <div className={`max-w-[1400px] mx-auto flex justify-center sm:justify-between items-center text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-black ${scrolled ? "text-white" : "text-black"}`}>
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="tel:+237657966906" className={`flex items-center gap-2 transition-all px-2 sm:px-3 py-1 rounded-full ${scrolled ? "hover:bg-white/10 hover:text-white" : "hover:bg-black/10 hover:text-black"}`}>
                <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>+237 657 966 906</span>
              </a>
              <a href="mailto:contact@nguvu.cm" className={`flex items-center gap-2 transition-all hidden sm:flex px-3 py-1 rounded-full ${scrolled ? "hover:bg-white/10 hover:text-white" : "hover:bg-black/10 hover:text-black"}`}>
                <Mail className="w-3 h-3" />
                <span>contact@nguvu.cm</span>
              </a>
            </div>
          </div>
        </div>

        <div className={`max-w-[1400px] mx-auto px-6 md:px-16 flex justify-between items-center py-2 lg:py-4 transition-all duration-700 ${scrolled ? "lg:py-2" : "lg:py-6"}`}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-start gap-1 group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="NGUVU Logo"
                className={`h-20 md:h-40 transition-all duration-500 group-hover:scale-105 ${scrolled ? "invert" : ""}`}
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
                className={`text-xs uppercase tracking-[0.2em] font-bold transition-all relative group ${activeSection === item.id ? "opacity-100" : "opacity-60 hover:opacity-100"
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
              onClick={() => openForm()}
              className={`px-8 py-3 text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${scrolled ? "bg-white text-black hover:bg-white/80" : "bg-black text-white hover:bg-black/80"
                }`}
              id="cta-nav"
            >
              Devis Gratuit
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className={`md:hidden p-2 transition-colors ${scrolled ? "text-white" : "text-black"}`} onClick={() => setIsMenuOpen(!isMenuOpen)} id="mobile-menu-btn">
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Menu Sidebar */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/80 z-[100] md:hidden"
              />

              {/* Sidebar */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[280px] bg-black z-[101] md:hidden shadow-2xl flex flex-col border-l border-white/10"
              >
                <div className="p-6 flex justify-between items-center border-b border-white/5">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">Navigation</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="flex flex-col py-8 px-8 gap-6">
                  {[
                    { id: "propos", label: "À propos" },
                    { id: "services", label: "Services" },
                    { id: "valeurs", label: "Valeurs" },
                    { id: "ia", label: "IA" },
                    { id: "contact", label: "Contact" }
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-base font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                <div className="mt-auto p-8 space-y-8 bg-gradient-to-t from-white/[0.02] to-transparent">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-4 bg-white text-black font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white/90 transition-all"
                  >
                    Démarrer un projet
                  </button>

                  <div className="space-y-4">
                    <p className="text-[8px] uppercase tracking-widest font-black opacity-30">Contactez-nous</p>
                    <div className="flex flex-col gap-2">
                      <a href="mailto:contact@nguvu.cm" className="text-[10px] font-medium text-white/50 hover:text-white transition-colors">contact@nguvu.cm</a>
                      <div className="flex gap-4 pt-2">
                        <Instagram className="w-4 h-4 text-white/30 hover:text-white transition-colors" />
                        <Linkedin className="w-4 h-4 text-white/30 hover:text-white transition-colors" />
                        <Facebook className="w-4 h-4 text-white/30 hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex flex-col pt-16 overflow-hidden bg-white">
        <HeroSlideshow />
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full relative z-10 flex flex-col flex-grow justify-start pt-20 lg:pt-32">
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
                className="w-full sm:w-auto px-8 lg:px-12 py-4 lg:py-5 border-2 border-black text-black font-black uppercase text-[10px] sm:text-xs tracking-widest hover:border-black transition-all flex items-center justify-center gap-4 bg-white"
              >
                Nos Services <Cpu className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openForm()}
                className="w-full sm:w-auto px-8 lg:px-12 py-4 lg:py-5 bg-black text-white font-black uppercase text-[10px] sm:text-xs tracking-[0.3em] hover:bg-black/90 transition-all flex items-center justify-center gap-4 border-2 border-transparent"
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
                    <span className="font-display font-black text-xl sm:text-2xl text-black/10 group-hover:text-black transition-colors">0{i + 1}</span>
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
                  className="group flex flex-col bg-white/[0.02] border border-white hover:border-white transition-all duration-700 h-full overflow-hidden cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70" />
                    <div className="absolute top-6 right-8 font-display font-black text-6xl text-white/20 italic">
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
      </section>

      {/* Service Detail Page - Plein écran */}
      <ServiceDetail
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        onContact={(label) => openForm(label)}
      />
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
                  category: "Visibilité IA",
                  title: "Generative Engine Optimization",
                  desc: "Positionnez votre marque dans les réponses des LLM comme ChatGPT, Gemini et Perplexity.",
                  details: ["SEO Sémantique", "Analyse de LLM", "Autorité de Source", "Knowledge Graph", "Structured Data"],
                  avantages: [
                    "Visibilité dans les moteurs de recherche de demain (ChatGPT, Perplexity, Gemini)",
                    "Positionnement comme source d'autorité dans votre secteur",
                    "Trafic qualifié issu des nouvelles requêtes conversationnelles",
                    "Avantage concurrentiel durable sur les marques non optimisées"
                  ],
                  content: (
                    <div className="space-y-6 text-white/70 leading-relaxed">
                      <p className="text-lg">Le <strong className="text-white font-bold">GEO (Generative Engine Optimization)</strong> est la nouvelle frontière du référencement digital. Contrairement au SEO traditionnel qui cible les moteurs de recherche classiques, le GEO vous positionne directement dans les <mark className="bg-white/10 text-white px-1 rounded">réponses générées par les IA</mark> comme ChatGPT, Gemini, Claude et Perplexity.</p>
                      <p>Aujourd'hui, des millions d'utilisateurs posent leurs questions directement à une IA plutôt que d'effectuer une recherche Google. Si votre marque n'est pas <strong className="text-white">citée, référencée ou reconnue</strong> par ces systèmes, vous êtes invisible pour une part croissante de votre audience.</p>
                      <p>Chez NGUVU, nous audions votre <mark className="bg-white/10 text-white px-1 rounded">présence sémantique</mark> actuelle dans les LLM, identifions les gaps, et construisons une stratégie de contenu et de données structurées qui fait de votre marque une <strong className="text-white">source d'autorité incontournable</strong> pour les IA génératives.</p>
                      <p className="text-white/40 text-sm italic border-l-2 border-white/10 pl-4">« Les marques qui dominent le GEO aujourd'hui captureront 80% de l'audience IA de demain. »</p>
                    </div>
                  )
                },
                {
                  tag: "AGT",
                  category: "Automatisation Intelligente",
                  title: "Agents IA Autonomes",
                  desc: "Des agents intelligents qui travaillent pour vous 24h/24, automatisant vos interactions clients et vos processus internes.",
                  details: ["RAG (Retrieval)", "Custom GPTs", "Lead Nurturing", "Chatbots Avancés", "Orchestration Multi-Agent"],
                  avantages: [
                    "Disponibilité 24h/24 — 7j/7 sans coût humain supplémentaire",
                    "Qualification et nurturing automatique des leads entrants",
                    "Réduction du temps de réponse client de 90%",
                    "Scalabilité instantanée sans recrutement"
                  ],
                  content: (
                    <div className="space-y-6 text-white/70 leading-relaxed">
                      <p className="text-lg">Un <strong className="text-white font-bold">Agent IA Autonome</strong> est un programme capable de <mark className="bg-white/10 text-white px-1 rounded">percevoir, raisonner et agir</mark> de manière indépendante pour atteindre un objectif défini. Il ne se contente pas de répondre à des questions — il prend des décisions, exécute des tâches et apprend de ses interactions.</p>
                      <p>Nous concevons des agents sur mesure, intégrés à vos outils existants (CRM, WhatsApp, site web, email), capables de <strong className="text-white">qualifier vos prospects, répondre à vos clients, planifier des rendez-vous</strong> et générer des rapports automatiquement.</p>
                      <p>Grâce à la technologie <mark className="bg-white/10 text-white px-1 rounded">RAG (Retrieval-Augmented Generation)</mark>, vos agents disposent d'une connaissance précise et actualisée de vos produits, services et politiques — garantissant des réponses toujours pertinentes et fiables.</p>
                      <p className="text-white/40 text-sm italic border-l-2 border-white/10 pl-4">« Un agent IA bien configuré vaut une équipe entière de support client. »</p>
                    </div>
                  )
                },
                {
                  tag: "AUT",
                  category: "Efficacité Opérationnelle",
                  title: "Workflows Agentiques",
                  desc: "Automatisation profonde de vos opérations marketing, commerciales et administratives par des orchestrations d'IA.",
                  details: ["Chain of Thought", "Connecteurs API", "Automatisation 360", "N8N / Make", "Webhooks"],
                  avantages: [
                    "Élimination des tâches répétitives à faible valeur ajoutée",
                    "Réduction des erreurs humaines dans les processus critiques",
                    "Gain de temps estimé à 15-30h par semaine par équipe",
                    "Connexion fluide entre tous vos outils (CRM, email, social, analytics)"
                  ],
                  content: (
                    <div className="space-y-6 text-white/70 leading-relaxed">
                      <p className="text-lg">Un <strong className="text-white font-bold">Workflow Agentique</strong> est une chaîne d'IA interconnectées qui <mark className="bg-white/10 text-white px-1 rounded">planifient, exécutent et contrôlent</mark> des processus métier complexes sans intervention humaine constante.</p>
                      <p>Imaginez : un prospect remplit un formulaire sur votre site → un agent IA analyse son profil → envoie un email personnalisé → programme un appel → notifie votre commercial via WhatsApp → mise à jour automatique du CRM. Tout cela en <strong className="text-white">moins de 3 minutes, sans intervention humaine</strong>.</p>
                      <p>Nous utilisons des plateformes comme <mark className="bg-white/10 text-white px-1 rounded">Make, N8N et des LLMs orchestrés</mark> pour créer des pipelines d'automatisation robustes qui s'adaptent à vos processus spécifiques et évoluent avec votre business.</p>
                      <p className="text-white/40 text-sm italic border-l-2 border-white/10 pl-4">« L'automatisation intelligente, c'est libérer votre équipe pour ce qui compte vraiment. »</p>
                    </div>
                  )
                },
                {
                  tag: "ANA",
                  category: "Data & Insights",
                  title: "Intelligence de Données",
                  desc: "Vos données brutes transformées en décisions stratégiques grâce à l'analyse prédictive et au machine learning.",
                  details: ["Scoring Client", "Veille IA", "Prévision Trend", "Dashboard Analytics", "Segmentation IA"],
                  avantages: [
                    "Identification des clients à fort potentiel avant vos concurrents",
                    "Prévisions de ventes et de tendances marché avec haute précision",
                    "Dashboards en temps réel accessibles à toute l'équipe",
                    "Décisions basées sur des données, non sur des intuitions"
                  ],
                  content: (
                    <div className="space-y-6 text-white/70 leading-relaxed">
                      <p className="text-lg">La <strong className="text-white font-bold">donnée est le nouvel actif stratégique</strong> de votre entreprise. Mais sans analyse intelligente, elle reste <mark className="bg-white/10 text-white px-1 rounded">muette et inutilisée</mark>. Nous transformons vos données brutes en intelligence opérationnelle actionnable.</p>
                      <p>Notre approche combine <strong className="text-white">machine learning, analyse comportementale et modèles prédictifs</strong> pour vous donner une vision claire : qui sont vos meilleurs clients, quand ils achètent, pourquoi ils partent, et quels marchés attaquer ensuite.</p>
                      <p>Nous construisons des <mark className="bg-white/10 text-white px-1 rounded">tableaux de bord personnalisés</mark> connectés à vos sources de données (Google Analytics, Meta Ads, CRM, e-commerce) pour offrir à vos équipes une visibilité en temps réel sur leurs <strong className="text-white">KPIs stratégiques</strong>.</p>
                      <p className="text-white/40 text-sm italic border-l-2 border-white/10 pl-4">« Décider sans données, c'est naviguer sans boussole. »</p>
                    </div>
                  )
                },
                {
                  tag: "CRE",
                  category: "Création Augmentée",
                  title: "Créative AI Engine",
                  desc: "Amplifiez votre créativité avec l'IA : génération d'images, de vidéos, de voix et de contenus multimodaux de niveau studio.",
                  details: ["Direction Artistique", "LORA Training", "Multi-modal", "Midjourney / DALL·E", "Sora / Runway"],
                  avantages: [
                    "Production de contenus visuels 10x plus rapide qu'un studio traditionnel",
                    "Cohérence de votre identité visuelle à travers tous vos contenus",
                    "Modèles IA entraînés spécifiquement sur votre charte graphique",
                    "Contenus adaptés à chaque format (Réels, Stories, Ads, Bannières)"
                  ],
                  content: (
                    <div className="space-y-6 text-white/70 leading-relaxed">
                      <p className="text-lg">Le <strong className="text-white font-bold">Créative AI Engine</strong> de NGUVU place l'intelligence artificielle au service de votre vision artistique. Nous ne remplaçons pas la créativité humaine — nous <mark className="bg-white/10 text-white px-1 rounded">l'amplifions à une échelle impossible</mark> à atteindre autrement.</p>
                      <p>Nous entraînons des modèles <strong className="text-white">LoRA personnalisés</strong> sur votre identité visuelle : vos couleurs, votre typographie, vos personnages, vos environnements. Résultat : une IA qui génère des contenus <mark className="bg-white/10 text-white px-1 rounded">100% cohérents avec votre marque</mark>, à la demande.</p>
                      <p>De la génération d'images pour vos campagnes publicitaires à la <strong className="text-white">création de vidéos promotionnelles via Sora ou Runway</strong>, en passant par la clonation vocale pour vos podcasts et spots audio — nous couvrons tout le spectre de la création augmentée.</p>
                      <p className="text-white/40 text-sm italic border-l-2 border-white/10 pl-4">« La créativité sans limites, c'est maintenant une réalité avec l'IA. »</p>
                    </div>
                  )
                },
                {
                  tag: "CUS",
                  category: "UX Personnalisée",
                  title: "Expériences Sur-Mesure",
                  desc: "Des interfaces qui s'adaptent dynamiquement à chaque utilisateur grâce à l'IA — pour une expérience unique et mémorable.",
                  details: ["UI Dynamique", "Recommandation", "Context Engine", "A/B IA", "Personnalisation Temps Réel"],
                  avantages: [
                    "Augmentation du taux de conversion jusqu'à +45% grâce à la personnalisation",
                    "Réduction du taux de rebond par une expérience adaptée au profil de chaque visiteur",
                    "Recommandations produit/service intelligentes qui augmentent le panier moyen",
                    "Fidélisation accrue grâce à une expérience toujours pertinente et personnelle"
                  ],
                  content: (
                    <div className="space-y-6 text-white/70 leading-relaxed">
                      <p className="text-lg">L'<strong className="text-white font-bold">expérience utilisateur personnalisée</strong> est la prochaine révolution UX. Grâce à l'IA, votre site web ou application peut <mark className="bg-white/10 text-white px-1 rounded">s'adapter en temps réel</mark> à chaque visiteur : ses préférences, son comportement, sa localisation, son historique.</p>
                      <p>Nous intégrons des <strong className="text-white">Context Engines</strong> qui analysent en continu les signaux comportementaux pour ajuster dynamiquement le contenu affiché, les recommandations proposées et les CTAs présentés — offrant à chaque utilisateur l'expérience <mark className="bg-white/10 text-white px-1 rounded">qui lui correspond parfaitement</mark>.</p>
                      <p>Combiné à des boucles d'<strong className="text-white">A/B testing pilotées par l'IA</strong>, ce système apprend et s'optimise en permanence, garantissant une amélioration continue de vos métriques d'engagement et de conversion sans intervention manuelle.</p>
                      <p className="text-white/40 text-sm italic border-l-2 border-white/10 pl-4">« Une expérience personnalisée transforme un visiteur en client fidèle. »</p>
                    </div>
                  )
                }
              ].map((item, i) => (
                <FadeInView key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -10, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    onClick={() => setSelectedIA(item)}
                    className="p-10 border border-white/10 bg-white/[0.02] flex flex-col gap-10 group transition-all duration-500 h-full relative overflow-hidden cursor-pointer"
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
                      <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors leading-relaxed italic">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-auto grid grid-cols-1 gap-2 pt-6 border-t border-white/5">
                      {item.details.slice(0, 3).map((detail, j) => (
                        <div key={j} className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-black text-white/30 group-hover:text-white/50">
                          <div className="w-1 h-1 bg-white/20 rounded-full" />
                          {detail}
                        </div>
                      ))}
                      <div className="text-[9px] uppercase tracking-widest font-black text-white/20 group-hover:text-white/40 mt-1">Cliquer pour en savoir plus →</div>
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
                    value={Mail}
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

      {/* WhatsApp Form Global */}
      <WhatsAppForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        serviceLabel={formServiceLabel}
      />

      {/* IA Detail Page */}
      <IADetailPage
        item={selectedIA}
        isOpen={!!selectedIA}
        onClose={() => setSelectedIA(null)}
        onContact={(label) => openForm(label)}
      />
    </div>
  );
}

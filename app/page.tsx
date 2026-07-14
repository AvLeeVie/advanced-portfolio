'use client';

import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(() =>
    typeof window !== "undefined" ? { x: window.innerWidth / 2, y: window.innerHeight / 2 } : { x: 0, y: 0 }
  );
  const [isCursorActive, setIsCursorActive] = useState(true);
  const [rocketPosition, setRocketPosition] = useState(() =>
    typeof window !== "undefined" ? { x: window.innerWidth * 0.82, y: window.innerHeight * 0.2 } : { x: 0, y: 0 }
  );
  const [isDraggingRocket, setIsDraggingRocket] = useState(false);
  const [rocketDragOffset, setRocketDragOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { amount: 0.2, once: false });
  const projectsInView = useInView(projectsRef, { amount: 0.2, once: false });
  const galleryInView = useInView(galleryRef, { amount: 0.2, once: false });
  const achievementsInView = useInView(achievementsRef, { amount: 0.2, once: false });

  useEffect(() => {
    // initialize from localStorage or prefers-color-scheme
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme");
    if (stored === "dark") setIsDarkMode(true);
    else if (stored === "light") setIsDarkMode(false);
    else setIsDarkMode(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);

    const handler = (e: any) => {
      if (e?.detail && typeof e.detail.isDark === "boolean") setIsDarkMode(e.detail.isDark);
      else setIsDarkMode(localStorage.getItem("theme") === "dark");
    };
    window.addEventListener("theme-change", handler as EventListener);
    return () => window.removeEventListener("theme-change", handler as EventListener);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let idleTimer: number | undefined;

    const handlePointerMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
      setIsCursorActive(true);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setIsCursorActive(false), 1200);
    };

    const handlePointerLeave = () => {
      setIsCursorActive(false);
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isCursorActive) return;

    let animationFrame = 0;
    let angle = 0;

    const drift = () => {
      setCursorPosition((prev) => {
        const radius = 90 + Math.sin(angle * 1.4) * 35;
        const nextX = window.innerWidth / 2 + Math.cos(angle) * radius;
        const nextY = window.innerHeight / 2 + Math.sin(angle * 0.8) * radius * 0.6;
        angle += 0.03;
        return { x: nextX, y: nextY };
      });
      animationFrame = window.requestAnimationFrame(drift);
    };

    animationFrame = window.requestAnimationFrame(drift);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [isCursorActive]);

  useEffect(() => {
    if (typeof window === "undefined" || isDraggingRocket) return;

    let animationFrame = 0;
    let time = 0;

    const driftRocket = () => {
      const baseX = window.innerWidth * 0.82;
      const baseY = window.innerHeight * 0.2;

      setRocketPosition((prev) => {
        const targetX = baseX + Math.sin(time * 0.7) * 28;
        const targetY = baseY + Math.cos(time * 0.45) * 20;
        const nextX = prev.x + (targetX - prev.x) * 0.03;
        const nextY = prev.y + (targetY - prev.y) * 0.03;
        time += 0.01;
        return { x: nextX, y: nextY };
      });

      animationFrame = window.requestAnimationFrame(driftRocket);
    };

    animationFrame = window.requestAnimationFrame(driftRocket);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [isDraggingRocket]);

  useEffect(() => {
    if (!isDraggingRocket || typeof window === "undefined") return;

    const handlePointerMove = (event: PointerEvent) => {
      setRocketPosition({ x: event.clientX - rocketDragOffset.x, y: event.clientY - rocketDragOffset.y });
    };

    const handlePointerUp = () => setIsDraggingRocket(false);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isDraggingRocket, rocketDragOffset]);

  const handleRocketPointerDown = (event: any) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    setRocketDragOffset({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    setIsDraggingRocket(true);
  };

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  const lightParticleOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
      events: { onHover: { enable: true, mode: "grab" } },
      modes: {
        grab: { distance: 240, links: { opacity: 0.95, color: "#3b82f6", width: 1.3 } },
      },
    },
    particles: {
      color: { value: ["#3b82f6", "#60a5fa", "#93c5fd", "#0f172a"] },
      links: { color: "#60a5fa", distance: 120, enable: true, opacity: 0.35, width: 1.2 },
      move: {
        enable: true,
        speed: 1.05,
        direction: "none" as const,
        random: true,
        straightLines: { enable: false },
        outModes: { default: "out" as const },
      },
      number: { value: 95, density: { enable: true, area: 750 } },
      opacity: { value: { min: 0.25, max: 0.85 } },
      shape: {
        type: ["circle", "square", "polygon"],
        options: {
          square: { fill: true },
          polygon: { sides: 5 },
        },
      },
      size: { value: { min: 2, max: 5 } },
      rotate: { enable: true, direction: "random" as const, animation: { enable: true, speed: 0.8 } },
    },
    detectRetina: true,
  };

  const darkParticleOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
      events: { onHover: { enable: true, mode: "grab" } },
      modes: {
        grab: { distance: 280, links: { opacity: 0.98, color: "#7dd3fc", width: 1.5 } },
      },
    },
    particles: {
      color: { value: ["#f8fafc", "#bae6fd", "#7dd3fc", "#38bdf8", "#0284c7", "#0ea5e9"] },
      links: { color: "#7dd3fc", distance: 120, enable: true, opacity: 0.28, width: 1.1 },
      move: {
        enable: true,
        speed: 0.95,
        direction: "none" as const,
        random: true,
        straightLines: { enable: false },
        outModes: { default: "out" as const },
      },
      number: { value: 80, density: { enable: true, area: 750 } },
      opacity: { value: { min: 0.3, max: 0.98 } },
      shape: {
        type: ["polygon", "circle", "square"],
        options: {
          polygon: { sides: 6 },
          square: { fill: true },
        },
      },
      size: { value: { min: 3, max: 8 } },
      rotate: { enable: true, direction: "random" as const, animation: { enable: true, speed: 1.0 } },
    },
    detectRetina: true,
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={`relative min-h-screen font-sans overflow-x-hidden transition-colors ${isDarkMode ? 'duration-[300ms]' : 'duration-[2000ms]'} ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
      <Head>
        <title>Dustin Oliganga</title>
        <style>{`
          .theme-switch { --toggle-size: 20px; --container-width: 5.625em; --container-height: 2.5em; --container-radius: 0.38em; --container-light-bg: #5caad4; --container-night-bg: #1b1e36; --circle-container-diameter: 3.375em; --sun-moon-diameter: 2.125em; --sun-bg: #f5c518; --moon-bg: #d8d4c0; --spot-color: #9b9787; --circle-container-offset: calc((var(--circle-container-diameter) - var(--container-height)) / 2 * -1); display: inline-block; }
          @media (max-width: 640px) {
            .theme-switch {
              --toggle-size: 18px;
              --container-width: 4.3em;
              --container-height: 1.9em;
              --container-radius: 0.3em;
              --circle-container-diameter: 2.65em;
              --sun-moon-diameter: 1.65em;
            }
          }
          .theme-switch__container { width: var(--container-width); height: var(--container-height); background-color: var(--container-light-bg); border-radius: var(--container-radius); overflow: hidden; cursor: pointer; position: relative; background-image: linear-gradient(to bottom, var(--container-light-bg) 0%, #4a92bd 100%); transition: all 0.5s; box-shadow: 0 0 0 2px rgba(0,0,0,0.1); }
          .theme-switch__checkbox { display: none; }
          .theme-switch__circle-container { width: var(--circle-container-diameter); height: var(--circle-container-diameter); background-color: rgba(255, 255, 255, 0.1); position: absolute; left: var(--circle-container-offset); top: var(--circle-container-offset); border-radius: var(--container-radius); display: flex; transition: 0.3s; pointer-events: none; }
          .theme-switch__sun-moon-container { pointer-events: auto; position: relative; z-index: 2; width: var(--sun-moon-diameter); height: var(--sun-moon-diameter); margin: auto; border-radius: var(--container-radius); background-color: var(--sun-bg); overflow: hidden; transition: 0.5s; }
          .theme-switch__moon { transform: translateX(100%); width: 100%; height: 100%; background-color: var(--moon-bg); border-radius: inherit; transition: all 0.5s; position: relative; }
          .theme-switch__checkbox:checked + .theme-switch__container { background-color: var(--container-night-bg); }
          .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container { left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter)); }
          .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__moon { transform: translate(0); }
        `}</style>
      </Head>

      {/* The Blue Expansion Effect */}
      <div 
        className={`fixed z-[-10] top-1/2 left-1/2 w-[100px] h-[100px] rounded-full transition-all ease-in-out pointer-events-none ${isDarkMode ? 'duration-[300ms] scale-[25] opacity-50' : 'duration-[2000ms] scale-0 opacity-0'}`}
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', transform: 'translate(-50%, -50%)' }}
      ></div>

      <div className={`fixed inset-0 -z-50 transition-colors ${isDarkMode ? 'duration-[300ms] bg-[#030712]' : 'duration-[2000ms] bg-gradient-to-br from-slate-100 via-sky-100 to-cyan-200'}`}></div>
      {!isDarkMode && (
        <div className="hidden sm:block fixed top-10 left-1/2 -translate-x-1/2 w-[360px] md:w-[520px] md:h-[520px] h-[360px] rounded-full opacity-70 pointer-events-none -z-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 55%)' }}
        ></div>
      )}

      <div
        className="pointer-events-none fixed z-[-30] rounded-full mix-blend-screen blur-[80px] opacity-70 transition-transform duration-300"
        style={{
          width: isDarkMode ? 320 : 260,
          height: isDarkMode ? 320 : 260,
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: 'translate(-50%, -50%)',
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(125, 211, 252, 0.55) 0%, rgba(56, 189, 248, 0.25) 35%, rgba(2, 132, 199, 0.1) 60%, transparent 100%)'
            : 'radial-gradient(circle, rgba(147, 197, 253, 0.65) 0%, rgba(96, 165, 250, 0.3) 35%, rgba(59, 130, 246, 0.12) 60%, transparent 100%)',
          boxShadow: isDarkMode
            ? '0 0 120px 40px rgba(56, 189, 248, 0.18)'
            : '0 0 120px 40px rgba(96, 165, 250, 0.16)',
        }}
      />

      <div
        className="pointer-events-none fixed z-[-25] rounded-full blur-[70px] opacity-40"
        style={{
          width: isDarkMode ? 180 : 140,
          height: isDarkMode ? 180 : 140,
          left: cursorPosition.x + 26,
          top: cursorPosition.y - 24,
          transform: 'translate(-50%, -50%)',
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(186,230,253,0.3) 30%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(191,219,254,0.25) 30%, transparent 70%)',
        }}
      />

      <div
        className={`fixed z-[15] select-none transition-transform duration-200 ${isDraggingRocket ? 'scale-95' : 'scale-100'}`}
        style={{ left: rocketPosition.x, top: rocketPosition.y, transform: 'translate(-50%, -50%)' }}
        onPointerDown={handleRocketPointerDown}
      >
        <div className="relative flex items-center justify-center">
          <div className={`absolute inset-0 rounded-full blur-[24px] ${isDarkMode ? 'bg-cyan-400/25' : 'bg-sky-300/35'}`} style={{ width: 92, height: 92 }} />
          <div className={`absolute inset-2 rounded-full blur-[20px] ${isDarkMode ? 'bg-sky-200/20' : 'bg-white/35'}`} style={{ width: 72, height: 72 }} />
          <svg
            viewBox="0 0 128 128"
            className="relative h-16 w-16 drop-shadow-[0_0_18px_rgba(96,165,250,0.45)]"
            aria-label="Draggable rocket"
          >
            <path d="M64 16c12 18 26 34 38 48-11 1-23 4-33 8l-5 3-5-3c-10-4-22-7-33-8 12-14 26-30 38-48Z" fill={isDarkMode ? "#f8fafc" : "#0f172a"} />
            <path d="M44 72c8 5 16 8 20 10 4-2 12-5 20-10l8 18c-8 4-16 6-28 6-12 0-20-2-28-6l8-18Z" fill={isDarkMode ? "#7dd3fc" : "#3b82f6"} />
            <path d="M46 64c9-3 17-5 18-5 1 0 9 2 18 5l-4 21c-4 2-9 3-14 3-5 0-10-1-14-3l-4-21Z" fill={isDarkMode ? "#bae6fd" : "#93c5fd"} />
            <path d="M64 38c7 8 11 14 12 20-5 2-12 3-12 3s-7-1-12-3c1-6 5-12 12-20Z" fill={isDarkMode ? "#e2e8f0" : "#eff6ff"} />
            <path d="M57 18c2 4 4 7 7 10 0 0-2 1-7 1-5 0-7-1-7-1 3-3 5-6 7-10Z" fill={isDarkMode ? "#38bdf8" : "#60a5fa"} />
            <path d="M64 24l6 8h-12l6-8Z" fill={isDarkMode ? "#0f172a" : "#1e3a8a"} />
          </svg>
        </div>
      </div>

      {/* Theme switch moved to global layout */}

      <Particles
        id="tsparticles"
        key={isDarkMode ? 'dark' : 'light'}
        init={particlesInit}
        options={isDarkMode ? darkParticleOptions : lightParticleOptions}
        className="fixed inset-0 -z-40"
      />

      {isDarkMode && (
        <div className="hidden md:block fixed -bottom-40 -right-20 w-[640px] h-[640px] md:w-[900px] md:h-[900px] pointer-events-none -z-30 flex items-center justify-center translate-x-1/4 translate-y-1/4">
          <div 
            className="absolute w-[1000px] h-[1000px] rounded-full animate-[spin_60s_linear_infinite]"
            style={{
              transform: 'rotateX(70deg) rotateZ(-20deg)',
              background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(186,230,253,1) 5%, rgba(14,165,233,0.8) 15%, rgba(15,23,42,0.8) 30%, rgba(2,6,23,0.6) 50%, transparent 70%)',
              boxShadow: '0 0 100px 50px rgba(14, 165, 233, 0.2), inset 0 0 80px 40px rgba(15, 23, 42, 0.4)',
              maskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
            }}
          >
            <div className="absolute inset-0 rounded-full opacity-80" style={{ backgroundImage: 'radial-gradient(1.5px 1.5px at 20% 30%, #fff, transparent), radial-gradient(2px 2px at 60% 20%, #38bdf8, transparent)', backgroundSize: '120px 120px' }}></div>
            <div className="absolute inset-0 rounded-full opacity-60 animate-[spin_120s_linear_infinite_reverse]" style={{ backgroundImage: 'radial-gradient(2px 2px at 15% 25%, #bae6fd, transparent), radial-gradient(3px 3px at 50% 60%, #fff, transparent)', backgroundSize: '80px 80px' }}></div>
            <div className="absolute inset-0 rounded-full opacity-40 animate-[spin_80s_linear_infinite]" style={{ backgroundImage: 'radial-gradient(1px 1px at 30% 20%, #fff, transparent), radial-gradient(2px 2px at 50% 50%, #bae6fd, transparent)', backgroundSize: '40px 40px' }}></div>
          </div>
          <div className="absolute w-40 h-40 bg-white rounded-full blur-[30px] opacity-90 shadow-[0_0_80px_40px_rgba(255,255,255,0.8)]"></div>
          <div className="absolute w-72 h-72 bg-cyan-200 rounded-full blur-[60px] opacity-60"></div>
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-30"></div>
        </div>
      )}

      <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 md:py-16 flex flex-col gap-8 sm:gap-14 md:gap-24 pt-16 sm:pt-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
          <div id="about" className="absolute -top-28" aria-hidden="true"></div>
          <motion.section
            id="frontpage"
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            exit="hidden"
            variants={revealVariants}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            className="scroll-mt-28 flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 lg:gap-10 min-h-auto sm:min-h-[60vh] mt-6 sm:mt-10"
          >
            <div className="w-full flex-1 lg:max-w-[34%] self-center text-center lg:text-right space-y-3 sm:space-y-6 lg:flex lg:flex-col lg:justify-center lg:-mt-16">
            <h2 className={`text-2xl sm:text-3xl font-black transition-colors ${isDarkMode ? 'duration-[300ms] text-white' : 'duration-[2000ms] text-slate-800'}`}>The Engineer</h2>
            <p className={`font-sans text-sm sm:text-base leading-7 transition-colors border-r-0 sm:border-r-4 pr-0 sm:pr-4 ${isDarkMode ? 'duration-[300ms] text-cyan-400 sm:border-cyan-500' : 'duration-[2000ms] text-slate-800 sm:border-blue-500'}`}>
              BS Computer Science
              <br/>Godot 4 Developer
              <br/>Interactive Media Specialist
              <br/>Frontend UI Developer
              <br/>GDScript Specialist
              <span className={`block mt-4 text-xs italic ${isDarkMode ? 'text-slate-300/80' : 'text-slate-700'}`}>Bridging the gap between practical software utility and engaging 2D tactical mechanics.</span>
            </p>
          </div>
          
          <div className="shrink-0 flex flex-col items-center justify-center gap-3 overflow-visible">
            <div className="relative overflow-visible">
              <div className={`absolute -inset-3 sm:-inset-4 rounded-full border-2 border-dashed animate-[spin_10s_linear_infinite] transition-colors ${isDarkMode ? 'duration-[300ms] border-cyan-500/50' : 'duration-[2000ms] border-blue-400'}`}></div>
              <div className={`absolute -inset-6 sm:-inset-8 rounded-full border-2 border-dotted animate-[spin_15s_linear_infinite_reverse] opacity-50 transition-colors ${isDarkMode ? 'duration-[300ms] border-sky-400/50' : 'duration-[2000ms] border-blue-300'}`}></div>
              <div className={`relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 z-10 flex items-center justify-center transition-all ${isDarkMode ? 'duration-[300ms] border-cyan-600 shadow-[0_0_60px_rgba(14,165,233,0.5)] bg-slate-900' : 'duration-[2000ms] border-blue-600 shadow-[0_0_40px_rgba(59,130,246,0.6)] bg-slate-100'}`}>
                <Image src="/dustin-profile.jpg" alt="Dustin Lee A. Oliganga" width={300} height={300} className="w-full h-full object-cover"/>
              </div>
            </div>
            <div className="text-center px-2">
              <p className="hero-name text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500 break-words">Dustin Lee A. Oliganga</p>
            </div>
          </div>

          <div className="w-full flex-1 lg:max-w-[34%] self-center text-center lg:text-left space-y-3 sm:space-y-6 lg:flex lg:flex-col lg:justify-center lg:-mt-16">
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tighter transition-colors ${isDarkMode ? 'duration-[300ms] text-white' : 'duration-[2000ms] text-slate-800'}`}>The Leader</h2>
            <p className={`font-sans text-sm sm:text-base leading-7 transition-colors border-l-0 sm:border-l-4 pl-0 sm:pl-4 ${isDarkMode ? 'duration-[300ms] text-cyan-400 sm:border-cyan-500' : 'duration-[2000ms] text-slate-800 sm:border-blue-500'}`}>
              Former CSS Mayor
              <br/>Former CITE Congressman
              <br/>Former Student Adviser CSS
              <br/>USSC Senator
              <br/>CSE Professional Passer
              <span className={`block mt-4 text-xs italic ${isDarkMode ? 'text-slate-300/80' : 'text-slate-700'}`}>East-South leadership philosophy focused on sustainable, student-led innovation and collaboration.</span>
            </p>
          </div>
          </motion.section>
        </motion.div>

        <motion.section
          id="projects"
          ref={projectsRef}
          initial="hidden"
          animate={projectsInView ? "visible" : "hidden"}
          exit="hidden"
          variants={revealVariants}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className={`scroll-mt-28 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border shadow-2xl relative overflow-hidden group transition-all ${isDarkMode ? 'duration-[300ms] bg-slate-900/55 border-blue-900/50' : 'duration-[2000ms] bg-white/60 border-slate-200/70'}`}
        >
          <div className={`absolute top-0 left-0 w-full h-1 group-hover:scale-x-110 transition-transform duration-1000 origin-left ${isDarkMode ? 'bg-gradient-to-r from-cyan-600 to-blue-500' : 'bg-gradient-to-r from-blue-400 to-blue-600'}`}></div>
          <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 transition-colors ${isDarkMode ? 'duration-[300ms] text-cyan-400' : 'duration-[2000ms] text-blue-600'}`}>01. Projects & Experience</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <article className={`theme-box border p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-[2000ms] backdrop-blur-md ${isDarkMode ? 'bg-slate-800/40 border-blue-900/30 shadow-[0_0_40px_rgba(14,165,233,0.08)]' : 'bg-white/70 border-slate-300/70 shadow-[0_20px_50px_-30px_rgba(14,165,233,0.45)]'}`}>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className={`text-xs uppercase tracking-[0.25em] mb-2 ${isDarkMode ? 'text-cyan-400/80' : 'text-blue-500'}`}>01</p>
                  <h4 className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>S.P.A.R.K. Learning Application</h4>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>ASL Gamified Web App</p>
                </div>
              </div>
              <p className={`font-sans text-sm leading-7 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                A web-based gamified American Sign Language educational platform that includes an animated talking mascot named “Sparky” to guide learners through interactive lessons.
              </p>
            </article>

            <article className={`theme-box border p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-[2000ms] backdrop-blur-md ${isDarkMode ? 'bg-slate-800/40 border-blue-900/30 shadow-[0_0_40px_rgba(14,165,233,0.08)]' : 'bg-white/70 border-slate-300/70 shadow-[0_20px_50px_-30px_rgba(14,165,233,0.45)]'}`}>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className={`text-xs uppercase tracking-[0.25em] mb-2 ${isDarkMode ? 'text-cyan-400/80' : 'text-blue-500'}`}>02</p>
                  <h4 className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Slimy Adventure</h4>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>3D Godot Game</p>
                </div>
              </div>
              <p className={`font-sans text-sm leading-7 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                A 3D game built with Godot Engine featuring custom character state machines, movement physics, and dynamic enemy AI scripts to reinforce engaging gameplay and realistic action.
              </p>
            </article>

            <article className={`theme-box border p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-[2000ms] backdrop-blur-md ${isDarkMode ? 'bg-slate-800/40 border-blue-900/30 shadow-[0_0_40px_rgba(14,165,233,0.08)]' : 'bg-white/70 border-slate-300/70 shadow-[0_20px_50px_-30px_rgba(14,165,233,0.45)]'}`}>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className={`text-xs uppercase tracking-[0.25em] mb-2 ${isDarkMode ? 'text-cyan-400/80' : 'text-blue-500'}`}>03</p>
                  <h4 className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Corruption Tactics</h4>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>2D Fighting Game</p>
                </div>
              </div>
              <p className={`font-sans text-sm leading-7 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                A 2D fighting game exploring tactical combat mechanics, complex collision frame data, character state machines, and custom combat logic systems for responsive action.
              </p>
            </article>
          </div>
        </motion.section>

        <motion.section
          id="visuals"
          ref={galleryRef}
          initial="hidden"
          animate={galleryInView ? "visible" : "hidden"}
          exit="hidden"
          variants={revealVariants}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="scroll-mt-28"
        >
          <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 transition-colors ${isDarkMode ? 'duration-[300ms] text-cyan-400' : 'duration-[2000ms] text-blue-600'}`}>02. Visual matrix</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <article className={`theme-box sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-2 rounded-2xl border-2 border-dashed p-4 sm:p-6 transition-colors ${isDarkMode ? 'duration-[300ms] bg-[#080f26]/40 border-blue-900/50 text-blue-700' : 'duration-[2000ms] bg-white border-slate-200 text-slate-800 shadow-sm'}`}>
              <h4 className="text-xl font-semibold mb-3">Systems & UI concepts</h4>
              <p className={`text-sm leading-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                Design explorations for polished overlays, HUD layouts, and readable visual systems that support gameplay clarity.
              </p>
            </article>
            <article className={`theme-box rounded-2xl border-2 border-dashed p-4 sm:p-6 transition-colors ${isDarkMode ? 'duration-[300ms] bg-[#080f26]/40 border-blue-900/50 text-blue-200' : 'duration-[2000ms] bg-white border-slate-300 text-slate-900 shadow-sm'}`}>
              <h4 className="text-lg font-semibold mb-2">Prototype visuals</h4>
              <p className={`text-sm leading-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                Early in-engine assets and motion explorations that show character movement, scene flow, and interaction polish.
              </p>
            </article>
            <article className={`theme-box rounded-2xl border-2 border-dashed p-6 transition-colors ${isDarkMode ? 'duration-[300ms] bg-[#080f26]/40 border-blue-900/50 text-blue-200' : 'duration-[2000ms] bg-white border-slate-300 text-slate-900 shadow-sm'}`}>
              <h4 className="text-lg font-semibold mb-2">Gameplay mood</h4>
              <p className={`text-sm leading-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                Visual mood boards and colour studies that explore atmosphere, lighting, and player focus for every scene.
              </p>
            </article>
            <article className={`theme-box rounded-2xl border-2 border-dashed p-6 transition-colors ${isDarkMode ? 'duration-[300ms] bg-[#080f26]/40 border-blue-900/50 text-blue-200' : 'duration-[2000ms] bg-white border-slate-300 text-slate-900 shadow-sm'}`}>
              <h4 className="text-lg font-semibold mb-2">Design process</h4>
              <p className={`text-sm leading-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                Iteration notes, wireframes, and feature breakdowns showing how each visual system was planned and refined.
              </p>
            </article>
          </div>
        </motion.section>

        <motion.section
          id="achievements"
          ref={achievementsRef}
          initial="hidden"
          animate={achievementsInView ? "visible" : "hidden"}
          exit="hidden"
          variants={revealVariants}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="scroll-mt-28 mb-20"
        >
          <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 transition-colors ${isDarkMode ? 'duration-[300ms] text-cyan-400' : 'duration-[2000ms] text-blue-600'}`}>03. Achievements</h3>
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="grid gap-6">
              <section className={`theme-box p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-[2000ms] ${isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-blue-950' : 'bg-gradient-to-br from-white to-blue-50 border-slate-200'}`}>
                <h4 className={`text-lg font-bold mb-4 transition-colors ${isDarkMode ? 'duration-[300ms] text-cyan-400' : 'duration-[2000ms] text-blue-600'}`}>Education</h4>
                <div className={`space-y-3 font-sans text-sm leading-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                  <p><span className="font-semibold">BS Computer Science</span> — Nueva Vizcaya State University (NVSU), Bayombong, Nueva Vizcaya | 2023 – Present</p>
                  <p><span className="font-semibold">Senior High School (STEM)</span> — Saint Theresita&apos;s Academy (STA), Aritao, Nueva Vizcaya | 2021 – 2023</p>
                  <p><span className="font-semibold">Junior High School</span> — Immaculate Conception Academy (ICA), Aritao, Nueva Vizcaya | 2017 – 2021</p>
                  <p><span className="font-semibold">Elementary Education</span> — Bone North Elementary School (BNES), Aritao, Nueva Vizcaya | 2011 – 2017</p>
                </div>
              </section>

              <section className={`theme-box p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-[2000ms] ${isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-blue-950' : 'bg-gradient-to-br from-white to-blue-50 border-slate-200'}`}>
                <h4 className={`text-lg font-bold mb-4 transition-colors ${isDarkMode ? 'duration-[300ms] text-cyan-400' : 'duration-[2000ms] text-blue-600'}`}>Qualifications</h4>
                <p className={`font-sans text-sm leading-7 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                  A dynamic, visionary, and results-driven student leader with a deep-rooted commitment to service and excellence. Grounded in an empathetic leadership style, I bridge technical innovation and social responsibility while managing high-level governance roles and international technical engagements.
                </p>
              </section>

              <section className={`theme-box p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-[2000ms] ${isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-blue-950' : 'bg-gradient-to-br from-white to-blue-50 border-slate-200'}`}>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className={`text-lg font-bold mb-4 transition-colors ${isDarkMode ? 'duration-[300ms] text-cyan-400' : 'duration-[2000ms] text-blue-600'}`}>Leadership & Experience</h4>
                    <ul className={`space-y-3 font-sans text-sm leading-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                      <li>Student Adviser, Computer Studies Society (CSS), NVSU | 2026 – Present</li>
                      <li>Business Manager, Nueva Vizcaya Filmmakers Association | 2025 – Present</li>
                      <li>Congressman, CITE USSC, NVSU | 2025 – 2026</li>
                      <li>Mayor, Computer Studies Society (CSS), NVSU | 2024 – 2025</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold mb-4 transition-colors ${isDarkMode ? 'duration-[300ms] text-cyan-400' : 'duration-[2000ms] text-blue-600'}`}>Achievements</h4>
                    <ul className={`space-y-3 font-sans text-sm leading-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                      <li>Career Service Professional Eligible (CSE-PPT Passer)</li>
                      <li>Consistent Dean’s Lister, NVSU | 2023 – 2026</li>
                      <li>Lead Systems Implementer, University-Wide Mass Work Activity | Feb 2026</li>
                      <li>Verified Badge: Identifying Your Leadership Strengths, KMUTT | Jan 2026</li>
                      <li>Champion, Nueva Vizcaya Film Festival | 2025</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className={`theme-box p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-[2000ms] ${isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-blue-950' : 'bg-gradient-to-br from-white to-blue-50 border-slate-200'}`}>
                <h4 className={`text-lg font-bold mb-4 transition-colors ${isDarkMode ? 'duration-[300ms] text-cyan-400' : 'duration-[2000ms] text-blue-600'}`}>Conferences & Seminars</h4>
                <div className={`grid gap-6 sm:grid-cols-2 font-sans text-sm leading-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                  <div>
                    <p className="font-semibold">International</p>
                    <ul className="mt-3 space-y-2">
                      <li>GCI World 2026: Data Science and AI | Tokyo, Japan</li>
                      <li>Dunong 2026 Participant | JPN</li>
                      <li>Leadership Strengths Workshop | Thailand | Jan 2026</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">National & Regional</p>
                    <ul className="mt-3 space-y-2">
                      <li>DYCI ALAB Robotics & VEX Seminar | 2026</li>
                      <li>Western Digital Technical Seminar | 2026</li>
                      <li>Hytec Power Industrial Technology Conference | 2026</li>
                      <li>Regional Science and Technology Week '25 | NVSU</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <div className={`theme-box p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-[2000ms] ${isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-blue-950' : 'bg-gradient-to-br from-white to-blue-50 border-slate-200'}`}>
                <h4 className={`text-lg font-bold mb-4 transition-colors ${isDarkMode ? 'duration-[300ms] text-cyan-400' : 'duration-[2000ms] text-blue-600'}`}>Volunteerism & Activities</h4>
                <ul className={`space-y-3 font-sans text-sm leading-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                  <li>Participant / Volunteer DAR Pelikularyo | 2025 – 2026</li>
                  <li>Organizer / Volunteer CSS Outreach Program – Paitan Labbu Elementary School</li>
                  <li>Organizer / Volunteer CSS Tree Planting Activity – Busilac, Bayombong | Nov 2024</li>
                </ul>
              </div>
            </aside>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
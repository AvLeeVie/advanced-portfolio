'use client';

import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  const lightParticleOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
      events: { onHover: { enable: true, mode: "grab" } },
      modes: { grab: { distance: 200, links: { opacity: 0.8 } } },
    },
    particles: {
      color: { value: "#3b82f6" },
      links: { color: "#3b82f6", distance: 150, enable: true, opacity: 0.4, width: 1.5 },
      move: { enable: true, speed: 1.5, direction: "none" as const, outModes: { default: "out" as const } },
      number: { value: 70, density: { enable: true, area: 800 } },
      opacity: { value: 0.6 }, 
      shape: { type: "circle" },
      size: { value: { min: 3, max: 6 } },
    },
    detectRetina: true,
  };

  const darkParticleOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
      events: { onHover: { enable: true, mode: "grab" } },
      modes: { grab: { distance: 250, links: { opacity: 0.8, color: "#38bdf8", width: 2 } } },
    },
    particles: {
      color: { value: ["#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8", "#0284c7"] },
      links: { color: "#0284c7", distance: 150, enable: true, opacity: 0.2, width: 1.5 },
      move: { enable: true, speed: 0.8, direction: "none" as const, outModes: { default: "out" as const } },
      number: { value: 60, density: { enable: true, area: 800 } },
      opacity: { value: 0.9 }, 
      shape: { type: ["polygon", "circle"], options: { polygon: { sides: 6 } } },
      size: { value: { min: 4, max: 9 } },
      rotate: { enable: true, direction: "random" as const, animation: { enable: true, speed: 1 } }
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
          style={{ background: 'radial-gradient(circle, rgba(56,ss189,248,0.18) 0%, transparent 55%)' }}
        ></div>
      )}

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

      <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 md:py-16 flex flex-col gap-8 sm:gap-14 md:gap-24 pt-14 sm:pt-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
          <motion.section
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            exit="hidden"
            variants={revealVariants}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 lg:gap-10 min-h-auto sm:min-h-[60vh] mt-4 sm:mt-10"
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
          ref={projectsRef}
          initial="hidden"
          animate={projectsInView ? "visible" : "hidden"}
          exit="hidden"
          variants={revealVariants}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className={`backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border shadow-2xl relative overflow-hidden group transition-all ${isDarkMode ? 'duration-[300ms] bg-gradient-to-br from-slate-900 to-slate-950 border-blue-950' : 'duration-[2000ms] bg-gradient-to-br from-white via-slate-50 to-sky-100 border-slate-200'}`}
        >
          <div className={`absolute top-0 left-0 w-full h-1 group-hover:scale-x-110 transition-transform duration-1000 origin-left ${isDarkMode ? 'bg-gradient-to-r from-cyan-600 to-blue-500' : 'bg-gradient-to-r from-blue-400 to-blue-600'}`}></div>
          <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 transition-colors ${isDarkMode ? 'duration-[300ms] text-cyan-400' : 'duration-[2000ms] text-blue-600'}`}>01. Projects & Experience</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <article className={`theme-box border p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-[2000ms] ${isDarkMode ? 'bg-slate-800/60 border-blue-900/40' : 'bg-white border-slate-300 shadow-[0_20px_50px_-30px_rgba(14,165,233,0.45)]'}`}>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <h4 className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>S.P.A.R.K. Learning Application</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>ASL Gamified Web App</p>
                </div>
              </div>
              <p className={`font-sans text-sm leading-7 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                A web-based gamified American Sign Language educational platform that includes an animated talking mascot named “Sparky” to guide learners through interactive lessons.
              </p>
            </article>

            <article className={`theme-box border p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-[2000ms] ${isDarkMode ? 'bg-slate-800/60 border-blue-900/40' : 'bg-white border-slate-300 shadow-[0_20px_50px_-30px_rgba(14,165,233,0.45)]'}`}>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <h4 className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Slimy Adventure</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>3D Godot Game</p>
                </div>
              </div>
              <p className={`font-sans text-sm leading-7 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                A 3D game built with Godot Engine featuring custom character state machines, movement physics, and dynamic enemy AI scripts to reinforce engaging gameplay and realistic action.
              </p>
            </article>

            <article className={`theme-box border p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-[2000ms] ${isDarkMode ? 'bg-slate-800/60 border-blue-900/40' : 'bg-white border-slate-300 shadow-[0_20px_50px_-30px_rgba(14,165,233,0.45)]'}`}>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <h4 className={`text-xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Corruption Tactics</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>2D Fighting Game</p>
                </div>
              </div>
              <p className={`font-sans text-sm leading-7 ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                A 2D fighting game exploring tactical combat mechanics, complex collision frame data, character state machines, and custom combat logic systems for responsive action.
              </p>
            </article>
          </div>
        </motion.section>

        <motion.section
          ref={galleryRef}
          initial="hidden"
          animate={galleryInView ? "visible" : "hidden"}
          exit="hidden"
          variants={revealVariants}
          transition={{ duration: 0.75, ease: "easeInOut" }}
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
          ref={achievementsRef}
          initial="hidden"
          animate={achievementsInView ? "visible" : "hidden"}
          exit="hidden"
          variants={revealVariants}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="mb-20"
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
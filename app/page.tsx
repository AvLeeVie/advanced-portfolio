'use client';

import Head from 'next/head';
import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className={`relative min-h-screen font-sans overflow-hidden transition-colors ${isDarkMode ? 'duration-[300ms]' : 'duration-[2000ms]'} ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
      <Head>
        <title>Dustin Lee A. Oliganga | Tech Portfolio</title>
        <style>{`
          .theme-switch { --toggle-size: 20px; --container-width: 5.625em; --container-height: 2.5em; --container-radius: 0.38em; --container-light-bg: #5caad4; --container-night-bg: #1b1e36; --circle-container-diameter: 3.375em; --sun-moon-diameter: 2.125em; --sun-bg: #f5c518; --moon-bg: #d8d4c0; --spot-color: #9b9787; --circle-container-offset: calc((var(--circle-container-diameter) - var(--container-height)) / 2 * -1); display: inline-block; }
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

      <div className={`fixed inset-0 -z-50 transition-colors ${isDarkMode ? 'duration-[300ms] bg-[#030712]' : 'duration-[2000ms] bg-gradient-to-br from-white to-blue-50'}`}></div>

      {/* Theme switch moved to global layout */}

      <Particles
        id="tsparticles"
        key={isDarkMode ? 'dark' : 'light'}
        init={particlesInit}
        options={isDarkMode ? darkParticleOptions : lightParticleOptions}
        className="fixed inset-0 -z-40"
      />

      {isDarkMode && (
        <div className="fixed -bottom-40 -right-20 w-[900px] h-[900px] pointer-events-none -z-30 flex items-center justify-center translate-x-1/4 translate-y-1/4">
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

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex flex-col gap-24">
        <motion.section initial="hidden" animate="visible" variants={revealVariants} className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 min-h-[60vh] mt-10">
          <div className="flex-1 text-center lg:text-right space-y-4 animate-[pulse_4s_ease-in-out_infinite]">
            <h2 className={`text-3xl font-black uppercase transition-colors ${isDarkMode ? 'duration-[300ms] text-white' : 'duration-[2000ms] text-slate-800'}`}>The Engineer</h2>
            <p className={`font-mono text-sm border-r-4 pr-4 transition-colors ${isDarkMode ? 'duration-[300ms] text-cyan-400 border-cyan-500' : 'duration-[2000ms] text-slate-600 border-blue-500'}`}>
              Bridging the gap between practical software utility and engaging 2D tactical mechanics.
              <br/><br/>
              BS Computer Science
              <br/>Godot 4 Developer
              <br/>Interactive Media Specialist
              <br/>Frontend UI Developer
              <br/>GDScript Specialist
            </p>
          </div>
          
          <div className="relative shrink-0">
            <div className={`absolute -inset-4 rounded-full border-2 border-dashed animate-[spin_10s_linear_infinite] transition-colors ${isDarkMode ? 'duration-[300ms] border-cyan-500/50' : 'duration-[2000ms] border-blue-400'}`}></div>
            <div className={`absolute -inset-8 rounded-full border-2 border-dotted animate-[spin_15s_linear_infinite_reverse] opacity-50 transition-colors ${isDarkMode ? 'duration-[300ms] border-sky-400/50' : 'duration-[2000ms] border-blue-300'}`}></div>
            <div className={`w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 relative z-10 flex items-center justify-center transition-all ${isDarkMode ? 'duration-[300ms] border-cyan-600 shadow-[0_0_60px_rgba(14,165,233,0.5)] bg-slate-900' : 'duration-[2000ms] border-blue-600 shadow-[0_0_40px_rgba(59,130,246,0.6)] bg-slate-100'}`}>
              <Image src="/dustin-profile.jpg" alt="Dustin Lee A. Oliganga" width={300} height={300} className="w-full h-full object-cover"/>
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left space-y-4 animate-[pulse_5s_ease-in-out_infinite_reverse]">
            <h2 className={`text-3xl font-black tracking-tighter uppercase transition-colors ${isDarkMode ? 'duration-[300ms] text-white' : 'duration-[2000ms] text-slate-800'}`}>The Leader</h2>
            <p className={`font-mono text-sm border-l-4 pl-4 transition-colors ${isDarkMode ? 'duration-[300ms] text-cyan-400 border-cyan-500' : 'duration-[2000ms] text-slate-600 border-blue-500'}`}>
              East-South leadership philosophy focused on sustainable, student-led innovation and collaboration.
              <br/><br/>
              CSS Mayor
              <br/>CITE Congressman
              <br/>Senator
              <br/>Northern Campus SSC
              <br/>CSE Professional Passer
            </p>
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={revealVariants} className={`backdrop-blur-md p-10 rounded-3xl border shadow-2xl relative overflow-hidden group transition-all ${isDarkMode ? 'duration-[300ms] bg-gradient-to-br from-slate-900 to-slate-950 border-blue-950' : 'duration-[2000ms] bg-gradient-to-br from-white to-blue-50 border-slate-200'}`}>
          <div className={`absolute top-0 left-0 w-full h-1 group-hover:scale-x-110 transition-transform duration-1000 origin-left ${isDarkMode ? 'bg-gradient-to-r from-cyan-600 to-blue-500' : 'bg-gradient-to-r from-blue-400 to-blue-600'}`}></div>
          <h3 className={`text-2xl font-bold uppercase tracking-widest mb-6 transition-colors ${isDarkMode ? 'duration-[300ms] text-cyan-400' : 'duration-[2000ms] text-blue-600'}`}>01. Deployed Systems</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <div key={i} className={`border p-6 rounded-xl hover:-translate-y-3 transition-all duration-[2000ms] ${isDarkMode ? 'bg-slate-800/50 border-blue-900/40' : 'bg-white/50 border-slate-200 shadow-sm'}`}><h4 className={`text-xl font-bold transition-colors ${isDarkMode ? 'duration-[300ms] text-white' : 'duration-[2000ms] text-slate-800'}`}>PROJECT_0{i}</h4></div>)}
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={revealVariants}>
          <h3 className={`text-2xl font-bold uppercase tracking-widest mb-6 transition-colors ${isDarkMode ? 'duration-[300ms] text-cyan-400' : 'duration-[2000ms] text-blue-600'}`}>02. Visual Matrix</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`col-span-2 row-span-2 rounded-2xl h-64 border-2 border-dashed flex items-center justify-center font-mono transition-colors ${isDarkMode ? 'duration-[300ms] bg-[#080f26]/40 border-blue-900/50 text-blue-700' : 'duration-[2000ms] bg-slate-200 border-slate-300 text-slate-400'}`}>GALLERY_IMG_01</div>
            {[2, 3, 4].map(i => <div key={i} className={`rounded-2xl h-32 border-2 border-dashed flex items-center justify-center transition-colors ${isDarkMode ? 'duration-[300ms] bg-[#080f26]/40 border-blue-900/50' : 'duration-[2000ms] bg-slate-200 border-slate-300'}`}>IMG_0{i}</div>)}
          </div>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={revealVariants} className="mb-20">
          <h3 className={`text-2xl font-bold uppercase tracking-widest mb-6 transition-colors ${isDarkMode ? 'duration-[300ms] text-cyan-400' : 'duration-[2000ms] text-blue-600'}`}>03. Achievements & CV</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className={`p-8 rounded-3xl border transition-all duration-[2000ms] ${isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-blue-950' : 'bg-gradient-to-br from-white to-blue-50 border-slate-200'}`}>
                <h4 className={`text-lg font-bold mb-4 transition-colors ${isDarkMode ? 'duration-[300ms] text-cyan-400' : 'duration-[2000ms] text-blue-600'}`}>Leadership & Experience</h4>
                <div className={`space-y-4 font-mono text-sm border-l-2 ml-3 pl-6 border-blue-900/50`}>
                   <p>CSS Mayor</p>
                   <p>CITE Congressman</p>
                   <p>Senator</p>
                </div>
             </div>
             <div className={`p-8 rounded-3xl border transition-all duration-[2000ms] ${isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-950 border-blue-950' : 'bg-gradient-to-br from-white to-blue-50 border-slate-200'}`}>
                <h4 className={`text-lg font-bold mb-4 transition-colors ${isDarkMode ? 'duration-[300ms] text-cyan-400' : 'duration-[2000ms] text-blue-600'}`}>Credentials</h4>
                <ul className="space-y-4 font-mono text-sm">
                  <li>Bachelor of Science in Computer Science</li>
                  <li>Civil Service Examination (CSE) Passer</li>
                </ul>
             </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
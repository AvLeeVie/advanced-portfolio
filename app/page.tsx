'use client';

import Head from 'next/head';
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Image from 'next/image';

export default function Home() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(false);
      setTimeout(()=> setInit(true), 100);
    });
  }, []);

  // Techy particle configuration (continuous movement)
  const particleOptions = {
    background: { color: { value: "#ffffff" } },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
      },
      modes: { grab: { distance: 200, links: { opacity: 0.8 } } },
    },
    particles: {
      color: { value: "#3b82f6" },
      links: { color: "#3b82f6", distance: 150, enable: true, opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: "none" as const, outModes: { default: "bounce" as const } },
      number: { value: 100, density: { enable: true, area: 800 } },
      opacity: { value: 0.5, animation: { enable: true, speed: 1, minimumValue: 0.1 } }, // Twinkling effect
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  return (
    <div className="relative min-h-screen font-sans overflow-hidden bg-white text-slate-900">
      <Head>
        <title>Dustin Lee A. Oliganga | Tech Portfolio</title>
      </Head>

      {init && (
        <Particles id="tsparticles" options={particleOptions} className="absolute inset-0 -z-10" />
      )}

      {/* Grid overlay for tech vibe */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 -z-10 pointer-events-none"></div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex flex-col gap-24">
        
        {/* --- HERO: 3-Column Center Layout --- */}
        <section className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8 min-h-[60vh]">
          
          {/* Left Intro */}
          <div className="flex-1 text-center lg:text-right space-y-4 animate-[pulse_4s_ease-in-out_infinite]">
            <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">The Engineer</h2>
            <p className="text-slate-600 font-mono text-sm border-r-4 border-blue-500 pr-4">
              BS Computer Science
              <br/>Godot 4 Developer
              <br/>Interactive Media Specialist
            </p>
            <p className="text-slate-500 max-w-sm ml-auto text-sm">
              Bridging the gap between practical software utility and engaging 2D tactical mechanics.
            </p>
          </div>

          {/* Center Portrait (Glowing & Floating) */}
          <div className="relative shrink-0 animate-[bounce_4s_infinite]">
             {/* Techy rotating rings behind portrait */}
            <div className="absolute inset-0 rounded-full border-4 border-blue-200 border-dashed animate-[spin_10s_linear_infinite] scale-110"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-400 border-dotted animate-[spin_15s_linear_infinite_reverse] scale-125 opacity-50"></div>
            
            {/* The Portrait Frame */}
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-blue-600 relative z-10 shadow-[0_0_40px_rgba(59,130,246,0.6)] bg-slate-100 flex items-center justify-center">
              {/* Replace the div below with an <Image /> tag once you have your photo */}
              <span className="font-mono text-blue-500 text-sm font-bold tracking-widest text-center px-4">
                [INSERT DUSTIN_IMG.PNG]
              </span>
            </div>
          </div>

          {/* Right Intro */}
          <div className="flex-1 text-center lg:text-left space-y-4 animate-[pulse_5s_ease-in-out_infinite_reverse]">
            <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">The Leader</h2>
            <p className="text-slate-600 font-mono text-sm border-l-4 border-blue-500 pl-4">
              CITE Congressman
              <br/>Northern Campus SSC
              <br/>CSE Professional Passer
            </p>
            <p className="text-slate-500 max-w-sm text-sm">
              East-South leadership philosophy focused on sustainable, student-led innovation and collaboration.
            </p>
          </div>

        </section>


        {/* --- GITHUB & PROJECTS SECTION --- */}
        <section className="bg-white/80 backdrop-blur-md p-10 rounded-3xl border border-slate-200 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:scale-x-110 transition-transform duration-1000 origin-left"></div>
          
          <div className="flex justify-between items-end mb-10 border-b-2 border-slate-100 pb-4">
            <h3 className="text-4xl font-black tracking-tight flex items-center gap-4">
              <span className="w-4 h-4 bg-blue-600 animate-ping rounded-full inline-block"></span>
              Deployed Systems
            </h3>
            <a href="https://github.com" className="font-mono text-blue-600 hover:text-blue-800 transition-colors font-bold flex items-center gap-2">
              /GITHUB_REPO <span className="text-xl">↗</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Project Cards with hover-lift */}
            {[
              { title: "Z.O.O.M.T.A.P.", desc: "Zero-contact Optimized On-site Monitoring Tap-Based Attendance Platform (RFID/NFC).", tags: ["Hardware", "Systems"] },
              { title: "Agawan Base", desc: "Multiplayer 2D tactical adventure digitalizing traditional Philippine culture.", tags: ["Godot", "GDScript"] },
              { title: "S.P.A.R.K.", desc: "Gamified educational application for interactive American Sign Language learning.", tags: ["Frontend", "UI/UX"] }
            ].map((proj, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 p-6 rounded-xl hover:-translate-y-3 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300">
                <h4 className="text-xl font-bold text-slate-800 mb-2">{proj.title}</h4>
                <p className="text-sm text-slate-600 mb-6 h-16">{proj.desc}</p>
                <div className="flex gap-2">
                  {proj.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* --- GALLERY SECTION --- */}
        <section className="mb-20">
          <h3 className="text-4xl font-black tracking-tight mb-10 flex items-center gap-4">
             <span className="w-4 h-4 bg-slate-800 rounded-sm inline-block animate-[spin_3s_linear_infinite]"></span>
             Visual Matrix
          </h3>
          
          {/* Masonry-style Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Gallery Placeholders - Add images later */}
            <div className="col-span-2 row-span-2 bg-slate-200 rounded-2xl h-64 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-mono text-sm hover:border-blue-500 transition-colors">GALLERY_IMG_01</div>
            <div className="bg-slate-200 rounded-2xl h-32 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-mono text-sm hover:border-blue-500 transition-colors">IMG_02</div>
            <div className="bg-slate-200 rounded-2xl h-32 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-mono text-sm hover:border-blue-500 transition-colors">IMG_03</div>
            <div className="col-span-2 bg-slate-200 rounded-2xl h-32 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-mono text-sm hover:border-blue-500 transition-colors">IMG_04_WIDE</div>
          </div>
        </section>

      </main>
    </div>
  );
}
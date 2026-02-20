import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Typewriter Hook ---
const useTypewriter = (text, speed = 20) => {
  const [index, setIndex] = useState(0);
  const displayText = useMemo(() => text.slice(0, index), [index, text]);
  useEffect(() => {
    if (index >= text.length) return;
    const timeoutId = setTimeout(() => setIndex(i => i + 1), speed);
    return () => clearTimeout(timeoutId);
  }, [index, text, speed]);
  return displayText;
};

// --- Erratic UFO Sighting Component ---
const UFOSighting = () => (
  <motion.div
    // erratic movement: sudden stops and extreme speed
    animate={{
      x: ["10vw", "12vw", "80vw", "75vw", "10vw", "-10vw"],
      y: ["10vh", "12vh", "10vh", "80vh", "85vh", "20vh"],
      scale: [1, 1.1, 0.5, 1, 1.5, 0],
      opacity: [0, 1, 1, 0.8, 1, 0]
    }}
    transition={{
      duration: 12, // Faster loop
      times: [0, 0.3, 0.35, 0.6, 0.65, 1], // "Teleporting" effect
      repeat: Infinity,
      repeatDelay: 5 // Disappears for 5 seconds then returns
    }}
    className="fixed z-50 pointer-events-none"
  >
    {/* The Craft */}
    <div className="w-3 h-3 bg-white rounded-full blur-[1px] shadow-[0_0_15px_4px_rgba(255,255,255,0.8)]" />
    <div className="absolute -top-4 -left-4 w-12 h-12 bg-ufo-green/10 rounded-full blur-xl animate-pulse" />
  </motion.div>
);

function App() {
  const [isGnorts, setIsGnorts] = useState(false);
  const [buffer, setBuffer] = useState("");
  const [showSecret, setShowSecret] = useState(false);

  const intelText = "Only aliens could survive the radiation of space that far beyond earth, so the CIA got together the best alien candidates for the moon landing. NASA learned from them and sent them to the moon. Apollo 18 was the first attempt at sending humans, obviously it failed as shown in the documentary by the same name.";
  const decodedIntel = useTypewriter(intelText);

  // Easter Egg Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      const newBuffer = (buffer + e.key).slice(-5);
      setBuffer(newBuffer);
      if (newBuffer.toLowerCase() === "alien") setShowSecret(true);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [buffer]);

  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-6 relative overflow-hidden bg-black text-ufo-green font-mono">
      <div className="stars-container" />
      <div className="scanline" />
      <div className="film-grain" />
      <UFOSighting />

      {/* --- Camcorder Overlay (New) --- */}
      <div className="fixed inset-0 pointer-events-none z-[160] opacity-30 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="border-l-2 border-t-2 border-ufo-green w-8 h-8" />
          <div className="flex flex-col items-end">
             <div className="text-red-500 font-bold blink text-xl tracking-widest">● REC</div>
             <div className="text-xs mt-1">TAPE: 04-A</div>
          </div>
          <div className="border-r-2 border-t-2 border-ufo-green w-8 h-8" />
        </div>
        <div className="text-center text-xs opacity-50">+</div>
        <div className="flex justify-between items-end">
          <div className="border-l-2 border-b-2 border-ufo-green w-8 h-8" />
          <div className="border-r-2 border-b-2 border-ufo-green w-8 h-8" />
        </div>
      </div>

      {/* --- Header --- */}
      <header className="text-center mb-16 z-10 mt-10">
        <p className="text-[10px] tracking-[0.5em] opacity-40 mb-4 uppercase">Archive: r/Showerthoughts</p>
        <h1 
          className="text-5xl md:text-8xl font-black cursor-crosshair transition-all select-none"
          onMouseEnter={() => setIsGnorts(true)}
          onMouseLeave={() => setIsGnorts(false)}
        >
          {isGnorts ? (
             <span className="text-white drop-shadow-[0_0_10px_#4ade80]">GNORTS, MR ALIEN</span>
          ) : (
             "NEIL ARMSTRONG"
          )}
        </h1>
      </header>

      {/* --- Decoded Content --- */}
      <main className="z-10 max-w-2xl w-full space-y-12">
        {/* Reddit Intel */}
        <div className="border-l border-ufo-green/40 pl-6 py-2">
           <h3 className="text-xs font-bold uppercase mb-2 text-ufo-green/60">[ DECODED TRANSMISSION ]</h3>
           <p className="text-sm md:text-base leading-relaxed opacity-90 min-h-[120px]">
             {decodedIntel}
             <span className="inline-block w-2 h-4 bg-ufo-green animate-pulse ml-1 align-middle"/>
           </p>
        </div>

        {/* Small Step / Giant Leap */}
        <div className="bg-ufo-green/5 p-8 border border-ufo-green/20 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-30 group-hover:opacity-100 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 14a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/></svg>
          </div>
          
          <p className="text-sm md:text-lg font-bold mb-4">"That's one small step for man..."</p>
          <p className="text-lg md:text-xl">
             "...One giant leap for <span className="bg-white text-black px-1 font-black transform inline-block skew-x-12">
               {isGnorts ? "GNORTS, MR. ALIEN" : "MANKIND"}
             </span>."
          </p>
          
          <div className="mt-6 text-xs opacity-50 border-t border-ufo-green/20 pt-4 flex justify-between">
            <span>u/SpencoJFrog // 11y ago</span>
            <span>[ EDIT PENDING ]</span>
          </div>
        </div>
      </main>

      {/* --- Disclaimer --- */}
      <footer className="mt-24 text-[9px] uppercase tracking-widest opacity-40 text-center z-10 max-w-md">
        <p className="mb-2">⚠️ CLASSIFIED FOOTAGE ⚠️</p>
        <p>This site is a work of fiction. Apollo 18 was a movie. Real astronauts used radiation shielding. Do not panic.</p>
      </footer>

      {/* --- Secret Terminal --- */}
      <AnimatePresence>
        {showSecret && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-4">
             <div className="border border-ufo-green p-10 max-w-lg w-full text-center shadow-[0_0_50px_rgba(74,222,128,0.2)]">
               <pre className="text-[10px] mb-6 text-ufo-green leading-none">
{`     .  .
   .      .
  .   __   .
 /|  (  )  |\\
| \\__|__|__/ |
 \\   |  |   /
  \\  |  |  /
   \\ |  | /
    \\|__|/`}
               </pre>
               <h2 className="text-2xl font-bold mb-4 blink">TRUTH VERIFIED</h2>
               <p className="text-sm mb-8">The moon is hollow. The signal is coming from inside the crater.</p>
               <button onClick={() => setShowSecret(false)} className="bg-ufo-green text-black px-6 py-2 font-bold hover:bg-white transition-colors">CLOSE FILE</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
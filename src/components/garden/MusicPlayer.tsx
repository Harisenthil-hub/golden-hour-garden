import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMusicalNote, HiOutlinePause } from "react-icons/hi2";

// Soft ambient piano (royalty-free, hosted CDN)
const TRACK = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1718e49cda.mp3?filename=relaxing-mountains-rivers-streams-running-water-18178.mp3";

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = new Audio(TRACK);
    a.loop = true;
    a.volume = 0;
    audioRef.current = a;
    return () => { a.pause(); audioRef.current = null; };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      const fade = setInterval(() => {
        if (a.volume > 0.05) a.volume = Math.max(0, a.volume - 0.05);
        else { a.pause(); clearInterval(fade); }
      }, 60);
      setPlaying(false);
    } else {
      a.volume = 0;
      a.play().catch(() => {});
      const fade = setInterval(() => {
        if (a.volume < 0.35) a.volume = Math.min(0.35, a.volume + 0.03);
        else clearInterval(fade);
      }, 80);
      setPlaying(true);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 1 }}
      onClick={toggle}
      aria-label={playing ? "Pause ambient music" : "Play ambient music"}
      className="fixed right-6 top-6 z-50 flex items-center gap-3 rounded-full glass px-4 py-3 text-cream shadow-cinema transition-all hover:scale-105 hover:bg-white/10"
    >
      <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-golden text-primary-foreground">
        {playing ? <HiOutlinePause className="h-4 w-4" /> : <HiOutlineMusicalNote className="h-4 w-4" />}
      </span>
      <span className="hidden text-xs uppercase tracking-[0.25em] sm:inline">
        {playing ? "playing" : "ambient"}
      </span>
      <div className="hidden items-end gap-[2px] sm:flex" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-[2px] rounded-full bg-sun"
            style={{
              height: playing ? `${6 + ((i * 5) % 12)}px` : "4px",
              transition: "height 240ms ease",
              animation: playing ? `shimmer ${0.7 + i * 0.15}s ease-in-out infinite` : "none",
            }}
          />
        ))}
      </div>
    </motion.button>
  );
}

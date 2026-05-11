import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePlay, HiOutlinePause } from "react-icons/hi2";
import twilightImg from "@/assets/twilight-sky.jpg";

export function VoiceMessage() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Placeholder soft track; replace with your real voice memo file
    const a = new Audio("https://cdn.pixabay.com/download/audio/2023/06/06/audio_aa4f7be0e0.mp3?filename=soft-piano-music-312509.mp3");
    a.preload = "metadata";
    audioRef.current = a;
    const onTime = () => setProgress((a.currentTime / (a.duration || 1)) * 100);
    const onEnd = () => { setPlaying(false); setProgress(0); };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => { a.pause(); a.removeEventListener("timeupdate", onTime); a.removeEventListener("ended", onEnd); };
  }, []);

  const toggle = () => {
    const a = audioRef.current; if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play(); setPlaying(true); }
  };

  return (
    <section className="relative overflow-hidden">
      <img src={twilightImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />

      <div className="relative mx-auto max-w-3xl px-6 py-32 text-center md:py-48">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="font-script text-2xl text-sun">
          something said softly
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mt-3 font-display text-5xl font-light text-cream md:text-7xl"
        >
          a message, <span className="italic text-gradient-golden">just for you</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="mx-auto mt-14 max-w-xl rounded-3xl glass p-8 shadow-cinema"
        >
          <div className="flex items-center gap-5">
            <button
              onClick={toggle}
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-golden text-primary-foreground glow-sun transition-transform hover:scale-105"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <HiOutlinePause className="h-7 w-7" /> : <HiOutlinePlay className="h-7 w-7 translate-x-0.5" />}
            </button>

            <div className="flex-1 text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-cream/50">play message</p>
              <p className="mt-1 font-display text-xl text-cream">a little something I wanted to say</p>

              {/* Waveform */}
              <div className="mt-4 flex h-10 items-end gap-[3px]">
                {Array.from({ length: 48 }).map((_, i) => {
                  const filled = (i / 48) * 100 < progress;
                  const h = 10 + Math.abs(Math.sin(i * 0.7) * 28) + (i % 5) * 2;
                  return (
                    <span
                      key={i}
                      className="flex-1 rounded-full transition-colors"
                      style={{
                        height: `${h}px`,
                        background: filled ? "var(--sun)" : "oklch(1 0 0 / 0.2)",
                        animation: playing && filled ? `shimmer ${0.6 + (i % 5) * 0.1}s ease-in-out infinite` : "none",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

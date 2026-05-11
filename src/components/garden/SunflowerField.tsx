import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const messages = [
  "you are softer than the spring you love.",
  "the sky writes its best colors thinking of you.",
  "every quiet thing in the world feels safer near you.",
  "you are the warm part of my year.",
  "you bloom even on the days you don't notice.",
  "thank you for existing. that's the whole message.",
];

function Sunflower({ msg, x, y, size = 1 }: { msg: string; x: number; y: number; size?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.15, rotate: 8 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ y: { duration: 4 + x / 30, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute"
        style={{ left: `${x}%`, top: `${y}%`, fontSize: `${size * 2.4}rem` }}
        aria-label="Open hidden message"
      >
        <span className="block drop-shadow-[0_0_18px_rgba(252,211,77,0.6)] hover:drop-shadow-[0_0_30px_rgba(252,211,77,0.9)] transition">
          🌻
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md p-6"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg rounded-3xl glass p-10 text-center shadow-cinema"
            >
              <div className="mb-4 text-5xl">🌻</div>
              <p className="font-display text-2xl italic leading-relaxed text-cream md:text-3xl">
                "{msg}"
              </p>
              <button
                onClick={() => setOpen(false)}
                className="mt-8 text-xs uppercase tracking-[0.3em] text-cream/60 hover:text-sun"
              >
                close
              </button>
              <div className="absolute -inset-px rounded-3xl ring-1 ring-sun/30" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function SunflowerField() {
  const positions = [
    { x: 8, y: 70, s: 1 }, { x: 22, y: 55, s: 1.2 }, { x: 36, y: 75, s: 0.9 },
    { x: 50, y: 50, s: 1.4 }, { x: 64, y: 70, s: 1.1 }, { x: 80, y: 60, s: 1 },
  ];
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-[oklch(0.55_0.18_60)] via-[oklch(0.65_0.16_75)] to-[oklch(0.45_0.14_45)] px-6 py-32">
      {/* Sun */}
      <div className="absolute right-1/4 top-10 h-64 w-64 rounded-full bg-sun/60 blur-3xl" />
      <div className="absolute right-[28%] top-16 h-32 w-32 rounded-full bg-cream/80 blur-xl" />

      {/* Ground gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[oklch(0.3_0.1_50)]/80 to-transparent" />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="font-script text-2xl text-cream">a field of small secrets</p>
        <h2 className="mt-3 font-display text-5xl font-light text-cream md:text-7xl">
          tap a sunflower
        </h2>
        <p className="mx-auto mt-5 max-w-md text-cream/80">
          each one is hiding something soft, kept just for you.
        </p>
      </div>

      <div className="relative mx-auto mt-16 h-[420px] w-full max-w-6xl">
        {positions.map((p, i) => (
          <Sunflower key={i} msg={messages[i % messages.length]} x={p.x} y={p.y} size={p.s} />
        ))}

        {/* Floating petals */}
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-sm"
            initial={{ x: -50, y: Math.random() * 400, opacity: 0 }}
            animate={{ x: "110vw", y: Math.random() * 400 - 100, opacity: [0, 1, 0] }}
            transition={{ duration: 14 + i, repeat: Infinity, delay: i * 0.7, ease: "linear" }}
          >
            🌼
          </motion.span>
        ))}
      </div>
    </section>
  );
}

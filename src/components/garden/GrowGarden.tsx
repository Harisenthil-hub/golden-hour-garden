import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const quotes = [
  "Your presence brings life.",
  "Some people feel like sunshine.",
  "You make ordinary moments beautiful.",
  "Every garden deserves a little sunlight.",
];

function Flower({ delay, x, color = "var(--sun)" }: { delay: number; x: number; color?: string }) {
  return (
    <motion.div
      initial={{ scale: 0, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ delay, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute bottom-0"
      style={{ left: `${x}%` }}
    >
      <div className="relative">
        {/* Stem */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 80 }}
          transition={{ delay, duration: 0.8 }}
          className="mx-auto w-[2px] origin-bottom bg-leaf animate-sway"
        />
        {/* Bloom */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: delay + 0.6, duration: 0.9, type: "spring", stiffness: 120 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2"
        >
          <div className="relative h-10 w-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 h-5 w-2 -translate-x-1/2 -translate-y-full rounded-full"
                style={{
                  background: color,
                  transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
                  transformOrigin: "50% 100%",
                  boxShadow: `0 0 12px ${color}`,
                }}
              />
            ))}
            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.3_0.08_50)]" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Butterfly({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ x: "-10vw", y: "60vh", opacity: 0 }}
      animate={{ x: "110vw", y: ["60vh", "20vh", "50vh", "10vh"], opacity: [0, 1, 1, 0] }}
      transition={{ delay, duration: 12, ease: "easeInOut" }}
      className="absolute text-2xl"
    >
      🦋
    </motion.div>
  );
}

export function GrowGarden() {
  const [grown, setGrown] = useState(false);

  return (
    <section className={`relative overflow-hidden transition-colors duration-[3000ms] ${grown ? "bg-dusk" : "bg-[oklch(0.22_0.04_260)]"}`}>
      <div className="relative min-h-screen px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="font-script text-2xl text-sun"
          >
            an interactive moment
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="mt-3 font-display text-5xl font-light text-cream md:text-7xl"
          >
            grow the garden
          </motion.h2>
          <p className="mx-auto mt-5 max-w-md text-cream/70">
            a quiet field, waiting... give it a touch and watch it bloom for you.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setGrown(true)}
            disabled={grown}
            className="mt-10 rounded-full bg-golden px-10 py-4 text-sm font-medium uppercase tracking-[0.3em] text-primary-foreground glow-sun disabled:opacity-50"
          >
            {grown ? "🌻 in bloom" : "Grow the Garden 🌱"}
          </motion.button>
        </div>

        {/* The garden stage */}
        <div className="relative mx-auto mt-16 h-[420px] w-full max-w-6xl">
          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-leaf/40 to-transparent" />

          {/* Grass */}
          <AnimatePresence>
            {grown && (
              <>
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.span
                    key={`g${i}`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.1 + i * 0.02, duration: 0.6 }}
                    className="absolute bottom-0 w-[3px] origin-bottom bg-leaf/80"
                    style={{ left: `${(i / 40) * 100}%`, height: `${10 + (i % 5) * 4}px` }}
                  />
                ))}
                {[8, 18, 28, 42, 56, 68, 80, 92].map((x, i) => (
                  <Flower key={x} delay={0.6 + i * 0.18} x={x} color={i % 3 === 0 ? "var(--sunset)" : "var(--sun)"} />
                ))}
                <Butterfly delay={2} />
                <Butterfly delay={4} />

                {/* Fireflies */}
                {Array.from({ length: 14 }).map((_, i) => (
                  <motion.span
                    key={`f${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0], y: [0, -40, -80] }}
                    transition={{ delay: 3 + i * 0.3, duration: 5, repeat: Infinity, repeatDelay: 2 }}
                    className="absolute h-2 w-2 rounded-full bg-sun"
                    style={{ left: `${10 + i * 6}%`, bottom: `${20 + (i % 4) * 30}px`, boxShadow: "0 0 12px var(--sun)" }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Sun glow when grown */}
          <AnimatePresence>
            {grown && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 3 }}
                className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sun/40 blur-3xl"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Floating quotes */}
        <AnimatePresence>
          {grown && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1.6 }}
              className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 px-4 md:grid-cols-2"
            >
              {quotes.map((q, i) => (
                <motion.blockquote
                  key={q}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 3.2 + i * 0.4, duration: 1.4 }}
                  className="glass rounded-2xl p-6 text-center font-display text-xl italic text-cream"
                >
                  “{q}”
                </motion.blockquote>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

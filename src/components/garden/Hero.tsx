import { motion } from "framer-motion";
import heroImg from "@/assets/hero-sunflowers.jpg";
import { PollenParticles } from "./Particles";

export function Hero({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image with parallax glow */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="Sunflower field at golden hour"
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        {/* Cinematic vignette + warm grade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/30" />
        {/* Light rays */}
        <div className="absolute -top-1/3 left-1/4 h-[140%] w-[40%] rotate-12 bg-gradient-to-b from-sun/30 via-sun/10 to-transparent blur-3xl mix-blend-screen" />
      </motion.div>

      <PollenParticles />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="font-script text-2xl text-cream/90 md:text-3xl"
        >
          a little garden, made just for you
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display text-6xl font-light leading-[1] text-cream drop-shadow-2xl md:text-8xl lg:text-[9rem]"
        >
          Happy <span className="text-gradient-golden italic">Birthday</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.4 }}
          className="mt-6 max-w-xl font-display text-xl italic text-cream/80 md:text-2xl"
        >
          “For the girl who makes life feel like spring 🌻”
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onEnter}
          className="mt-12 group relative overflow-hidden rounded-full bg-golden px-10 py-4 font-sans text-sm font-medium uppercase tracking-[0.3em] text-primary-foreground glow-sun transition-shadow hover:shadow-[0_0_80px_rgba(252,211,77,0.6)]"
        >
          <span className="relative z-10">Enter the Garden</span>
          <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-cream/60">
            <span className="text-xs uppercase tracking-[0.4em]">scroll</span>
            <div className="h-12 w-px bg-gradient-to-b from-cream/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

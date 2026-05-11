import { motion } from "framer-motion";
import nightImg from "@/assets/night-lanterns.jpg";
import { StarParticles } from "./Particles";

export function FinalNight() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <img src={nightImg} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      <StarParticles />

      {/* Floating lanterns */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-20vh", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 18 + i * 2, repeat: Infinity, delay: i * 2.5, ease: "linear" }}
          className="absolute"
          style={{ left: `${5 + i * 12}%` }}
        >
          <div className="relative">
            <div className="h-12 w-9 rounded-b-3xl rounded-t-lg bg-gradient-to-b from-sun to-sunset shadow-[0_0_40px_rgba(252,211,77,0.7)]" />
            <div className="mx-auto mt-1 h-2 w-1 bg-foreground/40" />
          </div>
        </motion.div>
      ))}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 2 }}
        >
          <p className="font-script text-3xl text-sun">and so, with all the sky</p>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-light leading-[1.2] text-cream md:text-6xl">
            “No matter how many skies you love,
            <br />
            <span className="italic text-gradient-golden">I hope life always gives you beautiful ones.”</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 1 }}
          className="mt-24"
        >
          <p className="font-script text-5xl text-cream md:text-7xl">
            Happy Birthday <span className="inline-block animate-float-slow">🌻</span>
          </p>
          <div className="mx-auto mt-8 h-px w-32 bg-gradient-to-r from-transparent via-sun to-transparent" />
          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-cream/40">made with quiet love</p>
        </motion.div>
      </div>
    </section>
  );
}

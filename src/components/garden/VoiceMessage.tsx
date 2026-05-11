import { motion } from "framer-motion";
import twilightImg from "@/assets/twilight-sky.jpg";

export function VoiceMessage() {
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
          className="mx-auto mt-14 max-w-xl rounded-3xl glass p-10 shadow-cinema"
        >
          <div className="flex flex-col items-center justify-center gap-6">
            <p className="text-lg md:text-xl font-light text-cream/90 leading-relaxed text-center font-display tracking-wide">
              "Happy Birthday! May your day be as bright as the morning sun and as peaceful as the evening twilight. Wishing you a year full of beautiful moments, laughter, and endless joy. You deserve all the best things in life!"
            </p>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-sun/50 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}


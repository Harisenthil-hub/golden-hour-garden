import { motion } from "framer-motion";
import m1 from "@/assets/memory-1.webp";
import m2 from "@/assets/memory-2.webp";
import m3 from "@/assets/memory-3.webp";
import m4 from "@/assets/memory-4.webp";
import m5 from "@/assets/memory-5.webp";
import m6 from "@/assets/memory-6.webp";
import m7 from "@/assets/memory-7.webp";
import sun from "@/assets/sunflower-close.jpg";

type Frame = {
  src: string;
  caption: string;
  date?: string;
  rotate: number;
  className: string;
};

const frames: Frame[] = [
  { src: m2, caption: "the way you hold sunlight", date: "spring", rotate: -6, className: "md:col-span-4 md:row-span-2 md:translate-y-6" },
  { src: m1, caption: "pressed flowers, kept forever", date: "remember this?", rotate: 4, className: "md:col-span-3" },
  { src: m4, caption: "skies you taught me to notice", date: "july dusk", rotate: -3, className: "md:col-span-5 md:translate-y-12" },
  { src: m3, caption: "your quiet little world", date: "morning, slow", rotate: 5, className: "md:col-span-4 md:-translate-y-4" },
  { src: sun, caption: "you, basically", date: "🌻", rotate: -4, className: "md:col-span-3 md:translate-y-8" },
  { src: m5, caption: "even butterflies stop for you", date: "a tiny pause", rotate: 6, className: "md:col-span-4" },
  { src: m6, caption: "Where flowers bloom, so does hope", date: "spring", rotate: -4, className: "md:col-span-4 md:translate-y-4" },
  { src: m7, caption: "Finding joy in the language of blooms", date: "remember this?", rotate: 4, className: "md:col-span-4" },
];

export function MemoryWall() {
  return (
    <section className="relative overflow-hidden bg-night px-6 py-32 md:py-48">
      {/* Soft warm glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-sun/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="mb-20 text-center"
        >
          <p className="font-script text-2xl text-sun">a little memory wall</p>
          <h2 className="mt-3 font-display text-5xl font-light text-cream md:text-7xl">
            moments, <span className="italic text-gradient-golden">pressed in light</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-cream/60">
            soft pieces of the world that always reminded me of you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-8 md:gap-y-16">
          {frames.map((f, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 60, rotate: f.rotate * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: f.rotate }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: 0, scale: 1.04, y: -8 }}
              className={`group relative ${f.className}`}
              style={{ rotate: `${f.rotate}deg` }}
            >
              {/* Tape */}
              <div className="absolute -top-3 left-1/2 z-20 h-5 w-20 -translate-x-1/2 rotate-[-4deg] rounded-sm bg-cream/40 backdrop-blur-sm shadow-md" />

              <div className="relative rounded-sm bg-cream p-3 pb-12 shadow-frame transition-shadow duration-500 group-hover:shadow-[0_30px_80px_-20px_rgba(252,211,77,0.4)]">
                <div className="overflow-hidden rounded-sm bg-black/20">
                  <img
                    src={f.src}
                    alt={f.caption}
                    loading="lazy"
                    className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between px-1">
                  <span className="font-script text-xl text-indigo-500">{f.caption}</span>
                  {/* {f.date && <span className="text-[10px] uppercase tracking-[0.2em] text-blue-500">{f.date}</span>} */}
                </figcaption>

                {/* Glow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-sm opacity-0 ring-1 ring-sun/40 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

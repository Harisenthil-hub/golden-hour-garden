import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useEffect, useState, useMemo, useRef } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { HiOutlinePause, HiOutlineMusicalNote } from "react-icons/hi2";
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    let raf;
    const tick = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}
const heroImg = "/assets/hero-sunflowers-C5AKvwC_.jpg";
function PollenParticles({ id = "pollen" }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);
  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: "transparent" },
      fpsLimit: 60,
      particles: {
        number: { value: 60, density: { enable: true, area: 900 } },
        color: { value: ["#fde68a", "#fbbf77", "#fff7d6"] },
        opacity: {
          value: { min: 0.2, max: 0.8 },
          animation: { enable: true, speed: 0.6, sync: false }
        },
        size: { value: { min: 1, max: 3 } },
        move: {
          enable: true,
          speed: { min: 0.2, max: 0.8 },
          direction: "top",
          straight: false,
          outModes: { default: "out" },
          path: { enable: true, delay: { value: 0 }, options: { size: 4, draw: false, increment: 1e-3 } }
        },
        shape: { type: "circle" }
      },
      detectRetina: true
    }),
    []
  );
  if (!ready) return null;
  return /* @__PURE__ */ jsx(
    Particles,
    {
      id,
      options,
      className: "absolute inset-0 pointer-events-none"
    }
  );
}
function StarParticles() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);
  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: "transparent" },
      particles: {
        number: { value: 140, density: { enable: true, area: 1e3 } },
        color: { value: ["#ffffff", "#fde68a", "#cbd5ff"] },
        opacity: { value: { min: 0.2, max: 1 }, animation: { enable: true, speed: 1, sync: false } },
        size: { value: { min: 0.4, max: 1.8 } },
        move: { enable: true, speed: 0.05, direction: "none", random: true }
      },
      detectRetina: true
    }),
    []
  );
  if (!ready) return null;
  return /* @__PURE__ */ jsx(Particles, { id: "stars", options, className: "absolute inset-0 pointer-events-none" });
}
function Hero({ onEnter }) {
  return /* @__PURE__ */ jsxs("section", { className: "relative h-screen w-full overflow-hidden", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { scale: 1.15, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 2.4, ease: [0.22, 1, 0.36, 1] },
        className: "absolute inset-0",
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: heroImg,
              alt: "Sunflower field at golden hour",
              className: "h-full w-full object-cover",
              width: 1920,
              height: 1080
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/90" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/30" }),
          /* @__PURE__ */ jsx("div", { className: "absolute -top-1/3 left-1/4 h-[140%] w-[40%] rotate-12 bg-gradient-to-b from-sun/30 via-sun/10 to-transparent blur-3xl mix-blend-screen" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(PollenParticles, {}),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex h-full flex-col items-center justify-center px-6 text-center", children: [
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.6, duration: 1.2 },
          className: "font-script text-2xl text-cream/90 md:text-3xl",
          children: "a little garden, made just for you"
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.h1,
        {
          initial: { opacity: 0, y: 30, filter: "blur(20px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { delay: 1, duration: 1.6, ease: [0.22, 1, 0.36, 1] },
          className: "mt-4 font-display text-6xl font-light leading-[1] text-cream drop-shadow-2xl md:text-8xl lg:text-[9rem]",
          children: [
            "Happy ",
            /* @__PURE__ */ jsx("span", { className: "text-gradient-golden italic", children: "Birthday" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 1.8, duration: 1.4 },
          className: "mt-6 max-w-xl font-display text-xl italic text-cream/80 md:text-2xl",
          children: "“For the girl who makes life feel like spring 🌻”"
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.button,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 2.4, duration: 1 },
          whileHover: { scale: 1.04 },
          whileTap: { scale: 0.97 },
          onClick: onEnter,
          className: "mt-12 group relative overflow-hidden rounded-full bg-golden px-10 py-4 font-sans text-sm font-medium uppercase tracking-[0.3em] text-primary-foreground glow-sun transition-shadow hover:shadow-[0_0_80px_rgba(252,211,77,0.6)]",
          children: [
            /* @__PURE__ */ jsx("span", { className: "relative z-10", children: "Enter the Garden" }),
            /* @__PURE__ */ jsx("span", { className: "absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 3.2, duration: 1 },
          className: "absolute bottom-10 left-1/2 -translate-x-1/2",
          children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 text-cream/60", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-[0.4em]", children: "scroll" }),
            /* @__PURE__ */ jsx("div", { className: "h-12 w-px bg-gradient-to-b from-cream/60 to-transparent" })
          ] })
        }
      )
    ] })
  ] });
}
const TRACK = "/hbd.mp3";
function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  useEffect(() => {
    const a = new Audio(TRACK);
    a.loop = true;
    a.volume = 0;
    audioRef.current = a;
    let interactionHandled = false;
    const handleInteraction = () => {
      if (interactionHandled || !audioRef.current || !audioRef.current.paused) return;
      interactionHandled = true;
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        setPlaying(true);
        const fade = setInterval(() => {
          if (audioRef.current && audioRef.current.volume < 0.35) {
            audioRef.current.volume = Math.min(0.35, audioRef.current.volume + 0.03);
          } else {
            clearInterval(fade);
          }
        }, 80);
        window.removeEventListener("scroll", handleInteraction);
        window.removeEventListener("click", handleInteraction);
        window.removeEventListener("touchstart", handleInteraction);
        window.removeEventListener("pointerdown", handleInteraction);
      }).catch(() => {
        interactionHandled = false;
      });
    };
    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("click", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("pointerdown", handleInteraction, { passive: true });
    return () => {
      a.pause();
      audioRef.current = null;
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("pointerdown", handleInteraction);
    };
  }, []);
  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      const fade = setInterval(() => {
        if (a.volume > 0.05) a.volume = Math.max(0, a.volume - 0.05);
        else {
          a.pause();
          clearInterval(fade);
        }
      }, 60);
      setPlaying(false);
    } else {
      a.volume = 0;
      a.play().catch(() => {
      });
      const fade = setInterval(() => {
        if (a.volume < 0.35) a.volume = Math.min(0.35, a.volume + 0.03);
        else clearInterval(fade);
      }, 80);
      setPlaying(true);
    }
  };
  return /* @__PURE__ */ jsxs(
    motion.button,
    {
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 3, duration: 1 },
      onClick: toggle,
      "aria-label": playing ? "Pause ambient music" : "Play ambient music",
      className: "fixed right-6 top-6 z-50 flex items-center gap-3 rounded-full glass px-4 py-3 text-cream shadow-cinema transition-all hover:scale-105 hover:bg-white/10",
      children: [
        /* @__PURE__ */ jsx("span", { className: "relative flex h-7 w-7 items-center justify-center rounded-full bg-golden text-primary-foreground", children: playing ? /* @__PURE__ */ jsx(HiOutlinePause, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(HiOutlineMusicalNote, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx("span", { className: "hidden text-xs uppercase tracking-[0.25em] sm:inline", children: playing ? "playing" : "ambient" }),
        /* @__PURE__ */ jsx("div", { className: "hidden items-end gap-[2px] sm:flex", "aria-hidden": true, children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx(
          "span",
          {
            className: "w-[2px] rounded-full bg-sun",
            style: {
              height: playing ? `${6 + i * 5 % 12}px` : "4px",
              transition: "height 240ms ease",
              animation: playing ? `shimmer ${0.7 + i * 0.15}s ease-in-out infinite` : "none"
            }
          },
          i
        )) })
      ]
    }
  );
}
const m1 = "/assets/memory-1-dVUkYWuD.webp";
const m2 = "/assets/memory-2-D_XqeifX.webp";
const m3 = "/assets/memory-3-h2HOrKG8.webp";
const m4 = "/assets/memory-4-kViFdy_2.webp";
const m5 = "/assets/memory-5-CW5hcKkN.webp";
const m6 = "/assets/memory-6-CccKoqM1.webp";
const m7 = "/assets/memory-7-Po054E1W.webp";
const sun = "/assets/sunflower-close-C7Jo0wlI.jpg";
const frames = [
  { src: m2, caption: "the way you hold sunlight", date: "spring", rotate: -6, className: "md:col-span-4 md:row-span-2 md:translate-y-6" },
  { src: m1, caption: "pressed flowers, kept forever", date: "remember this?", rotate: 4, className: "md:col-span-3" },
  { src: m4, caption: "skies you taught me to notice", date: "july dusk", rotate: -3, className: "md:col-span-5 md:translate-y-12" },
  { src: m3, caption: "your quiet little world", date: "morning, slow", rotate: 5, className: "md:col-span-4 md:-translate-y-4" },
  { src: sun, caption: "you, basically", date: "🌻", rotate: -4, className: "md:col-span-3 md:translate-y-8" },
  { src: m5, caption: "even butterflies stop for you", date: "a tiny pause", rotate: 6, className: "md:col-span-4" },
  { src: m6, caption: "Where flowers bloom, so does hope", date: "spring", rotate: -4, className: "md:col-span-4 md:translate-y-4" },
  { src: m7, caption: "Finding joy in the language of blooms", date: "remember this?", rotate: 4, className: "md:col-span-4" }
];
function MemoryWall() {
  return /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-night px-6 py-32 md:py-48", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-sun/10 blur-[120px]" }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-100px" },
          transition: { duration: 1.2 },
          className: "mb-20 text-center",
          children: [
            /* @__PURE__ */ jsx("p", { className: "font-script text-2xl text-sun", children: "a little memory wall" }),
            /* @__PURE__ */ jsxs("h2", { className: "mt-3 font-display text-5xl font-light text-cream md:text-7xl", children: [
              "moments, ",
              /* @__PURE__ */ jsx("span", { className: "italic text-gradient-golden", children: "pressed in light" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mx-auto mt-6 max-w-xl text-cream/60", children: "soft pieces of the world that always reminded me of you." })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-8 md:gap-y-16", children: frames.map((f, i) => /* @__PURE__ */ jsxs(
        motion.figure,
        {
          initial: { opacity: 0, y: 60, rotate: f.rotate * 2 },
          whileInView: { opacity: 1, y: 0, rotate: f.rotate },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 1.1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
          whileHover: { rotate: 0, scale: 1.04, y: -8 },
          className: `group relative ${f.className}`,
          style: { rotate: `${f.rotate}deg` },
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -top-3 left-1/2 z-20 h-5 w-20 -translate-x-1/2 rotate-[-4deg] rounded-sm bg-cream/40 backdrop-blur-sm shadow-md" }),
            /* @__PURE__ */ jsxs("div", { className: "relative rounded-sm bg-cream p-3 pb-12 shadow-frame transition-shadow duration-500 group-hover:shadow-[0_30px_80px_-20px_rgba(252,211,77,0.4)]", children: [
              /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-sm bg-black/20", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: f.src,
                  alt: f.caption,
                  loading: "lazy",
                  className: "aspect-[4/5] h-auto w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                }
              ) }),
              /* @__PURE__ */ jsx("figcaption", { className: "mt-3 flex items-baseline justify-between px-1", children: /* @__PURE__ */ jsx("span", { className: "font-script text-xl text-indigo-500", children: f.caption }) }),
              /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 rounded-sm opacity-0 ring-1 ring-sun/40 transition-opacity duration-500 group-hover:opacity-100" })
            ] })
          ]
        },
        i
      )) })
    ] })
  ] });
}
const quotes = [
  "Your presence brings life.",
  "Some people feel like sunshine.",
  "You make ordinary moments beautiful.",
  "Every garden deserves a little sunlight."
];
function Flower({ delay, x, color = "var(--sun)" }) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { scale: 0, y: 20 },
      animate: { scale: 1, y: 0 },
      transition: { delay, duration: 1.2, ease: [0.22, 1, 0.36, 1] },
      className: "absolute bottom-0",
      style: { left: `${x}%` },
      children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { height: 0 },
            animate: { height: 80 },
            transition: { delay, duration: 0.8 },
            className: "mx-auto w-[2px] origin-bottom bg-leaf animate-sway"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { scale: 0, rotate: -30 },
            animate: { scale: 1, rotate: 0 },
            transition: { delay: delay + 0.6, duration: 0.9, type: "spring", stiffness: 120 },
            className: "absolute -top-4 left-1/2 -translate-x-1/2",
            children: /* @__PURE__ */ jsxs("div", { className: "relative h-10 w-10", children: [
              Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsx(
                "span",
                {
                  className: "absolute left-1/2 top-1/2 h-5 w-2 -translate-x-1/2 -translate-y-full rounded-full",
                  style: {
                    background: color,
                    transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
                    transformOrigin: "50% 100%",
                    boxShadow: `0 0 12px ${color}`
                  }
                },
                i
              )),
              /* @__PURE__ */ jsx("span", { className: "absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.3_0.08_50)]" })
            ] })
          }
        )
      ] })
    }
  );
}
function Butterfly({ delay }) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { x: "-10vw", y: "60vh", opacity: 0 },
      animate: { x: "110vw", y: ["60vh", "20vh", "50vh", "10vh"], opacity: [0, 1, 1, 0] },
      transition: { delay, duration: 12, ease: "easeInOut" },
      className: "absolute text-2xl",
      children: "🦋"
    }
  );
}
function GrowGarden() {
  const [grown, setGrown] = useState(false);
  return /* @__PURE__ */ jsx("section", { className: `relative overflow-hidden transition-colors duration-[3000ms] ${grown ? "bg-dusk" : "bg-[oklch(0.22_0.04_260)]"}`, children: /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen px-6 py-32", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl text-center", children: [
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { duration: 1.2 },
          className: "font-script text-2xl text-sun",
          children: "an interactive moment"
        }
      ),
      /* @__PURE__ */ jsx(
        motion.h2,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 1.2 },
          className: "mt-3 font-display text-5xl font-light text-cream md:text-7xl",
          children: "grow the garden"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-5 max-w-md text-cream/70", children: "a quiet field, waiting... give it a touch and watch it bloom for you." }),
      /* @__PURE__ */ jsx(
        motion.button,
        {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.96 },
          onClick: () => setGrown(true),
          disabled: grown,
          className: "mt-10 rounded-full bg-golden px-10 py-4 text-sm font-medium uppercase tracking-[0.3em] text-primary-foreground glow-sun disabled:opacity-50",
          children: grown ? "🌻 in bloom" : "Grow the Garden 🌱"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto mt-16 h-[420px] w-full max-w-6xl", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-leaf/40 to-transparent" }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: grown && /* @__PURE__ */ jsxs(Fragment, { children: [
        Array.from({ length: 40 }).map((_, i) => /* @__PURE__ */ jsx(
          motion.span,
          {
            initial: { scaleY: 0 },
            animate: { scaleY: 1 },
            transition: { delay: 0.1 + i * 0.02, duration: 0.6 },
            className: "absolute bottom-0 w-[3px] origin-bottom bg-leaf/80",
            style: { left: `${i / 40 * 100}%`, height: `${10 + i % 5 * 4}px` }
          },
          `g${i}`
        )),
        [8, 18, 28, 42, 56, 68, 80, 92].map((x, i) => /* @__PURE__ */ jsx(Flower, { delay: 0.6 + i * 0.18, x, color: i % 3 === 0 ? "var(--sunset)" : "var(--sun)" }, x)),
        /* @__PURE__ */ jsx(Butterfly, { delay: 2 }),
        /* @__PURE__ */ jsx(Butterfly, { delay: 4 }),
        Array.from({ length: 14 }).map((_, i) => /* @__PURE__ */ jsx(
          motion.span,
          {
            initial: { opacity: 0 },
            animate: { opacity: [0, 1, 0], y: [0, -40, -80] },
            transition: { delay: 3 + i * 0.3, duration: 5, repeat: Infinity, repeatDelay: 2 },
            className: "absolute h-2 w-2 rounded-full bg-sun",
            style: { left: `${10 + i * 6}%`, bottom: `${20 + i % 4 * 30}px`, boxShadow: "0 0 12px var(--sun)" }
          },
          `f${i}`
        ))
      ] }) }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: grown && /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.6 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 3 },
          className: "pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sun/40 blur-3xl"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: grown && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 3, duration: 1.6 },
        className: "mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 px-4 md:grid-cols-2",
        children: quotes.map((q, i) => /* @__PURE__ */ jsxs(
          motion.blockquote,
          {
            initial: { opacity: 0, y: 20, filter: "blur(10px)" },
            animate: { opacity: 1, y: 0, filter: "blur(0px)" },
            transition: { delay: 3.2 + i * 0.4, duration: 1.4 },
            className: "glass rounded-2xl p-6 text-center font-display text-xl italic text-cream",
            children: [
              "“",
              q,
              "”"
            ]
          },
          q
        ))
      }
    ) })
  ] }) });
}
const messages = [
  "you are softer than the spring you love.",
  "the sky writes its best colors thinking of you.",
  "every quiet thing in the world feels safer near you.",
  "you are the warm part of my year.",
  "you bloom even on the days you don't notice.",
  "thank you for existing. that's the whole message."
];
function Sunflower({ msg, x, y, size = 1 }) {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.button,
      {
        onClick: () => setOpen(true),
        whileHover: { scale: 1.15, rotate: 8 },
        animate: { y: [0, -6, 0] },
        transition: { y: { duration: 4 + x / 30, repeat: Infinity, ease: "easeInOut" } },
        className: "absolute",
        style: { left: `${x}%`, top: `${y}%`, fontSize: `${size * 2.4}rem` },
        "aria-label": "Open hidden message",
        children: /* @__PURE__ */ jsx("span", { className: "block drop-shadow-[0_0_18px_rgba(252,211,77,0.6)] hover:drop-shadow-[0_0_30px_rgba(252,211,77,0.9)] transition", children: "🌻" })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: () => setOpen(false),
        className: "fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md p-6",
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.85, y: 20, opacity: 0 },
            animate: { scale: 1, y: 0, opacity: 1 },
            exit: { scale: 0.9, opacity: 0 },
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            onClick: (e) => e.stopPropagation(),
            className: "relative max-w-lg rounded-3xl glass p-10 text-center shadow-cinema",
            children: [
              /* @__PURE__ */ jsx("div", { className: "mb-4 text-5xl", children: "🌻" }),
              /* @__PURE__ */ jsxs("p", { className: "font-display text-2xl italic leading-relaxed text-cream md:text-3xl", children: [
                '"',
                msg,
                '"'
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setOpen(false),
                  className: "mt-8 text-xs uppercase tracking-[0.3em] text-cream/60 hover:text-sun",
                  children: "close"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-px rounded-3xl ring-1 ring-sun/30" })
            ]
          }
        )
      }
    ) })
  ] });
}
function SunflowerField() {
  const positions = [
    { x: 8, y: 70, s: 1 },
    { x: 22, y: 55, s: 1.2 },
    { x: 36, y: 75, s: 0.9 },
    { x: 50, y: 50, s: 1.4 },
    { x: 64, y: 70, s: 1.1 },
    { x: 80, y: 60, s: 1 }
  ];
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-[oklch(0.55_0.18_60)] via-[oklch(0.65_0.16_75)] to-[oklch(0.45_0.14_45)] px-6 py-32", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute right-1/4 top-10 h-64 w-64 rounded-full bg-sun/60 blur-3xl" }),
    /* @__PURE__ */ jsx("div", { className: "absolute right-[28%] top-16 h-32 w-32 rounded-full bg-cream/80 blur-xl" }),
    /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[oklch(0.3_0.1_50)]/80 to-transparent" }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-4xl text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "font-script text-2xl text-cream", children: "a field of small secrets" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display text-5xl font-light text-cream md:text-7xl", children: "tap a sunflower" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-5 max-w-md text-cream/80", children: "each one is hiding something soft, kept just for you." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto mt-16 h-[420px] w-full max-w-6xl", children: [
      positions.map((p, i) => /* @__PURE__ */ jsx(Sunflower, { msg: messages[i % messages.length], x: p.x, y: p.y, size: p.s }, i)),
      Array.from({ length: 18 }).map((_, i) => /* @__PURE__ */ jsx(
        motion.span,
        {
          className: "absolute text-sm",
          initial: { x: -50, y: Math.random() * 400, opacity: 0 },
          animate: { x: "110vw", y: Math.random() * 400 - 100, opacity: [0, 1, 0] },
          transition: { duration: 14 + i, repeat: Infinity, delay: i * 0.7, ease: "linear" },
          children: "🌼"
        },
        i
      ))
    ] })
  ] });
}
const twilightImg = "/assets/twilight-sky-B8d0rLJ3.jpg";
function VoiceMessage() {
  return /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("img", { src: twilightImg, alt: "", className: "absolute inset-0 h-full w-full object-cover opacity-50", loading: "lazy" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-3xl px-6 py-32 text-center md:py-48", children: [
      /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 1.2 }, className: "font-script text-2xl text-sun", children: "something said softly" }),
      /* @__PURE__ */ jsxs(
        motion.h2,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 1.2 },
          className: "mt-3 font-display text-5xl font-light text-cream md:text-7xl",
          children: [
            "a message, ",
            /* @__PURE__ */ jsx("span", { className: "italic text-gradient-golden", children: "just for you" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 1.4, delay: 0.2 },
          className: "mx-auto mt-14 max-w-xl rounded-3xl glass p-10 shadow-cinema",
          children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-6", children: [
            /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl font-light text-cream/90 leading-relaxed text-center font-display tracking-wide", children: '"Happy Birthday! May your day be as bright as the morning sun and as peaceful as the evening twilight. Wishing you a year full of beautiful moments, laughter, and endless joy. You deserve all the best things in life!"' }),
            /* @__PURE__ */ jsx("div", { className: "h-[2px] w-24 bg-gradient-to-r from-transparent via-sun/50 to-transparent" })
          ] })
        }
      )
    ] })
  ] });
}
const nightImg = "/assets/night-lanterns-BgGVh5a3.jpg";
function FinalNight() {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen overflow-hidden", children: [
    /* @__PURE__ */ jsx("img", { src: nightImg, alt: "", className: "absolute inset-0 h-full w-full object-cover", loading: "lazy" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" }),
    /* @__PURE__ */ jsx(StarParticles, {}),
    Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { y: "100vh", opacity: 0 },
        animate: { y: "-20vh", opacity: [0, 1, 1, 0] },
        transition: { duration: 18 + i * 2, repeat: Infinity, delay: i * 2.5, ease: "linear" },
        className: "absolute",
        style: { left: `${5 + i * 12}%` },
        children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "h-12 w-9 rounded-b-3xl rounded-t-lg bg-gradient-to-b from-sun to-sunset shadow-[0_0_40px_rgba(252,211,77,0.7)]" }),
          /* @__PURE__ */ jsx("div", { className: "mx-auto mt-1 h-2 w-1 bg-foreground/40" })
        ] })
      },
      i
    )),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true, margin: "-150px" },
          transition: { duration: 2 },
          children: [
            /* @__PURE__ */ jsx("p", { className: "font-script text-3xl text-sun", children: "and so, with all the sky" }),
            /* @__PURE__ */ jsxs("h2", { className: "mx-auto mt-6 max-w-3xl font-display text-4xl font-light leading-[1.2] text-cream md:text-6xl", children: [
              "“No matter how many skies you love,",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "italic text-gradient-golden", children: "I hope life always gives you beautiful ones.”" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 1.6, delay: 1 },
          className: "mt-24",
          children: [
            /* @__PURE__ */ jsxs("p", { className: "font-script text-5xl text-cream md:text-7xl", children: [
              "Happy Birthday ",
              /* @__PURE__ */ jsx("span", { className: "inline-block animate-float-slow", children: "🌻" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mx-auto mt-8 h-px w-32 bg-gradient-to-r from-transparent via-sun to-transparent" }),
            /* @__PURE__ */ jsx("p", { className: "mt-6 text-xs uppercase tracking-[0.4em] text-cream/40", children: "made with quiet love" })
          ]
        }
      )
    ] })
  ] });
}
function CursorButterfly() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 80, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 80, damping: 18, mass: 0.6 });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let timer;
    const move = (e) => {
      x.set(e.clientX - 14);
      y.set(e.clientY - 14);
      setVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(false), 1500);
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      clearTimeout(timer);
    };
  }, [x, y]);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      style: { x: sx, y: sy, opacity: visible ? 1 : 0 },
      transition: { opacity: { duration: 0.6 } },
      className: "pointer-events-none fixed left-0 top-0 z-40 hidden text-2xl md:block",
      "aria-hidden": true,
      children: /* @__PURE__ */ jsx(
        motion.span,
        {
          animate: { rotate: [-8, 8, -8] },
          transition: { duration: 0.6, repeat: Infinity },
          className: "block drop-shadow-[0_0_8px_rgba(252,211,77,0.6)]",
          children: "🦋"
        }
      )
    }
  );
}
function Index() {
  useLenis();
  const memoryRef = useRef(null);
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  const scrollToMemories = () => {
    memoryRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxs("main", { className: "relative bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(CursorButterfly, {}),
    /* @__PURE__ */ jsx(MusicPlayer, {}),
    /* @__PURE__ */ jsx(Hero, { onEnter: scrollToMemories }),
    /* @__PURE__ */ jsx("div", { ref: memoryRef, children: /* @__PURE__ */ jsx(MemoryWall, {}) }),
    /* @__PURE__ */ jsx(GrowGarden, {}),
    /* @__PURE__ */ jsx(SunflowerField, {}),
    /* @__PURE__ */ jsx(VoiceMessage, {}),
    /* @__PURE__ */ jsx(FinalNight, {})
  ] });
}
export {
  Index as component
};

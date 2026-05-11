import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorButterfly() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 80, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 80, damping: 18, mass: 0.6 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 14);
      y.set(e.clientY - 14);
      setVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(false), 1500);
    };
    window.addEventListener("mousemove", move);
    return () => { window.removeEventListener("mousemove", move); clearTimeout(timer); };
  }, [x, y]);

  return (
    <motion.div
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.6 } }}
      className="pointer-events-none fixed left-0 top-0 z-40 hidden text-2xl md:block"
      aria-hidden
    >
      <motion.span
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className="block drop-shadow-[0_0_8px_rgba(252,211,77,0.6)]"
      >
        🦋
      </motion.span>
    </motion.div>
  );
}

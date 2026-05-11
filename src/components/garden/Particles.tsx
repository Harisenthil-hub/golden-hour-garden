import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export function PollenParticles({ id = "pollen" }: { id?: string }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: "transparent" },
      fpsLimit: 60,
      particles: {
        number: { value: 60, density: { enable: true, area: 900 } },
        color: { value: ["#fde68a", "#fbbf77", "#fff7d6"] },
        opacity: {
          value: { min: 0.2, max: 0.8 },
          animation: { enable: true, speed: 0.6, sync: false },
        },
        size: { value: { min: 1, max: 3 } },
        move: {
          enable: true,
          speed: { min: 0.2, max: 0.8 },
          direction: "top",
          straight: false,
          outModes: { default: "out" },
          path: { enable: true, delay: { value: 0 }, options: { size: 4, draw: false, increment: 0.001 } },
        },
        shape: { type: "circle" },
      },
      detectRetina: true,
    }),
    [],
  );

  if (!ready) return null;
  return (
    <Particles
      id={id}
      options={options}
      className="absolute inset-0 pointer-events-none"
    />
  );
}

export function StarParticles() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: "transparent" },
      particles: {
        number: { value: 140, density: { enable: true, area: 1000 } },
        color: { value: ["#ffffff", "#fde68a", "#cbd5ff"] },
        opacity: { value: { min: 0.2, max: 1 }, animation: { enable: true, speed: 1, sync: false } },
        size: { value: { min: 0.4, max: 1.8 } },
        move: { enable: true, speed: 0.05, direction: "none", random: true },
      },
      detectRetina: true,
    }),
    [],
  );
  if (!ready) return null;
  return <Particles id="stars" options={options} className="absolute inset-0 pointer-events-none" />;
}

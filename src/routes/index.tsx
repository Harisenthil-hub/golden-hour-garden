import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { Hero } from "@/components/garden/Hero";
import { MusicPlayer } from "@/components/garden/MusicPlayer";
import { MemoryWall } from "@/components/garden/MemoryWall";
import { GrowGarden } from "@/components/garden/GrowGarden";
import { SunflowerField } from "@/components/garden/SunflowerField";
import { VoiceMessage } from "@/components/garden/VoiceMessage";
import { FinalNight } from "@/components/garden/FinalNight";
import { CursorButterfly } from "@/components/garden/CursorButterfly";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Little Garden — Happy Birthday 🌻" },
      { name: "description", content: "A cinematic, dreamy birthday experience — sunsets, sunflowers, and soft little messages, made just for you." },
      { property: "og:title", content: "A Little Garden — Happy Birthday 🌻" },
      { property: "og:description", content: "A cinematic, dreamy birthday experience made with quiet love." },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();
  const memoryRef = useRef<HTMLDivElement>(null);

  // Subtle parallax ambient: nothing aggressive
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const scrollToMemories = () => {
    memoryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative bg-background text-foreground">
      <CursorButterfly />
      <MusicPlayer />

      <Hero onEnter={scrollToMemories} />

      <div ref={memoryRef}>
        <MemoryWall />
      </div>

      <GrowGarden />
      <SunflowerField />
      <VoiceMessage />
      <FinalNight />
    </main>
  );
}

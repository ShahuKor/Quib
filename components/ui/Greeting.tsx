"use client";
import { greetings } from "@/lib/summaries";
import { useMemo } from "react";

export default function Greeting({ name }: { name: string }) {
  const randomGreeting = useMemo(() => {
    return greetings[Math.floor(Math.random() * greetings.length)];
  }, []);

  return (
    <p className="text-3xl md:text-5xl font-semibold text-neutral-700 mb-8">
      {randomGreeting}, {name}!
    </p>
  );
}

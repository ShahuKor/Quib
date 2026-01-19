import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto flex flex-col items-center text-center py-16 sm:py-20 lg:pb-28 lg:px-12 px-1 max-w-7xl lg:mt-30 mt-25 ">
        {/* AI Badge */}
        <div className="mb-6">
          <Badge className="bg-neutral-100 text-zinc-700 border border-indigo-300  px-3 py-1.5 rounded-full shadow-sm hover:bg-zinc-200 transition-colors duration-150">
            <Sparkles className="h-4 w-4 mr-2 text-indigo-500 animate-pulse" />
            <span className="text-sm font-medium animate-pulse">
              Powered by AI
            </span>
          </Badge>
        </div>
        {/*animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400*/}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold animate-text-gradient bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400 mb-4 transition-transform duration-500 hover:scale-105">
          T
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
            }}
          >
            ransform
          </span>{" "}
          PDFs into concise summaries
        </h1>

        <h2 className="text-lg sm:text-xl text-zinc-600 mb-8 transition-transform duration-500 hover:scale-120">
          Get a beautiful summary reel of the document in seconds
        </h2>

        <Button
          variant={"link"}
          className="group flex lg:w-[120px] lg:h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-zinc-800 to-zinc-600 px-6  py-3 text-sm font-medium text-white shadow-md transition hover:brightness-180 hover:shadow-lg hover:no-underline"
        >
          <Link href="/#pricing">
            <span className="ml-2 ">Try Quib</span>
          </Link>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}

// border-rose-500 border-2 w-45 items-center justify-center py-2 rounded-full px-2

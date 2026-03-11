import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen ">
      <div className=" max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-24 sm:py-32 lg:px-8 ">
        <div className="flex flex-col md:flex-row justify-start  md:items-center gap-4 md:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-5xl font-bold text-neutral-800 ">
              Your Summaries
            </h1>
            <p className="text-xs font-semibold sm:font-normal sm:text-lg md:text-xl text-zinc-600 ">
              Transform your PDFs into concise, actionable insights
            </p>
          </div>

          <Button className="w-28 md:w-31 lg:w-35 h-7 md:h-full text-[10px] md:text-xs lg:text-sm bg-gradient-to-r from-zinc-800 to-zinc-600 md:px-6 md:py-3 font-normal md:font-medium text-white shadow-md transition hover:brightness-180 hover:shadow-lg">
            <Plus className="size-3" />
            <Link href={"/upload"}>Create Summary</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

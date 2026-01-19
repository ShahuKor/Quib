import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function UploadHeader() {
  return (
    <div className="flex flex-col justify-center items-center text-center md:gap-6 gap-2 w-full ">
      <Badge className="bg-neutral-100 text-zinc-700 border border-indigo-300 px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-sm hover:bg-zinc-200 transition-colors duration-150">
        <Sparkles className="h-4 w-4 mr-2 text-indigo-500 animate-pulse" />
        <span className="text-xs md:text-sm font-medium animate-pulse">
          Powered by AI
        </span>
      </Badge>
      <h1 className="text-2xl sm:text-5xl  lg:text-6xl font-bold text-neutral-800 transition-transform duration-500 hover:scale-105">
        Start Uploading Your PDF's
      </h1>
      <p className="text-xs font-semibold sm:font-normal sm:text-lg md:text-xl text-zinc-600 mb-8 ">
        Upload your PDF and let our AI do the magic!✨
      </p>
    </div>
  );
}

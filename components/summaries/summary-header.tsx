import Link from "next/link";
import { Button } from "../ui/button";
import { Calendar, ChevronLeft, Clock } from "lucide-react";

export default function SummaryHeader({
  title,
  createdAt,
  readingTime,
}: {
  title: string;
  createdAt: string;
  readingTime: number;
}) {
  return (
    <div className="flex gap-4 mb-4 justify-between">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-sky-500" />
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-sky-500" />
            {readingTime} min read
          </div>
        </div>
        <h1 className="text-2xl lg:text-4xl font-bold lg:tracking-tight">
          <span className="bg-gradient-to-r from-sky-600 via-sky-300 to-neutral-50 bg-[200%_auto] bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
      </div>
      <div>
        <Link href="/dashboard">
          <Button
            size="sm"
            className="group flex items-center gap-1 sm:gap-2 hover:bg-white/80 backdrop-blur-xs rounded-full transition-all duration-400 shadow-xs hover:shadow-md border border-sky-200/30 bg-sky-100 px-2 sm:px-3 text-sky-600/60"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm font-medium  ">
              Back <span className="hidden sm:inline">to Dashboard</span>
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

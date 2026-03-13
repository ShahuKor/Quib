import SummaryCard from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  let uploadlimit = 5;
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return redirect("/sign-up");
  }

  const summaries = await getSummaries(userId);

  return (
    <div className="min-h-screen ">
      <div className=" max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-24 sm:py-32 lg:px-8 ">
        <div className="flex flex-col md:flex-row justify-start  md:items-center gap-4 md:justify-between mb-3">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-5xl font-bold bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text text-transparent">
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

        <div className="bg-[#E6F6FF] px-2 py-2 md:py-3 md:px-3 text-[10px] md:text-sm text-cyan-700 font-medium border-cyan-600/20 border border-dashed rounded-sm mb-6">
          <p>
            You have reached the limit of {uploadlimit} on Basic Plan.{" "}
            <Link
              className="font-semibold underline-offset-2 underline"
              href={"/#pricing"}
            >
              Click here to Upgrade to Pro
            </Link>
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
          {summaries.map((summary, index) => (
            <SummaryCard key={index} summary={summary} />
          ))}
        </div>
      </div>
    </div>
  );
}

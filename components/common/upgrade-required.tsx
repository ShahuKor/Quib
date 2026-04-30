import { Sparkle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import SignoutButtonCustom from "./SignoutButtonCustom";

export default function UpgradeRequired() {
  return (
    <div className="relative min-h-[50vh] flex flex-col items-center">
      <div className="py-50  flex flex-col items-center gap-8 border-neutral-800/40 border border-dashed rounded-2xl px-40">
        <button className="flex items-center gap-3 border-neutral-300 border w-40 rounded-md py-1.5 px-2">
          <Sparkle className="w-4 h-4 text-neutral-400" />
          <span className="text-sm text-neutral-400">Premium Feature</span>
        </button>
        <p className="text-lg font-semibold tracking-wide text-neutral-500">
          To Access this Feature , Please Subscribe to Pro or Basic Plan
        </p>
        <Button className="w-28 md:w-31 lg:w-35 h-7 md:h-full text-[10px] md:text-xs lg:text-sm bg-gradient-to-r from-zinc-800 to-zinc-600 md:px-6 md:py-3 font-normal md:font-medium text-white shadow-md transition hover:brightness-180 hover:shadow-lg ">
          <Link href={"/#pricing"}>Upgrade</Link>
        </Button>
        <SignoutButtonCustom />
      </div>
    </div>
  );
}

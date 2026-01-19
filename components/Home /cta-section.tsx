import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl animate-text-gradient bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent ">
              Ready to Save Hours of Reading Time?
            </h2>
            <p className="font-medium mx-auto max-w-2xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Transform lengthy documents into clear, actionable insights with
              AI-powered summarizer
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <div>
              <Button
                size={"lg"}
                variant={"link"}
                className="w-full min-[400px]:w-auto bg-gradient-to-r from-zinc-800 to-zinc-600 px-6  py-3 text-sm font-medium text-white shadow-md transition hover:brightness-180 hover:shadow-lg hover:no-underline flex items-center justify-center  "
              >
                Get Started{" "}
                <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
              </Button>
              <Link
                href="/#pricing"
                className="flex item-center justify-center "
              ></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

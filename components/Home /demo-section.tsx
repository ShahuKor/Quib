import { Pizza } from "lucide-react";

export default function DemoSection() {
  return (
    <section className="relative overflow-hidden ">
      <div className="absolute bottom-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_100%_100%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col items-center justify-center text-center ">
          <div className="bg-gray-200 rounded-xl p-1 border border-gray-500/2 ">
            <Pizza className="text-neutral-800 w-6 h-6 m-1"></Pizza>
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-zinc-700 max-w-2xl mx-auto  px-4 sm:px-6 mt-4">
            Watch how{" "}
            <span
              className="
            font-bold text-black"
            >
              Quib
            </span>{" "}
            transforms this Next.js course PDF into an easy-to-read summary
          </h3>

          <div className=""> {/*Card Component*/}</div>
        </div>
      </div>
    </section>
  );
}

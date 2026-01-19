import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";
import { ReactNode } from "react";

type Step = {
  icon: ReactNode;
  label: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: "Upload a PDF",
    description: "Simple drag and drop your PDF document or click to upload",
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    label: "AI Ananlysis",
    description:
      "Our advanced AI processes and analyzes your document instantly",
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    label: "Get Summary",
    description: "Receive a clear, concise summary of your document",
  },
];

function getIconColor(label: string) {
  switch (label) {
    case "Upload a PDF":
      return "text-indigo-400";
    case "AI Ananlysis":
      return "text-rose-500";
    case "Get Summary":
      return "text-emerald-500";
    default:
      return "text-zinc-500";
  }
}

export function Howitworks() {
  return (
    <section className="bg-gray-50 relative overflow-hidden">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center mb-16">
          <h2 className="lg:text-2xl sm:text-xl font-bold text-stone-800">
            HOW IT WORKS
          </h2>
          <h2 className="text-gray-500 sm:text-xl text-lg font-medium sm:mt-1">
            Transform any PDF into an easy-to-digest summary in just{" "}
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
              }}
              className="font-bold text-zinc-950 "
            >
              three
            </span>{" "}
            steps{" "}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, idx) => (
            <div className="relative flex items-stretch" key={idx}>
              <StepItem {...step} />
              {idx < steps.length - 1 && (
                <div className="hidden absolute md:block top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <MoveRight
                    size={32}
                    strokeWidth={1}
                    className="text-rose-400"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepItem({ icon, label, description }: Step) {
  const iconColor = getIconColor(label);
  return (
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-stone-300 transition-colors group w-full">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-to-br from-sky-500/10 to-transparent group-hover:from-sky-500/20 transition-colors  ">
          <div className={iconColor}>{icon}</div>
        </div>
        <div className="flex flex-col flex-1 gap-1 justify-between">
          <h4 className="text-center font-bold text-xl">{label}</h4>
          <p className="text-center text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

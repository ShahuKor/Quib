import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentlink: string;
};

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    items: [
      "5 summaries per month",
      "Standard processing speed",
      "Email Support",
    ],
    description: "For personal use",
    paymentlink: " ",
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    items: [
      "Unlimited summaries per month",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    description: "For professionals and teams",
    paymentlink: "",
  },
];
const PricingCard = ({
  name,
  price,
  items,
  description,
  id,
  paymentlink,
}: PriceType) => {
  return (
    <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8  border-[1px] border-gray-500/20 rounded-2xl",
          id === "pro" && "border-indigo-200 gap-5 border-2"
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-xl lg:text-2xl font-bold text-neutral-700">
              {name}
            </p>
            <p className=" ">{description}</p>
          </div>
        </div>

        <div className="flex gap-2 ">
          <p className="text-5xl tracking-tight font-extrabold text-stone-800">
            ${price}
          </p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-bold">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </div>
        <div className="space-y-2.5 leading-relaxed flex-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 ">
              <CheckIcon size={18} />
              <span>{item}</span>
            </li>
          ))}
        </div>

        <div className="space-y-2 flex justify-center w-full ">
          <Link
            href={paymentlink}
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r  text-white border-1 py-2",
              id === "pro"
                ? "border-indigo-100 from-indigo-300 to-sky-300 hover:from-sky-300 hover:to-indigo-300"
                : "border-neutral-100 from-neutral-400 to-stone-500 hover:from-stone-500 hover:to-neutral-800"
            )}
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};
export function PricingSection() {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-center w-full pb-6 lg:pb-10 ">
          <h2 className="uppercase font-bold lg:text-2xl text-xl lg:mb-8 mb-2 animate-text-gradient bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent ">
            Pricing
          </h2>
        </div>
        <div>
          <div>
            <div className="relative flex justify-between flex-col lg:flex-row items-center lg:items-stretch gap-8">
              {plans.map((plan) => (
                <PricingCard key={plan.id} {...plan} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { plansPricing } from "@/lib/constants";
import { getUserPlanId } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

export default async function PlanBadge() {
  const user = await currentUser();

  if (!user?.id) {
    return null;
  }

  const email = user?.emailAddresses[0]?.emailAddress;
  let planId: string | null = null;
  if (email) {
    planId = await getUserPlanId(email);
  }

  let planName = "Buy a Plan";

  const plan = plansPricing.find((plan) => plan.priceId == planId);

  if (plan) {
    planName = plan.name;
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center",
        !planId && "from-red-100 to-red-200 border-red-300",
      )}
    >
      <Crown
        className={cn("w-3 h-3 mr-1 text-amber-600", !planId && "text-red-600")}
      />
      {planName}
    </Badge>
  );
}

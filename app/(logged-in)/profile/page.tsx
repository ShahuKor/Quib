import CancelSubscriptionButton from "@/components/common/CancelSubscriptionButton";
import SignoutButtonCustom from "@/components/common/SignoutButtonCustom";
import { Button } from "@/components/ui/button";
import Greeting from "@/components/ui/Greeting";

import { getUserCustomerId, getUserPlanId } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress!;

  let planId: string | null = null;
  if (email) {
    planId = await getUserPlanId(email);
  }

  const customerId = await getUserCustomerId({ email });

  return (
    <div className=" min-h-dvh py-50 px-5 sm:px-10  md:px-30  lg:px-50">
      <Greeting name={user!.firstName!} />
      <p className="text-sm md:text-lg font-semibold tracking-wide flex items-center gap-2 text-neutral-600 mb-4 ">
        My Actions
        <ArrowRight className="size-4" />
      </p>
      <div className="flex flex-col gap-4 ml-4">
        <SignoutButtonCustom />
        {planId ? (
          <CancelSubscriptionButton customerId={customerId} />
        ) : (
          <div>
            <Link href="/#pricing">
              <Button
                size={"lg"}
                variant={"link"}
                className="w-24 md:w-40 px-4 py-1 md:px-6  md:py-3 text-xs md:text-sm font-medium text-yellow-500 hover:no-underline border-yellow-500 border flex items-center justify-center hover:text-yellow-400 hover:border-yellow-400"
              >
                Buy A Plan
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

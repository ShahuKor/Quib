import CancelSubscriptionButton from "@/components/common/CancelSubscriptionButton";
import SignoutButtonCustom from "@/components/common/SignoutButtonCustom";
import { Button } from "@/components/ui/button";
import { getUserCustomerId, getUserPlanId } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { Link } from "lucide-react";

export default async function Page() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress!;

  let planId: string | null = null;
  if (email) {
    planId = await getUserPlanId(email);
  }

  const customerId = await getUserCustomerId({ email });

  return (
    <div className=" min-h-dvh py-50 px-50">
      <p className="text-5xl font-semibold text-neutral-700 mb-8">
        Hello, {user?.fullName} !
      </p>
      <div className="flex flex-col gap-4">
        <SignoutButtonCustom />
        {planId ? (
          <CancelSubscriptionButton customerId={customerId} />
        ) : (
          <div>
            <Button
              size={"lg"}
              variant={"link"}
              className="w-40  px-6  py-3 text-sm font-medium text-yellow-500 hover:no-underline border-yellow-500 border flex items-center justify-center hover:text-yellow-400 hover:border-yellow-400"
            >
              Buy A Plan
            </Button>
            <Link
              href="/#pricing"
              className="flex item-center justify-center "
            ></Link>
          </div>
        )}
      </div>
    </div>
  );
}
